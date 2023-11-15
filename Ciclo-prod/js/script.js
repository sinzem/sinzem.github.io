"use strict";

window.addEventListener("DOMContentLoaded", () => {
    
    const slides = document.querySelectorAll(".slide"), 
          prev = document.querySelector(".key_up"),
          next = document.querySelector(".key_down"),
          counter = document.querySelector(".counter_slide"),
          slidesWrapper = document.querySelector(".slider_wrapper"),
          slidesField = document.querySelector(".slider_inner"),
          dataCounter = document.querySelectorAll("[data-count]"),
          dataDescr = document.querySelectorAll("[data-description]"),
          dataFirst = document.querySelectorAll("[data-first]");
    const screenWidth = window.screen.width;
    const graph = document.querySelector('.slide_03'),
          scaleCounter = graph.querySelectorAll('.scale_counter'),
          scaleFill = graph.querySelectorAll('.scale_fill');

    // let height = "100vh";
    let height = window.innerHeight;
    let slideIndex = 1;
    let offset = 0;
    // let offset = (slideIndex - 1) * +height;
    let positionStart = 0;
    let positionEnd = 0;

    window.addEventListener('resize', () => {
        height = window.innerHeight;
        offset = (slideIndex - 1) * +height;
        slideIndex !== 12 ? nextPage() : prevPage();
    });
  
    if (screenWidth < 576) {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        window.addEventListener('resize', () => {
            height = window.innerHeight;
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });
    }

    slideIndex < 10 ? counter.textContent = `0${slideIndex}` : counter.textContent = slideIndex;

    slideIndex == 1 ? slides[0].classList.add("glassy") : null;
    slideIndex == 1 ? slides[0].classList.add("active") : null;

    prev.classList.add('clear');

    slidesField.style.height = 100 * slides.length + '%';
    slidesField.style.transition = "0.6s all";
    slidesWrapper.style.overflow = "hidden";

    dataDescr.forEach(item => item.style.opacity = "0");

    addNextPrevStyle();

    window.addEventListener('touchstart', swipeStart);

    function swipeStart() {
        positionStart = event.changedTouches[0].clientY;
        window.addEventListener('touchend', swipeEnd);
    }

    function swipeEnd() {
        positionEnd = event.changedTouches[0].clientY;
        window.removeEventListener('touchend', swipeEnd);

        if (positionStart - positionEnd > 150 && slideIndex < 12) {
            nextPage();
        } else if (positionStart - positionEnd < -150 && slideIndex > 1) {
            prevPage();
        } 
    }

    next.parentElement.addEventListener("click", nextPage);

    prev.parentElement.addEventListener("click", prevPage);

    function nextPage() {

        if (offset === (slides.length - 1) * 100) {
            offset = offset;
        } else {
            // offset += +height.slice(0, height.length - 2);
            offset = (slideIndex - 1) * +height; 
            offset += +height;
        };

        if (slideIndex > 0) {
            slides[0].classList.remove('glassy');
            dataFirst.forEach(i => i.style.opacity = "1");
        }; 

        // slidesField.style.transform = `translateY(-${offset}vh)`;
        slidesField.style.transform = `translateY(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = slideIndex;
        } else {
            slideIndex++;
        };

        slideIndex === 12 ? next.parentElement.disabled = true : next.parentElement.disabled = false;
        slideIndex !== 1 ? prev.parentElement.disabled = false : null;

        slideIndex == slides.length ? next.classList.add('clear') : null;

        prev.classList.remove('clear');

        counterZero();

        slideActive();

        addNextPrevStyle();

        graphWidth();

        designCounter();
        
        appearDescription();
        
    }

    function prevPage() {

        if (offset === 0) {
            offset = 0;
        } else {
            // offset -= +height.slice(0, height.length - 2); 
            offset = (slideIndex - 1) * +height; 
            offset -= +height; 
        }

        // slidesField.style.transform = `translateY(-${offset}vh)`;
        slidesField.style.transform = `translateY(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slideIndex;
        } else {
            slideIndex--;
        };

        slideIndex === 1 ? prev.parentElement.disabled = true : prev.parentElement.disabled = false;
        slideIndex !== 12 ? next.parentElement.disabled = false : null;

        slideIndex == 1 ? prev.classList.add('clear') : null;

        next.classList.remove('clear');

        counterZero();

        slideActive();

        addNextPrevStyle();

        graphWidth();

        designCounter();

        appearDescription();

    }

    function slideActive() {
        slides.forEach((i, k) => slideIndex == k + 1 ? i.classList.add('active') : i.classList.remove('active'));
    };


    function counterZero() {
        slideIndex < 10 ? counter.textContent = `0${slideIndex}`: counter.textContent = slideIndex;
    };

    function graphWidth() {
        if (graph.classList.contains('active')) {
            scaleFill.forEach((i, k) => {
                scaleCounter.forEach((j, l) => {
                    if (k == l) {
                        i.style.cssText = `width:${j.textContent};transition:width 2s;`;
                    };
                });
            });
        } else {
            scaleFill.forEach(i => i.style.width = "0");
        };
    };  

    function designCounter() { 
        if (slideIndex === 8 || slideIndex === 12) {
            dataCounter.forEach(i => {
                let start = 0;
                let delay = 10;
                setTimeout(function int() {
                    if (start < i.dataset.count - 1) {
                        setTimeout(int, delay);
                    };
                    start++;
                    delay *= 1.03;
                    i.textContent = start;
                }, delay);
            });   
        }; 
    };

    function appearDescription() {
        slides.forEach(item => {
            if (item.classList.contains('active')) {
                let arr = [];
                dataDescr.forEach(descr => descr.dataset.description == slideIndex ? arr.push(descr) : null);
                let count = 0;
                setTimeout(function appear() {
                    count < arr.length ? setTimeout(appear, 500) : null;
                    arr.forEach((i, k) => {
                        if (k === count) {
                            i.style.transition = "opacity 1.5s"; 
                            i.style.opacity = "1";
                        };
                    });
                    count += 1;
                }, 500);
            } else {
                dataDescr.forEach(i => {
                    if (i.dataset.description !== slideIndex) {
                        i.style.transition = "opacity 1s"; 
                        i.style.opacity = "0";
                    };
                });
            };
        });
    };

    
    function addNextPrevStyle() {
        slides.forEach((i, k, arr) => {
            if (i.classList.contains('active')) {
                arr[k + 1] ? arr[k + 1].classList.add('nextStyle') : null;
                arr[k - 1] ? arr[k - 1].classList.add('prevStyle') : null;
            } else {
                arr[k + 1] ? arr[k + 1].classList.remove('nextStyle') : null;
                arr[k - 1] ? arr[k - 1].classList.remove('prevStyle') : null;
            }
        }); 
    };
    
});




