import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { BrowserRouter, Route, NavLink } from 'react-router-dom'

const UserProfile = () => {
  return (
    <div>

    </div>
  )
}

const Users = () => {
  return (
    <div>
      Users
    </div>
  )
}

const About = () => {
  return (
    <div>
      About
    </div>
  )
}

const Home = () => {
  return (
    <div>
      Home
    </div>
  )
}

const NavBar = () => {
  return (
    <div>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/about'>About</NavLink>
      <NavLink to='/users'>Users</NavLink>
    </div>
  )
}

const App = () => {
  return (
    <div>
      App
      <NavBar />
    </div>
  )
}

const reducers = {}

const history = createHistory()

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(routerMiddleware(history))
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/users' component={Users} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
)
