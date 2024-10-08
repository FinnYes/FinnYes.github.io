const bubbleContainer = document.getElementById('bubble-container');
const bubblePopSound = document.getElementById('bubble-pop-sound');
const backgroundMusic = document.getElementById('background-music');
const volumeSlider = document.getElementById('volume-slider');
const musicToggleButton = document.getElementById('music-toggle');

const bubbleImages = [
  'bubble1.png',
  'bubble2.png',
  'bubble3.png',
  'bubble4.png',
  'bubble5.png',
  'bubble6.png'
];

let isMusicPlaying = true;

// Установка начальной громкости фоновой музыки
volumeSlider.value = 0.2;
backgroundMusic.volume = volumeSlider.value;
backgroundMusic.play();

// Обработчик изменения громкости фоновой музыки
volumeSlider.addEventListener('input', () => {
  backgroundMusic.volume = volumeSlider.value;
});

// Обработчик нажатия кнопки включения/выключения музыки
musicToggleButton.addEventListener('click', () => {
  if (isMusicPlaying) {
    backgroundMusic.pause();
    musicToggleButton.textContent = 'Включить музыку';
  } else {
    backgroundMusic.play();
    musicToggleButton.textContent = 'Выключить музыку';
  }
  isMusicPlaying = !isMusicPlaying;
});

function createBubble() {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');

  // Выбор случайного изображения пузыря
  const randomIndex = Math.floor(Math.random() * bubbleImages.length);
  bubble.style.backgroundImage = `url('${bubbleImages[randomIndex]}')`;

  // Случайные координаты для появления пузыря
  bubble.style.left = `${Math.random() * (window.innerWidth - 120)}px`;
  bubble.style.bottom = '0'; // Пузырек появляется снизу экрана

  // Увеличенный размер пузырька
  const randomSize = Math.floor(Math.random() * 61) + 80; // Размер от 80 до 140 пикселей
  bubble.style.width = `${randomSize}px`;
  bubble.style.height = `${randomSize}px`;

  bubbleContainer.appendChild(bubble);

  // Обработчик событий касания и клика
  bubble.addEventListener('pointerdown', () => {
    bubblePopSound.currentTime = 0;
    bubblePopSound.play();
    bubble.classList.add('popping');
    setTimeout(() => {
      bubble.remove();
    }, 500);
  });

  // Удаление случайных пузырьков раньше времени
  setTimeout(() => {
    bubble.remove();
  }, Math.random() * 8000 + 5000); // Случайный интервал от 5 до 13 секунд

  // Анимация всплывания пузырька
  bubble.animate(
    [
      { transform: 'translateY(0)' },
      { transform: `translateY(-${window.innerHeight + 120}px)` } // Пузырек исчезает за верхним краем экрана
    ],
    {
      duration: Math.random() * 8000 + 5000, // Случайная длительность от 5 до 13 секунд
      iterations: 1, // Анимация воспроизводится один раз
      fill: 'forwards' // Пузырек остается в конечном положении
    }
  );
}

// Создание 3 пузырьков
const intervalId = setInterval(() => {
  if (bubbleContainer.children.length < 3) {
    createBubble();
  }
}, 1000);

// Остановка генерации после 3 пузырьков
setTimeout(() => {
  clearInterval(intervalId);
}, 3000);

// Создание новых пузырей каждую секунду
setInterval(createBubble, 1000);
