import React from "react"
import { renderToString } from "react-dom/server"
import { Provider } from 'react-fela'

import { createRenderer } from 'fela'
import { renderToSheetList } from 'fela-dom'

exports.replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}, pluginOptions) => {
  const renderer = createRenderer(pluginOptions.config)
  const bodyHTML = renderToString(
    <Provider renderer={renderer}>
      {bodyComponent}
    </Provider>
  );
  const sheetList = renderToSheetList(renderer)
  const elements = sheetList.map(({ type, css, media, support }) =>
    <style
      dangerouslySetInnerHTML={{ __html: css }}
      data-fela-type={type}
      data-fela-support={support}
      key={`${type}-${media}`}
      media={media}
    />
  )
  replaceBodyHTMLString(bodyHTML)
  setHeadComponents(elements)
}
