module.exports = {

  "env": {
    "node": true,
    "es6": true,
    "node": true,
  },
  "extends": [
    "standard",
    "plugin:react/recommended",
  ],
  "parserOptions": {
    "parser": "babel-eslint",
    "ecmaVersion": 2017,
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
