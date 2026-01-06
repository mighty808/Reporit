import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import CheckForm from '../components/CheckForm'

const ReportFraudPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleMenuToggle = (isOpen) => {
    setIsMobileMenuOpen(isOpen)
  }

  return (
    <>
      <Navbar onMenuToggle={handleMenuToggle} />
      <Sidebar isMobileMenuOpen={isMobileMenuOpen}>
        
      </Sidebar>
    </>
  )
}

export default ReportFraudPage