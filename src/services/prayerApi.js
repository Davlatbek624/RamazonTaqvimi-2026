export const getRamadanTimes = async (year = 2026) => {
  const url = `https://api.aladhan.com/v1/calendar/${year}?latitude=37.2242&longitude=67.2783&method=2`;

  const res = await fetch(url);
  const json = await res.json();

  // Hamma oylar
  const months = Object.values(json.data).flat();

  // Faqat Ramazon (Hijriy oy = 9)
  const ramadanDays = months.filter(
    (day) => day.date.hijri.month.number === 9
  );

  return ramadanDays; // ⬅️ ENDI ARRAY
};
