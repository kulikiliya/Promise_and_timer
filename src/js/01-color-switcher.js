
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]')
const bodyRef = document.querySelector('body')
const PROMT_DELAY = 1000;
let promtCounter = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

stopButton.disabled = true;

function changeColor(){
  const currentColor = getRandomHexColor();
  bodyRef.style.backgroundColor = currentColor;
}

startButton.addEventListener('click', () => {
    promtCounter = setInterval(changeColor, PROMT_DELAY);
    if (promtCounter) {
      startButton.disabled = true;
      stopButton.disabled = false;
    }
})

stopButton.addEventListener('click', () => {
    clearInterval(promtCounter);
  startButton.disabled = false;
  stopButton.disabled = true;
})