'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnsCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');
console.log(btnsOpenModal); //NodeList(3) [button.show-modal, button.show-modal, button.show-modal]

const openModal = function () {
  //console.log('Button clicked');
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  // modal.getElementsByClassName.display = 'block';
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
//@@ Working With Classes
for (let i = 0; i < btnsOpenModal.length; i++) {
  console.log(btnsOpenModal[i].textContent);
  //Show modal 1
  //Show modal 2
  //Show modal 3

  //* Open modal
  btnsOpenModal[i].addEventListener('click', openModal);
}
//* Close modal
btnsCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

//@@ Handling an "Esc" Keypress Event
document.addEventListener('keydown', function (e) {
  //console.log('A key was pressed');
  console.log(e.key); //Escape
  if (e.key == 'Escape' && !modal.classList.contains('hidden')) {
    //console.log('ESC was pressed');
    closeModal();
  }
});
