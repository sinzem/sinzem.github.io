"use strict";

window.addEventListener('DOMContentLoaded', () => {
    const searchMenu = document.querySelector(".search_drop-down");
    const search = document.querySelector(".menu-bottom__search");
    const input = document.querySelector(".search-input");
    const arrow = document.querySelector(".footer__arrow");

    search.addEventListener("click", () => {
        searchMenu.classList.toggle("search_active");
        input.classList.toggle("search-input_active");
    });

    arrow.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    const swiper = new Swiper(".image-slider", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        keyboard: {
            enabled: true,
            pageUpDown: true,
        },
        loop: true,
        effect: 'fade',
    });

    document.addEventListener("click", documentActions);

    function documentActions(e) {
        const targetElement = e.target;

        if (targetElement.closest('.icon-menu')) {
            document.documentElement.classList.toggle('menu-open');
        }
    }
});





