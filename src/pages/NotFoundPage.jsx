import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMoon, FaStar, FaArrowLeft } from 'react-icons/fa';

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-[#022c22] flex flex-col items-center justify-center px-6 text-center overflow-hidden relative">

            {/* Orqa fondagi suzuvchi yulduzlar */}
            <motion.div
                animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-20 left-[20%] text-[#fbbf24]/20"
            >
                <FaStar size={40} />
            </motion.div>
            <motion.div
                animate={{ opacity: [0.1, 0.5, 0.1], scale: [1, 1.5, 1] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute bottom-40 right-[15%] text-[#fbbf24]/10"
            >
                <FaStar size={60} />
            </motion.div>

            {/* Markaziy animatsiya */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="relative"
            >
                <div className="text-[120px] md:text-[180px] font-black text-[#fbbf24]/10 select-none">
                    404
                </div>
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <FaMoon size={80} className="text-[#fbbf24] drop-shadow-[0_0_30px_rgba(251,191,36,0.5)]" />
                </motion.div>
            </motion.div>

            {/* Matnlar */}
            <div className="mt-8 space-y-4 relative z-10">
                <h2 className="text-[#fbbf24] text-3xl md:text-4xl font-bold font-serif uppercase tracking-tighter">
                    {t('not_found.title')}
                </h2>
                <p className="text-gray-400 max-w-md mx-auto text-lg italic">
                    {t('not_found.message')}
                </p>
            </div>

            {/* Tugma */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-12"
            >
                <NavLink
                    to="/"
                    className="relative z-10 flex items-center gap-3 bg-[#fbbf24] text-[#022c22] px-8 py-4 rounded-full font-bold text-lg no-underline shadow-[0_10px_30px_rgba(251,191,36,0.3)] hover:bg-[#fcd34d] transition-all" // relative z-10 qo'shildi
                >
                    <FaArrowLeft />
                    {t('not_found.btn')}
                </NavLink>
            </motion.div>
            {/* Pastki bezak */}
            <div className="absolute bottom-0 w-full h-32 bg-linear-to-t from-[#064e3b]/50 to-transparent" />
        </div>
    );
}