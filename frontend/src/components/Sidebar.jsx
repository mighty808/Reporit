import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = ({ children, isMobileMenuOpen }) => {
  const location = useLocation()
  
  // Helper function to check if a route is active
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden md:flex flex-col w-30 lg:w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 pt-16">
        {/* Sidebar content - collapsed on small screens */}
        <div className="flex-1 p-2 lg:p-4">
          <ul className="space-y-2">

            {/* Check Transaction */}
            <li>
              <Link 
                to='/' 
                className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start px-2 lg:px-4 py-3 rounded-lg transition-colors duration-200 group ${isActive('/') ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'}`}
                title="Check Transaction"
              >
                <span className={`mb-1 lg:mb-0 lg:mr-3 ${isActive('/') ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </span>
                <span className="text-xs lg:text-sm lg:font-medium text-center lg:text-left truncate">
                  Check Transaction
                </span>
              </Link>
            </li>

            {/* Analytics */}
            <li>
              <Link 
                to='/analytics' 
                className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start px-2 lg:px-4 py-3 rounded-lg transition-colors duration-200 group ${isActive('/analytics') ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'}`}
                title="Analytics"
              >
                <span className={`mb-1 lg:mb-0 lg:mr-3 ${isActive('/analytics') ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </span>
                <span className="text-xs lg:text-sm lg:font-medium text-center lg:text-left truncate">
                  Analytics
                </span>
              </Link>
            </li>

            {/* Report Fraud */}
            <li>
              <Link 
                to='/report' 
                className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start px-2 lg:px-4 py-3 rounded-lg transition-colors duration-200 group ${isActive('/report') ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'}`}
                title="Report Fraud"
              >
                <span className={`mb-1 lg:mb-0 lg:mr-3 ${isActive('/report') ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                </span>
                <span className="text-xs lg:text-sm lg:font-medium text-center lg:text-left truncate">
                  Report Fraud
                </span>
              </Link>
            </li>

            {/* Alerts */}
            <li>
              <Link 
                to='/alerts' 
                className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start px-2 lg:px-4 py-3 rounded-lg transition-colors duration-200 group ${isActive('/alerts') ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'}`}
                title="Alerts"
              >
                <span className={`mb-1 lg:mb-0 lg:mr-3 ${isActive('/alerts') ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                  </svg>
                </span>
                <span className="text-xs lg:text-sm lg:font-medium text-center lg:text-left truncate">
                  Alerts
                </span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Active status - only visible on larger screens */}
        <div className="hidden lg:block p-4 border-t border-gray-200">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-xs text-green-800 font-medium mb-1">Community Protection</p>
            <p className="text-xs text-green-800 font-medium">Version 1.0</p>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => {/* Handle close in parent component */}}
        ></div>
      )}

      {/* Mobile Sidebar - shows when hamburger is clicked */}
      <div className={`md:hidden fixed top-0 left-0 h-full w-64 bg-white z-40 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="pt-16 h-full border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <ul className="space-y-2">
              {/* Check Transaction Mobile */}
              <li>
                <Link 
                  to='/' 
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${isActive('/') ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'}`}
                  onClick={() => {/* Close menu in parent */}}
                >
                  <span className={`mr-3 ${isActive('/') ? 'text-blue-600' : 'text-gray-400'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </span>
                  <span className="font-medium">Check Transaction</span>
                </Link>
              </li>

              {/* Analytics Mobile */}
              <li>
                <Link 
                  to='/analytics' 
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${isActive('/analytics') ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'}`}
                  onClick={() => {/* Close menu in parent */}}
                >
                  <span className={`mr-3 ${isActive('/analytics') ? 'text-blue-600' : 'text-gray-400'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                  </span>
                  <span className="font-medium">Analytics</span>
                </Link>
              </li>

              {/* Report Fraud Mobile */}
              <li>
                <Link 
                  to='/report' 
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${isActive('/report') ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'}`}
                  onClick={() => {/* Close menu in parent */}}
                >
                  <span className={`mr-3 ${isActive('/report') ? 'text-blue-600' : 'text-gray-400'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                  </span>
                  <span className="font-medium">Report Fraud</span>
                </Link>
              </li>

              {/* Alerts Mobile */}
              <li>
                <Link 
                  to='/alerts' 
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${isActive('/alerts') ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'}`}
                  onClick={() => {/* Close menu in parent */}}
                >
                  <span className={`mr-3 ${isActive('/alerts') ? 'text-blue-600' : 'text-gray-400'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                    </svg>
                  </span>
                  <span className="font-medium">Alerts</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="md:pl-20 lg:pl-64 pt-16">
        {children}
      </div>
    </div>
  )
}

export default Sidebar