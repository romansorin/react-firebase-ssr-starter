import React from 'react'
import PropTypes from 'prop-types'
import { Loading } from 'app/ui-kit'

import * as S from './styles'

const Button = props => {
  return (
    <S.Button {...props}>
      <S.ButtonText>
        <Loading visible={props.loading} />
        {props.children}
      </S.ButtonText>
    </S.Button>
  )
}

Button.propTypes = {
  loading: PropTypes.bool
}

export default Button
