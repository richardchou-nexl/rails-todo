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
import { ApolloClient, InMemoryCache } from "@apollo/client"
import { ApolloProvider } from "@apollo/client/react"
import { HttpLink } from "@apollo/client/link/http"
import Todos from "./Todos"

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:3000/graphql" }),
  cache: new InMemoryCache()
})

const Main = () => {
  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <Todos />
      </ApolloProvider>
    </React.StrictMode>
  )
}

export default Main
