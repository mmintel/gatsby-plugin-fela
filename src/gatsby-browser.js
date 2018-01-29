import React from 'react'
import { Router } from 'react-router-dom'
import { rehydrate } from 'fela-dom'
import { Provider, ThemeProvider } from 'react-fela'
import { createRenderer } from 'fela'


exports.replaceRouterComponent = ({ history }, pluginOptions) => {
  const renderer = createRenderer(pluginOptions.config)
  const theme = pluginOptions.theme || {};
  rehydrate(renderer)
  const ConnectedRouterWrapper = ({ children }) => (
    <Provider renderer={renderer}>
      <ThemeProvider theme={theme}>
        <Router history={history}>{children}</Router>
      </ThemeProvider>
    </Provider>
  )

  return ConnectedRouterWrapper
}
