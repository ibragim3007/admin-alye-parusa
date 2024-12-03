export function formatCardNumber(input: number): string {
  // Преобразуем число в строку
  const inputString = input.toString();

  // Заполняем число нулями слева до длины 16
  const paddedInput = inputString.padStart(16, '0');

  // Группируем числа в блоки по 4
  const formattedNumber = paddedInput.replace(/(\d{4})/g, '$1 ').trim();

  return formattedNumber;
}

// Примеры использования:
// console.log(formatCardNumber(12345678)); // 0000 0000 1234 5678
// console.log(formatCardNumber(789));      // 0000 0000 0000 0789
// console.log(formatCardNumber(45));       // 0000 0000 0000 0045
// console.log(formatCardNumber(1234567890123456)); // 1234 5678 9012 3456
