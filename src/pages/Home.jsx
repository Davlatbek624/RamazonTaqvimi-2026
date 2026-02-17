import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, Heart, BookOpen, ArrowRight } from "lucide-react";

const FEATURE_CARDS = [
  {
    key: "calendar",
    path: "/taqvim",
    icon: <Calendar className="w-8 h-8 text-yellow-500" />,
    color: "from-yellow-500/10 to-transparent"
  },
  {
    key: "dua",
    path: "/duolar",
    icon: <Heart className="w-8 h-8 text-yellow-500" />,
    color: "from-yellow-500/10 to-transparent"
  },
  {
    key: "wisdom",
    path: "/yangiliklar",
    icon: <BookOpen className="w-8 h-8 text-yellow-500" />,
    color: "from-yellow-500/10 to-transparent"
  }
];

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <main className="text-white bg-[#041d14] min-h-screen">

      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        {/* Orqa fondagi shaffof bezak */}
        <div className="absolute w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] -z-10" />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-black text-yellow-500 uppercase tracking-tighter"
        >
          {t("home.heroTitle")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 max-w-2xl text-lg text-gray-400 font-medium leading-relaxed"
        >
          {t("home.heroSubtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mt-10"
        >
          <Link
            to="/taqvim"
            className="group flex items-center gap-2 bg-yellow-600 text-black font-black px-8 py-4 rounded-2xl hover:bg-yellow-500 transition-all active:scale-95"
          >
            {t("home.btnCalendar")}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/duolar"
            className="bg-white/5 border border-white/10 backdrop-blur-md text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all active:scale-95"
          >
            {t("home.btnDuas")}
          </Link>
        </motion.div>
      </section>

      {/* INFO CARDS SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURE_CARDS.map((card, index) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
              onClick={() => navigate(card.path)}
              className={`group relative cursor-pointer p-8 rounded-[2.5rem] border border-white/5 bg-gradient-to-br ${card.color} bg-green-900/20 backdrop-blur-2xl transition-all hover:border-yellow-500/30`}
            >
              {/* Card ichidagi nurlar */}
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-yellow-500/5 rounded-full blur-2xl group-hover:bg-yellow-500/10 transition-colors" />

              <div className="mb-6 inline-flex p-4 bg-black/30 rounded-2xl border border-white/5 shadow-xl group-hover:scale-110 transition-transform duration-500">
                {card.icon}
              </div>

              <h3 className="text-2xl font-black text-yellow-500 uppercase tracking-tight mb-4">
                {t(`home.cards.${card.key}Title`)}
              </h3>

              <p className="text-gray-400 leading-relaxed font-medium group-hover:text-gray-200 transition-colors">
                {t(`home.cards.${card.key}Desc`)}
              </p>

              <div className="mt-8 flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-white/30 group-hover:text-yellow-500 transition-colors">
                Batafsil ma'lumot
                <ArrowRight size={14} className="ml-2 group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </main>
  );
};

export default Home;