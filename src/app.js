const fs = require('fs');
const path = require('path');

const source = process.argv[2];
const destination = process.argv[3];

// 1. Перевірка на відсутність аргументів
if (!source || !destination) {
  // eslint-disable-next-line no-console
  console.error('Error: Please provide both source and destination arguments');
} else if (!fs.existsSync(source)) {
  // eslint-disable-next-line no-console
  console.error('Error: Source file does not exist');
} else {
  // Визначаємо директорію призначення (щоб перевірити, чи вона взагалі існує)
  const isExplicitDir = destination.endsWith('/') || destination.endsWith('\\');
  // Якщо шлях не закінчується слешем, отримуємо його батьківську папку
  const targetDir = isExplicitDir ? destination : path.dirname(destination);

  // 3. Перевірка, чи існує директорія, куди ми переміщуємо файл
  if (!fs.existsSync(targetDir)) {
    // eslint-disable-next-line no-console
    console.error('Error: Destination directory does not exist');
  } else {
    let finalPath = destination;

    // Якщо це директорія, додаємо ім'я файлу
    if (isExplicitDir) {
      finalPath = path.join(destination, path.basename(source));
    } else if (
      fs.existsSync(destination) &&
      fs.statSync(destination).isDirectory()
    ) {
      finalPath = path.join(destination, path.basename(source));
    }

    try {
      fs.renameSync(source, finalPath);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error.message);
    }
  }
}
