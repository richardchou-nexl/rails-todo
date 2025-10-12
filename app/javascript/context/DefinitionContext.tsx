import React, { createContext, useContext, useMemo } from "react"
import { TableDefinitionFragment, TableSourceInput } from "../__generated__/graphql"
import { useGetTableDefinitionQuery } from "../__generated__/types"

interface IDefinitionContext {
  tableDefinition?: TableDefinitionFragment
  definitionLoading: boolean
}

export const INITIAL_STATE: IDefinitionContext = {
  tableDefinition: undefined,
  definitionLoading: false
}

export const DefinitionContext = createContext<IDefinitionContext>(INITIAL_STATE)

export const useDefinition = () => {
  const definitionContext = useContext(DefinitionContext)

  if (!definitionContext) {
    throw new Error("useDefinition must be used within a DefinitionProvider")
  }

  return {
    ...definitionContext
  }
}

export const DefinitionProvider: React.FC<{
  children: React.ReactNode
  source: TableSourceInput
}> = ({ children, source }) => {
  const { data, loading } = useGetTableDefinitionQuery({
    variables: { source }
  })
  const value = useMemo(
    () => ({
      tableDefinition: data?.tableDefinition,
      definitionLoading: loading
    }),
    [data?.tableDefinition, loading]
  )

  return <DefinitionContext.Provider value={value}>{children}</DefinitionContext.Provider>
}
