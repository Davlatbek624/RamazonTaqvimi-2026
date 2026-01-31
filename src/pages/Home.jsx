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
      <section className="min-h-[50vh] flex flex-col justify-center items-center text-center px-4">
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
            className="border border-yellow-400 text-yellow-400 px-6 py-2 hover:bg-yellow-500 duration-300 hover:text-green-900 rounded-full"
          >
            {t("home.btnCalendar")}
          </Link>

          <Link
            to="/duolar"
            className="border border-yellow-400 text-yellow-400 px-6 py-2 hover:bg-yellow-500 duration-300 hover:text-green-900 rounded-full"
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

     

    </main>
  );
};

export default Home;
