# gatsby-plugin-fela

Provide drop-in support for using the css-in-js library
[fela.js](http://fela.js.org/) including server rendering.

## Install

`npm install --save gatsby-plugin-fela`

## How to use

Add the plugin to your `gatsby-config.js`.

```javascript
plugins: [`gatsby-plugin-fela`];
```

to configure the fela `renderer` add a `fela.config.js` file to the root of your gatsby project:

```javascript
module.exports = {
  plugins: [ /* add your plugins here */ ],
  enhancers: [ /* add your enhancers here */ ]
  // ...
}
```

Unfortunately I didn't find a way to use this file for SSR and browser, because I wasn't able to load this file from the browser without having access to node and webpack imports are very limited. So at the time this plugin only adds fela for server side rendering. You have to add it in the browser yourself. So create a `gatsby-browser.js` file in the root of your gatsby project and add this code:

```javascript
import React from 'react'
import { RendererProvider } from 'react-fela'
import { createRenderer } from 'fela'

exports.wrapRootElement = ({ element }) => {
  let config;
  try {
    config = require(`./fela.config.js`);
  } catch (e) {
    console.log(e);
  }
  const renderer = createRenderer(config);

  return (
    <RendererProvider renderer={renderer}>
      {element}
    </RendererProvider>
  );
};
```

If you have an idea to solve this problem feel free to open a pull request.

### Importing fela plugins

When you're importing fela plugins, don't forget your `fela.config.js` file is a commonjs file, but plugins are transpiled using babel from ES6 import/export syntax into format that uses `interopRequireDefault` function. So for correct import of the plugin, you have to import `.default` from the package as shown at the example below.

```js
const unit = require("fela-plugin-unit").default

module.exports = {
  plugins: [
    unit(),
  ],
}
```

## Example

https://github.com/mmintel/example-gatsby-fela
