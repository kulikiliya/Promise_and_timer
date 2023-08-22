import Notiflix from 'notiflix';

const firstDelay = document.querySelector('[name="delay"]');
const delayStep = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]')
const form = document.querySelector('.form')

// создаем промис , который принимает в себя переменные функции createPromise
// добавляем setTimeout, время = delay
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3; // рандомизатор для true или false
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
}

function onSubmitForm(event) {
  event.preventDefault() 

  let delayValue = firstDelay.value * 1; // первая задержка
  let stepValue = delayStep.value * 1; // доп дилей 
  let amountValue = amount.value * 1; // количество запросов - сколько раз мы вызываем функцию 
 
  if (delayValue <  0 || stepValue < 0 || amountValue < 0) {
    Notiflix.Notify.failure("Error")
  } else {
    // перебираем запросы
    for (let i = 1; i <= amountValue; i += 1) {
      let promiseValue = delayValue + stepValue * (i - 1); //считаем тотал задержку , которая идет потом как переменная для промиса. шаг i - position
    createPromise(i, promiseValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  }
} 

form.addEventListener('submit', onSubmitForm)