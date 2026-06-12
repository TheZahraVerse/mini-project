import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Listings from './pages/Listings'
import ListingsEdit from './pages/ListingsEdit'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Listings />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/edit" element={<ListingsEdit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App