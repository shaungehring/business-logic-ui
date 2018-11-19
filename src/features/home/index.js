/** @flow **/
import * as React from 'react'
import { Link as RouteLink } from 'react-router-dom'
import styled from 'styled-components'
import {
  compose,
  lifecycle,
  type HOC,
} from 'recompose'
import { inject, observer } from 'mobx-react'

import Link from 'Core/BusinessCard'

const Wrapper = styled.div`
  display: flex
`

const Home = () => (
  <Wrapper>
    <RouteLink to={{ pathname: '/interface' }}>
      <div className='ui cards'>
        <Link className='folder open icon' title='Interfaces'>
          List of program interfaces.
        </Link>
      </div>
    </RouteLink>
    <RouteLink to={{ pathname: '/execution' }}>
      <div className='ui cards'>
        <Link className='lightning icon' title='Execution'>
          List of calculation logs.
        </Link>
      </div>
    </RouteLink>
  </Wrapper>
)

const composed: HOC<*, {}> = compose(
  inject('router'),
  lifecycle({
    componentDidMount() {
      this.props.router.setLocation('/')
    },
  }),
  observer,
)

export default composed(Home)