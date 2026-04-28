import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Farmers from "./pages/Farmers";
import FPO from "./pages/FPO";
import Distributors from "./pages/Distributors";
import Retailers from "./pages/Retailers";
import ConsumerVerify from "./pages/ConsumerVerify";
import Blockchain from "./pages/Blockchain";
import Notifications from "./pages/Notifications";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/farmers" element={<Farmers />} />
          <Route path="/fpo" element={<FPO />} />
          <Route path="/distributors" element={<Distributors />} />
          <Route path="/retailers" element={<Retailers />} />
          <Route path="/verify" element={<ConsumerVerify />} />
          <Route path="/blockchain" element={<Blockchain />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
