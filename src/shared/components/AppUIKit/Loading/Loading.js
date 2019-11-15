import React from 'react'

import * as S from './styles'
import { Spinner } from 'app/ui-kit/Icons'

const Loading = props => (
  <S.LoadingComponent visible={props.visible}>
    <Spinner />
  </S.LoadingComponent>
)

export default Loading
