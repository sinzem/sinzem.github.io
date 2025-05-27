window.addEventListener("DOMContentLoaded", () => {

    const sliderWrapper = document.querySelector(".slider_wrap");
    const slides = document.querySelectorAll(".slide");
    const items = document.querySelectorAll(".item");
    let scroll = calcScroll();

    let leftActiveDot = Math.round(window.innerWidth / 2 - items[0].scrollWidth / 2);
    let rightActiveDot = Math.round(window.innerWidth / 2 + items[0].scrollWidth / 6);
    let workArea = Math.round(leftActiveDot - rightActiveDot);
    let workUnit = workArea / 100;

    window.addEventListener("resize", () => {
        scroll = calcScroll();
        leftActiveDot = Math.round(window.innerWidth / 2 - items[0].scrollWidth / 2);
        rightActiveDot = Math.round(window.innerWidth / 2 + items[0].scrollWidth / 6);
        workArea = Math.round(leftActiveDot - rightActiveDot);
        workUnit = workArea / 100;
    })

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            } else {
                entry.target.classList.remove("active");
            }
        });
    }, {
        root: sliderWrapper,
        rootMargin: "0% -20% 0% -20%",
        threshold: 0.5,
    });

    slides.forEach(slide => observer.observe(slide));
 
    sliderWrapper.addEventListener("mouseenter", () => {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scroll}px`;
    })

    sliderWrapper.addEventListener("wheel", (e) => {
        requestAnimationFrame(() => sliderWrapper.scrollLeft += e.deltaY * 1.5);
    })
    
    sliderWrapper.addEventListener("scroll", () => {
        requestAnimationFrame(() => moveBackground(slides, leftActiveDot, rightActiveDot, workUnit));
    })

    sliderWrapper.addEventListener("mouseleave", () => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = `0px`;
    })
})

function moveBackground(slides, leftActiveDot, rightActiveDot, workUnit) {

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


function calcScroll() { 
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


