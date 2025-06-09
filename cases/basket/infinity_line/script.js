window.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll(".running_container");

    containers.forEach((container, index) => {
        new RunningLine({
            container, 
            index,
            track: ".running_track",
            inner: ".running_inner",
        })
    })
})

class RunningLine {
    constructor({
        container,
        index,
        track,
        inner
    }) {
        this.container = container;
        this.index = index;
        this.track = this.container.querySelector(track);
        this.inner = this.track.querySelector(inner);
        this.direction = this.container.getAttribute("data-direction") || "left";
        this.speedIndex = Math.round(parseInt(container.getAttribute("data-speedIndex")));
        
        this.styleBlock = null;
        this.innerParams = null;
        this.innerPrevWidth = null;
        this.innerWidth = null;
        this.trackWidth = null;
        this.speed = 1;

        this.#addStyleBlock();
        this.#init();
    }

    #getAndSetValues = () => {
        if (this.speedIndex < 101 && this.speedIndex > 0 && Number.isInteger(this.speedIndex)) {
            this.speed = this.speedIndex * 0.1;
        }

        this.innerParams = window.getComputedStyle(this.inner);
        // this.innerPrevWidth = this.innerParams.width;
        this.innerWidth = this.innerPrevWidth = this.inner.scrollWidth;

        this.track.style.height = this.innerParams.height;

        this.trackWidth = this.track.offsetWidth;

        if (!this.inner.dataset.originalLength) {
            this.inner.dataset.originalLength = this.inner.children.length;
        }

        if (this.innerWidth < this.trackWidth) {
            while (this.innerWidth < this.trackWidth * 2) {
                this.#addRequiredChildren();
            }
        } else {
            this.#addRequiredChildren();
        }
       
    }

    #addRequiredChildren = () => {
        const originalCards = Array.from(this.inner.children);
            originalCards.forEach(card => {
                this.inner.appendChild(card.cloneNode(true));
            })
        this.innerWidth = this.inner.scrollWidth;
    }

    #init = () => {
        this.#getAndSetValues();
        this.#addAnimation();

        let resizeTimeout;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.#cleanInner();
                this.#getAndSetValues();
                this.#addAnimation();
            }, 300);
        });
    }

    #addAnimation = () => {
        const prevStyle = this.styleBlock.textContent;

        const checkStyle = new RegExp(`
            @keyframes scroll-${this.direction}-${this.index} {
                0% { ${this.direction}: 0; }
                100% { ${this.direction}: -[0-9]+px; }
            }
        `, "g");

        const newAnimation = `
            @keyframes scroll-${this.direction}-${this.index} {
                0% { ${this.direction}: 0; }
                100% { ${this.direction}: ${-(parseInt(this.innerPrevWidth) + parseInt(this.innerParams.gap))}px; }
            }
        `;

        if (checkStyle.test(prevStyle)) {
            const newStyle = prevStyle.replace(checkStyle, newAnimation);
            this.styleBlock.innerHTML = `
                ${newStyle}
            `;
        } else {
            this.styleBlock.innerHTML = `
                ${prevStyle}
                ${newAnimation}
            `;
        }

        this.inner.style.willChange = `${this.direction}`;
        this.inner.style.animationName = `scroll-${this.direction}-${this.index}`;
        this.inner.style.animationDuration = `${parseInt(this.innerPrevWidth) / 20 / this.speed}s`;
    }

    #cleanInner = () => {
        Array.from(this.inner.children).forEach((child, i) => {
            if (i >= this.inner.dataset.originalLength) {
                child.remove()
            }
        })
    }

    #addStyleBlock = () => {
        const style = document.createElement('style');
        document.head.appendChild(style);
        this.styleBlock = document.querySelector("style");
    }
}

// ===================================================================

// window.addEventListener("DOMContentLoaded", () => {

//     document.querySelectorAll(".running_container").forEach(initMarquee);

//     function initMarquee(container) {
       
//         const track = container.querySelector(".running_track");
//         const inner = track.querySelector(".running_inner");
//         const direction = container.getAttribute("data-direction") || "left";

//         let speed = 1;
//         const speedIndex = Math.round(parseInt(container.getAttribute("data-speedIndex"))); 
//         if (speedIndex < 101 && speedIndex > 0 && Number.isInteger(speedIndex)) {
//             speed = speedIndex * 0.1;
//         }

//         const innerParams = window.getComputedStyle(inner);
//         const innerPrevWidth = innerParams.width;

//         track.style.height = innerParams.height;

//         let innerWidth = inner.scrollWidth;
//         const trackWidth = track.offsetWidth;

//         while (innerWidth < trackWidth * 2) {
//             const originalCards = Array.from(inner.children);
//             originalCards.forEach(card => {
//                 inner.appendChild(card.cloneNode(true));
//             })
//             innerWidth = inner.scrollWidth;
//         }

//         // inner.animate([
//         //     { left: '0px' },
//         //     { left: '-1186px' }
//         //   ], {
//         //     duration: 20000,
//         //     easing: "linear",
//         //     fill: 'forwards',
//         //     iterations: Infinity,
//         //   });

//         const style = document.createElement('style');
//         style.innerHTML = `
//             @keyframes scroll-${direction} {
//                 0% { ${direction}: 0; }
//                 100% { ${direction}: ${-(parseInt(innerPrevWidth) + parseInt(innerParams.gap))}px; }
//             }
//         `;

//         document.head.appendChild(style);

//         inner.style.animationName = `scroll-${direction}`;
//         inner.style.animationDuration = `${parseInt(innerPrevWidth) / 20 / speed}s`;
     
//     }
        
// })


