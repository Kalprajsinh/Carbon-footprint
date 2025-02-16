import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Leaderboard from './pages/leaderboard'
import Admin from './pages/admin'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
