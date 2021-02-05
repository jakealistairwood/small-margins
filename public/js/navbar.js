window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const windowPosition = window.scrollY > 0;
    navbar.classList.toggle('navbar-active', windowPosition);
})