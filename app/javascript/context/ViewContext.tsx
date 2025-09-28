import { useLazyQuery, LazyQueryExecFunction } from "@apollo/client"
import { TodosQuery, TodosQueryVariables, TodosDocument } from "../__generated__/types"
import React, { useRef } from "react"
import { AgGridReact } from "ag-grid-react"

interface IViewProviderProps {
  children: React.ReactNode
}

interface IViewContext {
  getTodos: LazyQueryExecFunction<TodosQuery, TodosQueryVariables>
  gridRef: React.RefObject<AgGridReact>
}

const uninitializedLazyQueryExec: LazyQueryExecFunction<TodosQuery, TodosQueryVariables> = () => {
  throw new Error("getTodos is not initialized")
}

const INITIAL_STATE: IViewContext = {
  getTodos: uninitializedLazyQueryExec,
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
  const [getTodos] = useLazyQuery<TodosQuery, TodosQueryVariables>(TodosDocument)
  const gridRef = useRef<AgGridReact>(null)

  return <ViewContext.Provider value={{ getTodos, gridRef }}>{children}</ViewContext.Provider>
}
