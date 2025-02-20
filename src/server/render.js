import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter as Router, matchPath } from 'react-router-dom'
import { Provider } from 'react-redux'
import Html from './components/HTML'
import { ServerStyleSheet } from 'styled-components'
import { renderRoutes } from 'react-router-config'

import routes from 'app/routes/routes'
import Redux from 'app/api/redux'

const getActiveRoute = ({ pathname, route }) => {
  const activeRoute = route.routes.find(route => matchPath(pathname, route))
  if (activeRoute.routes) return getActiveRoute({ pathname, route: activeRoute })
  return activeRoute
}

const serverRenderer = () => async (req, res) => {
  Redux.store = req.store

  const activeRoute = getActiveRoute({ pathname: req.url, route: routes[0] })
  if (!activeRoute) console.warn('No active route found: ', activeRoute)

  const dataRequirements = activeRoute.component.serverFetch
    ? activeRoute.component.serverFetch()
    : Promise.resolve()

  await dataRequirements

  const sheet = new ServerStyleSheet()
  try {
    const content = renderToString(
      sheet.collectStyles(
        <Provider store={req.store}>
          <Router location={req.url} context={{}}>
            {renderRoutes(routes)}
          </Router>
        </Provider>
      )
    )

    const styles = sheet.getStyleElement()
    const state = JSON.stringify(req.store.getState())

    const HtmlComponent = <Html
      styles={styles}
      scripts={[res.locals.assetPath('bundle.js'), res.locals.assetPath('vendor.js')]}
      state={state}
    >
      {content}
    </Html>

    return res.send(
      `<!doctype html>
      ${renderToString(HtmlComponent)}`
    )
  } catch (error) {
    console.error('Error preparing stylesheet:', error)
  } finally {
    sheet.seal()
  }
}

export default serverRenderer
