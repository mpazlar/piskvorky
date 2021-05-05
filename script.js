'use strict';
console.log('Funguje');

let player = 'circle';

const hrajeEl = document.querySelector('#naRade');
const btnsEl = document.querySelectorAll('.hraci_pole');

// Funkční verze 1
//   const switchPayer = function (btnPressed) {
//   btnPressed.classList.add(`board__field--${player}`);
//   player = player === 'circle' ? 'cross' : 'circle';
//   hrajeEl.src = `images/${player}.svg`;
//   console.log(hrajeEl);
//   hrajeEl.alt = `${player === 'circle' ? 'Kolečko' : 'Křížek'}`;
// };

// btnsEl.forEach((btnPressed) => {
//   btnPressed.addEventListener('click', function () {
//     switchPayer(btnPressed);
//   });
// });

//Funkční verze 2 - lepší
const myScript = function (btnPressed) {
  btnPressed.classList.add(`board__field--${player}`);
  btnPressed.setAttribute('disabled', '');

  player = player === 'circle' ? 'cross' : 'circle';
  hrajeEl.src = `images/${player}.svg`;

  hrajeEl.alt = `${player === 'circle' ? 'Kolečko' : 'Křížek'}`;
};

btnsEl.forEach((btnPressed) => {
  btnPressed.addEventListener('click', function () {
    myScript(btnPressed);
  });
});
