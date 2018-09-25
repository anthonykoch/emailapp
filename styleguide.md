
# JavaScript

Linting is done with eslint using [standard](https://standardjs.com/) with a few custom rules (which declared in the eslint file).

# Styling

Styling is done with react-emotion.

### @app/styles/utilities

Each file in this folder has two types of exports.

1. class names that map to styles created from react-emotion
2. components created from react-emotion

Classes should be exported as lowercase without the name of "class".

```js
// wrong

export const MxautoClass = css`margin: 0 auto`
export const mxautoClass = css`margin: 0 auto`

// right
export const mxauto = css`margin: 0 auto`
```

Components should be exported with the first letter being uppercase

```js
// wrong
export const margin = styled('div')``

// right
export const Margin = styled('div')``
```

