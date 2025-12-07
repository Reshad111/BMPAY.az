"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

export default function Odenis() {
  const [theme, setTheme] = useState("dark");

  return (
    <>
      
      <header
        className={`${
          theme === "dark" ? "bg-slate-900" : "bg-white"
        } shadow-lg sticky top-0 z-50 ${
          theme === "dark"
            ? "border-b border-slate-800"
            : "border-b border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img
              src="/bm.jpeg"
              alt="Logo"
              className="w-18 h-20 object-cover rounded"
            />
            <h1
              className={`text-xl font-semibold ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
             BMPAY
            </h1>
          </div>

          <nav
            className={`hidden md:flex gap-6 font-medium ${
              theme === "dark" ? "text-slate-400" : "text-gray-700"
            }`}
          >
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
                theme === "dark"
                  ? "bg-slate-800 text-yellow-400 hover:bg-slate-700"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition shadow-md"
            >
              Çıxış
            </Link>
          </div>
        </div>
      </header>

      <div
  className={`min-h-screen flex justify-start ${
    theme === "dark" ? "bg-slate-950" : "bg-gray-100"
  }`}
>
  <div className="flex flex-col items-center mt-10 w-full gap-6">
    <h1
      className={`text-3xl font-bold ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      Ödəniş əməliyyatları
    </h1>

    <div className="flex gap-6 mt-6">
      <Link
        to="/yeni-istifadeci"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg text-lg transition"
      >
        Yeni İstifadəçi Əlavə Et
      </Link>

      <Link
        to="/online-odenis"
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg text-lg transition"
      >
        Onlayn Ödəniş Et
      </Link>
    </div>
  </div>
</div>

    </>
  );
}
