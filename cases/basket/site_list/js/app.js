document.querySelectorAll('.slider').forEach((n, i) =>{
    window[`slider${i+1}`] = new Swiper(n, {
        freeMode: true,
        centeredSlides: true,
        direction: 'vertical',
        mousewheel: true,
        slidesPerView: 1.5,
        slidesOffsetBefore: -125,
    })
});
bindSwipers(slider1, slider2, slider3, slider4);
// slider1 = new Swiper('.slider1', {
//     freeMode: true,
//     centeredSlides: true,
//     direction: 'vertical',
//     mousewheel: true,
//     slidesPerView: 1.75,
// })
// slider2 = new Swiper(".slider2", {
//     freeMode: true,
//     centeredSlides: true,
//     direction: "vertical",
//     mousewheel: true,
//     slidesPerView: 1.75,
// })
// slider3 = new Swiper(".slider3", {
//     freeMode: true,
//     centeredSlides: true,
//     direction: "vertical",
//     mousewheel: true,
//     slidesPerView: 1.75,
// })
// slider4 = new Swiper(".slider4", {
//     freeMode: true,
//     centeredSlides: true,
//     direction: 'vertical',
//     mousewheel: true,
//     slidesPerView: 1.75,
// })