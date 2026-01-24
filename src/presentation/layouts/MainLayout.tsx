

import { Header } from '../components/organisms/Header'
import { Outlet } from 'react-router-dom'
import { Footer } from '../components/organisms/Footer'

export const MainLayout = () => {
  
  return (
    <main className="min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </main>
  )
}
