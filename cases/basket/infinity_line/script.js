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
        
        this.styleBlock = document.querySelector("#running_line");

        this.innerGap = null;
        this.innerWidth = null;
        this.trackWidth = null;
        this.speed = 1;

        this.#addStyleBlock();
        this.#init();
    }

    #getAndSetValues = () => {
        if (this.speedIndex < 11 && this.speedIndex > 0 && Number.isInteger(this.speedIndex)) {
            this.speed = this.speedIndex;
        }

        this.innerGap = parseInt(getComputedStyle(this.inner).getPropertyValue('--gap'));

        this.innerWidth = this.inner.scrollWidth;

        this.trackWidth = this.track.offsetWidth;

        if (!this.inner.dataset.originalLength) {
            this.inner.dataset.originalLength = this.inner.children.length;
        }

        if (this.innerWidth < this.trackWidth * 2) {
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
                    0% { transform: translateX[\(]\-[0-9]+px[\)]; }
                    100% { transform: translateX[\(]\-[0-9]+px[\)]; }
                }
            `, "g");

        let newAnimation;

        if (this.direction === "right") {
            newAnimation = `
                @keyframes scroll-${this.direction}-${this.index} {
                    0% { transform: translateX(${Math.round((-this.innerWidth - this.innerGap) / 2)}px); }
                    100% { transform: translateX(-0px); }
                }
            `;
        } else {
            newAnimation = `
                @keyframes scroll-${this.direction}-${this.index} {
                    0% { transform: translateX(-0px); }
                    100% { transform: translateX(${Math.round(-(this.innerWidth + this.innerGap) / 2)}px); }
                }
            `;
        }

        if (checkStyle.test(prevStyle)) {
            const newStyle = prevStyle.replace(checkStyle, newAnimation);
            this.styleBlock.innerHTML = `
                ${newStyle.trim()}
            `;
        } else {
            this.styleBlock.innerHTML = `
                ${prevStyle.trim()}
                ${newAnimation.trim()}
            `;
        }

        this.inner.style.animationName = `scroll-${this.direction}-${this.index}`;
        this.inner.style.animationDuration = `${this.innerWidth / 50 / this.speed}s`;
    }

    #cleanInner = () => {
        Array.from(this.inner.children).forEach((child, i) => {
            if (i >= this.inner.dataset.originalLength) {
                child.remove()
            }
        })
    }

    #addStyleBlock = () => {
        if (!this.styleBlock) {
            const style = document.createElement('style');
            style.id = "running_line";
            document.head.appendChild(style);
            this.styleBlock = document.querySelector("#running_line");  
        }
    }
}

