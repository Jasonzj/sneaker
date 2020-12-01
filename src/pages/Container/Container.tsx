import React from 'react'
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

// components
import Product from '../Product'
import NoMatch from '../NoMatch/'
import Header from '../../components/Header'
import Banner from '../../components/Banner'
import SignIn from '../SignIn'
import SignUp from '../SignUp'

// config
import config from '../../utils/config'
const { homePage, openPages } = config

const openPagesMap = {
  '/sign_in': <Route exact path='/sign_in' component={SignIn} />,
  '/sign_up': <Route exact path='/sign_up' component={SignUp} />,
}

const Container: React.FC = () => {
  const match = useRouteMatch({
    path: ['/sign_in', '/sign_up'],
    exact: true,
  })

  if (match && openPages && openPages.includes(match.path)) {
    return (
      <SwitchTransition mode='out-in'>
        <CSSTransition key={match.path} timeout={1000} in classNames='sign-ani'>
          {openPagesMap[match.path as '/sign_in' | '/sign_up']}
        </CSSTransition>
      </SwitchTransition>
    )
  }

  return (
    <div className='App'>
      <Header />
      <Banner />
      <Switch>
        <Route exact path='/' render={() => <Redirect to={homePage} />} />
        <Route exact path='/trending/:siteName' component={Product} />
        <Route exact path='/search/:siteName/:key' component={Product} />
        <Route exact path='/following' component={Product} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  )
}

export default Container
