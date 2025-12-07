"use client"

import { useState } from "react"
import jsPDF from "jspdf"
import QRCode from "qrcode"
import { Link } from "react-router-dom"
import { Sun, Moon } from "lucide-react"

export default function Belediye() {
  const [theme, setTheme] = useState("dark")
  const [form, setForm] = useState({
    belediyyeAdi: "",
    odaNumber: "",
    voen: "",
    hesab: "",
    unvan: "",
    elaqe: "",
    email: "",
    vergi: "",
  })

  const [qrDataUrl, setQrDataUrl] = useState("")

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  

  

  return (
    <>
      <header
        className={`${theme === "dark" ? "bg-slate-900" : "bg-white"} shadow-lg sticky top-0 z-50 ${
          theme === "dark" ? "border-b border-slate-800" : "border-b border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img src="/bm.jpeg" alt="Logo" className="w-18 h-20 object-cover rounded" />
            <h1 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>
             BMPAY
            </h1>
          </div>

          <nav
            className={`hidden md:flex gap-6 font-medium ${
              theme === "dark" ? "text-slate-400" : "text-gray-700"
            }`}
          >
            <Link
              to="/belediye-portal"
              className={`${theme === "dark" ? "hover:text-cyan-400" : "hover:text-blue-600"} transition`}
            >
              Əsas Səhifə
            </Link>
            <Link
              to="/vergi"
              className={`${theme === "dark" ? "hover:text-cyan-400" : "hover:text-blue-600"} transition`}
            >
              Vergi
            </Link>
            <Link
              to="/hesabat"
              className={`${theme === "dark" ? "hover:text-cyan-400" : "hover:text-blue-600"} transition`}
            >
              Hesabatlar
            </Link>
            <Link
              to="/belediye"
              className={`${theme === "dark" ? "hover:text-cyan-400" : "hover:text-blue-600"} transition`}
            >
              Bələdiyyələr
            </Link>
            <Link
              to="/odenis"
              className={`${theme === "dark" ? "hover:text-cyan-400" : "hover:text-blue-600"} transition`}
            >
              Ödəniş
            </Link>
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
        className={`min-h-screen ${
          theme === "dark" ? "bg-slate-950" : "bg-gray-100"
        } flex justify-center p-6`}
      >
        <div className="max-w-4xl text-center">
          <h1
            className={`text-4xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
           BMPAY Haqqında
          </h1>

          <p
            className={`text-lg leading-7 mb-6 ${
              theme === "dark" ? "text-slate-300" : "text-gray-700"
            }`}
          >
            BMPAY Bələdiyyəsi yerli özünüidarənin aparıcı qurumlarından biri olub,
            sakinlərə xidmət, vergi idarəçiliyi, sosial layihələr və infrastruktur
            sahəsində fəaliyyət göstərir. Bələdiyyəmiz şəffaflıq, inkişaf və
            vətəndaş məmnuniyyəti prinsipləri ilə idarə olunur.
          </p>

         <div className="flex justify-center">
  <img
    src="/bm.jpeg"
    alt="Logo"
    className="w-85 h-80 object-cover rounded"
  />
</div>

          
        </div>
      </div>
    </>
  )
}
