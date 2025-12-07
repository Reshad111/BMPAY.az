"use client"
import { useState, useEffect, useRef } from "react"
import { BarChart3, Settings, Users, FileText, DollarSign, TrendingUp, LogOut, User, Moon, Sun } from "lucide-react"
import { Link, NavLink } from "react-router-dom";




export default function BelediyyePortal() {
  const [isDarkMode, setIsDarkMode] = useState(true)

 
  const [yasayis, setYasayis] = useState("")
  const [qeyri, setQeyri] = useState("")
  const [tarix, setTarix] = useState("")
  const [ytm, setYtm] = useState("")
  const [qtm, setQtm] = useState("")
  const [netice, setNetice] = useState(null)

  
  const [activeTab, setActiveTab] = useState("calculator")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")
  const [loginEmail, setLoginEmail] = useState("")
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showProfile, setShowProfile] = useState(false)


  const UPLOADED_FILE_PATH = "/mnt/data/4af106cc-c6fe-484e-83ec-a2de209f431f.png"
  const [profileImage, setProfileImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const fileInputRef = useRef(null)

 
  const hesabla = () => {
    const umumiVergi = Number(yasayis) * Number(ytm) + Number(qeyri) * Number(qtm)
    setNetice(umumiVergi)
  }

  const sifirla = () => {
    setYasayis("")
    setQeyri("")
    setTarix("")
    setYtm("")
    setQtm("")
    setNetice(null)
  }

  const handleLogin = () => {
    if (loginEmail && userName) {
      setIsLoggedIn(true)
      setShowUserMenu(false)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserName("")
    setLoginEmail("")
    setShowProfile(false)
    window.location.href = "/login"
  }


  const handleProfileImageUpload = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    if (previewImage && previewImage.startsWith("blob:")) {
      try {
        URL.revokeObjectURL(previewImage)
      } catch (err) { }
    }
    setPreviewImage(url)
  }

  const handleSaveProfileImage = () => {
    if (previewImage) {
      if (profileImage && profileImage.startsWith("blob:")) {
        try {
          URL.revokeObjectURL(profileImage)
        } catch (err) { }
      }
      setProfileImage(previewImage)
      setPreviewImage(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleRemoveProfileImage = () => {
    if (profileImage && profileImage.startsWith("blob:")) {
      try {
        URL.revokeObjectURL(profileImage)
      } catch (err) { }
    }
    setProfileImage(null)
    setPreviewImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  useEffect(() => {
    return () => {
      if (previewImage && previewImage.startsWith("blob:")) {
        try {
          URL.revokeObjectURL(previewImage)
        } catch (err) { }
      }
      if (profileImage && profileImage.startsWith("blob:")) {
        try {
          URL.revokeObjectURL(profileImage)
        } catch (err) { }
      }
    }
  }, [])

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? "bg-slate-950 text-white" : "bg-white text-slate-950"}`}>
      
      <header
        className={`border-b sticky top-0 z-50 ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-slate-200"
          }`}
      >
        <div className="container max-w-8xl mx-auto p-4">
          <div className="max-w-full mx-auto flex items-center justify-between px-6 py-4">
       
          <div className="flex items-center gap-3">
            <img src="/bm.jpeg" alt="Logo" className="w-18 h-20 rounded object-cover" />
            <h1 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-slate-950"}`}>
             BMPAY
            </h1>
          </div>
         <nav className="hidden md:flex gap-6 font-medium">
  <NavLink
    to="/belediye-portal"
    className={({ isActive }) =>
      isActive ? "text-amber-600 font-semibold" : "text-slate-600 hover:text-amber-600 transition"
    }
  >
    Əsas Səhifə
  </NavLink>

  <NavLink
    to="/vergi"
    className={({ isActive }) =>
      isActive ? "text-amber-600 font-semibold" : "text-slate-600 hover:text-amber-600 transition"
    }
  >
    Vergi
  </NavLink>

  <NavLink
    to="/hesabat"
    className={({ isActive }) =>
      isActive ? "text-amber-600 font-semibold" : "text-slate-600 hover:text-amber-600 transition"
    }
  >
    Hesabatlar
  </NavLink>

  <NavLink
    to="/belediye"
    className={({ isActive }) =>
      isActive ? "text-amber-600 font-semibold" : "text-slate-600 hover:text-amber-600 transition"
    }
  >
    Bələdiyyələr
  </NavLink>

  <NavLink
    to="/odenis"
    className={({ isActive }) =>
      isActive ? "text-amber-600 font-semibold" : "text-slate-600 hover:text-amber-600 transition"
    }
  >
    Ödəniş
  </NavLink>
</nav>

      
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition ${isDarkMode
                  ? "bg-slate-800 hover:bg-slate-700 text-yellow-400"
                  : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                }`}
              title={isDarkMode ? "Gündüz Modu" : "Gecə Modu"}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    setShowProfile(true)
                    setActiveTab("profile")
                  }}
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition"
                  title="Profil"
                >
                  <User className="w-5 h-5 text-white" />
                </button>

                <button
                  onClick={handleLogout}
                  className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition"
                  title="Çıxış"
                >
                  <LogOut className="w-4 h-4 text-white" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowUserMenu(true)}
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition"
                title="Giriş"
              >
                <User className="w-5 h-5 text-white" />
              </button>
            )}
          </div>
        </div>
        </div>
      </header>

    
      {showUserMenu && !isLoggedIn && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className={`p-6 rounded-lg w-96 border ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
              }`}
          >
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-slate-950"}`}>Giriş</h2>

            <input
              type="text"
              placeholder="Ad Soyad"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className={`w-full mb-3 p-3 border rounded ${isDarkMode
                  ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  : "bg-slate-100 border-slate-300 text-slate-950 placeholder-slate-500"
                }`}
            />

            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className={`w-full mb-3 p-3 border rounded ${isDarkMode
                  ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  : "bg-slate-100 border-slate-300 text-slate-950 placeholder-slate-500"
                }`}
            />

            <div className="flex gap-2">
              <button
                onClick={handleLogin}
                className="flex-1 py-3 bg-blue-600 rounded hover:bg-blue-700 transition text-white"
              >
                Daxil Ol
              </button>

              <button
                onClick={() => setShowUserMenu(false)}
                className={`flex-1 py-3 rounded transition ${isDarkMode
                    ? "bg-slate-600 hover:bg-slate-500 text-white"
                    : "bg-slate-300 hover:bg-slate-400 text-slate-950"
                  }`}
              >
                Bağla
              </button>
            </div>
          </div>
        </div>
      )}

      
      <div className="flex flex-1">
     
        <div className="flex-1 p-6">
      
          {showProfile && isLoggedIn ? (
            <div className="max-w-2xl">
              <button
                onClick={() => setShowProfile(false)}
                className="mb-6 flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
              >
                ← Geri
              </button>

              <div
                className={`rounded-lg p-8 border ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"
                  }`}
              >
               
                <div className="flex items-center gap-4 mb-8">
                 
                  <div className="relative w-24 h-24">
                   
                    <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden border-2 border-blue-500">
                      {profileImage ? (
                        <img
                          src={profileImage || "/placeholder.svg"}
                          alt="Profil"
                          className="w-full h-full object-cover"
                        />
                      ) : previewImage ? (
                        <img
                          src={previewImage || "/placeholder.svg"}
                          alt="Profil preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-12 h-12 text-white" />
                      )}
                    </div>

                 
                    <label
                      htmlFor="profileUpload"
                      className="absolute bottom-0 right-0 w-7 h-7 bg-white hover:bg-blue-700 rounded-full flex items-center justify-center cursor-pointer transition shadow-lg"
                    >
                      <span className="text-black text-2xl leading-none">+</span>
                    </label>

             
                    <input
                      id="profileUpload"
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageUpload}
                      className="hidden"
                    />
                  </div>

                 
                  <div>
                    <h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-slate-950"}`}>
                      {userName || "İstifadəçi"}
                    </h1>
                    <p className={isDarkMode ? "text-slate-400" : "text-slate-600"}>
                      {loginEmail || "example@mail.com"}
                    </p>
                  </div>
                </div>

                
                {previewImage && (
                  <div className="flex items-center gap-3 mb-6">
                    <button
                      onClick={handleSaveProfileImage}
                      className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition font-medium text-white"
                    >
                      Şəkli yadda saxla
                    </button>

                    <button
                      onClick={() => {
                        if (previewImage && previewImage.startsWith("blob:")) {
                          try {
                            URL.revokeObjectURL(previewImage)
                          } catch { }
                        }
                        setPreviewImage(null)
                        if (fileInputRef.current) fileInputRef.current.value = ""
                      }}
                      className={`px-4 py-2 rounded transition ${isDarkMode
                          ? "bg-slate-600 hover:bg-slate-500 text-white"
                          : "bg-slate-300 hover:bg-slate-400 text-slate-950"
                        }`}
                    >
                      Ləğv et
                    </button>
                  </div>
                )}

               
                {profileImage && (
                  <div className="mb-6">
                    <button
                      onClick={handleRemoveProfileImage}
                      className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition text-white"
                    >
                      Profil şəklini sil
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    className={`p-6 rounded-lg border ${isDarkMode ? "bg-slate-700/50 border-slate-600" : "bg-slate-50 border-slate-300"
                      }`}
                  >
                    <p className={`text-sm mb-2 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                      Profil Məlumatları
                    </p>
                    <div className="space-y-3">
                      <div>
                        <label className={`text-xs uppercase ${isDarkMode ? "text-slate-500" : "text-slate-500"}`}>
                          Ad Soyad
                        </label>
                        <p className={`font-medium ${isDarkMode ? "text-white" : "text-slate-950"}`}>
                          {userName || "-"}
                        </p>
                      </div>

                      <div>
                        <label className={`text-xs uppercase ${isDarkMode ? "text-slate-500" : "text-slate-500"}`}>
                          Email
                        </label>
                        <p className={`font-medium ${isDarkMode ? "text-white" : "text-slate-950"}`}>
                          {loginEmail || "-"}
                        </p>
                      </div>

                      <div>
                        <label className={`text-xs uppercase ${isDarkMode ? "text-slate-500" : "text-slate-500"}`}>
                          Qeydiyyat Tarixi
                        </label>
                        <p className={`font-medium ${isDarkMode ? "text-white" : "text-slate-950"}`}>22 Noyabr 2025</p>
                      </div>

                      <div>
                        <label className={`text-xs uppercase ${isDarkMode ? "text-slate-500" : "text-slate-500"}`}>
                          Status
                        </label>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Fəal</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-6 rounded-lg border ${isDarkMode ? "bg-slate-700/50 border-slate-600" : "bg-slate-50 border-slate-300"
                      }`}
                  >
                    <p className={`text-sm mb-4 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                      Fəaliyyət Xülasəsi
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={isDarkMode ? "text-slate-400" : "text-slate-600"}>Hesablamalar</span>
                        <span className={`font-bold ${isDarkMode ? "text-white" : "text-slate-950"}`}>24</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className={isDarkMode ? "text-slate-400" : "text-slate-600"}>Ödənişlər</span>
                        <span className={`font-bold ${isDarkMode ? "text-white" : "text-slate-950"}`}>12</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className={isDarkMode ? "text-slate-400" : "text-slate-600"}>Vergi Məbləği</span>
                        <span className={`font-bold ${isDarkMode ? "text-white" : "text-slate-950"}`}>42,500 ₼</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`mt-6 p-6 rounded-lg border ${isDarkMode ? "bg-slate-700/50 border-slate-600" : "bg-slate-50 border-slate-300"
                    }`}
                >
                  <p className={`text-sm mb-4 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Güvənlik</p>

                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium mb-2">
                    Şifrəni Dəyiş
                  </button>

                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium">
                    İki Faktorlu Təsdiq
                  </button>
                </div>
              </div>
            </div>
          ) : (
         
            <>
             
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div
                  className={`rounded-lg p-6 border ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Ümumi Vergi</p>
                      <p className="text-3xl font-bold text-blue-400 mt-2">42,500</p>
                      <p className={`text-xs mt-2 ${isDarkMode ? "text-slate-500" : "text-slate-600"}`}>
                        +18.2% keçən həftəyə
                      </p>
                    </div>
                    <DollarSign className="w-12 h-12 text-blue-500 opacity-20" />
                  </div>
                </div>

                <div
                  className={`rounded-lg p-6 border ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Ödəniş</p>
                      <p className="text-3xl font-bold text-orange-400 mt-2">18,300</p>
                      <p className={`text-xs mt-2 ${isDarkMode ? "text-slate-500" : "text-slate-600"}`}>
                        -8.7% keçən həftəyə
                      </p>
                    </div>
                    <TrendingUp className="w-12 h-12 text-orange-500 opacity-20" />
                  </div>
                </div>

                <div
                  className={`rounded-lg p-6 border ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Müştərilər</p>
                      <p className="text-3xl font-bold text-pink-400 mt-2">1,245</p>
                      <p className={`text-xs mt-2 ${isDarkMode ? "text-slate-500" : "text-slate-600"}`}>
                        +4.3% keçən həftəyə
                      </p>
                    </div>
                    <Users className="w-12 h-12 text-pink-500 opacity-20" />
                  </div>
                </div>

                <div
                  className={`rounded-lg p-6 border ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Gözləyən</p>
                      <p className="text-3xl font-bold text-cyan-400 mt-2">127</p>
                      <p className={`text-xs mt-2 ${isDarkMode ? "text-slate-500" : "text-slate-600"}`}>
                        -2.5% keçən həftəyə
                      </p>
                    </div>
                    <FileText className="w-12 h-12 text-cyan-500 opacity-20" />
                  </div>
                </div>
              </div>

              <div
                className={`rounded-lg p-8 border max-w-2xl ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"
                  }`}
              >
                <div className="flex items-center gap-2 mb-6">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-950"}`}>
                    Vergi Hesablama
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm mb-2 ${isDarkMode ? "text-white" : "text-slate-950"}`}>
                      Yaşayış məntəqəsi (1 m²)
                    </label>
                    <input
                      type="number"
                      value={yasayis}
                      onChange={(e) => setYasayis(e.target.value)}
                      className={`w-full p-3 border rounded ${isDarkMode
                          ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                          : "bg-white border-slate-300 text-slate-950 placeholder-slate-500"
                        }`}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm mb-2 ${isDarkMode ? "text-white" : "text-slate-950"}`}>
                      Qeyri-yaşayış (m³)
                    </label>
                    <input
                      type="number"
                      value={qeyri}
                      onChange={(e) => setQeyri(e.target.value)}
                      className={`w-full p-3 border rounded ${isDarkMode
                          ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                          : "bg-white border-slate-300 text-slate-950 placeholder-slate-500"
                        }`}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm mb-2 ${isDarkMode ? "text-white" : "text-slate-950"}`}>
                      Y/T/M Sayı
                    </label>
                    <input
                      type="number"
                      value={ytm}
                      onChange={(e) => setYtm(e.target.value)}
                      className={`w-full p-3 border rounded ${isDarkMode
                          ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                          : "bg-white border-slate-300 text-slate-950 placeholder-slate-500"
                        }`}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm mb-2 ${isDarkMode ? "text-white" : "text-slate-950"}`}>
                      Q/T/M Sayı
                    </label>
                    <input
                      type="number"
                      value={qtm}
                      onChange={(e) => setQtm(e.target.value)}
                      className={`w-full p-3 border rounded ${isDarkMode
                          ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                          : "bg-white border-slate-300 text-slate-950 placeholder-slate-500"
                        }`}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm mb-2 ${isDarkMode ? "text-white" : "text-slate-950"}`}>
                      Tarix
                    </label>
                    <input
                      type="date"
                      value={tarix}
                      onChange={(e) => setTarix(e.target.value)}
                      className={`w-full p-3 border rounded ${isDarkMode
                          ? "bg-slate-700 border-slate-600 text-white"
                          : "bg-white border-slate-300 text-slate-950"
                        }`}
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={hesabla} className="flex-1 bg-blue-600 py-3 rounded hover:bg-blue-700 text-white">
                    Hesabla
                  </button>

                  <button
                    onClick={sifirla}
                    className={`flex-1 py-3 rounded transition ${isDarkMode
                        ? "bg-slate-700 hover:bg-slate-600 text-white"
                        : "bg-slate-300 hover:bg-slate-400 text-slate-950"
                      }`}
                  >
                    Sıfırla
                  </button>
                </div>

                {netice !== null && (
                  <div className="mt-6 p-4 bg-blue-600/20 border border-blue-500/30 rounded text-center">
                    <p className={`text-sm ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>Ümumi vergi məbləği</p>
                    <p className="text-3xl font-bold text-blue-400 mt-2">{netice} ₼</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div
          className={`w-96 border-l p-6 ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-slate-200"
            }`}
        >
          {isLoggedIn && (
            <div
              className={`rounded-lg p-4 border mb-6 flex items-center justify-between ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-300"
                }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-slate-950"}`}>{userName}</p>
                  <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>{loginEmail}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className={`p-1 rounded transition ${isDarkMode ? "hover:bg-slate-700" : "hover:bg-slate-200"}`}
              >
                <LogOut className="w-4 h-4 text-red-400" />
              </button>
            </div>
          )}

          <div className="flex items-center gap-2 mb-8">
            <Settings className="w-5 h-5 text-blue-400" />
            <h3 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-slate-950"}`}>Admin Panel</h3>
          </div>

          <div className="space-y-2 mb-8">
            {isLoggedIn && (
              <button
                onClick={() => {
                  setShowProfile(true)
                  setActiveTab("profile")
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${activeTab === "profile"
                    ? "bg-blue-600 text-white"
                    : isDarkMode
                      ? "text-white hover:bg-slate-800"
                      : "text-black hover:bg-slate-200"
                  }`}
              >
                <User className="w-4 h-4" /> Profil
              </button>
            )}

            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${activeTab === "users"
                  ? "bg-blue-600 text-white"
                  : isDarkMode
                    ? "text-white hover:bg-slate-800"
                    : "text-black hover:bg-slate-200"
                }`}
            >
              <Users className="w-4 h-4" /> İstifadəçilər
            </button>

            <button
              onClick={() => setActiveTab("reports")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${activeTab === "reports"
                  ? "bg-blue-600 text-white"
                  : isDarkMode
                    ? "text-white hover:bg-slate-800"
                    : "text-black hover:bg-slate-200"
                }`}
            >
              <BarChart3 className="w-4 h-4" /> Hesabatlar
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${activeTab === "settings"
                  ? "bg-blue-600 text-white"
                  : isDarkMode
                    ? "text-white hover:bg-slate-800"
                    : "text-black hover:bg-slate-200"
                }`}
            >
              <Settings className="w-4 h-4" /> Tənzimləmələr
            </button>
          </div>

          <div
            className={`rounded-lg  border ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-300"
              }`}
          >
            {activeTab === "users" && (
              <div>
                <h4 className={`font-semibold mb-4 ${isDarkMode ? "text-white" : "text-slate-950"}`}>
                  Fəal İstifadəçilər
                </h4>
                <div className="space-y-3">
                  <div
                    className={`flex items-center justify-between p-3 rounded ${isDarkMode ? "bg-slate-700/50" : "bg-slate-100"
                      }`}
                  >
                    <span className={isDarkMode ? "text-white" : "text-slate-950"}>Ahmet Səbziyev</span>
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Fəal</span>
                  </div>
                  <div
                    className={`flex items-center justify-between p-3 rounded ${isDarkMode ? "bg-slate-700/50" : "bg-slate-100"
                      }`}
                  >
                    <span className={isDarkMode ? "text-white" : "text-slate-950"}>Aynur Qasımova</span>
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Fəal</span>
                  </div>
                  <div
                    className={`flex items-center justify-between p-3 rounded ${isDarkMode ? "bg-slate-700/50" : "bg-slate-100"
                      }`}
                  >
                    <span className={isDarkMode ? "text-white" : "text-slate-950"}>Rauf Hüseynov</span>
                    <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded">Qeyri-fəal</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reports" && (
              <div>
                <h4 className={`font-semibold mb-4 ${isDarkMode ? "text-white" : "text-slate-950"}`}>Son Hesabatlar</h4>
                <div className="space-y-3">
                  <div className={`p-3 rounded ${isDarkMode ? "bg-slate-700/50" : "bg-slate-100"}`}>
                    <p className={isDarkMode ? "text-white" : "text-slate-950"}>Aylıq Vergi</p>
                    <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>22 Noyabr 2025</p>
                  </div>
                  <div className={`p-3 rounded ${isDarkMode ? "bg-slate-700/50" : "bg-slate-100"}`}>
                    <p className={isDarkMode ? "text-white" : "text-slate-950"}>İstifadəçi Aktivliyi</p>
                    <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>21 Noyabr 2025</p>
                  </div>
                  <div className={`p-3 rounded ${isDarkMode ? "bg-slate-700/50" : "bg-slate-100"}`}>
                    <p className={isDarkMode ? "text-white" : "text-slate-950"}>Ödəniş Sayları</p>
                    <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>20 Noyabr 2025</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h4 className={`font-semibold mb-4 ${isDarkMode ? "text-white" : "text-slate-950"}`}>
                  Sistem Tənzimləmələri
                </h4>
                <div className="space-y-3">
                  <div
                    className={`flex items-center justify-between p-3 rounded ${isDarkMode ? "bg-slate-700/50" : "bg-slate-100"
                      }`}
                  >
                    <span className={isDarkMode ? "text-white" : "text-slate-950"}>Əməliyyatlar</span>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div
                    className={`flex items-center justify-between p-3 rounded ${isDarkMode ? "bg-slate-700/50" : "bg-slate-100"
                      }`}
                  >
                    <span className={isDarkMode ? "text-white" : "text-slate-950"}>SMS Xəbərdarlıqları</span>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div
                    className={`flex items-center justify-between p-3 rounded ${isDarkMode ? "bg-slate-700/50" : "bg-slate-100"
                      }`}
                  >
                    <span className={isDarkMode ? "text-white" : "text-slate-950"}>Email Xəbərdarlıqları</span>
                    <input type="checkbox" />
                  </div>
                </div>
              </div>
            )}
          </div>

         
          <div className="flex gap-2 mt-6">
            {isLoggedIn && (
              <button
                onClick={() => {
                  setShowProfile(true)
                  setActiveTab("profile")
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium"
              >
                <User className="w-4 h-4" /> Profil
              </button>
            )}

            <button
              onClick={handleLogout}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded transition font-medium ${isDarkMode
                  ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  : "bg-slate-300 text-slate-950 hover:bg-slate-400"
                }`}
            >
              <LogOut className="w-4 h-4" />
              <span>Çıxış</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
