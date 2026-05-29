import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Listings from './pages/Listings'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/listings" element={<Listings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App