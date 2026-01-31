import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { FaTelegramPlane, FaInstagram, FaPhoneAlt, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#022c22] border-t border-[#fbbf24]/20 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* LOGO VA TA'RIF */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaMoon className="text-[#fbbf24] text-2xl drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              <span className="text-[#fbbf24] font-black text-2xl tracking-tighter font-serif uppercase">
                RAMAZON
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {t('footer_desc')}
            </p>
          </div>

          {/* MENYU LINKLARI */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#fbbf24] font-bold text-xs uppercase tracking-[0.2em] opacity-80">
              {t('menu')}
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {[
                { name: t('asosiy'), path: "/" },
                { name: t('taqvim'), path: "/taqvim" },
                { name: t('duolar'), path: "/duolar" },
                { name: t('yangiliklar'), path: "/yangiliklar" }
              ].map((item) => (
                <NavLink 
                  key={item.path} 
                  to={item.path} 
                  className="text-gray-500 hover:text-[#fbbf24] text-[15px] no-underline transition-all duration-300 w-fit"
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* IJTIMOIY TARMOQLAR */}
          <div className="flex flex-col gap-5 md:items-end">
            <h4 className="text-[#fbbf24] font-bold text-xs uppercase tracking-[0.2em] opacity-80">
              {t('boglanish')}
            </h4>
            <div className="flex gap-3">
              {/* Telegram */}
              <a 
                href="https://t.me/davlatbek_624" 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#0088cc] hover:border-[#0088cc] transition-all duration-500 group shadow-xl"
              >
                <FaTelegramPlane size={22} className="group-hover:scale-110 transition-transform" />
              </a>

              {/* Instagram */}
              <a 
                href="#" 
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-linear-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:border-transparent transition-all duration-500 group shadow-xl"
              >
                <FaInstagram size={22} className="group-hover:scale-110 transition-transform" />
              </a>

              {/* Telefon - Bosilganda raqam chiqadi */}
              <a 
                href="tel:+998919102160" 
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#fbbf24] hover:text-[#022c22] hover:border-[#fbbf24] transition-all duration-500 group shadow-xl relative overflow-hidden"
                title="Qo'ng'iroq qilish"
              >
                <FaPhoneAlt size={18} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

        </div>

        {/* COPYRIGHT QISMI */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-xs font-medium tracking-wide">
            {t('rights')} © 2026
          </p>
          
          <motion.div 
            whileHover={{ y: -2 }}
            className="flex items-center gap-3 px-5 py-2 bg-white/3 rounded-full border border-white/5 shadow-inner"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-pulse" />
            <p className="text-gray-300 text-[11px] font-bold uppercase tracking-[0.15em]">
              {t('dev')}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}