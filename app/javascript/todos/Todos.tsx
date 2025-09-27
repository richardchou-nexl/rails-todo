import React, { useCallback, useMemo, useState } from "react"
import { AgGridReact } from "ag-grid-react"
import {
  ColDef,
  GridReadyEvent,
  IServerSideDatasource,
  IServerSideGetRowsRequest,
  ModuleRegistry,
  ValidationModule,
  AllCommunityModule
} from "ag-grid-community"
import { AllEnterpriseModule } from "ag-grid-enterprise"
import { useTodosLazyQuery, TodoFragment } from "../__generated__/types"
import { createServerSideDatasource, createFakeServer } from "../helpers"
import { ApiConnections } from "../api_connections/ApiConnections"

ModuleRegistry.registerModules([
  AllEnterpriseModule,
  AllCommunityModule,
  ...(process.env.NODE_ENV !== "production" ? [ValidationModule] : [])
])

const Todos = () => {
  const rowModelType = "serverSide"
  const containerStyle = useMemo(() => ({ width: "100%", height: 500 }), [])
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), [])
  const [getTodos] = useTodosLazyQuery()

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

  const onGridReady = async (params: GridReadyEvent) => {
    const fakeServer = createFakeServer({ getTodos })
    const datasource = createServerSideDatasource(fakeServer)
    params.api!.setGridOption("serverSideDatasource", datasource)
  }

  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        <AgGridReact columnDefs={columnDefs} defaultColDef={defaultColDef} rowModelType={rowModelType} onGridReady={onGridReady} />
      </div>
      <ApiConnections />
    </div>
  )
}

export default Todos
