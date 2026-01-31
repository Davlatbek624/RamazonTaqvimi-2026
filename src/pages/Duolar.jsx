import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { BookOpenCheck } from "lucide-react";

const Duolar = () => {
  const { t } = useTranslation();
  
  // GPU tezlanishi uchun animatsiya parametrlarini soddalashtiramiz
  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  return (
    <div className="min-h-screen bg-[#041d14] py-16 px-6 flex flex-col items-center">
      {/* Sarlavha */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-linear-to-b from-yellow-200 to-yellow-600 tracking-tighter uppercase">
          {t("titles.duolar")}
        </h1>
        <div className="h-1 w-32 bg-yellow-600/30 mx-auto mt-4 rounded-full" />
      </motion.div>

      {/* Duolar Konteyneri - Ketma-ket Flex */}
      <div className="w-full max-w-4xl flex flex-col gap-10">

        {/* Saharlik Blok */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="relative overflow-hidden group border border-white/5 bg-linear-to-b from-green-900/40 to-emerald-950/40 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl will-change-transform"
        >
          {/* Dekorativ Fon nuri */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-500/10 blur-[80px] group-hover:bg-yellow-500/20 transition-all duration-700" />

          <div className="relative z-10 flex flex-col gap-6">
            <span className="text-yellow-500/60 font-bold tracking-[0.4em] uppercase text-sm">
              {t("duas.saharlik.title")}
            </span>
            <p className="text-2xl md:text-4xl text-white font-medium leading-snug italic tracking-tight">
              {t("duas.saharlik.text")}
            </p>
          </div>
        </motion.div>

        {/* Iftorlik Blok */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="relative overflow-hidden group border border-white/5 bg-linear-to-br from-emerald-950/40 to-[#02150f] backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl will-change-transform"
        >
          {/* Dekorativ Fon nuri */}
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-500/10 blur-[80px] group-hover:bg-orange-500/20 transition-all duration-700" />

          <div className="relative z-10 flex flex-col gap-6 text-right md:text-left">
            <span className="text-yellow-500/60 font-bold tracking-[0.4em] uppercase text-sm">
              {t("duas.iftorlik.title")}
            </span>
            <p className="text-2xl md:text-4xl text-white font-medium leading-snug italic tracking-tight">
              {t("duas.iftorlik.text")}
            </p>
          </div>
        </motion.div>

      </div>

      {/* Pastki eslatma */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1 }}
        className="mt-20 text-white font-light tracking-[0.5em] text-[10px] uppercase"
      >
        {t("home.today.note")}
      </motion.p>
    </div>
  );
};

export default Duolar;