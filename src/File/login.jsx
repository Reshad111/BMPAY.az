import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();


  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotStep, setForgotStep] = useState("email");
  const [resetEmail, setResetEmail] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [userVerificationCode, setUserVerificationCode] = useState("");
  const [verificationError, setVerificationError] = useState("");

  // REGISTER STATE
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhoneNumber, setRegPhoneNumber] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  // MODAL SYSTEM (SUCCESS + ERROR)
  const [modalMsg, setModalMsg] = useState("");
  const [modalType, setModalType] = useState("");

  const showModal = (msg, type = "error") => {
    setModalMsg(msg);
    setModalType(type);

    setTimeout(() => {
      setModalMsg("");
      setModalType("");
    }, 2500);
  };

  // SVG ICONS
  const EyeOpen = (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );

  const EyeClosed = (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.77 21.77 0 0 1 5.06-7.94"></path>
      <path d="M1 1l22 22"></path>
      <path d="M9.53 9.53a3.5 3.5 0 0 1 4.95 4.95"></path>
      <path d="M6.1 6.1A11.05 11.05 0 0 1 12 4c7 0 11 8 11 8a21.77 21.77 0 0 1-3.84 5.78"></path>
    </svg>
  );

  // LOGIN SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      showModal("Email və şifrə daxil edilməlidir!", "error");
      return;
    }

    showModal("Uğurla daxil oldunuz!", "success");

    setTimeout(() => navigate("/belediye-portal"), 1200);
  };


  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (!regUsername || !regEmail || !regPhoneNumber || !regPassword || !selectedOption) {
      showModal("Zəhmət olmasa bütün xanaları doldurun!", "error");
      return;
    }

    if (regPassword !== regConfirmPassword) {
      showModal("Şifrələr uyğun deyil!", "error");
      return;
    }

    showModal("Qeydiyyat uğurla tamamlandı!", "success");
    setIsLogin(true);
  };

  const handleEmailVerification = (e) => {
    e.preventDefault();
    if (resetEmail) {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setVerificationCode(code);
      showModal("Kod göndərildi!", "success");
      setForgotStep("verify");
    }
  };

 
  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (userVerificationCode === verificationCode) {
      setForgotStep("reset");
      showModal("Kod təsdiqləndi!", "success");
    } else {
      showModal("Kod yanlışdır!", "error");
      setVerificationError("Kod yanlışdır!");
    }
  };

  
  const handleResetSubmit = (e) => {
    e.preventDefault();
    showModal("Şifrə yeniləndi!", "success");
    setIsForgotPassword(false);
    setForgotStep("email");
  };

  
  const Modal = () =>
    modalMsg ? (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[9999]">
        <div
          className={`px-6 py-4 rounded-lg shadow-lg text-white text-center text-lg animate-fadeIn 
          ${modalType === "error" ? "bg-red-600" : "bg-green-600"}`}
        >
          {modalMsg}
        </div>
      </div>
    ) : null;


  if (isForgotPassword && forgotStep === "email") {
    return (
      <>
        <Modal />
        <div className="min-h-screen flex items-center justify-center bg-blue-600 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Email təsdiqi</h2>

            <form onSubmit={handleEmailVerification} className="space-y-4">
              <input
                type="email"
                placeholder="Emailinizi daxil edin"
                className="w-full border px-4 py-2 rounded"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
              <button className="w-full bg-blue-600 text-white py-2 rounded">Davam et</button>
            </form>

            <button onClick={() => setIsForgotPassword(false)} className="w-full text-center mt-3 text-blue-600">
              Geri qayıt
            </button>
          </div>
        </div>
      </>
    );
  }

  if (isForgotPassword && forgotStep === "verify") {
    return (
      <>
        <Modal />
        <div className="min-h-screen flex items-center justify-center bg-blue-600 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Kodu daxil edin</h2>

            <form onSubmit={handleVerifyCode} className="space-y-4">
              <input
                type="number"
                placeholder="Göndərilən kodu daxil edin"
                className="w-full border px-4 py-2 rounded"
                value={userVerificationCode}
                onChange={(e) => setUserVerificationCode(e.target.value)}
              />

              {verificationError && <p className="text-red-600 text-sm">{verificationError}</p>}

              <button className="w-full bg-blue-600 text-white py-2 rounded">Təsdiqlə</button>
            </form>

            <button onClick={() => setIsForgotPassword(false)} className="w-full text-center mt-3 text-blue-600">
              Geri qayıt
            </button>
          </div>
        </div>
      </>
    );
  }


  if (isForgotPassword && forgotStep === "reset") {
    return (
      <>
        <Modal />
        <div className="min-h-screen flex items-center justify-center bg-blue-600 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Yeni şifrə təyin edin</h2>

            <form onSubmit={handleResetSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type={showResetPassword ? "text" : "password"}
                  placeholder="Yeni şifrə"
                  className="w-full border px-4 py-2 rounded"
                  value={resetPassword}
                  onChange={(e) => setResetPassword(e.target.value)}
                />
                <span
                  onClick={() => setShowResetPassword(!showResetPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-600"
                >
                  {showResetPassword ? EyeOpen : EyeClosed}
                </span>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 rounded">Şifrəni yenilə</button>
            </form>

            <button onClick={() => setIsForgotPassword(false)} className="w-full text-center mt-3 text-blue-600">
              Geri qayıt
            </button>
          </div>
        </div>
      </>
    );
  }


  return (
    <>
      <Modal />

      <div className="min-h-screen bg-blue-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          {/* TAB */}
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setIsLogin(true)}
              className={`pb-3 px-4 font-semibold ${
                isLogin ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
              }`}
            >
              Daxil ol
            </button>

            <button
              onClick={() => setIsLogin(false)}
              className={`pb-3 px-4 font-semibold ${
                !isLogin ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
              }`}
            >
              Qeydiyyat
            </button>
          </div>

          {isLogin ? (
            <>
              <h1 className="text-3xl font-bold text-center mb-4">Xoş gəldiniz</h1>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border px-4 py-2 rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Şifrə"
                    className="w-full border px-4 py-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 cursor-pointer text-gray-600"
                  >
                    {showPassword ? EyeOpen : EyeClosed}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="text-xs text-blue-600"
                >
                  Şifrəni unutmusunuz?
                </button>

                <button className="w-full bg-blue-600 text-white py-2 rounded">Daxil ol</button>
              </form>
            </>
          ) : (
            <>
             
              <h1 className="text-3xl font-bold text-center mb-4">Yeni hesab</h1>

              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="İstifadəçi adı"
                  className="w-full border px-4 py-2 rounded"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border px-4 py-2 rounded"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />

                <input
                  type="number"
                  placeholder="Telefon"
                  className="w-full border px-4 py-2 rounded"
                  value={regPhoneNumber}
                  onChange={(e) => setRegPhoneNumber(e.target.value)}
                />

                <div className="relative">
                  <input
                    type={showRegPassword ? "text" : "password"}
                    placeholder="Şifrə"
                    className="w-full border px-4 py-2 rounded"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                  />

                  <span
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    className="absolute right-3 top-3 cursor-pointer text-gray-600"
                  >
                    {showRegPassword ? EyeOpen : EyeClosed}
                  </span>
                </div>

                <div className="relative">
                  <input
                    type={showRegConfirmPassword ? "text" : "password"}
                    placeholder="Şifrəni təkrar edin"
                    className="w-full border px-4 py-2 rounded"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                  />

                  <span
                    onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                    className="absolute right-3 top-3 cursor-pointer text-gray-600"
                  >
                    {showRegConfirmPassword ? EyeOpen : EyeClosed}
                  </span>
                </div>

                <select
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="w-full border px-4 py-2 rounded"
                >
                  <option value="">Seçim edin</option>
                  <option value="sahibkar">Sahibkar</option>
                  <option value="isci">İşçi</option>
                </select>

                <button className="w-full bg-blue-600 text-white py-2 rounded">Qeydiyyatdan keç</button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
