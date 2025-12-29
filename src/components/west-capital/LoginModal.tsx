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
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#0A1F1A] border border-[#D4AF37] max-w-md w-full p-8" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-serif text-2xl text-[#D4AF37] font-bold">
            {mode === 'login' ? 'VIP Üye Girişi' : mode === 'register' ? 'Üye Kaydı' : 'Şifre Sıfırla'}
          </h2>
          <button onClick={onClose} className="text-white/60 hover:text-[#D4AF37]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-300 text-sm">{error}</div>}
        {success && <div className="mb-4 p-3 bg-green-500/20 border border-green-500 text-green-300 text-sm">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <input type="text" placeholder="Ad Soyad" value={fullName} onChange={e => setFullName(e.target.value)} required
              className="w-full px-4 py-3 bg-transparent border border-[#D4AF37]/30 text-white placeholder-white/50 focus:border-[#D4AF37] focus:outline-none" />
          )}
          <input type="email" placeholder="E-posta" value={email} onChange={e => setEmail(e.target.value)} required
            className="w-full px-4 py-3 bg-transparent border border-[#D4AF37]/30 text-white placeholder-white/50 focus:border-[#D4AF37] focus:outline-none" />
          {mode !== 'reset' && (
            <input type="password" placeholder="Şifre" value={password} onChange={e => setPassword(e.target.value)} required
              className="w-full px-4 py-3 bg-transparent border border-[#D4AF37]/30 text-white placeholder-white/50 focus:border-[#D4AF37] focus:outline-none" />
          )}
          {mode === 'login' && (
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-white/70 text-sm cursor-pointer">
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="accent-[#D4AF37]" />
                Beni hatırla
              </label>
              <button type="button" onClick={() => setMode('reset')} className="text-[#D4AF37] text-sm hover:underline">Şifremi unuttum</button>
            </div>
          )}
          <button type="submit" disabled={loading} className="w-full py-3 bg-[#D4AF37] text-[#0A1F1A] font-semibold hover:bg-[#D4AF37]/90 disabled:opacity-50">
            {loading ? 'Yükleniyor...' : mode === 'login' ? 'Giriş Yap' : mode === 'register' ? 'Kayıt Ol' : 'Şifre Sıfırla'}
          </button>
        </form>

        <div className="mt-6 text-center text-white/60 text-sm">
          {mode === 'login' ? (
            <>Hesabınız yok mu? <button onClick={() => setMode('register')} className="text-[#D4AF37] hover:underline">Kayıt olun</button></>
          ) : (
            <>Hesabınız var mı? <button onClick={() => setMode('login')} className="text-[#D4AF37] hover:underline">Giriş yapın</button></>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;