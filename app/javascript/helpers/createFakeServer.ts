import { TodoFragment } from "../__generated__/types"
import { IServerSideGetRowsRequest } from "ag-grid-community"
import { TodosQuery, Exact, InputMaybe, TodoStatusEnum } from "../__generated__/types"
import { LazyQueryExecFunction } from "@apollo/client"

interface IFakeServer {
  getData: (request: IServerSideGetRowsRequest) => { success: boolean; rows: Promise<TodoFragment[]> }
}

interface ICreateFakeServerProps {
  getTodos: LazyQueryExecFunction<TodosQuery, Exact<{ status?: InputMaybe<TodoStatusEnum> | undefined }>>
}

export const createFakeServer = ({ getTodos }: ICreateFakeServerProps): IFakeServer => {
  //const [getTodos, { data: todosData }] = useTodosLazyQuery()
  //fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")

  return {
    getData: (request: IServerSideGetRowsRequest) => {
      console.log("[Datasource] - rows requested by grid: ", request)
      // in this simplified fake server all rows are contained in an array
      const requestedRows = getTodos().then((data) => {
        //return data.data?.todos.slice(request.startRow, request.endRow)
        return data.data?.todos || []
      })

      return {
        success: true,
        rows: requestedRows
      }
    }
  }
}
