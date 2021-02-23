const flashModal = document.querySelector('.flash-modal');
const closeFlashBtn = document.querySelector('.close-flash');
const overlay = document.querySelector('.flash-overlay');

const closeFlash = () => {
    flashModal.classList.add('hidden');
    overlay.classList.add('hidden');
}

closeFlashBtn.addEventListener('click', closeFlash);
overlay.addEventListener('click', closeFlash);