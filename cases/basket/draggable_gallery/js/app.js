import PhotoSwipeLightbox from "../libs/PhotoSwipe/photoswipe-lightbox.esm.min.js";

window.addEventListener("DOMContentLoaded", () => {

    setTimeout(() => {
        /* (добавляем таймаут без времени и класс на body - добавится после загрузки всех изображений и уберет прозрачность блока с изображениями) */
        document.body.classList.add("loaded");

        /* (подключаем библиотеку, передаем блок gallery - позволит его перетаскивать) */
        Draggable.create(".gallery", {  /* (передаем опции) */
            bounds: "body", /* (отскок от краев, также ограничивает перетаскивание телом блока) */
            inertia: true /* (инерция перетаскивания - с помощью библиотеки InertiaPlugin) */
        }, 200); 
    })

    document.querySelectorAll('.gallery__item').forEach(function(e) {
        let img = new Image();
        let hrefURL = e.getAttribute('href')
        img.onload = function() {
            e.dataset.pswpWidth = this.width;
            e.dataset.pswpHeight = this.height;
        }
        img.src = hrefURL;
    })
    
    const lightbox = new PhotoSwipeLightbox({
        gallery: ".gallery",
        children: ".gallery__item",
        pswpModule: () => import("../libs/PhotoSwipe/photoswipe.esm.min.js")
    })
    lightbox.init();

})







