import { useTranslation } from "react-i18next";

const Duolar = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-xl mx-auto text-white px-4 mb-20">
      <h1 className="text-3xl text-yellow-400 my-6">
        {t("titles.duolar")}
      </h1>

      <div className="bg-green-900/40 p-4 rounded mb-4">
        <h3 className="text-yellow-400">
          {t("duas.saharlik.title")}
        </h3>
        <p className="mt-2">{t("duas.saharlik.text")}</p>
      </div>

      <div className="bg-green-900/40 p-4 rounded">
        <h3 className="text-yellow-400">
          {t("duas.iftorlik.title")}
        </h3>
        <p className="mt-2">{t("duas.iftorlik.text")}</p>
      </div>
    </div>
  );
};

export default Duolar;
