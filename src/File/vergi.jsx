import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

export default function Vergi() {
  const navigate = useNavigate();

  
  const [isDarkMode, setIsDarkMode] = useState(true);


  const [userType, setUserType] = useState(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getCodeLength = () => {
    return userType === "worker" ? 4 : userType === "employer" ? 5 : 0;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!userType) {
      setError("Zəhmət olmasa istifadəçi tipini seçin");
      return;
    }

    const requiredLength = getCodeLength();
    if (code.length !== requiredLength) {
      setError(`${userType === "worker" ? "İşçi" : "Sahibkar"} kodu ${requiredLength} rəqəm olmalıdır`);
      return;
    }

    if (!/^\d+$/.test(code)) {
      setError("Kod yalnız rəqəmlərdən ibarət olmalıdır");
      return;
    }

    setSuccess(`${userType === "worker" ? "İşçi" : "Sahibkar"} kodu "${code}" ilə daxil oldunuz!`);
    setCode("");
  };

  const handleReset = () => {
    setUserType(null);
    setCode("");
    setError("");
    setSuccess("");
  };

  return (
    <div className={isDarkMode ? "bg-slate-900 min-h-screen" : "bg-slate-100 min-h-screen"}>

      <header className="w-full bg-[#0f172a] border-b border-slate-800 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        
          <div className="flex items-center gap-3">
            <img
              src="/bm.jpeg"
              alt="Logo"
              className="w-18 h-20 rounded-lg object-cover shadow-md"
            />

            <h1 className="text-xl font-semibold text-white">
              BMPAY
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-10 text-[16px] font-medium">
            <Link to="/belediye-portal" className="text-slate-300 hover:text-white transition">
              Əsas Səhifə
            </Link>
            <Link to="/vergi" className="text-slate-300 hover:text-white transition">
              Vergi
            </Link>
            <Link to="/hesabat" className="text-slate-300 hover:text-white transition">
              Hesabatlar
            </Link>
            <Link to="/belediye" className="text-slate-300 hover:text-white transition">
              Bələdiyyələr
            </Link>
            <Link to="/odenis" className="text-slate-300 hover:text-white transition">
              Ödəniş
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center transition"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-300" />
              )}
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
            >
              Çıxış
            </button>
          </div>

        </div>
      </header>


  
      <div className="max-w-md mx-auto p-8 mt-10 bg-white rounded-lg shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-6">Vergi Sistemi</h2>

        <div className="space-y-4 mb-8">
          <label className="font-semibold">İstifadəçi Tipi:</label>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setUserType("worker");
                setError("");
                setSuccess("");
              }}
              className={`flex-1 py-3 rounded-lg font-semibold transition ${
                userType === "worker" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
               İşçi
            </button>

            <button
              onClick={() => {
                setUserType("employer");
                setError("");
                setSuccess("");
              }}
              className={`flex-1 py-3 rounded-lg font-semibold transition ${
                userType === "employer" ? "bg-indigo-600 text-white" : "bg-gray-200"
              }`}
            >
               Sahibkar
            </button>
          </div>
        </div>

        {userType && (
          <form onSubmit={handleSearch} className="space-y-4">
            
            <div>
              <label className="font-semibold block mb-2">
                {userType === "worker" ? "İşçi Kodu" : "Sahibkar Kodu"}
              </label>

              <input
                type="text"
                value={code}
                placeholder={`${getCodeLength()} rəqəmli kod`}
                onChange={(e) => {
                  const input = e.target.value;
                  if (/^\d*$/.test(input) && input.length <= getCodeLength()) {
                    setCode(input);
                    setError("");
                  }
                }}
                className="w-full p-3 border rounded-lg text-center text-xl"
              />

              <p className="text-sm text-gray-500 mt-1 text-center">
                {code.length} / {getCodeLength()}
              </p>
            </div>

            {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}
            {success && <div className="p-3 bg-green-100 text-green-700 rounded-lg">{success}</div>}

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg"
                disabled={code.length !== getCodeLength()}
              >
                Axtarış Et
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="flex-1 py-3 bg-gray-300 rounded-lg"
              >
                Sıfırla
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
