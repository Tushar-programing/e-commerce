import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store  from './store/store'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Signup from './page/signup.jsx'
import { Login } from './component/index.js'
import List from './page/list.jsx'
import Allpost from './page/allpost.jsx'
import Cart from './page/cart.jsx'
import Post from './page/post.jsx'
import Editpost from './page/editpost.jsx'
import Orders from './page/orders.jsx'
import Adress from './page/adress.jsx'
import { Authlayout } from './component/index.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element:
          <Allpost />
      },
      {
        path: '/login',
        element:
        <Authlayout authentication={false}>
          <Login />
        </Authlayout>
      },
      {
        path: '/signup',
        element: 
        <Authlayout authentication={false}>
          <Signup />
        </Authlayout>
      },
      {
        path: '/list',
        element: <List />
      },
      {
        path: '/post/:slug',
        element: <Post />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: "/edit/:slug",
        element: <Editpost />
      },
      {
        path: "/address",
        element: <Adress />
      },
      {
        path: "/order/:slug",
        element: <Orders />
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
