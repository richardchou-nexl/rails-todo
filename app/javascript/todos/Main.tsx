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
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import Todos from "./Todos"
import { ViewProvider } from "../context/ViewContext"

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache()
})

const Main = () => {
  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <ViewProvider>
          <Todos />
        </ViewProvider>
      </ApolloProvider>
    </React.StrictMode>
  )
}

export default Main
