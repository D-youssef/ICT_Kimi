import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import OverviewPage from './pages/OverviewPage'
import FVGPage from './pages/entry/FVGPage'
import CISDPage from './pages/entry/CISDPage'
import FibonacciPage from './pages/entry/FibonacciPage'
import OrderBlockPage from './pages/entry/OrderBlockPage'
import CandlePatternsPage from './pages/CandlePatternsPage'
import PreTradeChecklistPage from './pages/PreTradeChecklistPage2'
import SessionsPage from './pages/SessionsPage'

export default function App() {
  return (
    <div className="min-h-screen bg-bg0">
      <Navbar />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/fvg" element={<FVGPage />} />
          <Route path="/cisd" element={<CISDPage />} />
          <Route path="/fibonacci" element={<FibonacciPage />} />
          <Route path="/order-block" element={<OrderBlockPage />} />
          <Route path="/candle-patterns" element={<CandlePatternsPage />} />
          <Route path="/checklist" element={<PreTradeChecklistPage />} />
          <Route path="/sessions" element={<SessionsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
