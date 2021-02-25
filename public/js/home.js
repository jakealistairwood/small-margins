// Close Cookie Message
const message = document.querySelector('.cookie-message');
const cookieBtn = document.querySelector('.cookie-btn');

const closeMessage = () => {
    message.classList.add('hidden');
}

cookieBtn.addEventListener('click', closeMessage);

// Shortens paragraph descriptions in gallery grid to keep everything the same height.
const truncateText = () => {
    let productDescription = document.querySelectorAll('.product__description');
    productDescription.forEach(item => {
        if (item.innerHTML.length > 150) {
            const shortenedText = item.innerHTML.substr(0, 150) + "...";
            item.innerHTML = shortenedText;
        }
    });
}

truncateText();