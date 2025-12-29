import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { signIn, signUp, resetPassword } = useAuth();
  const [mode, setMode] = useState<'login' | 'register' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (mode === 'login') {
      const { error } = await signIn(email, password);
      if (error) setError('Giriş başarısız. E-posta veya şifre hatalı.');
      else onClose();
    } else if (mode === 'register') {
      const { error } = await signUp(email, password, fullName);
      if (error) setError('Kayıt başarısız. Bu e-posta zaten kullanılıyor olabilir.');
      else { setSuccess('Kayıt başarılı! E-postanızı kontrol edin.'); setMode('login'); }
    } else {
      const { error } = await resetPassword(email);
      if (error) setError('Şifre sıfırlama başarısız.');
      else setSuccess('Şifre sıfırlama bağlantısı gönderildi.');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src="https://files.catbox.moe/ltc1ta.png" alt="West Capital" className="h-8 w-8 object-contain" />
              <span className="font-serif text-white text-lg font-bold">WEST CAPITAL</span>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <h2 className="text-white text-xl font-semibold mt-4">
            {mode === 'login' ? 'VIP Üye Girişi' : mode === 'register' ? 'Üye Kaydı' : 'Şifre Sıfırla'}
          </h2>
          <p className="text-white/80 text-sm mt-1">
            {mode === 'login' ? 'Hesabınıza giriş yapın' : mode === 'register' ? 'Yeni hesap oluşturun' : 'Şifrenizi sıfırlayın'}
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Ad Soyad</label>
                <input type="text" placeholder="Adınız Soyadınız" value={fullName} onChange={e => setFullName(e.target.value)} required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:outline-none transition-all" />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">E-posta</label>
              <input type="email" placeholder="ornek@email.com" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:outline-none transition-all" />
            </div>
            {mode !== 'reset' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Şifre</label>
                <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:outline-none transition-all" />
              </div>
            )}
            {mode === 'login' && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-slate-600 text-sm cursor-pointer">
                  <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-500" />
                  Beni hatırla
                </label>
                <button type="button" onClick={() => setMode('reset')} className="text-sky-600 text-sm font-medium hover:text-sky-700">Şifremi unuttum</button>
              </div>
            )}
            <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold rounded-xl hover:from-sky-600 hover:to-sky-700 disabled:opacity-50 transition-all shadow-lg shadow-sky-500/25">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Yükleniyor...
                </span>
              ) : mode === 'login' ? 'Giriş Yap' : mode === 'register' ? 'Kayıt Ol' : 'Şifre Sıfırla'}
            </button>
          </form>

          <div className="mt-6 text-center text-slate-500 text-sm">
            {mode === 'login' ? (
              <>Hesabınız yok mu? <button onClick={() => setMode('register')} className="text-sky-600 font-medium hover:text-sky-700">Kayıt olun</button></>
            ) : (
              <>Hesabınız var mı? <button onClick={() => setMode('login')} className="text-sky-600 font-medium hover:text-sky-700">Giriş yapın</button></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
