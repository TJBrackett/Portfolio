import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SideNav } from './components/Nav/SideNav'
import { useVisitorSSE } from './hooks/useVisitorSSE'
import { useHealthCheck } from './hooks/useHealthCheck'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import WorkPage from './pages/WorkPage'
import ContactPage from './pages/ContactPage'
import AdminPage from './pages/AdminPage'
import type { MyLocation } from './types'

export default function App() {
  const pins = useVisitorSSE()
  const [myLocation, setMyLocation] = useState<MyLocation | null>(null)
  const health = useHealthCheck()

  const visitCount   = pins.length + (myLocation ? 1 : 0)
  const countryCount = new Set([
    ...pins.map((p) => p.country),
    ...(myLocation ? [myLocation.country] : []),
  ]).size

  return (
    <BrowserRouter>
      <div className="app">
        <SideNav visitCount={visitCount} countryCount={countryCount} health={health} />
        <Routes>
          <Route path="/"        element={<HomePage pins={pins} myLocation={myLocation} setMyLocation={setMyLocation} />} />
          <Route path="/about"   element={<AboutPage />} />
          <Route path="/work"    element={<WorkPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin"   element={<AdminPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
