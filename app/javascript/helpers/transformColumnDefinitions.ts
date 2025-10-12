import { TableDefinitionFragment, TableRow } from "../__generated__/graphql"
import { ColDef } from "ag-grid-community"

export const transformColumnDefinitions = (tableDefinition: TableDefinitionFragment | undefined): ColDef[] => {
  if (!tableDefinition) {
    return []
  }

  const filteredColumns = tableDefinition.columns.filter((column) => {
    return column.id !== "id"
  })

  const columnDefs = filteredColumns.map((column) => {
    // we can cast to TableRow because datasource is an array of TableRow
    // see useServerSideDatasource.ts
    const baseColDef: ColDef<TableRow> = {
      headerName: column.name,
      minWidth: 100,
      sortable: true,
      filter: true,
      resizable: true,
      colId: column.id,
      valueGetter: (params) => {
        const cell = params.data?.cells.find((cell) => cell.column.id === params.colDef.colId)
        return cell?.values
          .map((value) => {
            if (value.__typename === "StringCell") {
              return value.string
            } else if (value.__typename === "IntegerCell") {
              return value.integer
            }
          })
          .join(", ")
      }
    }

    return baseColDef
  })

  return columnDefs
}
