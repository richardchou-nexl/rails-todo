import { useLazyQuery, LazyQueryExecFunction } from "@apollo/client"
import { GetTableRowsQuery, GetTableRowsQueryVariables, GetTableRowsDocument, TodosQuery } from "../__generated__/types"
import React, { useRef } from "react"
import { AgGridReact } from "ag-grid-react"

interface IViewProviderProps {
  children: React.ReactNode
}

interface IViewContext {
  getTableRows: LazyQueryExecFunction<GetTableRowsQuery, GetTableRowsQueryVariables>
  gridRef: React.RefObject<AgGridReact>
}

const uninitializedLazyQueryExec: LazyQueryExecFunction<GetTableRowsQuery, GetTableRowsQueryVariables> = () => {
  throw new Error("getTableRows is not initialized")
}

const INITIAL_STATE: IViewContext = {
  getTableRows: uninitializedLazyQueryExec,
  gridRef: React.createRef<AgGridReact>()
}

export const useView = () => {
  const viewContext = React.useContext(ViewContext)

  if (!viewContext) {
    throw new Error("useView must be used within a ViewProvider")
  }

  return {
    ...viewContext
  }
}

export const ViewContext = React.createContext<IViewContext>(INITIAL_STATE)

export const ViewProvider: React.FC<IViewProviderProps> = ({ children }) => {
  const [getTableRows] = useLazyQuery<GetTableRowsQuery, GetTableRowsQueryVariables>(GetTableRowsDocument)

  const gridRef = useRef<AgGridReact>(null)

  return <ViewContext.Provider value={{ getTableRows, gridRef }}>{children}</ViewContext.Provider>
}
