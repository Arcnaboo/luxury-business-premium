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

  const tabs = [
    { id: 'bookings', label: 'Rezervasyonlar', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'services', label: 'Kaydedilen Hizmetler', icon: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z' },
    { id: 'settings', label: 'Hesap Ayarları', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 px-8 py-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-white text-xl font-bold">VIP Üye Paneli</h2>
                <p className="text-white/80 text-sm">Hoş geldiniz, {profile?.full_name || user?.email}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id as any)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all ${
                tab === t.id 
                  ? 'text-sky-600 border-b-2 border-sky-500 bg-white' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
              }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={t.icon} />
              </svg>
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {tab === 'bookings' && (
            <div className="space-y-4">
              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-slate-500">Henüz rezervasyonunuz bulunmuyor.</p>
                  <button className="mt-4 px-6 py-2 bg-sky-50 text-sky-600 rounded-lg font-medium hover:bg-sky-100 transition-colors">
                    Ofis Rezervasyonu Yap
                  </button>
                </div>
              ) : bookings.map(b => (
                <div key={b.id} className="p-5 bg-slate-50 border border-slate-200 rounded-xl hover:border-sky-300 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-slate-800 font-semibold">{b.office_type}</h4>
                        <p className="text-slate-500 text-sm mt-1">{b.booking_date} • {b.start_time} - {b.end_time}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                      b.status === 'confirmed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-amber-100 text-amber-700'
                    }`}>
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
                <div className="text-center py-12 col-span-2">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </div>
                  <p className="text-slate-500">Kaydedilen hizmet bulunmuyor.</p>
                  <button className="mt-4 px-6 py-2 bg-sky-50 text-sky-600 rounded-lg font-medium hover:bg-sky-100 transition-colors">
                    Hizmetleri Keşfet
                  </button>
                </div>
              ) : savedServices.map(s => (
                <div key={s.id} className="p-5 bg-slate-50 border border-slate-200 rounded-xl hover:border-sky-300 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-slate-800 font-semibold">{s.service_name}</h4>
                      <p className="text-slate-500 text-sm">{s.service_category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'settings' && (
            <div className="max-w-md space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Ad Soyad</label>
                <input type="text" placeholder="Adınız Soyadınız" value={editName} onChange={e => setEditName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Firma</label>
                <input type="text" placeholder="Şirket Adı" value={editCompany} onChange={e => setEditCompany(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Telefon</label>
                <input type="tel" placeholder="+90 5XX XXX XX XX" value={editPhone} onChange={e => setEditPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:outline-none transition-all" />
              </div>
              <div className="pt-4 space-y-3">
                <button onClick={handleSaveProfile} disabled={saving} className="w-full py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold rounded-xl hover:from-sky-600 hover:to-sky-700 disabled:opacity-50 transition-all shadow-lg shadow-sky-500/25">
                  {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                </button>
                <button onClick={handleLogout} className="w-full py-3 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors font-medium">
                  Çıkış Yap
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
