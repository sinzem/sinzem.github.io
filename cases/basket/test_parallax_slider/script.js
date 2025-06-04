window.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("deliveryBtn");
    const circle = document.getElementById("circleIcon");
    const btnText = document.getElementById("btnText");
    const truck = document.getElementById("truckClone");
    const check = document.getElementById("checkIcon");

    button.addEventListener("click", () => {
        if (button.classList.contains("disabled")) return;

        button.classList.add("disabled");
        circle.classList.add("shrink");
        btnText.textContent = "On the way";
        btnText.classList.add("centered");
        check.classList.remove("visible");

        setTimeout(() => {
            truck.classList.add("animate");
        }, 400);

        setTimeout(() => {
            truck.classList.remove("animate");
            btnText.textContent = "Done";
            check.classList.add("visible");
        }, 2000)

        setTimeout(() => {
            check.classList.remove("visible");
            circle.classList.remove("shrink");
            btnText.textContent = "Deliver";
            btnText.classList.remove("centered");
            button.classList.remove("disabled");
        }, 3000)
    })


    // lines ================================================

    document.querySelectorAll(".marquee_container").forEach((container) => {
        requestAnimationFrame(() => initMarquee(container));
    });

    function initMarquee(container) {
        const track = container.querySelector(".marquee_track");
        const inner = track.querySelector(".marquee_inner");
        const speed = parseInt(container.getAttribute("data-speed")) || 30;
        const direction = container.getAttribute("data-direction") || "left";
    
        if (!inner.dataset.cloned) {
            const originalCards = Array.from(inner.children);
            let totalWidth = inner.scrollWidth;
            const containerWidth = container.offsetWidth;
    
            while (totalWidth < containerWidth * 2) {
                originalCards.forEach(card => {
                    inner.appendChild(card.cloneNode(true));
                })
                totalWidth = inner.scrollWidth;
            }
    
            inner.dataset.cloned = "true";
        }
    
        const updateAnimation = () => {
            const totalWidth = inner.scrollWidth / 2;
            const duration = totalWidth / speed;
            inner.style.animationName = direction === "right" ? "scroll-right" : "scroll-left";
            inner.style.animationDuration = `${duration}s`;
        }
    
        updateAnimation();
    
        window.addEventListener("resize", updateAnimation);
    }
    
})

