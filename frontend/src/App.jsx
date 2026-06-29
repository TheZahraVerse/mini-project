import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
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
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: "14px",
            padding: "16px 24px",
            borderRadius: "12px",
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
