import { useCallback } from "react"
import { IServerSideGetRowsParams } from "ag-grid-community"
import { GetTableRowsQuery, GetTableRowsQueryVariables } from "../__generated__/types"
import { LazyQueryExecFunction } from "@apollo/client"

interface ICreateServerSideDatasourceProps {
  getTableRows: LazyQueryExecFunction<GetTableRowsQuery, GetTableRowsQueryVariables>
}

export const useServerSideDatasource = ({ getTableRows }: ICreateServerSideDatasourceProps) => {
  const getDataSource = useCallback(() => {
    return {
      getRows: async (params: IServerSideGetRowsParams) => {
        const sortModel = params.request.sortModel
        const ordering = sortModel.map((sort: any) => ({
          orderOnUid: sort.colId,
          direction: sort.sort.toUpperCase()
        }))

        const variables: GetTableRowsQueryVariables = {
          source: {
            rowType: "Core::TodosTable"
          },
          ordering: ordering
        }

        const data = await getTableRows({ variables, fetchPolicy: "no-cache" })

        const responseData = data?.data?.tableRows
        // simulating real server call with a 500ms delay
        if (responseData) {
          const rowData = responseData.entries
          const rowCount = responseData.entries.length
          params.api.hideOverlay()
          params.success({ rowData, rowCount })
        } else {
          params.api.showNoRowsOverlay()
          params.fail()
        }
      }
    }
  }, [getTableRows])

  return getDataSource
}
