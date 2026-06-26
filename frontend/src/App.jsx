import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tab from "./components/layouts/Tab";
import ListingsShow from "./pages/ListingsShow";
import ListingsAction from "./pages/ListingsAction";

function App() {
  return (
    <BrowserRouter>
      <Tab label="آگهی‌ها">
        <Routes>
          <Route path="/" element={<ListingsShow />} />
          <Route path="/listings/show" element={<ListingsShow />} />
          <Route path="/listings/action" element={<ListingsAction />} />
        </Routes>
      </Tab>
    </BrowserRouter>
  );
}

export default App;