"use client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon, ArrowLeft } from "lucide-react";

export default function YeniIstifadeci() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("dark");

  const [form, setForm] = useState({
    adSoyad: "",
    voen: "",
    unvan: "",
    odeyiciKodu: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      adSoyad: "",
      voen: "",
      unvan: "",
      odeyiciKodu: "",
    });
  };

  return (
    <>
      <header
        className={`${theme === "dark" ? "bg-slate-900" : "bg-white"} shadow-lg sticky top-0 z-50`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
   
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full transition"
            >
              <ArrowLeft 
                size={26}
                className={theme === "dark" ? "text-white" : "text-black"}
              />
            </button>

            <div className="flex items-center gap-3">
              <img src="/bm.jpeg" alt="Logo" className="w-18 h-20 object-cover rounded" />
              <h1 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>
                Cəhri Bələdiyyəsi
              </h1>
            </div>
          </div>

  
          <nav className={`hidden md:flex gap-6 font-medium ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
            <Link to="/belediye-portal">Əsas Səhifə</Link>
            <Link to="/vergi">Vergi</Link>
            <Link to="/hesabat">Hesabatlar</Link>
            <Link to="/belediye">Bələdiyyələr</Link>
            <Link to="/odenis">Ödəniş</Link>
          </nav>

  
          <div className="flex gap-3 items-center">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`p-2 rounded-full transition ${
                theme === "dark" ? "bg-slate-800 text-yellow-400" : "bg-gray-200 text-gray-900"
              }`}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700"
            >
              Çıxış
            </Link>
          </div>
        </div>
      </header>


      <div className={`${theme === "dark" ? "bg-slate-950" : "bg-gray-100"} min-h-screen flex justify-center p-6`}>
        <div className={`max-w-xl w-full mt-10 p-10 rounded-xl shadow-lg ${theme === "dark" ? "bg-slate-900 text-white" : "bg-white"}`}>
          <h2 className="text-2xl font-bold mb-6 text-center">Yeni İstifadəçi Əlavə Et</h2>

          <div className="flex flex-col gap-5">

            <input
              type="text"
              name="adSoyad"
              placeholder="Ad Soyad"
              value={form.adSoyad}
              onChange={handleChange}
              className="border p-3 rounded text-black"
            />

            <input
              type="text"
              name="voen"
              placeholder="VÖEN"
              value={form.voen}
              onChange={handleChange}
              className="border p-3 rounded text-black"
            />

            <input
              type="text"
              name="unvan"
              placeholder="Bələdiyyə Ünvanı"
              value={form.unvan}
              onChange={handleChange}
              className="border p-3 rounded text-black"
            />

            <input
              type="text"
              name="odeyiciKodu"
              placeholder="Ödəyici Kodu"
              value={form.odeyiciKodu}
              onChange={handleChange}
              className="border p-3 rounded text-black"
            />

            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition">
              İstifadəçini Yarat
            </button>

            <button
              onClick={resetForm}
              className="bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg transition"
            >
              Təmizlə
            </button>

          </div>
        </div>
      </div>
    </>
  );
}
