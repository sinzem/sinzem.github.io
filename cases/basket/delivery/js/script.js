
window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.header__menu'),
    menuItem = document.querySelectorAll('.header__menu__item'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        });
    });
});
const swiper = new Swiper(".image-slider", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    simulateTouch: true,
    keyboard: {
        enabled: true,
        pageUpDown: true,
    },
    slidesPerView: 3,
    slidesPerGroup: 1,
    centeredSlides: true,
    loop: true,
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        1200: {
            slidesPerView: 3,
        },
    },
});


