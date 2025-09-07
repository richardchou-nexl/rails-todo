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

function createFakeServer(allData: any[]) {
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

export interface IOlympicData {
  athlete: string
  age: number
  country: string
  year: number
  date: string
  sport: string
  gold: number
  silver: number
  bronze: number
  total: number
}

const Todos = () => {
  const rowModelType = "serverSide"
  const containerStyle = useMemo(() => ({ width: "100%", height: 500 }), [])
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), [])

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "athlete", minWidth: 220 },
    { field: "country", minWidth: 200 },
    { field: "year" },
    { field: "sport", minWidth: 200 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" }
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

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data: IOlympicData[]) => {
        // setup the fake server with entire dataset
        const fakeServer = createFakeServer(data)
        // create datasource with a reference to the fake server
        const datasource = createServerSideDatasource(fakeServer)
        // register the datasource with the grid
        params.api!.setGridOption("serverSideDatasource", datasource)
      })
  }, [])

  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        <AgGridReact columnDefs={columnDefs} defaultColDef={defaultColDef} rowModelType={rowModelType} onGridReady={onGridReady} />
      </div>
    </div>
  )
}

export default Todos
