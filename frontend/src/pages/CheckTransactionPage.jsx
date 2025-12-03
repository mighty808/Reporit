import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import CheckForm from '../components/CheckForm'

const CheckTransactionPage = () => {
  return (
      <>
      <Navbar />
      <Sidebar>
        <CheckForm />
      </Sidebar>
      
      </>
  )
}

export default CheckTransactionPage
