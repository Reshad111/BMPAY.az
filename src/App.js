import { BrowserRouter, Routes, Route } from "react-router-dom";

import BelediyePortal from "./File/belediye-portal";
import Belediye from "./File/belediye";
import Hesabat from "./File/hesabat";
import Login from "./File/login";
import Odenis from "./File/odenis";
import YeniIstifadeci from "./File/yeni-istifadeci";
import OnlineOdenis from "./File/onlineodenis";
import Vergi from "./File/vergi"; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/belediye-portal" element={<BelediyePortal />} />
        <Route path="/belediye" element={<Belediye />} />
        <Route path="/hesabat" element={<Hesabat />} />
        <Route path="/odenis" element={<Odenis />} />
        <Route path="/online-odenis" element={<OnlineOdenis />} />
        <Route path="/yeni-istifadeci" element={<YeniIstifadeci />} />
        <Route path="/vergi" element={<Vergi />} />
      </Routes>
    </BrowserRouter>
  );
}
