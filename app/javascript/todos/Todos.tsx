import React, { useCallback, useMemo, useRef, useState } from "react"
import { AgGridReact } from "ag-grid-react"
import { ColDef, GridReadyEvent, SortChangedEvent, ModuleRegistry, ValidationModule, AllCommunityModule } from "ag-grid-community"
import { AllEnterpriseModule } from "ag-grid-enterprise"
import { ApiConnections } from "../api_connections/ApiConnections"
import { useServerSideDatasource } from "../hooks"
import { useView } from "../context/ViewContext"

ModuleRegistry.registerModules([
  AllEnterpriseModule,
  AllCommunityModule,
  ...(process.env.NODE_ENV !== "production" ? [ValidationModule] : [])
])

const Todos = () => {
  const rowModelType = "serverSide"
  const containerStyle = useMemo(() => ({ width: "100%", height: 500 }), [])
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), [])
  const { getTableRows, gridRef } = useView()

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "id", minWidth: 220 },
    { field: "subject", minWidth: 200 },
    { field: "status" }
  ])

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
      sortable: true,
      filter: true,
      resizable: true
    }
  }, [])

  const dataSource = useServerSideDatasource({ getTableRows })

  const onGridReady = async (params: GridReadyEvent) => {
    //const fakeServer = createFakeServer({ getTodos })
    //const datasource = createServerSideDatasource(fakeServer)
    //params.api!.setGridOption("serverSideDatasource", datasource)
    const gridApi = gridRef.current?.api

    if (gridApi) {
      gridApi.setGridOption("serverSideDatasource", dataSource)
    }
  }

  const onSortChanged = (event: SortChangedEvent) => {
    const columnState = event.api!.getColumnState()
    // save columnState to db
  }

  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        <AgGridReact
          onSortChanged={onSortChanged}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowModelType={rowModelType}
          onGridReady={onGridReady}
          ref={gridRef}
        />
      </div>
      <ApiConnections />
    </div>
  )
}

export default Todos
