import { IServerSideGetRowsParams } from "ag-grid-community"
import { TodosQuery, TodoStatusEnum, QueryTodosArgs } from "../__generated__/types"
import { LazyQueryExecFunction } from "@apollo/client"

interface ICreateServerSideDatasourceProps {
  getTodos: LazyQueryExecFunction<TodosQuery, QueryTodosArgs>
}

export const useServerSideDatasource = ({ getTodos }: ICreateServerSideDatasourceProps) => {
  return {
    getRows: async (params: IServerSideGetRowsParams) => {
      const sortModel = params.request.sortModel
      const ordering = sortModel.map((sort: any) => ({
        orderOnUid: sort.colId,
        direction: sort.sort.toUpperCase()
      }))

      const variables: QueryTodosArgs = {
        status: TodoStatusEnum.NotStarted,
        ordering
      }

      const response = await getTodos({ variables })

      // simulating real server call with a 500ms delay
      setTimeout(() => {
        if (response.data) {
          const rows = response.data?.todos || []
          params.success({ rowData: rows })
        } else {
          params.fail()
        }
      }, 500)
    }
  }
}
