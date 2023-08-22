import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const inputField = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysScore = document.querySelector('[data-days]');
const hoursScore = document.querySelector('[data-hours]');
const minutesScore = document.querySelector('[data-minutes]');
const secondsScore = document.querySelector('[data-seconds]');    
let timeId = null;
// Конвертация в дату в формате days, hours, minutes, seconds

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
    // убираем count <0 + убирает баг, когда с работающей функцией может уйти в минусовые значения - решение из гпт
    if (days < 0 || hours < 0 || minutes < 0 || seconds < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }


  return { days, hours, minutes, seconds };
}
// Функиця - добавляет 0 в начало нашего числа
const addLeadingZero = value => String(value).padStart(2, 0);


// изначальное состояние кнопки
startButton.setAttribute('disabled', true)

Notiflix.Notify.init({
  width: '280px',
  position: 'left-bottom',
  distance: '10px',
  opacity: 1,
});


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
    //   проверка на валидную дату
    if (selectedDates[0] < options.defaultDate) {
        
        Notiflix.Notify.failure('Please choose a date in the future');
          startButton.setAttribute('disabled', true)
          return;
      }
      startButton.removeAttribute('disabled')

    //   обратный таймер
      const timer = () => {
          const currentDate = new Date();
          const selectedDate = selectedDates[0];
          const delta = selectedDate - currentDate;
          const { days, hours, minutes, seconds } = convertMs(delta);

    //   отображаем на странице
          daysScore.textContent = days;
          hoursScore.textContent = addLeadingZero(hours);
          minutesScore.textContent = addLeadingZero(minutes);
          secondsScore.textContent = addLeadingZero(seconds);
      };
    
    const startTimer = () => {
      startButton.setAttribute('disabled', true);
      inputField.setAttribute('disabled', true);
        // Чистим таймер
    if (timeId) {
        clearInterval(timeId);
        };
// запускаем отображение 
    timer();
    // запускаем интервал и стопаем , когда доберемся до 0
    timeId = setInterval(() => {
        timer();
        if (secondsScore.textContent === '00' && 
          hoursScore.textContent === '00' &&
          minutesScore.textContent === '00' &&
          daysScore.textContent === '0'
      ) {
            clearInterval(timeId);
        }
    }, 1000);
};

      startButton.addEventListener('click', startTimer);
    
    
  },
};

// вызов флэтпикера
flatpickr(inputField, options);

// test