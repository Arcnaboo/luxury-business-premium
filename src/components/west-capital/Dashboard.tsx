import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface Booking {
  id: string;
  office_type: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  status: string;
}

interface SavedService {
  id: string;
  service_name: string;
  service_category: string;
}

interface DashboardProps {
  onClose: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onClose }) => {
  const { user, profile, signOut, updateProfile } = useAuth();
  const [tab, setTab] = useState<'bookings' | 'services' | 'settings'>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [savedServices, setSavedServices] = useState<SavedService[]>([]);
  const [editName, setEditName] = useState(profile?.full_name || '');
  const [editCompany, setEditCompany] = useState(profile?.company || '');
  const [editPhone, setEditPhone] = useState(profile?.phone || '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      supabase.from('office_bookings').select('*').eq('user_id', user.id).order('booking_date', { ascending: false })
        .then(({ data }) => { if (data) setBookings(data); });
      supabase.from('saved_services').select('*').eq('user_id', user.id)
        .then(({ data }) => { if (data) setSavedServices(data); });
    }
  }, [user]);

  const handleSaveProfile = async () => {
    setSaving(true);
    await updateProfile({ full_name: editName, company: editCompany, phone: editPhone });
    setSaving(false);
  };

  const handleLogout = async () => {
    await signOut();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#0A1F1A] border border-[#D4AF37] max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b border-[#D4AF37]/20">
          <div>
            <h2 className="font-serif text-2xl text-[#D4AF37] font-bold">VIP Üye Paneli</h2>
            <p className="text-white/60 text-sm">Hoş geldiniz, {profile?.full_name || user?.email}</p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-[#D4AF37]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex border-b border-[#D4AF37]/20">
          {[{ id: 'bookings', label: 'Rezervasyonlar' }, { id: 'services', label: 'Kaydedilen Hizmetler' }, { id: 'settings', label: 'Hesap Ayarları' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id as any)}
              className={`px-6 py-3 text-sm transition-all ${tab === t.id ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-white/60 hover:text-white'}`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {tab === 'bookings' && (
            <div className="space-y-4">
              {bookings.length === 0 ? (
                <p className="text-white/60 text-center py-8">Henüz rezervasyonunuz bulunmuyor.</p>
              ) : bookings.map(b => (
                <div key={b.id} className="p-4 bg-[#0B0B0B] border border-[#D4AF37]/20">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-[#D4AF37] font-semibold">{b.office_type}</h4>
                      <p className="text-white/60 text-sm">{b.booking_date} • {b.start_time} - {b.end_time}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs ${b.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {b.status === 'confirmed' ? 'Onaylandı' : 'Beklemede'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'services' && (
            <div className="grid md:grid-cols-2 gap-4">
              {savedServices.length === 0 ? (
                <p className="text-white/60 text-center py-8 col-span-2">Kaydedilen hizmet bulunmuyor.</p>
              ) : savedServices.map(s => (
                <div key={s.id} className="p-4 bg-[#0B0B0B] border border-[#D4AF37]/20">
                  <h4 className="text-[#D4AF37] font-semibold">{s.service_name}</h4>
                  <p className="text-white/60 text-sm">{s.service_category}</p>
                </div>
              ))}
            </div>
          )}

          {tab === 'settings' && (
            <div className="space-y-4 max-w-md">
              <input type="text" placeholder="Ad Soyad" value={editName} onChange={e => setEditName(e.target.value)}
                className="w-full px-4 py-3 bg-transparent border border-[#D4AF37]/30 text-white focus:border-[#D4AF37] focus:outline-none" />
              <input type="text" placeholder="Firma" value={editCompany} onChange={e => setEditCompany(e.target.value)}
                className="w-full px-4 py-3 bg-transparent border border-[#D4AF37]/30 text-white focus:border-[#D4AF37] focus:outline-none" />
              <input type="tel" placeholder="Telefon" value={editPhone} onChange={e => setEditPhone(e.target.value)}
                className="w-full px-4 py-3 bg-transparent border border-[#D4AF37]/30 text-white focus:border-[#D4AF37] focus:outline-none" />
              <button onClick={handleSaveProfile} disabled={saving} className="w-full py-3 bg-[#D4AF37] text-[#0A1F1A] font-semibold disabled:opacity-50">
                {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
              </button>
              <button onClick={handleLogout} className="w-full py-3 border border-red-500 text-red-400 hover:bg-red-500/10">Çıkış Yap</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;