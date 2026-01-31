import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const surxondaryoDistricts = [
  "Termiz",
  "Angor",
  "Bandixon",
  "Boysun",
  "Denov",
  "Jarqo‘rg‘on",
  "Muzrabot",
  "Oltinsoy",
  "Qiziriq",
  "Qumqo‘rg‘on",
  "Sariosiyo",
  "Sherobod",
  "Sho‘rchi",
  "Uzun"
];

const Home = () => {
  const { t } = useTranslation();
  const [district, setDistrict] = useState("Termiz");

  return (
    <main className="text-white">

      {/* HERO */}
      <section className="min-h-[70vh] flex flex-col justify-center items-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-yellow-400"
        >
          {t("home.heroTitle")}
        </motion.h1>

        <p className="mt-4 max-w-2xl text-gray-300">
          {t("home.heroSubtitle")}
        </p>

        <div className="flex gap-4 mt-6">
          <Link
            to="/taqvim"
            className="border border-yellow-400 text-yellow-400 px-6 py-2 rounded-full"
          >
            {t("home.btnCalendar")}
          </Link>

          <Link
            to="/duolar"
            className="border border-yellow-400 text-yellow-400 px-6 py-2 rounded-full"
          >
            {t("home.btnDuas")}
          </Link>
        </div>
      </section>

      {/* INFO CARDS */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-4 py-16">
        {["calendar", "dua", "wisdom"].map((item) => (
          <div
            key={item}
            className="bg-green-900/40 border border-green-700 rounded-xl p-6 text-center"
          >
            <h3 className="text-xl font-semibold text-yellow-400">
              {t(`home.cards.${item}Title`)}
            </h3>
            <p className="mt-2 text-gray-300">
              {t(`home.cards.${item}Desc`)}
            </p>
          </div>
        ))}
      </section>

      {/* TODAY — SURXONDARYO */}
      <section className="max-w-md mx-auto bg-green-900/50 border border-green-700 rounded-xl p-6 text-center mb-20">
        <h3 className="text-xl font-semibold text-yellow-400 mb-4">
          {t("home.today.title")}
        </h3>

        {/* District select */}
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="w-full mb-4 bg-green-950 border border-green-700 rounded-lg px-3 py-2 text-white"
        >
          {surxondaryoDistricts.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <div className="flex justify-between text-gray-200">
          <span>{t("home.today.saharlik")}</span>
          <span>04:30</span>
        </div>

        <div className="mt-2 flex justify-between text-gray-200">
          <span>{t("home.today.iftorlik")}</span>
          <span>18:55</span>
        </div>

        <p className="mt-4 text-sm text-gray-400">
          {t("home.today.note")}
        </p>
      </section>

    </main>
  );
};

export default Home;
