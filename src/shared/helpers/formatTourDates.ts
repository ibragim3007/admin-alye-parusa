import dayjs from 'dayjs';

export function formatTourDates(startDate: Date, endDate: Date): string {
  const formatDate = (date: Date) => dayjs(date).format('D MMMM YYYY');
  return `Тур будет проходить с ${formatDate(startDate)} по ${formatDate(endDate)}`;
}

// Пример использования
// const start = new Date(2013, 1, 12); // 12 февраля 2013
// const end = new Date(2013, 1, 21); // 21 февраля 2013
// console.log(formatTourDates(start, end));
// Вывод: Тур будет проходить с 12 февраля 2013 по 21 февраля 2013
