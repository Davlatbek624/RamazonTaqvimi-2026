import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X, ArrowRight, Newspaper, Sparkles } from "lucide-react";

const NEWS_CONTENT = {
  uz: [
    { id: 1, title: "Ramazon - poklanish oyi", fullText: "Ramazon oyi nafaqat jismoniy, balki ma'naviy poklanish davridir. Bu oyda qilinadigan har bir xayrli amalning savobi ko'paytirib beriladi. Surxondaryo viloyatining barcha masjidlarida taroze namozlariga tayyorgarlik ko'rilmoqda. Ma'naviy yuksalishda davom eting!", date: "2026-02-18", tag: "Ma'rifat" },
    { id: 2, title: "Saharlikning shifobaxsh xususiyatlari", fullText: "Saharlik qilish sunnat amal bo'lib, unda katta baraka bor. Tibbiyot mutaxassislari saharlikda murakkab uglevodlar (bo'tqalar), xurmo va ko'proq suv ichishni tavsiya qilishadi. Bu kun davomida organizmning tetik turishini ta'minlaydi.", date: "2026-02-19", tag: "Salomatlik" },
    { id: 3, title: "Iftorlik duosi va uning fazilati", fullText: "Iftor vaqti duo ijobat bo'ladigan damdir. Duo: 'Allohumma laka sumtu va bika amantu va 'alayka tavakkaltu va 'ala rizqika aftartu'. Ma'nosi: 'Allohim, Sen uchun ro'za tutdim, Senga iymon keltirdim va Senga tavakkal qildim va bergan rizqing bilan iftor qildim'.", date: "2026-02-20", tag: "Duo" },
    { id: 4, title: "Qur'on tilovati - Ramazon ziynati", fullText: "Ramazon - Qur'on oyidir. Har kuni kamida bir pora yoki bir necha sahifa Qur'on o'qish qalbni nurlantiradi. Bu oyda Qur'onni tushunib o'qish va unga amal qilish eng oliy maqsadlardan biridir.", date: "2026-02-21", tag: "Ibodat" },
    { id: 5, title: "Zakot va Fitr sadaqasi miqdori", fullText: "2026-yil uchun zakot nisobi va fitr sadaqasi miqdorlari e'lon qilindi. Fitr sadaqasini Ramazon hayitidan oldin berish, ro'zadagi kamchiliklarga kafforat bo'ladi va miskinlar ko'nglini ko'taradi.", date: "2026-02-22", tag: "Fiqh" },
    { id: 6, title: "Sila-i rahm: Qarindoshlar bilan aloqa", fullText: "Ramazon oyida arazlashganlar bilan yarashish va qarindoshlarni ziyorat qilish katta ajrga ega. Birinchi bo'lib qadam tashlagan kishi Alloh huzurida suyukliroqdir. Yaqinlaringizga qo'ng'iroq qiling yoki xabar yuboring.", date: "2026-02-23", tag: "Odob" },
    { id: 7, title: "Laylatul Qadr kechasini izlang", fullText: "Ramazonning oxirgi o'n kunligida ming oydan afzal bo'lgan Qadr kechasi yashiringan. Bu kechalarni bedor o'tkazish va ko'p duo qilish gunohlarning kechirilishiga sabab bo'ladi.", date: "2026-02-24", tag: "Fayz" },
    { id: 8, title: "Taroze namozining ahamiyati", fullText: "Taroze namozi Ramazon oyining maxsus ibodati bo'lib, jamoat bilan o'qish sunnatdir. Bu namoz mo'minning iymonini mustahkamlaydi va jismoniy charchoqni ma'naviy huzurga aylantiradi.", date: "2026-02-25", tag: "Ibodat" },
    { id: 9, title: "Xayr-ehson qilishning barakasi", fullText: "Ramazonda qilingan ehsonning barakasi bo'lakcha. Faqat pul bilan emas, balki shirin so'z, tabassum va yordamga muhtojlarga ko'maklashish bilan ham ehson qilish mumkin.", date: "2026-02-26", tag: "Ehson" },
    { id: 10, title: "Ramazonning so'nggi kunlari", fullText: "Ramazon oyi g'animatdir. Oxirgi kunlarda ibodatlarni yanada ko'paytirish, ko'p istig'for aytish tavsiya etiladi. 'Subhanallohi va bihamdihi' tasbehini ko'p takrorlang.", date: "2026-02-27", tag: "Tavsiya" }
  ],
  uz_kr: [
    { id: 1, title: "Рамазон - покланиш ойи", fullText: "Рамазон ойи нафақат жисмоний, балки маънавий покланиш давридир. Бу ойда қилинадиган ҳар бир хайрли амалнинг савоби кўпайтириб берилади. Сурхондарё вилоятининг барча масжидларида тарозе намозларига тайёргарлик кўрилмоқда.", date: "2026-02-18", tag: "Маърифат" },
    { id: 2, title: "Саҳарликнинг шифобахш хусусиятлари", fullText: "Саҳарлик қилиш суннат амал бўлиб, унда катта барака бор. Тиббиёт мутахассислари саҳарликда мураккаб углеводлар (бўтқалар), хурмо ва кўпроқ сув ичишни тавсия қилишади. Бу кун давомида организмнинг тетик туришини таъминлайди.", date: "2026-02-19", tag: "Саломатлик" },
    { id: 3, title: "Ифторлик дуоси ва унинг фазилати", fullText: "Ифтор вақти дуо ижобат бўладиган дамдир. Дуо: 'Аллоҳумма лака сумту ва бика аманту ва 'алайка таваккалту ва 'ала ризқиқа афтарту'. Маъноси: 'Аллоҳим, Сен учун рўза тутдим, Сенга иймон келтирдим ва Сенга таваккал қилдим ва берган ризқинг билан ифтор қилдим'.", date: "2026-02-20", tag: "Дуо" },
    { id: 4, title: "Қуръон тиловати - Рамазон зийнати", fullText: "Рамазон - Қуръон ойидир. Ҳар куни камида бир пора ёки бир неcha саҳифа Қуръон ўқиш қалбни нурлантиради. Бу ойда Қуръонни тушуниб ўқиш ва унга амал қилиш энг олий мақсадлардан биридир.", date: "2026-02-21", tag: "Ибодат" },
    { id: 5, title: "Закот ва Фитр садақаси миқдори", fullText: "2026-йил учун закот нисоби ва фитр садақаси миқдорлари эълон қилинди. Фитр садақасини Рамазон ҳайитидан олдин бериш, рўзадаги камчиликларга каффорат бўлади ва мискинлар кўнглини кўтаради.", date: "2026-02-22", tag: "Фиқҳ" },
    { id: 6, title: "Сила-и раҳм: Қариндошлар билан алоқа", fullText: "Рамазон ойида аразлашганлар билан ярашиш ва қариндошларни зиёрат қилиш катта ажрга эга. Биринчи бўлиб қадам ташлаган киши Аллоҳ ҳузурида суюклироқдир.", date: "2026-02-23", tag: "Одоб" },
    { id: 7, title: "Лайлатул Қадр кечасини изланг", fullText: "Рамазоннинг охирги ўн кунлигида минг ойдан афзал бўлган Қадр кечаси яширинган. Бу кечаларни бедор ўтказиш ва кўп дуо қилиш гуноҳларнинг кечирилишига сабаб бўлади.", date: "2026-02-24", tag: "Файз" },
    { id: 8, title: "Тарозе намозининг аҳамияти", fullText: "Тарозе намози Рамазон ойининг махсус ибодати бўлиб, жамоат билан ўқиш суннатдир. Бу намоз мўминнинг иймонини мустаҳкамлайди ва жисмоний чарчоқни маънавий ҳузурга айлантиради.", date: "2026-02-25", tag: "Ибодат" },
    { id: 9, title: "Хайр-эҳсон қилишнинг баракаси", fullText: "Рамазонда қилинган эҳсоннинг баракаси бўлакча. Фақат пул билан эмас, балки ширин сўз, табассум ва ёрдамга муҳтожларга кўмаклашиш билан ҳам эҳсон қилиш мумкин.", date: "2026-02-26", tag: "Эҳсон" },
    { id: 10, title: "Рамазоннинг сўнгги кунлари", fullText: "Рамазон ойи ғаниматдир. Охирги кунларда ибодатларни янада кўпайтириш, кўп истиғфор айтиш тавсия этилади. 'Субҳаналлоҳи ва биҳамдиҳи' тасбеҳини кўп такрорланг.", date: "2026-02-27", tag: "Тавсия" }
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