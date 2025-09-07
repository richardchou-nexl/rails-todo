import { IServerSideDatasource } from "ag-grid-community"

export const createServerSideDatasource: (server: any) => IServerSideDatasource = (server: any) => {
  return {
    getRows: (params) => {
      console.log("[Datasource] - rows requested by grid: ", params.request)
      // get data for request from our fake server
      const response = server.getData(params.request)
      // simulating real server call with a 500ms delay
      setTimeout(() => {
        if (response.success) {
          // supply rows for requested block to grid
          params.success({ rowData: response.rows })
        } else {
          params.fail()
        }
      }, 500)
    }
  }
}
