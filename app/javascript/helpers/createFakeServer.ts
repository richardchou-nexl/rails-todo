import { TodoFragment } from "../__generated__/types"
import { IServerSideGetRowsRequest } from "ag-grid-community"

export const createFakeServer = (allData: TodoFragment[]) => {
  return {
    getData: (request: IServerSideGetRowsRequest) => {
      // in this simplified fake server all rows are contained in an array
      const requestedRows = allData.slice(request.startRow, request.endRow)
      return {
        success: true,
        rows: requestedRows
      }
    }
  }
}
