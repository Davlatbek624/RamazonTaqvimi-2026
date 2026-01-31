import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MapPin, Sun, Moon, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const SURXON_DISTRICTS = [
  { name: "Termiz", api: "Termez" },
  { name: "Denov", api: "Denau" },
  { name: "Sherobod", api: "Sherabad" },
  { name: "Jarqo'rg'on", api: "Jarqurghon" },
  { name: "Sho'rchi", api: "Shurchi" },
  { name: "Sariosiyo", api: "Sariosiyo" },
];

const Taqvim = () => {
  const { t } = useTranslation();
  const [days, setDays] = useState([]);
  const [district, setDistrict] = useState("Termez");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFullRamadan = async () => {
      setLoading(true);
      try {
        // 1. Fevral va Mart oylari uchun parallel so'rov yuboramiz
        const [febRes, marRes] = await Promise.all([
          axios.get(`https://api.aladhan.com/v1/calendarByCity/2026/2?city=${district}&country=Uzbekistan&school=1`),
          axios.get(`https://api.aladhan.com/v1/calendarByCity/2026/3?city=${district}&country=Uzbekistan&school=1`)
        ]);

        // 2. Fevraldan 18-sanasidan boshlab olamiz
        const febDays = febRes.data.data.filter(day => parseInt(day.date.gregorian.day) >= 18);
        
        // 3. Martdan 19-sanasigacha (Ramazon tugashigacha) olamiz
        const marDays = marRes.data.data.filter(day => parseInt(day.date.gregorian.day) <= 19);

        // 4. Ikkalasini birlashtiramiz (Jami 30 kun bo'ladi)
        setDays([...febDays, ...marDays]);
      } catch (err) {
        console.error("Xatolik:", err);
      }
      setLoading(false);
    };

    fetchFullRamadan();
  }, [district]);

  return (
    <div className="min-h-screen bg-[#041d14] text-slate-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header - Tumanni tanlash */}
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
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="pl-10 pr-10 py-3 bg-green-900/30 border border-white/10 rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all cursor-pointer backdrop-blur-md"
            >
              {SURXON_DISTRICTS.map((d) => (
                <option key={d.api} value={d.api} className="bg-[#041d14]">
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Jadval Sarlavhasi */}
        <div className="hidden md:grid grid-cols-4 gap-4 p-5 bg-yellow-600/10 rounded-t-3xl border border-white/5 font-bold text-yellow-500 uppercase text-xs tracking-widest">
          <div>Ramazon</div>
          <div>Sana</div>
          <div className="flex items-center gap-2 text-blue-400"><Sun size={16}/> {t("home.today.saharlik")}</div>
          <div className="flex items-center gap-2 text-orange-400"><Moon size={16}/> {t("home.today.iftorlik")}</div>
        </div>

        {/* Ro'yxat */}
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
                transition={{ delay: i * 0.02 }} // 30 kun tez chiqishi uchun delay kamaytirildi
                key={i}
                className={`grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl border transition-all items-center ${
                    // Bugungi kunni belgilash (oddiyroq mantiq)
                    new Date().getDate() === parseInt(day.date.gregorian.day) && (new Date().getMonth() + 1) === parseInt(day.date.gregorian.month.number)
                    ? "bg-yellow-500/20 border-yellow-500/50 shadow-lg shadow-yellow-500/5" 
                    : "bg-white/5 border-white/5 hover:bg-white/10"
                }`}
              >
                <div className="flex flex-col">
                    <span className="text-yellow-500 font-black text-xl">{i + 1}</span>
                    <span className="text-[10px] uppercase opacity-40">Ramazon</span>
                </div>

                <div className="flex flex-col md:items-start items-end">
                    <span className="text-sm font-semibold">{day.date.gregorian.day}-{day.date.gregorian.month.en.slice(0,3)}</span>
                    <span className="text-[10px] opacity-40 uppercase">{day.date.gregorian.weekday.en}</span>
                </div>

                <div className="flex flex-col items-start gap-1">
                   <span className="md:hidden text-[9px] uppercase font-bold text-blue-400">{t("home.today.saharlik")}</span>
                   <span className="text-2xl font-mono tracking-tighter text-blue-100">{day.timings.Fajr.slice(0, 5)}</span>
                </div>

                <div className="flex flex-col md:items-start items-end gap-1">
                   <span className="md:hidden text-[9px] uppercase font-bold text-orange-400">{t("home.today.iftorlik")}</span>
                   <span className="text-2xl font-mono tracking-tighter text-orange-400">{day.timings.Maghrib.slice(0, 5)}</span>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Duolar tugmasi */}
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