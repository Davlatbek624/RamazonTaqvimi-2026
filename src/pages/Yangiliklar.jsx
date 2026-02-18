import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X, ArrowRight, Newspaper, Sparkles } from "lucide-react";

const NEWS_CONTENT = {
  uz: [
    { id: 1, title: "Ramazon – sabr va taqvo oyi", fullText: "Ramazon oyida sabr, taqvo va ixlos yanada mustahkamlanadi. Har bir amal niyatga qarab baholanadi.", date: "2026-02-18", tag: "Ma'rifat" },
    { id: 2, title: "Ro‘zaning inson ruhiyatiga ta’siri", fullText: "Ro‘za nafaqat tanani, balki qalbni ham poklaydi. U insonni nafs ustidan g‘alaba qilishga o‘rgatadi.", date: "2026-02-19", tag: "Ma'naviyat" },
    { id: 3, title: "Saharlikni o‘tkazib yubormang", fullText: "Saharlikda baraka bor. Hatto bir qultum suv bilan bo‘lsa ham saharlik qilish tavsiya etiladi.", date: "2026-02-20", tag: "Salomatlik" },
    { id: 4, title: "Iftorni vaqtida ochish fazilati", fullText: "Payg‘ambarimiz ﷺ iftorni shoshilinch ochishni tavsiya qilganlar. Bu sunnat amal hisoblanadi.", date: "2026-02-21", tag: "Sunnat" },
    { id: 5, title: "Qur’on oyida Qur’on bilan bo‘ling", fullText: "Ramazon Qur’on nozil bo‘lgan oy. Har kuni kamida bir necha oyat o‘qish qalbni yoritadi.", date: "2026-02-22", tag: "Ibodat" },

    { id: 6, title: "Taroveh – Ramazon ziynati", fullText: "Taroveh namozi Ramazon kechalariga fayz bag‘ishlaydi. Jamoat bilan o‘qilishi sunnatdir.", date: "2026-02-23", tag: "Ibodat" },
    { id: 7, title: "Zakot – jamiyat pokligi", fullText: "Zakot boylikni poklaydi va kambag‘allar haqqini ado etadi.", date: "2026-02-24", tag: "Fiqh" },
    { id: 8, title: "Fitr sadaqasi kimlarga beriladi", fullText: "Fitr sadaqasi muhtojlarga beriladi va ro‘zadagi kamchiliklarga kafforat bo‘ladi.", date: "2026-02-25", tag: "Fiqh" },
    { id: 9, title: "Qadr kechasini g‘animat biling", fullText: "Qadr kechasi ming oydan afzal. Bu kechani ibodat bilan o‘tkazish ulkan savobdir.", date: "2026-02-26", tag: "Fayz" },
    { id: 10, title: "Ro‘zadorning duosi rad etilmaydi", fullText: "Ro‘zador iftor payti qilgan duosi ijobat bo‘lishiga va’da qilingan.", date: "2026-02-27", tag: "Duo" },

    { id: 11, title: "Sabr – ro‘zaning kaliti", fullText: "Ochlik va chanqoqlik sabrni kuchaytiradi va iymonni mustahkamlaydi.", date: "2026-02-28", tag: "Tavsiya" },
    { id: 12, title: "Tilni g‘iybatdan saqlang", fullText: "Ro‘za faqat och yurish emas, balki yomon so‘zlardan tiyilishdir.", date: "2026-03-01", tag: "Odob" },
    { id: 13, title: "Bolalarga Ramazonni taniting", fullText: "Ramazon bolalar tarbiyasida muhim ahamiyatga ega. Ularga mehr bilan tushuntiring.", date: "2026-03-02", tag: "Tarbia" },
    { id: 14, title: "Sadaqa baloni qaytaradi", fullText: "Yashirin berilgan sadaqa Allohning g‘azabini o‘chiradi.", date: "2026-03-03", tag: "Ehson" },
    { id: 15, title: "Ota-onani rozi qiling", fullText: "Ramazon ota-onaga xizmat qilish uchun eng yaxshi fursatdir.", date: "2026-03-04", tag: "Odob" },

    { id: 16, title: "Ro‘za sog‘liq uchun foydali", fullText: "Shifokorlar ro‘zaning organizmni tozalashdagi foydasini ta’kidlashadi.", date: "2026-03-05", tag: "Salomatlik" },
    { id: 17, title: "Ko‘p istig‘for ayting", fullText: "Ramazon mag‘firat oyi. Istig‘for qalbni poklaydi.", date: "2026-03-06", tag: "Tavsiya" },
    { id: 18, title: "Masjidlarni to‘ldiring", fullText: "Ramazonda masjidlar mo‘minlar bilan to‘ladi va jamoat ruhi mustahkamlanadi.", date: "2026-03-07", tag: "Ibodat" },
    { id: 19, title: "Yolg‘on ro‘zani buzadi", fullText: "Yolg‘on, g‘iybat va tuhmat ro‘zaning savobini kamaytiradi.", date: "2026-03-08", tag: "Ogohlantirish" },
    { id: 20, title: "Ramazon – imkoniyat oyi", fullText: "Bu oyda o‘zingizni o‘zgartirish va yaxshilikka odatlanish mumkin.", date: "2026-03-09", tag: "Ma'naviyat" },

  ],

  uz_kr: [
    { id: 1, title: "Рамазон – сабр ва тақво ойи", fullText: "Рамазон ойида сабр, тақво ва ихлос мустаҳкамланади.", date: "2026-02-18", tag: "Маърифат" },
    { id: 2, title: "Рўзанинг руҳиятга таъсири", fullText: "Рўза инсонни нафс устидан ғалаба қилишга ўргатади.", date: "2026-02-19", tag: "Маънавият" },
    { id: 3, title: "Саҳарликда барака бор", fullText: "Ҳатто бир қултум сув билан бўлса ҳам саҳарлик қилиш суннатдир.", date: "2026-02-20", tag: "Саломатлик" },
    { id: 4, title: "Ифторни шошиб очиш", fullText: "Ифторни ўз вақтида очиш Пайғамбаримиз ﷺ суннатларидандир.", date: "2026-02-21", tag: "Суннат" },
    { id: 5, title: "Қуръон ойида Қуръон билан бўлинг", fullText: "Рамазон – Қуръон нозил бўлган ойдир.", date: "2026-02-22", tag: "Ибодат" },

    { id: 6, title: "Таровеҳ – Рамазон зийнати", fullText: "Таровеҳ намози Рамазон кечаларига файз бағишлайди.", date: "2026-02-23", tag: "Ибодат" },
    { id: 7, title: "Закот – жамият поклиги", fullText: "Закот бойликни поклайди ва камбағаллар ҳаққини адо этади.", date: "2026-02-24", tag: "Фиқҳ" },
    { id: 8, title: "Фитр садақаси кимларга берилади", fullText: "Фитр садақаси муҳтожларга берилади ва рўзадаги камчиликларга каффорат бўлади.", date: "2026-02-25", tag: "Фиқҳ" },
    { id: 9, title: "Қадр кечасини ғанимат билинг", fullText: "Қадр кечаси минг ойдан афзал. Бу кечани ибодат билан ўтказиш улкан савобдир.", date: "2026-02-26", tag: "Файз" },
    { id: 10, title: "Рўзадорнинг дуоси рад этилмайди", fullText: "Рўзадор ифтор пайти қилган дуоси ижобат бўлишига ваъда қилинган.", date: "2026-02-27", tag: "Дуо" },
    { id: 11, title: "Сабр – рўзанинг калити", fullText: "Очлик ва чанқоқлик сабрни кучайтиради ва иймонни мустаҳкамлайди.", date: "2026-02-28", tag: "Тавсия" },
    { id: 12, title: "Тилни ғийбатдан сақланг", fullText: "Рўза фақат оч юриш эмас, балки ёмон сўзлардан тийилишдир.", date: "2026-03-01", tag: "Одоб" },
    { id: 13, title: "Болаларга Рамазонни танитинг", fullText: "Рамазон болалар тарбиясида муҳим аҳамиятга эга. Уларга меҳр билан тушунтиринг.", date: "2026-03-02", tag: "Тарбия" },
    { id: 14, title: "Садақа балони қайтаради", fullText: "Яширин берилган садақа Аллоҳнинг ғазабини ўчиради.", date: "2026-03-03", tag: "Эҳсон" },
    { id: 15, title: "Ота-онани рози қилинг", fullText: "Рамазон ота-онага хизмат қилиш учун энг яхши фурсатдир.", date: "2026-03-04", tag: "Одоб" },
    { id: 16, title: "Рўза соғлиқ учун фойдали", fullText: "Шифокорлар рўзанинг организмни тозалашдаги фойдасини таъкидлашади.", date: "2026-03-05", tag: "Саломатлик" },
    { id: 17, title: "Кўп истиғфор айтиң", fullText: "Рамазон мағфират ойи. Истиғфор қалбни поклайди.", date: "2026-03-06", tag: "Тавсия" },
    { id: 18, title: "Масжидларни тўлдиринг", fullText: "Рамазонда масжидлар мўминлар билан тўлади ва жамоат руҳи мустаҳкамланади.", date: "2026-03-07", tag: "Ибодат" },
    { id: 19, title: "Ёлғон рўзани бузади", fullText: "Ёлғон, ғийбат ва тухмат рўзанинг савобини камайтиради.", date: "2026-03-08", tag: "Огоҳлантириш" },
    { id: 20, title: "Рамазон – имконият ойи", fullText: "Бу ойда ўзингизни ўзгартириш ва яхшиликка одатланиш мумкин.", date: "2026-03-09", tag: "Маънавият" }
  ]
};      


const Yangiliklar = () => {
  const { t, i18n } = useTranslation();
  const [selectedNews, setSelectedNews] = useState(null);
  const currentLang = i18n.language === "uz" ? "uz" : "uz_kr";
  const news = NEWS_CONTENT[currentLang] || NEWS_CONTENT.uz;

  return (
    <div className="min-h-screen bg-[#02150f] py-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-16">
          <Sparkles className="text-yellow-500 mx-auto mb-4" size={32} />
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
            {t("titles.yangiliklar")}
          </h1>
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.map((item) => (
            <motion.div
              key={item.id}
              layoutId={`card-${item.id}`}
              onClick={() => setSelectedNews(item)}
              className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] cursor-pointer hover:bg-white/10 transition-all group"
            >
              <div className="flex justify-between items-center mb-4 text-[10px] font-black uppercase tracking-widest text-yellow-500/60">
                <span>{item.tag}</span>
                <span className="flex items-center gap-1"><Calendar size={12} /> {item.date}</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                {item.title}
              </h2>
              <p className="text-white/40 line-clamp-2 text-sm">{item.fullText}</p>
              <div className="mt-6 flex items-center gap-2 text-yellow-500 text-xs font-black uppercase">
                Batafsil <ArrowRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal - Batafsil ma'lumot */}
        <AnimatePresence>
          {selectedNews && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div
                layoutId={`card-${selectedNews.id}`}
                className="bg-[#042d1e] border border-white/10 p-8 md:p-12 rounded-[3rem] max-w-2xl w-full relative shadow-2xl"
              >
                <button
                  onClick={() => setSelectedNews(null)}
                  className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="flex items-center gap-3 text-yellow-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                  <Newspaper size={16} />
                  {selectedNews.tag}
                </div>

                <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                  {selectedNews.title}
                </h2>

                <div className="flex items-center gap-2 text-white/30 text-sm mb-8 border-b border-white/5 pb-4">
                  <Calendar size={16} />
                  {selectedNews.date}
                </div>

                <p className="text-white/80 text-lg leading-relaxed italic">
                  {selectedNews.fullText}
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedNews(null)}
                  className="mt-10 w-full py-4 bg-yellow-600 hover:bg-yellow-500 text-black font-black uppercase rounded-2xl transition-colors shadow-lg shadow-yellow-900/20"
                >
                  Yopish
                </motion.button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Yangiliklar;