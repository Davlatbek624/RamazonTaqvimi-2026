import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MapPin, Sun, Moon, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// JSON faylni import qilamiz
import taqvimData from "../services/Taqvim.json";

const VILOYATLAR = [
  { name: "Toshkent", key: "Toshkent" },
  { name: "Termiz", key: "Termiz" },
  { name: "Sho'rchi", key: "Sho'rchi" },
  { name: "Qumqo'rg'on", key: "Qumqo'rg'on" },
  { name: "Uzun", key: "Uzun" },
  { name: "Oltinsoy", key: "Oltinsoy" },
  { name: "Andijon", key: "Andijon" },
  { name: "Namangan", key: "Namangan" },
  { name: "Farg‘ona", key: "Farg‘ona" },
  { name: "Marg‘ilon", key: "Marg‘ilon" },
  { name: "Xonobod", key: "Xonobod" },
  { name: "Qo‘qon", key: "Qo‘qon" },
  { name: "Angren", key: "Angren" },
  { name: "Guliston", key: "Guliston" },
  { name: "Jizzax", key: "Jizzax" },
  { name: "Samarqand", key: "Samarqand" },
  { name: "Jomboy", key: "Jomboy" },
  { name: "Kattaqo‘rg‘on", key: "Kattaqo'rg'on" },
  { name: "Qarshi", key: "Qarshi" },
  { name: "Shahrisabz", key: "Shahrisabz" },
  { name: "Denov", key: "Denov" },
  { name: "Navoiy", key: "Navoiy" },
  { name: "Nurota", key: "Nurota" },
  { name: "Buxoro", key: "Buxoro" },
  { name: "Xiva", key: "Xiva" },
  { name: "Urganch", key: "Urganch" },
  { name: "Nukus", key: "Nukus" },
  { name: "Mo‘ynoq", key: "Mo'ynoq" }
];

const Taqvim = () => {
  const { t } = useTranslation();
  const [days, setDays] = useState([]);
  const [region, setRegion] = useState("Toshkent");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const selectedData = taqvimData[region];
    if (selectedData) {
      setDays(selectedData);
    }
    setTimeout(() => setLoading(false), 500);
  }, [region]);

  // Bugungi kunni aniqlash (DD.MM.YYYY formatida)
  const isToday = (dateStr) => {
    const today = new Date();
    const d = String(today.getDate()).padStart(2, '0');
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const y = today.getFullYear();
    const formattedToday = `${d}.${m}.${y}`;
    return dateStr === formattedToday;
  };

  return (
    <div className="min-h-screen bg-[#041d14] text-slate-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6"
        >
          <h1 className="text-3xl md:text-5xl font-black text-yellow-500 uppercase tracking-tighter">
            {t("titles.taqvim")}
          </h1>

          <div className="relative group">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500 w-5 h-5" />
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="pl-10 pr-10 py-3 bg-green-900/30 border border-white/10 rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all cursor-pointer backdrop-blur-md text-white"
            >
              {VILOYATLAR.map((v) => (
                <option key={v.key} value={v.key} className="bg-[#041d14]">
                  {v.name}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Table Head */}
        <div className="hidden md:grid grid-cols-4 gap-4 p-5 bg-yellow-600/10 rounded-t-3xl border border-white/5 font-bold text-yellow-500 uppercase text-xs tracking-widest">
          <div>Ramazon</div>
          <div>Sana</div>
          <div className="flex items-center gap-2 text-blue-400"><Sun size={16} /> {t("home.today.saharlik")}</div>
          <div className="flex items-center gap-2 text-orange-400"><Moon size={16} /> {t("home.today.iftorlik")}</div>
        </div>

        {/* List */}
        <div className="flex flex-col gap-2 mt-2">
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
            </div>
          ) : (
            days.map((day, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.01 }}
                key={i}
                className={`grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl border transition-all items-center ${isToday(day.sana)
                    ? "bg-yellow-500/20 border-yellow-500/50 shadow-lg shadow-yellow-500/5"
                    : "bg-white/5 border-white/5 hover:bg-white/10"
                  }`}
              >
                <div className="flex flex-col">
                  {/* JSON dagi 'kun' kalitidan foydalanamiz */}
                  <span className="text-yellow-500 font-black text-xl">{day.kun}</span>
                  <span className="text-[10px] uppercase opacity-40">Ramazon</span>
                </div>

                <div className="flex flex-col md:items-start items-end">
                  {/* JSON dagi 'sana' kalitidan foydalanamiz */}
                  <span className="text-sm font-semibold">{day.sana}</span>
                </div>

                <div className="flex flex-col items-start gap-1">
                  <span className="md:hidden text-[9px] uppercase font-bold text-blue-400">{t("home.today.saharlik")}</span>
                  <span className="text-2xl font-mono tracking-tighter text-blue-100">{day.saharlik}</span>
                </div>

                <div className="flex flex-col md:items-start items-end gap-1">
                  <span className="md:hidden text-[9px] uppercase font-bold text-orange-400">{t("home.today.iftorlik")}</span>
                  <span className="text-2xl font-mono tracking-tighter text-orange-400">{day.iftorlik}</span>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Footer Button */}
        <motion.div className="mt-12 flex justify-center md:justify-end">
          <Link to="/duolar" className="group flex items-center gap-4 py-4 px-8 bg-yellow-600 hover:bg-yellow-500 text-black font-black rounded-2xl transition-all uppercase tracking-tighter">
            {t("home.btnDuas")}
            <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default Taqvim;