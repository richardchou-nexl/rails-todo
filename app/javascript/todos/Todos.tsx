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

ModuleRegistry.registerModules([
  AllEnterpriseModule,
  AllCommunityModule,
  ...(process.env.NODE_ENV !== "production" ? [ValidationModule] : [])
])

const createServerSideDatasource: (server: any) => IServerSideDatasource = (server: any) => {
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

function createFakeServer(allData: TodoFragment[]) {
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

const Todos = () => {
  const rowModelType = "serverSide"
  const containerStyle = useMemo(() => ({ width: "100%", height: 500 }), [])
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), [])
  const [getTodos, { data: todosData }] = useTodosLazyQuery()

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "id", minWidth: 220 },
    { field: "subject", minWidth: 200 },
    { field: "status" }
  ])

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
      sortable: false,
      filter: true,
      resizable: true
    }
  }, [])

  const onGridReady = async (params: GridReadyEvent) => {
    getTodos().then((data) => {
      const todos = data.data?.todos || []
      const fakeServer = createFakeServer(todos)
      const datasource = createServerSideDatasource(fakeServer)
      params.api!.setGridOption("serverSideDatasource", datasource)
    })
  }

  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        <AgGridReact columnDefs={columnDefs} defaultColDef={defaultColDef} rowModelType={rowModelType} onGridReady={onGridReady} />
      </div>
    </div>
  )
}

export default Todos
