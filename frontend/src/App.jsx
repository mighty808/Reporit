import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CheckTransactionPage from './pages/CheckTransactionPage'
import ReportFraudPage from './pages/ReportFraudPage'
import AnalyticsPage from './pages/AnalyticsPage'
import AlertsPage from './pages/AlertsPage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={ <CheckTransactionPage /> } />
      <Route path='/analytics' element={ <AnalyticsPage /> } />
      <Route path='/report' element={ <ReportFraudPage /> } />
      <Route path='/alerts' element={ <AlertsPage /> } />
    </Routes>
  )
}

export default App
