window.addEventListener("DOMContentLoaded", () => {
    const item = document.querySelector(".item");

    item.addEventListener('mousemove', (e) => { 
        newPosition(e, item);
    })

    item.addEventListener('mouseout', () => { 
        newPosition(null, item);
    })
})

function changePosition(e, item) {
    if (!e) {
        item.style.transform = `rotateX(${0}deg) rotateY(${0}deg)`; 
        return;
    }
    let x = (e.clientX - window.innerWidth / 2) / -10;
    let y = (e.clientY - window.innerHeight / 2) / 6;
    item.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;  
}

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

const newPosition = throttle(changePosition, 120);



