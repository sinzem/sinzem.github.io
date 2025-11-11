window.addEventListener("DOMContentLoaded", () => {
    let windowWidth = window.innerWidth;
    // menu ========================================================================
    const menuItems = document.querySelectorAll("[data-nav]");
    const aside = document.querySelector(".aside");
    const asideOpener = document.querySelector(".aside_opener");

    menuItems[0].classList.add("active");
    windowWidth < 1535 ? aside.classList.remove("active") : aside.classList.add("active");

    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            menuItems.forEach(li => {
                li.classList.remove("active");
            })
            item.classList.add("active");
        })
    });

    asideOpener.addEventListener("click", () => {
        asideOpener.classList.contains("active") ? asideOpener.classList.remove("active") : asideOpener.classList.add("active");
        aside.classList.contains("active") ? aside.classList.remove("active") : aside.classList.add("active");
    });

    const windowResizeTrottled = throttle(windowResize, 120);
    window.addEventListener("resize", windowResizeTrottled);
    
    function windowResize() {
        windowWidth = window.innerWidth;

        windowWidth < 1535 ? aside.classList.remove("active") : aside.classList.add("active");
        asideOpener.classList.contains("active") ? asideOpener.classList.remove("active") : null;
    } 

    // wide_blocks====================================================

    const wideBlocks = document.querySelectorAll("[data-leaf]");
    let start = 0;

    wideBlocks.forEach(block => {
        block.addEventListener("mouseover", (e) => {
            if ((e.currentTarget.dataset.leaf === "transfers" 
                || e.currentTarget.dataset.leaf === "calendar")  
                && windowWidth < 1024) {
                e.currentTarget.style.cursor = "grab";
            }  
        });
    })

    wideBlocks.forEach(block => {
        block.addEventListener("mousedown", (e) => {
            if ((e.currentTarget.dataset.leaf === "transfers" 
                || e.currentTarget.dataset.leaf === "calendar")  
                && windowWidth < 1024) {
                e.currentTarget.style.scrollBehavior = "auto";
                e.currentTarget.style.cursor = "grabbing";
                start = e.clientX;
                e.currentTarget.addEventListener("mousemove", moveWideBlock);
            }  
        });
    })

    wideBlocks.forEach(block => {
        block.addEventListener("mouseup", (e) => {
            if (windowWidth < 1024) {
                e.currentTarget.style.scrollBehavior = "smooth";
                e.currentTarget.style.cursor = "grab";
                e.currentTarget.removeEventListener("mousemove", moveWideBlock);
                start = 0
            }
        });
    })

    wideBlocks.forEach(block => {
        block.addEventListener("mouseleave", (e) => {
            if (windowWidth < 1024) {
                e.currentTarget.style.scrollBehavior = "smooth";
                e.currentTarget.style.cursor = "auto";
                e.currentTarget.removeEventListener("mousemove", moveWideBlock);
                start = 0
            }
        });
    })

    function moveWideBlock(e) {
        let move = e.clientX - start;
        e.currentTarget.scrollLeft -= move * 0.1;
    };
})

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
        isThrottled = true;

        func.apply(this, arguments); 

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