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
  guest_count?: number;
  total_price?: number;
  special_requests?: string;
  contact_name?: string;
  created_at?: string;
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
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (user) {
      fetchBookings();
      supabase.from('saved_services').select('*').eq('user_id', user.id)
        .then(({ data }) => { if (data) setSavedServices(data); });
    }
  }, [user]);

  const fetchBookings = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('office_bookings')
      .select('*')
      .eq('user_id', user.id)
      .order('booking_date', { ascending: false });
    if (data) setBookings(data);
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    await updateProfile({ full_name: editName, company: editCompany, phone: editPhone });
    setSaving(false);
  };

  const handleLogout = async () => {
    await signOut();
    onClose();
  };

  const handleCancelBooking = async (bookingId: string) => {
    setCancellingId(bookingId);
    try {
      await supabase
        .from('office_bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId);
      await fetchBookings();
    } catch (error) {
      console.error('Error cancelling booking:', error);
    } finally {
      setCancellingId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return { bg: 'bg-green-100', text: 'text-green-700', label: 'Onaylandı' };
      case 'cancelled':
        return { bg: 'bg-red-100', text: 'text-red-700', label: 'İptal Edildi' };
      case 'completed':
        return { bg: 'bg-slate-100', text: 'text-slate-700', label: 'Tamamlandı' };
      default:
        return { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Beklemede' };
    }
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
                  <p className="text-slate-500 mb-2">Henüz rezervasyonunuz bulunmuyor.</p>
                  <p className="text-slate-400 text-sm">Ofis hizmetleri bölümünden rezervasyon yapabilirsiniz.</p>
                </div>
              ) : bookings.map(b => {
                const statusBadge = getStatusBadge(b.status);
                const isPast = new Date(b.booking_date) < new Date();
                const canCancel = b.status === 'pending' && !isPast;
                
                return (
                  <div key={b.id} className={`p-5 bg-slate-50 border rounded-xl transition-colors ${
                    b.status === 'cancelled' ? 'border-slate-200 opacity-60' : 'border-slate-200 hover:border-sky-300'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          b.status === 'cancelled' ? 'bg-slate-200' : 'bg-sky-100'
                        }`}>
                          <svg className={`w-6 h-6 ${b.status === 'cancelled' ? 'text-slate-400' : 'text-sky-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-slate-800 font-semibold">{b.office_type}</h4>
                          <p className="text-slate-500 text-sm mt-1">{formatDate(b.booking_date)}</p>
                          <p className="text-slate-400 text-sm">{b.start_time} - {b.end_time}</p>
                          {b.guest_count && (
                            <p className="text-slate-400 text-xs mt-1">{b.guest_count} kişi</p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.text}`}>
                          {statusBadge.label}
                        </span>
                        {b.total_price && (
                          <span className="text-sky-600 font-semibold text-sm">₺{b.total_price.toLocaleString('tr-TR')}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-200">
                      <button 
                        onClick={() => setSelectedBooking(b)}
                        className="text-sky-600 text-sm font-medium hover:text-sky-700 flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Detaylar
                      </button>
                      {canCancel && (
                        <button 
                          onClick={() => handleCancelBooking(b.id)}
                          disabled={cancellingId === b.id}
                          className="text-red-500 text-sm font-medium hover:text-red-600 flex items-center gap-1 disabled:opacity-50"
                        >
                          {cancellingId === b.id ? (
                            <>
                              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              İptal Ediliyor...
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              İptal Et
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
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

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={() => setSelectedBooking(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-sky-500 to-sky-600 px-6 py-5">
              <div className="flex justify-between items-center">
                <h3 className="text-white text-lg font-bold">Rezervasyon Detayları</h3>
                <button onClick={() => setSelectedBooking(null)} className="text-white/80 hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                  <span className="text-slate-500">Rezervasyon No</span>
                  <span className="text-slate-800 font-semibold">#{selectedBooking.id.slice(0, 8).toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Ofis</span>
                  <span className="text-slate-800 font-medium">{selectedBooking.office_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tarih</span>
                  <span className="text-slate-800 font-medium">{formatDate(selectedBooking.booking_date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Saat</span>
                  <span className="text-slate-800 font-medium">{selectedBooking.start_time} - {selectedBooking.end_time}</span>
                </div>
                {selectedBooking.guest_count && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Kişi Sayısı</span>
                    <span className="text-slate-800 font-medium">{selectedBooking.guest_count}</span>
                  </div>
                )}
                {selectedBooking.contact_name && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">İletişim</span>
                    <span className="text-slate-800 font-medium">{selectedBooking.contact_name}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-500">Durum</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(selectedBooking.status).bg} ${getStatusBadge(selectedBooking.status).text}`}>
                    {getStatusBadge(selectedBooking.status).label}
                  </span>
                </div>
                {selectedBooking.special_requests && (
                  <div className="pt-4 border-t border-slate-200">
                    <span className="text-slate-500 text-sm block mb-2">Özel İstekler</span>
                    <p className="text-slate-700 text-sm bg-slate-50 p-3 rounded-lg">{selectedBooking.special_requests}</p>
                  </div>
                )}
                {selectedBooking.total_price && (
                  <div className="flex justify-between pt-4 border-t border-slate-200">
                    <span className="text-slate-700 font-semibold">Toplam</span>
                    <span className="text-sky-600 font-bold text-lg">₺{selectedBooking.total_price.toLocaleString('tr-TR')}</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-full mt-6 py-3 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
