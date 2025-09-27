import { IServerSideDatasource, IServerSideGetRowsRequest, IServerSideGetRowsParams } from "ag-grid-community"
import { TodoFragment } from "../__generated__/types"

interface IFakeServer {
  getData: (request: IServerSideGetRowsRequest) => { success: boolean; rows: Promise<TodoFragment[]> }
}

interface ICreateServerSideDatasourceProps {
  server: IFakeServer
}

export const createServerSideDatasource: (server: any) => IServerSideDatasource = (server: IFakeServer) => {
  return {
    getRows: async (params: IServerSideGetRowsParams) => {
      // get data for request from our fake server
      const response = server.getData(params.request)
      const rows = await response.rows

      console.log("rows", rows)
      // simulating real server call with a 500ms delay
      setTimeout(() => {
        if (response.success) {
          // supply rows for requested block to grid
          params.success({ rowData: rows })
        } else {
          params.fail()
        }
      }, 500)
    }
  }
}
