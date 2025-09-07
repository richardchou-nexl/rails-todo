import React from "react"
import ReactDOM from "react-dom/client"
import Main from "../todos/Main"

type Components = Record<string, React.ElementType>

const components: Components = {
  Main: Main
}

document.addEventListener("DOMContentLoaded", () => {
  Object.keys(components).forEach((key) => {
    const nodes = Array.from(document.getElementsByClassName(`react-${key}`))

    nodes.forEach((node) => {
      const data = node.getAttribute("data")
      const props = data && data.length > 2 ? JSON.parse(data) : {}

      const Component = components[key]
      const root = ReactDOM.createRoot(node)
      root.render(<Component {...props} />)
    })
  })
})
