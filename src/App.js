import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import UserView from 'views/UsersView'
import ProductsView from 'views/ProductsView'
import ProductRegistryView from 'views/ProductRegistryView'

import './App.scss'
import './reset.scss'

function App () {
  return (
    <Router>
      <div className='App'>
        <nav className='app-navbar'>
          <div className='app-navbar__logo'>
            My Lite CRM
          </div>
          <div className='app-bar__nav-items'>
            2<Link className='app-navbar__nav-items__nav-item' to='/users'> Usuarios
            </Link>
            <Link className='app-navbar__nav-items__nav-item' to='/products'> Productos
            </Link>
            <Link className='app-navbar__nav-items__nav-item' to='/products/add'> AgregarProductos
            </Link>
          </div>
        </nav>
        <Route exact path='/' component={UserView} />
        <Route exact path='/users' component={UserView} />
        <Route exact path='/products' component={ProductsView} />
        <Route exact path='/products/add' component={ProductRegistryView} />
      </div>
    </Router>
  )
}

export default App
