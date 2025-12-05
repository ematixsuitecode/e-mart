import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const HomeOutlet = () => {
    return (
         <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />   {/* THIS IS WHERE PAGES RENDER */}
      </main>
      <Footer />
    </>
    )
}

export default HomeOutlet