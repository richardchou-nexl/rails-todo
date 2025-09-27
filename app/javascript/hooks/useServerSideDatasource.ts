import { IServerSideGetRowsParams } from "ag-grid-community"
import { TodosQuery, Exact, InputMaybe, TodoStatusEnum, TodosQueryVariables } from "../__generated__/types"
import { LazyQueryExecFunction } from "@apollo/client"

interface ICreateServerSideDatasourceProps {
  getTodos: LazyQueryExecFunction<TodosQuery, Exact<{ status?: InputMaybe<TodoStatusEnum> | undefined }>>
}

export const useServerSideDatasource = ({ getTodos }: ICreateServerSideDatasourceProps) => {
  return {
    getRows: async (params: IServerSideGetRowsParams) => {
      const sortModel = params.request.sortModel
      const ordering = sortModel.map((sort: any) => ({
        orderOnUid: sort.colId,
        direction: sort.sort.toUpperCase()
      }))

      const variables: TodosQueryVariables = {
        status: TodoStatusEnum.NotStarted
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
