const reviewsToggle = document.querySelector('.reviews-toggle');
const reviewList = document.querySelectorAll('.review__body');

reviewsToggle.addEventListener('click', () => {
    reviewList.forEach(review => {
        review.classList.toggle('hide');
    })
})