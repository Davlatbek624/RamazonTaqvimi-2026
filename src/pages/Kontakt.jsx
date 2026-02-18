import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, User, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Kontakt = () => {
    const { t } = useTranslation();
    const [status, setStatus] = useState(null); // 'loading', 'success', 'error'
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: ''
    });

    // --- TELEGRAM BOT SOZLAMALARI ---
    const BOT_TOKEN = "8559630365:AAGUu7rGYFydvSOCcvGvRei60_-bcVjJdnw";
    const CHAT_ID = "5479060886";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        const text = `🚀 **Yangi xabar (Ramazon 2026)**\n\n` +
            `👤 **Ism:** ${formData.name}\n` +
            `📞 **Tel:** ${formData.phone}\n` +
            `💬 **Izoh:** ${formData.message}`;

        try {
            const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: text,
                    parse_mode: 'Markdown'
                })
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', phone: '', message: '' });
                setTimeout(() => setStatus(null), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-[#041d14] text-slate-100 py-24 px-4 flex justify-center items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl w-full bg-white/5 border border-white/10 p-8 md:p-12 rounded-4xl backdrop-blur-xl shadow-2xl"
            >
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-yellow-500 uppercase tracking-tighter mb-3">
                        {t('boglanish')}
                    </h1>
                    <p className="text-gray-400 text-sm">
                        {t('contact.subtitle') || 'Savollaringiz yoki takliflaringiz bo\'lsa, bizga yozing.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Ism */}
                    <div className="relative">
                        <User className="absolute left-4 top-4 text-yellow-500/50" size={20} />
                        <input
                            required
                            type="text"
                            placeholder={t('contact.name') || 'Ismingiz'}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-[#062c1e]/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all text-white placeholder:text-gray-500"
                        />
                    </div>

                    {/* Telefon */}
                    <div className="relative">
                        <Phone className="absolute left-4 top-4 text-yellow-500/50" size={20} />
                        <input
                            required
                            type="tel"
                            placeholder={t('contact.phone') || 'Telefon raqamingiz'}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-[#062c1e]/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all text-white placeholder:text-gray-500"
                        />
                    </div>

                    {/* Izoh/Xabar */}
                    <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 text-yellow-500/50" size={20} />
                        <textarea
                            required
                            rows="4"
                            placeholder={t('contact.message') || 'Xabaringiz yoki izohingiz...'}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full bg-[#062c1e]/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all text-white placeholder:text-gray-500 resize-none"
                        ></textarea>
                    </div>

                    {/* Yuborish tugmasi */}
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${status === 'loading' ? 'bg-gray-600 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-500 text-black'
                            }`}
                    >
                        {status === 'loading' ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                        ) : (
                            <> <Send size={20} /> {t('contact.send') || 'Yuborish'} </>
                        )}
                    </button>

                    {/* Status xabarlari */}
                    {status === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 justify-center text-green-400 font-medium bg-green-400/10 py-3 rounded-xl"
                        >
                            <CheckCircle2 size={18} /> {t('contact.success') || 'Xabar yuborildi!'}
                        </motion.div>
                    )}
                    {status === 'error' && (
                        <div className="text-red-400 text-center text-sm">
                            {t('contact.error') || 'Xatolik yuz berdi.'}
                        </div>
                    )}
                </form>
            </motion.div>
        </div>
    );
};

export default Kontakt;