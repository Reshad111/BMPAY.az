"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon, ArrowLeft } from "lucide-react";

export default function Belediye() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("dark");

  const [form, setForm] = useState({
    adSoyad: "",
    voen: "",
    unvan: "",
    odeyiciKodu: "",
    mebleg: "",
    kartNomresi: "",
    ayIl: "",
    cvv: "",
  });

  const [qrUrl, setQrUrl] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCardNumber = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 16);
    value = value.replace(/(.{4})/g, "$1 ").trim();
    setForm({ ...form, kartNomresi: value });
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length >= 3) {
      value = value.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    }

    if (value.length > 5) value = value.slice(0, 5);

    if (value.length >= 2) {
      let ay = parseInt(value.slice(0, 2));
      if (ay > 12) ay = 12;
      if (ay < 1) ay = "01";
      value = ay.toString().padStart(2, "0") + value.slice(2);
    }

    setForm({ ...form, ayIl: value });
  };

  const handleCVV = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 3);
    setForm({ ...form, cvv: value });
  };

  const resetForm = () => {
    setForm({
      adSoyad: "",
      voen: "",
      unvan: "",
      odeyiciKodu: "",
      mebleg: "",
      kartNomresi: "",
      ayIl: "",
      cvv: "",
    });
    setQrUrl("");
  };

  const generatePdf = async () => {
    const text = `
Ad Soyad: ${form.adSoyad}
VÖEN: ${form.voen}
Ünvan: ${form.unvan}
Ödəyici Kodu: ${form.odeyiciKodu}
Məbləğ: ${form.mebleg} ₼
Kart: ${form.kartNomresi}
Tarix: ${form.ayIl}
        `;

    const qr = await QRCode.toDataURL(text);
    setQrUrl(qr);

    const pdf = new jsPDF();
    pdf.text("ONLAYN ÖDƏNIŞ QƏBZI", 65, 10);
    pdf.text(`Ad Soyad: ${form.adSoyad}`, 10, 30);
    pdf.text(`VÖEN: ${form.voen}`, 10, 40);
    pdf.text(`Ünvan: ${form.unvan}`, 10, 50);
    pdf.text(`Ödəyici Kodu: ${form.odeyiciKodu}`, 10, 60);
    pdf.text(`Məbləğ: ${form.mebleg} ₼`, 10, 70);
    pdf.text(`Kart Nömrəsi: ${form.kartNomresi}`, 10, 90);
    pdf.text(`Bitmə Tarixi: ${form.ayIl}`, 10, 100);
    pdf.addImage(qr, "PNG", 140, 20, 50, 50);
    pdf.save("online_odenis_qebzi.pdf");
  };

  return (
    <>
   
      <header
        className={`${theme === "dark" ? "bg-slate-900" : "bg-white"} shadow-lg sticky top-0 z-50 ${
          theme === "dark"
            ? "border-b border-slate-800"
            : "border-b border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-transparent"
            >
              <ArrowLeft
                size={26}
                className={theme === "dark" ? "text-white" : "text-black"}
              />
            </button>

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
        className={`min-h-screen ${
          theme === "dark" ? "bg-slate-950" : "bg-gray-100"
        } flex justify-center p-6`}
      >
  
        <div
          className={`max-w-xl w-full mt-8 p-10 rounded-xl shadow-lg ${
            theme === "dark" ? "bg-slate-900 text-white" : "bg-white"
          }`}
        >
          <h1 className="text-2xl font-bold mb-6">Onlayn Ödəniş Formu</h1>

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

            <input
              type="number"
              name="mebleg"
              placeholder="Məbləğ (₼)"
              value={form.mebleg}
              onChange={handleChange}
              className="border p-3 rounded text-black"
            />

            <input
              type="text"
              name="kartNomresi"
              placeholder="Kart Nömrəsi (0000 0000 0000 0000)"
              value={form.kartNomresi}
              onChange={handleCardNumber}
              className="border p-3 rounded text-black"
              maxLength={19}
            />

            <div className="flex gap-4">
              <input
                type="text"
                name="ayIl"
                placeholder="Ay/İl (MM/YY)"
                value={form.ayIl}
                onChange={handleExpiryChange}
                className="border p-3 rounded w-1/2 text-black"
                maxLength={5}
              />

              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={form.cvv}
                onChange={handleCVV}
                className="border p-3 rounded w-1/2 text-black"
                maxLength={3}
              />
            </div>

            <button
              onClick={generatePdf}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
            >
              Ödənişi Tamamla & Qəbz Yarat
            </button>

            <button
              onClick={resetForm}
              className="bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg transition"
            >
              Sıfırla
            </button>
          </div>

          {qrUrl && (
            <div className="mt-6 text-center">
              <h2 className="font-semibold">QR Kod:</h2>
              <img src={qrUrl} alt="QR Kod" className="w-40 mx-auto mt-3" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
