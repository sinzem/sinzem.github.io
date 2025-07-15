let scroll = calcScroll();
const burgerMenu = document.querySelector(".mnu-button__menu");
const header = document.querySelector(".header-top");
const menuBackground = document.querySelector(".main-menu-background");
const mainMenu = document.querySelector(".main-menu");
let menuPos = parseInt(window.getComputedStyle(mainMenu).right);

window.addEventListener("resize", () => {
    scroll = calcScroll();
    menuPos = parseInt(window.getComputedStyle(mainMenu).right);
})

if (burgerMenu) {
    burgerMenu.addEventListener("click", () => {
        burgerMenu.classList.toggle("active"); 
        if (burgerMenu.classList.contains("active")) {
            lenis.stop();
            menuBackground.classList.add("active");
            mainMenu.classList.add("active");
            document.body.style.paddingRight = `${scroll}px`;
            header.style.marginRight = `${scroll}px`;
            mainMenu.style.right = `${menuPos}px`;
        } else {
            lenis.start();
            menuBackground.classList.remove("active");
            mainMenu.classList.remove("active");
            document.body.style.paddingRight = `0px`;
            header.style.marginRight = `0px`;
            mainMenu.style.right = `${menuPos - scroll}px`;
        }
    })
}

gsap.utils.toArray("[data-parallax-wrapper]").forEach(container => {
    const img = container.querySelector("[data-parallax-target]");

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            scrub: true
        }
    })

    tl.fromTo(img, {
        yPercent: -15,
        ease: 'none'
    }, {
        yPercent: 15,
        ease: 'none'
    })
})

const accordionCol = document.querySelectorAll(".accordion__col");

accordionCol.forEach(col => {
    col.addEventListener("mouseenter", () => {
        accordionCol.forEach(c => {
            c.classList.remove("active");
            col.classList.add("active");
        })
    })
})

const lenis = new Lenis();

function raf(time) {
    lenis.raf(time);

    requestAnimationFrame(raf);
}

requestAnimationFrame(raf)


// function globalGradient() {
//     const interBubble = document.querySelector(".interactive");

//     let curX = 0;
//     let curY = 0;
//     let tgX = 0;
//     let tgY = 0;

//     function move() {
//         curX += (tgX - curX) / 20;
//         curY +=  (tgY - curY) / 20;

//         gsap.set(interBubble, {
//             x: Math.round(curX),
//             y: Math.round(curY)
//         })

//         requestAnimationFrame(() => {
//             move();
//         })
//     }

//     window.addEventListener("mousemove", (event) => {
//         tgX = event.clientX;
//         tgY = event.clientY;
//     })

//     move(); 
// }

// globalGradient();


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

// ===========================================================================================================

function globalGradient() {
    const interBubble = document.querySelector(".interactive");

    const move = (event) => {
        requestAnimationFrame(() => {
            interBubble.style.top = `${event.clientY + window.innerHeight / 2}px`;
            interBubble.style.left = `${event.clientX + window.innerWidth / 2}px`;
            // interBubble.style.transform = `translate(${event.clientX * 0.2}px, ${event.clientY * 0.2}px)`;
        })
    }

    const throttleMove = throttle(move, 120);

    window.addEventListener("mousemove", throttleMove)

}

globalGradient();


function throttle(func, ms) {
    let isThrottled = false,
        savedArgs,
        savedThis;

    function wrapper() {
        if (isThrottled) { 
            savedArgs = arguments;
            savedThis = this;
            return;
        }
  
        func.apply(this, arguments); 
    
        isThrottled = true;
    
        setTimeout(function() {
            isThrottled = false; 
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }
  
    return wrapper;
}

// ===============================================================================

// function globalGradient() {
//     const interBubble = document.querySelector(".interactive");
  
//     let curX = 0;
//     let curY = 0;
//     let targetX = 0;
//     let targetY = 0;
//     let animationFrameId = null;
  
//     const ease = 0.1; // инерция
  
//     function animate() {
//         const dx = targetX - curX;
//         const dy = targetY - curY;
    
//         curX += dx * ease;
//         curY += dy * ease;
    
//         interBubble.style.transform = `translate(${curX}px, ${curY}px)`;
    
//         // затухание движения
//         if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
//             cancelAnimationFrame(animationFrameId);
//             animationFrameId = null;
//             return;
//         }
    
//         animationFrameId = requestAnimationFrame(animate);
//     }
  
//     window.addEventListener("mousemove", (e) => {
//         targetX = e.clientX;
//         targetY = e.clientY;
    
        
//         if (!animationFrameId) {
//             animationFrameId = requestAnimationFrame(animate);
//         }
//     });
// }
  
// globalGradient();


