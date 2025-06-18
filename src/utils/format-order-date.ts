// src/utils/format-order-date.ts

export function formatOrderDate(date: Date): string {
  const now = new Date();
  // Обнуляем время у dates для подсчёта разницы в днях
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const startOfOrder = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const msInDay = 24 * 60 * 60 * 1000;
  const dayDiff = Math.floor(
    (startOfToday.getTime() - startOfOrder.getTime()) / msInDay
  );

  let dayLabel: string;
  if (dayDiff === 0) {
    dayLabel = 'Сегодня';
  } else if (dayDiff === 1) {
    dayLabel = 'Вчера';
  } else {
    dayLabel = `${dayDiff} дней назад`;
  }

  const hh = date.getHours().toString().padStart(2, '0');
  const mm = date.getMinutes().toString().padStart(2, '0');

  return `${dayLabel}, ${hh}:${mm}`;
}
