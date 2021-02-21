const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const openModalBtn = document.querySelector('.open-modal');
const closeFormBtn = document.querySelector('.close-form');

const openModal = () => {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

const closeModal = () => {
    modal.classList.add('hidden');
    modal.classList.add('hidden');
}

// Event Listeners to allow user to open/close modal
openModalBtn.addEventListener('click', openModal);
closeFormBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Close Modal if User hits escape
document.addEventListener('keydown', (event) => {
    if(event === 'Escape') {
        closeModal();
    }
})