import React from 'react'
import styled, { css } from 'react-emotion'

export default class SetAlert extends React.PureComponent {
  render() {
    return (
      <div
        className={containerClass}
      >
        <svg
          className={bellSvgClass}
          viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M27.981 41.947c.001.019.006.036.006.056C27.987 44.21 26.202 46 24 46s-3.987-1.79-3.987-3.997c0-.019.005-.036.005-.056C7.267 41.597 4 39.52 4 37.003c0-.788.344-1.53 1.181-2.194C11.209 28.094 13 29.953 13 20.006c0-6.632.271-12.712 8.258-13.807A2.997 2.997 0 0 1 24 2.01a2.994 2.994 0 0 1 2.742 4.189C34.729 7.294 35 13.374 35 20.006c0 9.977 1.8 8.073 7.872 14.86.794.65 1.128 1.371 1.128 2.137 0 2.515-3.353 4.592-16.019 4.944zM24 44.003a1.996 1.996 0 0 0 1.994-1.998l-.002-.018c-.651.009-1.296.019-1.992.019s-1.34-.01-1.992-.019l-.002.018c0 1.103.892 1.998 1.994 1.998zm0-39.996c-.551 0-.996.447-.996.999s.445 1 .996 1 .997-.448.997-1-.446-.999-.997-.999zm17.605 32.407s-1.522-1.714-4.018-3.984C34.179 29.325 33 27.853 33 20.006c0-7.664-.418-12-9-12s-9 4.336-9 12c0 7.848-1.18 9.321-4.59 12.427-2.447 2.229-3.986 3.942-3.986 3.942-.424.337-.424.533-.424.628 0 .123.205 3.003 18 3.003s18-2.88 18-3.003c0-.08 0-.267-.395-.589z" fill-rule="evenodd"/></svg>
        <Text>
        Set Alert
        </Text>
      </div>
    )
  }
}

const bellSvgClass = css`
  width: 16px;
`

const containerClass = css`
  display: flex;
  align-items: center;
`

const Text = styled('span')`
  font-size: 14px;
  margin-left: 9px;
  color: #6d7482;
`
