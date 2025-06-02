window.addEventListener("DOMContentLoaded", () => {
    new MoveBackground({
        sliderWrapper: ".slider_wrap",
        slides: ".slide",
        items: ".item",
        // width: "wide",
        speed: 0.8,
    })
})

class MoveBackground {
    constructor({
        sliderWrapper,
        slides,
        items,
        width = "narrow",
        speed = 1.5,
    }) {
        this.sliderWrapper = document.querySelector(sliderWrapper);
        this.slides = document.querySelectorAll(slides);
        this.items = document.querySelectorAll(items);
        this.width = width;
        this.speed = speed;

        this.scroll = null;

        this.leftSideOfWrapper = null;
        this.rightSideOfWrapper = null;

        this.leftActiveDot = null;
        this.rightActiveDot = null;
        this.workArea = null;
        this.workUnit = null;

        this.#getValues();
        this.#init();
    }

    #getValues = () => {
        this.scroll = this.calcScroll();

        const wrapperParameters = this.sliderWrapper.getBoundingClientRect();
        this.leftSideOfWrapper = Math.round(wrapperParameters.left);
        this.rightSideOfWrapper = Math.round(wrapperParameters.right);

        if (this.width === "narrow") {
            this.leftActiveDot = Math.round(window.innerWidth / 2 - this.items[0].scrollWidth / 2);
            this.rightActiveDot = Math.round(window.innerWidth / 2 + this.items[0].scrollWidth / 6);
        }
        if (this.width === "wide") {
            this.leftActiveDot = this.leftSideOfWrapper;
            this.rightActiveDot = this.rightSideOfWrapper - this.items[0].scrollWidth;
        }

        this.workArea = this.leftActiveDot - this.rightActiveDot;
        this.workUnit = this.workArea / 100;
    }

    #init = () => {
        window.addEventListener("resize", () => {
            this.#getValues();
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                } else {
                    entry.target.classList.remove("active");
                }
            });
        }, {
            root: this.sliderWrapper,
            rootMargin: `0px ${this.leftSideOfWrapper}px 0px ${this.rightSideOfWrapper}px`,
            threshold: 0.5,
        });
    
        this.slides.forEach(slide => observer.observe(slide));

        this.sliderWrapper.addEventListener("mouseenter", () => {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${this.scroll}px`;
        });

        this.sliderWrapper.addEventListener("wheel", (e) => {
            requestAnimationFrame(() => this.sliderWrapper.scrollLeft += e.deltaY * this.speed);
        })

        this.sliderWrapper.addEventListener("scroll", () => {
            requestAnimationFrame(() => this.moveBackground(this.slides, this.leftActiveDot, this.rightActiveDot, this.workUnit));
        });

        this.sliderWrapper.addEventListener("mouseleave", () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = `0px`;
        });
    }

    moveBackground(slides, leftActiveDot, rightActiveDot, workUnit) {
        slides.forEach(slide => {
            if (slide.classList.contains("active")) {
                const blockPosition = slide.getBoundingClientRect().left;
                const workToLeft = leftActiveDot - blockPosition;
                const percentToLeft = workToLeft / workUnit;
                
                if (blockPosition > leftActiveDot && blockPosition < rightActiveDot) {
                    slide.children[0].style.right = (100 - percentToLeft) * -2 + "%";
                } else if (blockPosition < leftActiveDot && blockPosition < rightActiveDot) {
                    slide.children[0].style.right = "-200%";
                } else if (blockPosition > leftActiveDot && blockPosition > rightActiveDot) {
                    slide.children[0].style.right = "0%";
                }
            }
        })
    }

    calcScroll() { 
        let div = document.createElement('div'); 
    
        div.style.width = '50px'; 
        div.style.height = '50px';
        div.style.overflowY = 'scroll'; 
        div.style.visibility = 'hidden'; 
    
        document.body.appendChild(div); 
        let scrollWidth = div.offsetWidth - div.clientWidth; 
        div.remove(); 
    
        return scrollWidth; 
    }
}



// =============================================================================================

// window.addEventListener("DOMContentLoaded", () => {

//     const sliderWrapper = document.querySelector(".slider_wrap");
//     const slides = document.querySelectorAll(".slide");
//     const items = document.querySelectorAll(".item");
//     let scroll = calcScroll();

//     let leftActiveDot = Math.round(window.innerWidth / 2 - items[0].scrollWidth / 2);
//     let rightActiveDot = Math.round(window.innerWidth / 2 + items[0].scrollWidth / 6);
//     let workArea = Math.round(leftActiveDot - rightActiveDot);
//     let workUnit = workArea / 100;

//     window.addEventListener("resize", () => {
//         scroll = calcScroll();
//         leftActiveDot = Math.round(window.innerWidth / 2 - items[0].scrollWidth / 2);
//         rightActiveDot = Math.round(window.innerWidth / 2 + items[0].scrollWidth / 6);
//         workArea = Math.round(leftActiveDot - rightActiveDot);
//         workUnit = workArea / 100;
//     })

//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 entry.target.classList.add("active");
//             } else {
//                 entry.target.classList.remove("active");
//             }
//         });
//     }, {
//         root: sliderWrapper,
//         rootMargin: "0% -20% 0% -20%",
//         threshold: 0.5,
//     });

//     slides.forEach(slide => observer.observe(slide));
 
//     sliderWrapper.addEventListener("mouseenter", () => {
//         document.body.style.overflow = 'hidden';
//         document.body.style.paddingRight = `${scroll}px`;
//     })

//     sliderWrapper.addEventListener("wheel", (e) => {
//         requestAnimationFrame(() => sliderWrapper.scrollLeft += e.deltaY * 1.5);
//     })
    
//     sliderWrapper.addEventListener("scroll", () => {
//         requestAnimationFrame(() => moveBackground(slides, leftActiveDot, rightActiveDot, workUnit));
//     })

//     sliderWrapper.addEventListener("mouseleave", () => {
//         document.body.style.overflow = '';
//         document.body.style.paddingRight = `0px`;
//     })
// })

// function moveBackground(slides, leftActiveDot, rightActiveDot, workUnit) {

//     slides.forEach(slide => {
//         if (slide.classList.contains("active")) {
//             const blockPosition = slide.getBoundingClientRect().left;
//             const workToLeft = leftActiveDot - blockPosition;
//             const percentToLeft = workToLeft / workUnit;
            
//             if (blockPosition > leftActiveDot && blockPosition < rightActiveDot) {
//                 slide.children[0].style.right = (100 - percentToLeft) * -2 + "%";
//             } else if (blockPosition < leftActiveDot && blockPosition < rightActiveDot) {
//                 slide.children[0].style.right = "-200%";
//             } else if (blockPosition > leftActiveDot && blockPosition > rightActiveDot) {
//                 slide.children[0].style.right = "0%";
//             }
//         }
//     })
// }


// function calcScroll() { 
//     let div = document.createElement('div'); 

//     div.style.width = '50px'; 
//     div.style.height = '50px';
//     div.style.overflowY = 'scroll'; 
//     div.style.visibility = 'hidden'; 

//     document.body.appendChild(div); 
//     let scrollWidth = div.offsetWidth - div.clientWidth; 
//     div.remove(); 

//     return scrollWidth; 
// }
