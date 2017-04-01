import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { Route, NavLink } from 'react-router-dom'
import { createLogger } from 'redux-logger'

const UserProfile = ({ match }) => {
  return (
    <div>
      <h3>
        I am {match.params.id}'s profile page
      </h3>
    </div>
  )
}

const UserNav = () => {
  return (
    <ul>
      <li>
        <NavLink exact activeStyle={{ color: 'cyan' }} to='/user/jiayu'>Jiayu</NavLink>
      </li>
      <li>
        <NavLink exact activeStyle={{ color: 'cyan' }} to='/user/zhenghe'>Zhenghe</NavLink>
      </li>
      <li>
        <NavLink exact activeStyle={{ color: 'cyan' }} to='/user/mai'>Mai</NavLink>
      </li>
    </ul>
  )
}

const Users = connect(null, dispatch => ({
  goToUser: userId => dispatch(push('/user/' + userId))
}))(({ children, history, goToUser }) => {
  return (
    <div>
      <h2>
        Users
      </h2>
      <div>
        <UserNav />
      </div>
      <div>
        Or you can go to ...
        <form action='#'>
          <label htmlFor={'userId'}>Input a name here:</label>
          <input id={'userId'} type='text' maxLength={20} name={'userId'} required />
          <button onClick={e => {
            e.preventDefault()
            const userId = document.getElementById('userId').value
            if (userId) {
              goToUser(userId)
            }
          }}>
            Go
          </button>
        </form>
      </div>
      { children }
    </div>
  )
})

const About = () => {
  return (
    <div>
      <h2>
        About
      </h2>
    </div>
  )
}

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
    </div>
  )
}

const NavBar = () => {
  return (
    <ul>
      <li>
        <NavLink exact activeStyle={{ color: 'cyan' }} to='/'>Home</NavLink>
      </li>
      <li>
        <NavLink exact activeStyle={{ color: 'cyan' }} to='/about'>About</NavLink>
      </li>
      <li>
        <NavLink activeStyle={{ color: 'cyan' }} to='/user'>Users</NavLink>
      </li>
    </ul>
  )
}

const App = ({ children }) => {
  return (
    <div>
      <h1>
        App
      </h1>
      <div>
        <NavBar />
      </div>
      <div>
        { children }
      </div>
    </div>
  )
}

const reducers = {}

const history = createHistory()

const logger = createLogger()

const middlewares = [routerMiddleware(history), logger]

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  compose(
    applyMiddleware(...middlewares),
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route path='/' component={App} />
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/user' component={Users} />
        <Route path='/user/:id' component={UserProfile} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
)
