export function getFromToDateString(date1: string, date2: string) {
  const date1DateType = new Date(date1); // Преобразуем строку в объект Date
  const str1 = date1DateType.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const date2DateType = new Date(date2); // Преобразуем строку в объект Date
  const str2 = date2DateType.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return `${str1} -> ${str2}`;
}
