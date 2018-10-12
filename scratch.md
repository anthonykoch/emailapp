
## Setup (Starting from scratch)


### Feathers Backend

It's better to install the backend first because feathers wants to overwrite the package.json completely rather than merge.

```
npm install @feathersjs/cli -g
npm i -g @feathers/cli
```

... TODO


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


close
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z"/></svg>

checkmark
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M362.6 192.9L345 174.8c-.7-.8-1.8-1.2-2.8-1.2-1.1 0-2.1.4-2.8 1.2l-122 122.9-44.4-44.4c-.8-.8-1.8-1.2-2.8-1.2-1 0-2 .4-2.8 1.2l-17.8 17.8c-1.6 1.6-1.6 4.1 0 5.7l56 56c3.6 3.6 8 5.7 11.7 5.7 5.3 0 9.9-3.9 11.6-5.5h.1l133.7-134.4c1.4-1.7 1.4-4.2-.1-5.7z"/></svg>
