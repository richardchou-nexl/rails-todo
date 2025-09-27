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
  return {
    getData: (request: IServerSideGetRowsRequest) => {
      console.log("[Datasource] - rows requested by grid: ", request)

      const requestedRows = getTodos().then((data) => {
        return data.data?.todos || []
      })

      return {
        success: true,
        rows: requestedRows
      }
    }
  }
}
