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

or with fela config, e.g. to add plugins:

```javascript
plugins: [{
  resolve: `gatsby-plugin-fela`,
  options: {
    theme: {
      color: '#333',
      //... all your theme settings here
    },
    config: {
      plugins: [
        /* your fela plugins */
      ]
    }
  }
}];
```

## Example

https://github.com/mmintel/example-gatsby-fela
