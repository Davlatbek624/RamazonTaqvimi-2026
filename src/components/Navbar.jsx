import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { RiMoonFill } from 'react-icons/ri';
import { IoMdStarOutline } from 'react-icons/io';
import { MdOutlineStar } from 'react-icons/md';

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const changeLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
    };

    const navLinks = [
        { name: t('asosiy'), path: "/" },
        { name: t('taqvim'), path: "/taqvim" },
        { name: t('duolar'), path: "/duolar" },
        { name: t('yangiliklar'), path: "/yangiliklar" },
        { name: t('boglanish'), path: "/kontakt" },
    ];

    return (
        <>
            <nav className="bg-[#064e3b] shadow-2xl fixed w-full top-0 left-0 z-50 border-b border-[#fbbf24]/30">
                <div className="max-w-7xl mx-auto px-5 flex justify-between items-center py-4">

                    {/* Mobil Menu Tugmasi */}
                    <button
                        className="md:hidden text-[#fbbf24] hover:bg-white/10 p-2 rounded-lg transition-all"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Menu size={28} />
                    </button>

                    {/* Logo va Ikonka */}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <RiMoonFill className="text-[#fbbf24] fill-[#fbbf24]" size={26} />
                            <MdOutlineStar className="text-[#fbbf24] fill-[#fbbf24] absolute top-0.5 right-0.5 animate-pulse" size={10} />
                        </div>
                        <span className="text-[#fbbf24] font-extrabold text-2xl tracking-tighter font-serif uppercase hidden min-[400px]:gap-1 min-[400px]:flex">
                            {t('ramazon')} <span className="text-[#fbbf24] font-semibold text-2xl tracking-tighter font-sans uppercase hidden min-[400px]:block">  - 2026</span>
                        </span>
                    </div>

                    {/* Navigatsiya Linklari */}
                    <div className="hidden min-[830px]:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-full duration-300 font-semibold text-[15px] no-underline transition-all ${isActive ? "bg-[#fbbf24] text-[#064e3b] shadow-lg shadow-[#fbbf24]/20" : "text-gray-100 hover:text-[#fbbf24] hover:bg-white/5"
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* Til Tanlash */}
                    <select
                        className="bg-[#022c22] text-[#fbbf24] border border-[#fbbf24]/40 rounded-lg px-3 py-1.5 outline-none text-sm font-bold cursor-pointer hover:border-[#fbbf24] transition-colors shadow-inner"
                        onChange={changeLanguage}
                        value={i18n.language}
                    >
                        <option value="uz">UZB</option>
                        <option value="уз">ЎЗБ</option>
                    </select>
                </div>
            </nav>

            {/* --- SIDEBAR --- */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Orqa fon qorayishi (Overlay) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-md z-60"
                        />

                        {/* Sidebar paneli (Chapdan chiqish) */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 h-full w-75 bg-linear-to-b from-[#064e3b] to-[#022c22] z-70 shadow-[10px_0_30px_rgba(0,0,0,0.5)] p-8 flex flex-col border-r border-[#fbbf24]/20"
                        >
                            <div className="flex justify-between items-center mb-12 border-b border-[#fbbf24]/20 pb-6">
                                <div className="flex items-center gap-2">
                                    <RiMoonFill className="text-[#fbbf24] fill-[#fbbf24]" size={24} />
                                    <span className="text-[#fbbf24] font-bold text-xl">{t('menu')}</span>
                                </div>
                                <button onClick={() => setMobileMenuOpen(false)} className="text-[#fbbf24] bg-white/5 p-2 rounded-full">
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Sidebar Linklari */}
                            <div className="flex flex-col gap-3">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.path}
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <NavLink
                                            to={link.path}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={({ isActive }) =>
                                                `text-lg block py-3 px-5 rounded-xl duration-300 no-underline font-medium ${isActive ? "bg-[#fbbf24] text-[#064e3b] font-bold shadow-lg" : "text-gray-300 hover:bg-white/5 hover:text-[#fbbf24]"
                                                }`
                                            }
                                        >
                                            {link.name}
                                        </NavLink>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Sidebar Footer
                            <div className="mt-auto pt-10 text-center">
                                <p className="text-[#fbbf24]/40 text-[11px] uppercase tracking-widest leading-loose">
                                    {t('rights')} <br /> {t('dev')}
                                </p>
                            </div> */}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}