import { useEffect, useState } from "react";
import { getRamadanTimes } from "../services/prayerApi";
import { useTranslation } from "react-i18next";

const Taqvim = () => {
  const { t } = useTranslation();
  const [days, setDays] = useState([]);

  useEffect(() => {
    getRamadanTimes().then(setDays);
  }, []);

  return (
    <div className="max-w-5xl mx-auto text-white px-4">
      <h1 className="text-3xl text-yellow-400 my-6">
        {t("titles.taqvim")}
      </h1>

      <div className="grid gap-3">
        {days.map((day, i) => (
          <div key={i} className="flex justify-between bg-green-900/40 p-3 rounded">
            <span>{i + 1}-Ramazon</span>
            <span>{day.timings.Fajr.slice(0,5)}</span>
            <span>{day.timings.Maghrib.slice(0,5)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Taqvim;
