import React from "react"
import { renderToString } from "react-dom/server"
import { RendererProvider } from 'react-fela'
import { createRenderer } from 'fela'
import { renderToSheetList } from 'fela-dom'
import fs from 'fs';

const FELA_CONFIG_FILE = process.env.FELA_CONFIG_FILE
  ? process.env.FELA_CONFIG_FILE
  : "./fela.config.js"

exports.replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) => {
  let config;
  try {
    if (fs.existsSync(FELA_CONFIG_FILE)) {
      config = eval(fs.readFileSync(FELA_CONFIG_FILE, 'utf8'));
    }
  } catch (err) {
    console.log(err);
  }
  const renderer = createRenderer(config)
  const bodyHTML = renderToString(
    <RendererProvider renderer={renderer}>
      {bodyComponent}
    </RendererProvider>
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
