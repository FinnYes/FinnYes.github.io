const bubbleContainer = document.getElementById('bubble-container');
const bubblePopSound = document.getElementById('bubble-pop-sound');
const backgroundMusic = document.getElementById('background-music');
const volumeSlider = document.getElementById('volume-slider');
const musicToggleButton = document.getElementById('music-toggle');

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
  bubble.style.left = Math.random() * (window.innerWidth - 50) + 'px';
  bubble.addEventListener('click', () => {
    bubblePopSound.currentTime = 0;
    bubblePopSound.play();
    bubble.style.transform = 'scale(0)';
    bubbleContainer.removeChild(bubble);
  });

  bubbleContainer.appendChild(bubble);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        bubbleContainer.removeChild(bubble);
        observer.unobserve(bubble);
      }
    });
  }, { rootMargin: '100px' });
  observer.observe(bubble);

  bubble.addEventListener('mouseenter', () => {
    bubble.style.transform = 'scale(1.2)';
  });

  bubble.addEventListener('mouseleave', () => {
    bubble.style.transform = 'scale(1)';
  });

  bubble.addEventListener('touchstart', () => {
    bubblePopSound.currentTime = 0;
    bubblePopSound.play();
    bubble.style.transform = 'scale(0)';
    bubbleContainer.removeChild(bubble);
  });
}

setInterval(createBubble, 1000);
