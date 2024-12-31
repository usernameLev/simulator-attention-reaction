let colors = ['yellow', 'orange', 'red'];
let timerValue = 30; // Устанавливаем время в 30 секунд
let intervalId = null;

// Объект для хранения счетчиков нажатий по цветам
let colorClickCounts = {
  yellow: 0,
  orange: 0,
  red: 0,
};

// Переменная для общего количества кликов
let totalClicks = 0;

// Флаг для отслеживания состояния игры
let isGameActive = false;

const colorBox = document.getElementById('color-box');
const timerDisplay = document.getElementById('timer');
const startPauseBtn = document.getElementById('startPauseBtn');
const stopBtn = document.getElementById('stopBtn');

// Устанавливаем tabindex для colorBox
colorBox.setAttribute('tabindex', '0'); // Позволяет фокусироваться на элементе

function changeColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  colorBox.style.backgroundColor = colors[randomIndex];
}

function startGame() {
  if (isGameActive) return; // Если игра уже активна, ничего не делаем

  isGameActive = true; // Игра активна
  intervalId = setInterval(() => {
    changeColor();
    timerValue -= 0.5;

    if (timerValue <= 0) {
      clearInterval(intervalId);
      timerValue = 0; // Устанавливаем таймер в ноль
      timerDisplay.textContent = ' ' + timerValue;
      timerDisplay.style.color = 'red'; // Цвет таймера при завершении
      isGameActive = false; // Игра завершена
      startPauseBtn.textContent = 'Начать заново?'; // Меняем текст кнопки
    } else {
      timerDisplay.textContent = ' ' + Math.ceil(timerValue); // Обновляем отображение таймера

      // Изменяем цвет таймера на зеленый, если осталось 30 секунд
      if (Math.ceil(timerValue) <= 10) {
        timerDisplay.style.color = 'red';
      } else {
        timerDisplay.style.color = 'black'; // Возвращаем цвет обратно, если больше 30 секунд
      }
    }
  }, 500);

  startPauseBtn.textContent = 'Пауза';
}

function pauseGame() {
  clearInterval(intervalId);
  intervalId = null;
  isGameActive = false; // Игра приостановлена
  startPauseBtn.textContent = 'Продолжить'; // Меняем текст кнопки
}

function resumeGame() {
  if (isGameActive) return; // Если игра уже активна, ничего не делаем

  isGameActive = true; // Возобновляем игру
  startPauseBtn.textContent = 'Пауза'; // Меняем текст кнопки

  intervalId = setInterval(() => {
    changeColor();
    timerValue -= 0.5;

    if (timerValue <= 0) {
      clearInterval(intervalId);
      timerValue = 0;
      timerDisplay.textContent = ' ' + timerValue;
      isGameActive = false;
      startPauseBtn.textContent = 'Начать заново?'; // Меняем текст кнопки
    } else {
      timerDisplay.textContent = ' ' + Math.ceil(timerValue);
    }
  }, 500);
}

function stopGame() {
  clearInterval(intervalId);
  intervalId = null; // Устанавливаем intervalId в null
  isGameActive = false; // Игра остановлена
}

function resetGame() {
  colorBox.style.backgroundColor = 'gray'; // Сбрасываем цвет области

  timerValue = 30; // Сбрасываем таймер на новое начало

  colorClickCounts.yellow = 0;
  colorClickCounts.orange = 0;
  colorClickCounts.red = 0;

  totalClicks = 0;

  updateColorClickCountsDisplay();

  timerDisplay.textContent = ' ' + timerValue; // Обновляем отображение таймера
  timerDisplay.style.color = 'black'; // Сбрасываем цвет таймера на черный

  startPauseBtn.textContent = 'Начать'; // Сброс текста кнопки на "Начать"
}

function updateColorClickCountsDisplay() {
  const yellowCountDisplay = document.getElementById('yellowCount');
  const orangeCountDisplay = document.getElementById('orangeCount');
  const redCountDisplay = document.getElementById('redCount');

  yellowCountDisplay.textContent = `Желтый: ${colorClickCounts.yellow}`;
  orangeCountDisplay.textContent = `Оранжевый: ${colorClickCounts.orange}`;
  redCountDisplay.textContent = `Красный: ${colorClickCounts.red}`;

  const totalClicksDisplay = document.getElementById('totalClicks');
  totalClicksDisplay.textContent = `Всего кликов: ${totalClicks}`;
}

// Обработчик клика по цветной области
colorBox.addEventListener('click', () => {
  handleColorBoxClick();
});

// Обработчик клавиатурных событий
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    handleColorBoxClick();
  } else if (event.key === ' ') {
    handleColorBoxClick();
  }
});

function handleColorBoxClick() {
  if (isGameActive && timerValue > 0) {
    const currentColor = colorBox.style.backgroundColor;
    colorClickCounts[currentColor]++;
    totalClicks++;
    updateColorClickCountsDisplay();
  }
}

// Обработчики событий для кнопок управления игрой
startPauseBtn.addEventListener('click', () => {
  if (!isGameActive) {
    if (startPauseBtn.textContent === 'Начать заново?') {
      resetGame();
    } else {
      startGame();
      timerDisplay.textContent = ' ' + Math.ceil(timerValue);
    }
  } else if (startPauseBtn.textContent === 'Пауза') {
    pauseGame();
    return;
  } else {
    resumeGame();
    timerDisplay.textContent = ' ' + Math.ceil(timerValue);
  }
});

// Обработчик события для кнопки "Стоп"
stopBtn.addEventListener('click', () => {
  stopGame();
  resetGame();
});
