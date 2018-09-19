
# Email App

A mock email application built with Feathers JS backend and

## Setup

```bash
npm install
npm run dev
```

## Setup (Starting from scratch)

```bash
npm install --save next react react-dom

npm i @babel/preset-flow @babel/polyfill \
css-loader style-loader postcss-loader \
node-sass cssnano autoprefixer \
styled-components babel-plugin-styled-components \
eslint eslint-plugin-flowtype babel-eslint eslint-plugin-react

npx eslint --init
```

### Eslint config

Replace the `.eslintrc.js` config with this

```js
{
  "env": {
    "node": true
  },
  "extends": {
    "standard",
    "plugin:react/recommended",
  },
  "parserOptions": {
    "parser": "babel-eslint",
    "ecmaFeatures": {
      "jsx": true
    },
  },
  "settings": {
    "react": {
      "version": "16.5.2",
      "flowVersion": "0.81"
    },
    "propWrapperFunctions": ["forbidExtraProps"]
  },
  "rules": {
    "comma-dangle": [
      2,
      "always-multiline"
    ],
    "no-multiple-empty-lines": [
      0
    ],
    "space-before-function-paren": [
      2,
      {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "always"
      }
    ]
  },
}
```

### next.config.js

Create a file called next.config.js with the following.

```js
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    config.module.rules.push({
      use: [
        'style-loader',
        'css-loader',

      ],
    })
  },
}
```

## Todo

- Add https://stylelint.io/
- Read https://www.styled-components.com/docs/api#flow
