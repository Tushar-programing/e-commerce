import { useState, useCallback, useEffect } from 'react'

import { useDispatch } from 'react-redux'
import Header from './component/header/header'
import Footer from './component/footer/footer'
import authService from './appwrite/auth'
import { login } from './store/authslice'
import { logout } from './store/authslice'
import {Outlet} from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      }else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false) )
  }, [])

  return (
    <>
    <Header />
    <main>
    <Outlet />
    </main>
    <Footer />
    </>
  )
}

export default App
