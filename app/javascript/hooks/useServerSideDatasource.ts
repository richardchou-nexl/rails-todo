import { IServerSideGetRowsParams } from "ag-grid-community"
import { GetTableRowsQuery, GetTableRowsQueryVariables } from "../__generated__/types"
import { LazyQueryExecFunction } from "@apollo/client"

interface ICreateServerSideDatasourceProps {
  getTableRows: LazyQueryExecFunction<GetTableRowsQuery, GetTableRowsQueryVariables>
}

export const useServerSideDatasource = ({ getTableRows }: ICreateServerSideDatasourceProps) => {
  return {
    getRows: async (params: IServerSideGetRowsParams) => {
      const sortModel = params.request.sortModel
      const ordering = sortModel.map((sort: any) => ({
        orderOnUid: sort.colId,
        direction: sort.sort.toUpperCase()
      }))

      console.log("sortModel", sortModel)

      const variables: GetTableRowsQueryVariables = {
        source: {
          rowType: "Core::TodosTable"
        },
        ordering: ordering
      }

      const response = await getTableRows({ variables })

      // simulating real server call with a 500ms delay
      setTimeout(() => {
        if (response.data) {
          const rows = response.data?.tableRows.entries || []
          params.success({ rowData: rows })
        } else {
          params.fail()
        }
      }, 500)
    }
  }
}
