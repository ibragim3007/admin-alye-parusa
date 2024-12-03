export function formatIsoDateToLocalString(isoDate: string): string {
  const date = new Date(isoDate); // Преобразуем строку в объект Date
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
