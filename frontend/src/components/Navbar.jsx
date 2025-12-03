import React, { useState } from 'react'

const Navbar = ({ onMenuToggle }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    if (onMenuToggle) {
      onMenuToggle(!isMobileMenuOpen)
    }
  }

  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 h-16">
      <div className="px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Left side: Logo, Hamburger, and Text */}
          <div className="flex items-center">
            {/* Hamburger Menu Button for Mobile */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden mr-3 p-2 rounded-md text-gray-600 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
            
            {/* Logo icon */}
            <div className="mr-3 flex items-center justify-center">
              <svg 
                className="w-8 h-8 text-blue-600" 
                fill="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-gray-900">
                Reporit
              </h1>
              <p className="text-xs text-gray-500 truncate max-w-xs sm:max-w-md">
                Fraud Detection System
              </p>
            </div>
          </div>

          {/* Right side: Profile Icon */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-gray-900">User</p>
                <p className="text-xs text-gray-500">Community Member</p>
              </div>
              <div className="relative">
                {/* Profile icon circle */}
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-300">
                  {/* User icon SVG */}
                  <svg 
                    className="w-5 h-5 text-grblueeen-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                {/* Green status indicator */}
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-blue-500 rounded-full border-2 border-white"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar