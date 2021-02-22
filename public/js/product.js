const reviewsToggle = document.querySelector('.reviews-toggle');
const reviewList = document.querySelectorAll('.review__body');

console.log(reviewList);

reviewsToggle.addEventListener('click', () => {
    console.log('chevron clicked');
    reviewList.forEach(review => {
        review.classList.toggle('hide');
    })
})