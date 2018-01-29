import React from 'react'
import { Router } from 'react-router-dom'
import { rehydrate } from 'fela-dom'
import { Provider } from 'react-fela'
import { createRenderer } from 'fela'

exports.wrapRootComponent = ({ Root }, pluginOptions) => {
  const renderer = createRenderer(pluginOptions.config)
  rehydrate(renderer)
  const ConnectedRouterWrapper = ({ children }) => (
    <Provider renderer={renderer}>
      <Root />
    </Provider>
  )

  return ConnectedRouterWrapper
}
