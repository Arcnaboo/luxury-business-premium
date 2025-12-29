import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface Office {
  id: number;
  title: string;
  desc: string;
  price: string;
  img: string;
  priceType: 'hourly' | 'monthly';
}

interface BookingModalProps {
  office: Office | null;
  onClose: () => void;
  onLoginRequired: () => void;
}

const timeSlots = [
  { id: '09:00', label: '09:00 - 10:00', start: '09:00', end: '10:00' },
  { id: '10:00', label: '10:00 - 11:00', start: '10:00', end: '11:00' },
  { id: '11:00', label: '11:00 - 12:00', start: '11:00', end: '12:00' },
  { id: '12:00', label: '12:00 - 13:00', start: '12:00', end: '13:00' },
  { id: '13:00', label: '13:00 - 14:00', start: '13:00', end: '14:00' },
  { id: '14:00', label: '14:00 - 15:00', start: '14:00', end: '15:00' },
  { id: '15:00', label: '15:00 - 16:00', start: '15:00', end: '16:00' },
  { id: '16:00', label: '16:00 - 17:00', start: '16:00', end: '17:00' },
  { id: '17:00', label: '17:00 - 18:00', start: '17:00', end: '18:00' },
];

const BookingModal: React.FC<BookingModalProps> = ({ office, onClose, onLoginRequired }) => {
  const { user } = useAuth();
  const [step, setStep] = useState<'form' | 'confirmation'>('form');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [guestCount, setGuestCount] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [bookingId, setBookingId] = useState<string | null>(null);

  // Fetch already booked slots for the selected date
  useEffect(() => {
    if (selectedDate && office) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      supabase
        .from('office_bookings')
        .select('start_time')
        .eq('office_type', office.title)
        .eq('booking_date', dateStr)
        .neq('status', 'cancelled')
        .then(({ data }) => {
          if (data) {
            setBookedSlots(data.map(b => b.start_time));
          }
        });
    }
  }, [selectedDate, office]);

  if (!office) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!selectedDate) {
      newErrors.date = 'Lütfen bir tarih seçin';
    }

    if (selectedSlots.length === 0) {
      newErrors.slots = 'Lütfen en az bir saat dilimi seçin';
    }

    if (!contactName.trim()) {
      newErrors.name = 'Ad soyad gerekli';
    }

    if (!contactEmail.trim()) {
      newErrors.email = 'E-posta gerekli';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
    }

    if (!contactPhone.trim()) {
      newErrors.phone = 'Telefon numarası gerekli';
    } else if (!/^[0-9+\s()-]{10,}$/.test(contactPhone)) {
      newErrors.phone = 'Geçerli bir telefon numarası girin';
    }

    if (guestCount < 1 || guestCount > 50) {
      newErrors.guests = 'Kişi sayısı 1-50 arasında olmalı';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSlotToggle = (slotId: string) => {
    if (bookedSlots.includes(slotId)) return;
    
    setSelectedSlots(prev => 
      prev.includes(slotId) 
        ? prev.filter(s => s !== slotId)
        : [...prev, slotId].sort()
    );
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    if (!user) {
      onLoginRequired();
      return;
    }

    setSubmitting(true);

    try {
      const dateStr = selectedDate!.toISOString().split('T')[0];
      const sortedSlots = [...selectedSlots].sort();
      const startTime = sortedSlots[0];
      const lastSlot = timeSlots.find(s => s.id === sortedSlots[sortedSlots.length - 1]);
      const endTime = lastSlot?.end || sortedSlots[sortedSlots.length - 1];

      const { data, error } = await supabase
        .from('office_bookings')
        .insert({
          user_id: user.id,
          office_type: office.title,
          booking_date: dateStr,
          start_time: startTime,
          end_time: endTime,
          guest_count: guestCount,
          special_requests: specialRequests,
          contact_name: contactName,
          contact_email: contactEmail,
          contact_phone: contactPhone,
          status: 'pending',
          total_price: calculateTotalPrice()
        })
        .select()
        .single();

      if (error) throw error;

      setBookingId(data.id);
      setStep('confirmation');
    } catch (error) {
      console.error('Booking error:', error);
      setErrors({ submit: 'Rezervasyon oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.' });
    } finally {
      setSubmitting(false);
    }
  };

  const calculateTotalPrice = () => {
    const priceNum = parseInt(office.price.replace(/[^0-9]/g, ''));
    if (office.priceType === 'hourly') {
      return priceNum * selectedSlots.length;
    }
    return priceNum;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Disable past dates and weekends
  const disabledDays = [
    { before: new Date() },
    { dayOfWeek: [0, 6] }
  ];

  if (step === 'confirmation') {
    return (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden" onClick={e => e.stopPropagation()}>
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-10 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-white text-2xl font-bold mb-2">Rezervasyon Alındı!</h2>
            <p className="text-white/80">Talebiniz başarıyla oluşturuldu</p>
          </div>
          
          <div className="p-8">
            <div className="bg-slate-50 rounded-xl p-5 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Rezervasyon No:</span>
                  <span className="text-slate-800 font-semibold">#{bookingId?.slice(0, 8).toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Ofis:</span>
                  <span className="text-slate-800 font-medium">{office.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tarih:</span>
                  <span className="text-slate-800 font-medium">{selectedDate && formatDate(selectedDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Saat:</span>
                  <span className="text-slate-800 font-medium">
                    {selectedSlots[0]} - {timeSlots.find(s => s.id === selectedSlots[selectedSlots.length - 1])?.end}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Kişi Sayısı:</span>
                  <span className="text-slate-800 font-medium">{guestCount}</span>
                </div>
                <div className="border-t border-slate-200 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-slate-700 font-semibold">Toplam:</span>
                    <span className="text-sky-600 font-bold">₺{calculateTotalPrice().toLocaleString('tr-TR')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-amber-800 text-sm font-medium">Onay Bekliyor</p>
                  <p className="text-amber-700 text-sm mt-1">Rezervasyonunuz incelendikten sonra e-posta ile onay gönderilecektir.</p>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold rounded-xl hover:from-sky-600 hover:to-sky-700 transition-all shadow-lg shadow-sky-500/25"
            >
              Tamam
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 px-6 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-white text-xl font-bold">Ofis Rezervasyonu</h2>
                <p className="text-white/80 text-sm">{office.title}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white transition-colors p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Calendar & Time Slots */}
            <div>
              {/* Office Info Card */}
              <div className="bg-slate-50 rounded-xl p-4 mb-6 flex gap-4">
                <img src={office.img} alt={office.title} className="w-24 h-24 object-cover rounded-lg" />
                <div>
                  <h3 className="text-slate-800 font-semibold">{office.title}</h3>
                  <p className="text-slate-500 text-sm mt-1">{office.desc}</p>
                  <p className="text-sky-600 font-bold mt-2">{office.price}</p>
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Tarih Seçin
                  </span>
                </label>
                <div className="bg-white border border-slate-200 rounded-xl p-2 inline-block">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={disabledDays}
                    className="rounded-lg"
                  />
                </div>
                {errors.date && <p className="text-red-500 text-sm mt-2">{errors.date}</p>}
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Saat Dilimi Seçin
                    {selectedSlots.length > 0 && (
                      <span className="text-sky-600 font-normal">({selectedSlots.length} saat seçildi)</span>
                    )}
                  </span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map(slot => {
                    const isBooked = bookedSlots.includes(slot.id);
                    const isSelected = selectedSlots.includes(slot.id);
                    
                    return (
                      <button
                        key={slot.id}
                        onClick={() => handleSlotToggle(slot.id)}
                        disabled={isBooked || !selectedDate}
                        className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                          isBooked
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed line-through'
                            : isSelected
                            ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                            : !selectedDate
                            ? 'bg-slate-50 text-slate-400 cursor-not-allowed'
                            : 'bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-sky-600'
                        }`}
                      >
                        {slot.label}
                      </button>
                    );
                  })}
                </div>
                {errors.slots && <p className="text-red-500 text-sm mt-2">{errors.slots}</p>}
                {!selectedDate && (
                  <p className="text-slate-400 text-sm mt-2">Önce bir tarih seçin</p>
                )}
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                İletişim Bilgileri
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Ad Soyad *</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={e => setContactName(e.target.value)}
                    placeholder="Adınız Soyadınız"
                    className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:outline-none transition-all ${
                      errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-sky-500 focus:ring-sky-500/20'
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">E-posta *</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={e => setContactEmail(e.target.value)}
                    placeholder="ornek@email.com"
                    className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:outline-none transition-all ${
                      errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-sky-500 focus:ring-sky-500/20'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Telefon *</label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={e => setContactPhone(e.target.value)}
                    placeholder="+90 5XX XXX XX XX"
                    className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:outline-none transition-all ${
                      errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-sky-500 focus:ring-sky-500/20'
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Kişi Sayısı</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                      className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <input
                      type="number"
                      value={guestCount}
                      onChange={e => setGuestCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
                      min={1}
                      max={50}
                      className="w-20 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-center text-slate-800 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:outline-none"
                    />
                    <button
                      onClick={() => setGuestCount(Math.min(50, guestCount + 1))}
                      className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                  {errors.guests && <p className="text-red-500 text-sm mt-1">{errors.guests}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Özel İstekler (Opsiyonel)</label>
                  <textarea
                    value={specialRequests}
                    onChange={e => setSpecialRequests(e.target.value)}
                    placeholder="Özel isteklerinizi belirtin..."
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:outline-none transition-all resize-none"
                  />
                </div>
              </div>

              {/* Price Summary */}
              {selectedSlots.length > 0 && (
                <div className="mt-6 bg-sky-50 border border-sky-200 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-slate-700 mb-3">Rezervasyon Özeti</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-slate-600">
                      <span>{office.title}</span>
                      <span>{office.price}</span>
                    </div>
                    {office.priceType === 'hourly' && (
                      <div className="flex justify-between text-slate-600">
                        <span>Süre</span>
                        <span>{selectedSlots.length} saat</span>
                      </div>
                    )}
                    <div className="border-t border-sky-200 pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span className="text-slate-700">Toplam</span>
                        <span className="text-sky-600">₺{calculateTotalPrice().toLocaleString('tr-TR')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {errors.submit && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-600 text-sm">{errors.submit}</p>
                </div>
              )}

              {!user && (
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex gap-3">
                    <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-amber-800 text-sm font-medium">Giriş Yapmanız Gerekiyor</p>
                      <p className="text-amber-700 text-sm mt-1">Rezervasyon yapmak için lütfen giriş yapın veya üye olun.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-6 py-4 bg-slate-50">
          <div className="flex justify-between items-center">
            <button
              onClick={onClose}
              className="px-6 py-2.5 border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-white transition-colors"
            >
              İptal
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting || selectedSlots.length === 0}
              className="px-8 py-2.5 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold rounded-xl hover:from-sky-600 hover:to-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-sky-500/25 flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  İşleniyor...
                </>
              ) : (
                <>
                  Rezervasyon Yap
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
