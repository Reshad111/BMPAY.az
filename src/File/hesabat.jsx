"use client";

import { Link } from "react-router-dom";
import { Sun, Moon, DownloadCloud } from "lucide-react";
import { useState, useMemo } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// FAKE DATA
const generateFakeReports = () => [
  {
    id: 1,
    name: "Əmlak Vergiləri",
    email: "emlak@belediye.az",
    date: "Dekabr 31, 2024",
    status: "Ödənildi",
    items: 12,
    gross: 15420.5,
    discount: 0,
    tax: 1540.2,
    netTax: 16960.7,
  },
  {
    id: 2,
    name: "Şəxsi Gəlir Vergiləri",
    email: "gelir@belediye.az",
    date: "Dekabr 30, 2024",
    status: "Gözləyir",
    items: 8,
    gross: 8750.25,
    discount: 250.0,
    tax: 875.0,
    netTax: 9375.25,
  },
  {
    id: 3,
    name: "Korporativ Vergilər",
    email: "corp@belediye.az",
    date: "Dekabr 29, 2024",
    status: "Ödənildi",
    items: 5,
    gross: 22500.0,
    discount: 1000.0,
    tax: 2250.0,
    netTax: 24050.0,
  },
  {
    id: 4,
    name: "Sosial Sığorta",
    email: "sigurta@belediye.az",
    date: "Dekabr 28, 2024",
    status: "Ödənildi",
    items: 15,
    gross: 12300.75,
    discount: 0,
    tax: 1230.08,
    netTax: 13605.83,
  },
  {
    id: 5,
    name: "Sağlamlıq Vergisi",
    email: "saglamlik@belediye.az",
    date: "Dekabr 27, 2024",
    status: "Gözləyir",
    items: 6,
    gross: 5600.0,
    discount: 0,
    tax: 560.0,
    netTax: 6160.0,
  },
];

// FORMATTER
const fmt = (v) =>
  Number(v || 0).toLocaleString("az-AZ", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function AccountingReportApp() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [reports] = useState(generateFakeReports());

  // -------------------------
  // AY & İL FİLTRİ
  // -------------------------
  const [ayFilter, setAyFilter] = useState("");
  const [ilFilter, setIlFilter] = useState("");

  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      const ay = r.date.split(" ")[0];
      const il = r.date.split(" ")[2];

      return (
        (ayFilter ? ay === ayFilter : true) &&
        (ilFilter ? il === ilFilter : true)
      );
    });
  }, [reports, ayFilter, ilFilter]);

  // SUMMARY
  const summary = useMemo(() => {
    const totalGross = filteredReports.reduce((sum, r) => sum + r.gross, 0);
    const totalTax = filteredReports.reduce((sum, r) => sum + r.tax, 0);
    const totalNet = filteredReports.reduce((sum, r) => sum + r.netTax, 0);
    const taxPercent = totalGross > 0 ? ((totalTax / totalGross) * 100).toFixed(2) : 0;

    return { totalGross, totalTax, totalNet, taxPercent };
  }, [filteredReports]);

  // PDF EXPORT
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Bələdiyyə Vergi Hesabatı — 2024", 14, 20);

    const rows = filteredReports.map((r) => [
      r.id,
      r.name,
      r.email,
      r.date,
      r.status,
      r.items,
      fmt(r.gross),
      fmt(r.discount),
      fmt(r.tax),
      fmt(r.netTax),
    ]);

    doc.autoTable({
      head: [["ID", "Ad", "Email", "Tarix", "Status", "Əşyalar", "Ümumi", "Endirim", "Vergi", "Xalis Vergi"]],
      body: rows,
      startY: 30,
      theme: "grid",
    });

    doc.text(`Cəmi: ${fmt(summary.totalGross)} ₼`, 14, doc.lastAutoTable.finalY + 10);
    doc.save("vergi-hesabati-2024.pdf");
  };

  
  const exportExcel = () => {
    const rows = filteredReports.map((r) => ({
      ID: r.id,
      Ad: r.name,
      Email: r.email,
      Tarix: r.date,
      Status: r.status,
      Əşyalar: r.items,
      Ümumi: r.gross,
      Endirim: r.discount,
      Vergi: r.tax,
      XalisVergi: r.netTax,
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Hesabatlar");

    const wbout = XLSX.write(wb, { type: "array", bookType: "xlsx" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "vergi-hesabati-2024.xlsx");
  };

  return (
    <div className={`${isDarkMode ? "bg-slate-900" : "bg-gray-50"} min-h-screen`}>

 
      <header className={`${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"} shadow-lg sticky top-0 z-50 border-b`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img src="/bm.jpeg" alt="Logo" className="w-18 h-20 object-cover rounded" />
            <h1 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>
           BMPAY
            </h1>
          </div>

          <nav className={`hidden md:flex gap-6 font-medium ${isDarkMode ? "text-slate-400" : "text-gray-700"}`}>
            <Link to="/belediye-portal" className={`${isDarkMode ? "hover:text-cyan-400" : "hover:text-blue-600"} transition`}>
              Əsas Səhifə
            </Link>
            <Link to="/vergi" className={`${isDarkMode ? "hover:text-cyan-400" : "hover:text-blue-600"} transition`}>
              Vergi
            </Link>
            <Link to="/hesabat" className={`${isDarkMode ? "hover:text-cyan-400" : "hover:text-blue-600"} transition`}>
              Hesabatlar
            </Link>
            <Link to="/belediye" className={`${isDarkMode ? "hover:text-cyan-400" : "hover:text-blue-600"} transition`}>
              Bələdiyyələr
            </Link>
            <Link to="/odenis" className={`${isDarkMode ? "hover:text-cyan-400" : "hover:text-blue-600"} transition`}>
              Ödəniş
            </Link>
          </nav>

          <div className="flex gap-3 items-center">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition ${isDarkMode ? "bg-slate-800 text-yellow-400 hover:bg-slate-700" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition shadow-md">
              Çıxış
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">

      
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${isDarkMode ? "text-slate-100" : "text-gray-900"}`}>
            Vergi Hesabatı
          </h1>
          <p className={`text-sm mt-2 ${isDarkMode ? "text-slate-400" : "text-gray-600"}`}>
            Bələdiyyə vergi sisteminin cəlb göstəriciləri
          </p>
        </div>

     
        <div className="flex gap-4 mb-6">

       <select
  value={ilFilter}
  onChange={(e) => setIlFilter(e.target.value)}
  className="px-4 py-2 rounded-lg border bg-white text-black"
>
  <option value="">Bütün illər</option>

  {Array.from({ length: 31 }, (_, i) => 2000 + i).map((year) => (
    <option key={year} value={year}>
      {year}
    </option>
  ))}
</select>


     
          <select
            value={ayFilter}
            onChange={(e) => setAyFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border bg-white text-black"
          >
            <option value="">Bütün aylar</option>
            <option value="Yanvar">Yanvar</option>
            <option value="Fevral">Fevral</option>
            <option value="Mart">Mart</option>
            <option value="Aprel">Aprel</option>
            <option value="May">May</option>
            <option value="İyun">İyun</option>
            <option value="İyul">İyul</option>
            <option value="Avqust">Avqust</option>
            <option value="Sentyabr">Sentyabr</option>
            <option value="Oktyabr">Oktyabr</option>
            <option value="Noyabr">Noyabr</option>
            <option value="Dekabr">Dekabr</option>
          </select>
          

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className={`p-6 rounded-lg border ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>Ümumi Məbləğ</p>
                <p className={`text-2xl font-bold mt-2 ${isDarkMode ? "text-slate-100" : "text-gray-900"}`}>
                  ₼{fmt(summary.totalGross)}
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xl font-bold opacity-90">
                %
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-lg border ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>Cəmi Vergi</p>
                <p className={`text-2xl font-bold mt-2 ${isDarkMode ? "text-slate-100" : "text-gray-900"}`}>
                  ₼{fmt(summary.totalTax)}
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center text-white text-xl font-bold opacity-90">
                %
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-lg border ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>Xalis Məbləğ</p>
                <p className={`text-2xl font-bold mt-2 ${isDarkMode ? "text-slate-100" : "text-gray-900"}`}>
                  ₼{fmt(summary.totalNet)}
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white text-xl font-bold opacity-90">
                %
              </div>
            </div>
          </div>
        </div>

     
        <div className="flex gap-3 mb-6">
          <button
            onClick={exportExcel}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
          >
            <DownloadCloud size={18} />
            Excel Yüklə
          </button>
          <button
            onClick={exportPDF}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
          >
            <DownloadCloud size={18} />
            PDF Yüklə
          </button>
        </div>


        <div className={`rounded-lg border overflow-hidden ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  className={
                    isDarkMode
                      ? "bg-slate-700 border-b border-slate-600"
                      : "bg-gray-100 border-b border-gray-200"
                  }
                >
                  <th className={`px-6 py-3 text-left text-sm font-semibold ${isDarkMode ? "text-slate-200" : "text-gray-700"}`}>ID</th>
                  <th className={`px-6 py-3 text-left text-sm font-semibold ${isDarkMode ? "text-slate-200" : "text-gray-700"}`}>Hesabat Adı</th>
                  <th className={`px-6 py-3 text-left text-sm font-semibold ${isDarkMode ? "text-slate-200" : "text-gray-700"}`}>Email</th>
                  <th className={`px-6 py-3 text-left text-sm font-semibold ${isDarkMode ? "text-slate-200" : "text-gray-700"}`}>Tarix</th>
                  <th className={`px-6 py-3 text-left text-sm font-semibold ${isDarkMode ? "text-slate-200" : "text-gray-700"}`}>Status</th>
                  <th className={`px-6 py-3 text-center text-sm font-semibold ${isDarkMode ? "text-slate-200" : "text-gray-700"}`}>Əşyalar</th>
                  <th className={`px-6 py-3 text-right text-sm font-semibold ${isDarkMode ? "text-slate-200" : "text-gray-700"}`}>Ümumi</th>
                  <th className={`px-6 py-3 text-right text-sm font-semibold ${isDarkMode ? "text-slate-200" : "text-gray-700"}`}>Endirim</th>
                  <th className={`px-6 py-3 text-right text-sm font-semibold ${isDarkMode ? "text-slate-200" : "text-gray-700"}`}>Vergi</th>
                  <th className={`px-6 py-3 text-right text-sm font-semibold ${isDarkMode ? "text-slate-200" : "text-gray-700"}`}>Xalis</th>
                </tr>
              </thead>

              <tbody>
                {filteredReports.map((report, idx) => (
                  <tr
                    key={report.id}
                    className={`border-b transition ${
                      isDarkMode
                        ? `${idx % 2 === 0 ? "bg-slate-800" : "bg-slate-750"} border-slate-700 hover:bg-slate-600`
                        : `${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} border-gray-200 hover:bg-gray-100`
                    }`}
                  >
                    <td className={`px-6 py-4 text-sm font-medium ${isDarkMode ? "text-slate-300" : "text-gray-900"}`}>{report.id}</td>
                    <td className={`px-6 py-4 text-sm ${isDarkMode ? "text-slate-300" : "text-gray-700"}`}>{report.name}</td>
                    <td className={`px-6 py-4 text-sm ${isDarkMode ? "text-slate-400" : "text-gray-600"}`}>{report.email}</td>
                    <td className={`px-6 py-4 text-sm ${isDarkMode ? "text-slate-400" : "text-gray-600"}`}>{report.date}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          report.status === "Ödənildi"
                            ? isDarkMode
                              ? "bg-green-900 text-green-300"
                              : "bg-green-100 text-green-700"
                            : isDarkMode
                            ? "bg-amber-900 text-amber-300"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-sm text-center ${isDarkMode ? "text-slate-300" : "text-gray-900"}`}>{report.items}</td>
                    <td className={`px-6 py-4 text-sm text-right font-medium ${isDarkMode ? "text-slate-300" : "text-gray-900"}`}>₼{fmt(report.gross)}</td>
                    <td className={`px-6 py-4 text-sm text-right ${isDarkMode ? "text-slate-400" : "text-gray-600"}`}>₼{fmt(report.discount)}</td>
                    <td className={`px-6 py-4 text-sm text-right font-medium ${isDarkMode ? "text-slate-300" : "text-gray-900"}`}>₼{fmt(report.tax)}</td>
                    <td className={`px-6 py-4 text-sm text-right font-medium ${isDarkMode ? "text-cyan-400" : "text-blue-600"}`}>₼{fmt(report.netTax)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        
        <div className={`mt-6 p-4 rounded-lg border ${isDarkMode ? "bg-slate-800 border-slate-700 text-slate-300" : "bg-gray-100 border-gray-200 text-gray-700"}`}>
          <p className="text-sm">
            <span className="font-semibold">Cəmi Ümumi Məbləğ:</span> ₼{fmt(summary.totalGross)} —{" "}
            <span className="font-semibold">Cəmi Vergi:</span> ₼{fmt(summary.totalTax)} ({summary.taxPercent}%) —{" "}
            <span className="font-semibold">Cəmi Xalis:</span> ₼{fmt(summary.totalNet)}
          </p>
        </div>

      </main>
    </div>
  );
}
