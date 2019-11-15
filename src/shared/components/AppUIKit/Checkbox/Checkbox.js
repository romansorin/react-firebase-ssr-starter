import React from 'react'

import * as S from './styles'

const Checkbox = props => (
  <S.Wrap>
    <S.Checkbox id={props.label} type='checkbox' />
    <S.Label htmlFor={props.label}>{props.label}</S.Label>
  </S.Wrap>
)

export default Checkbox
