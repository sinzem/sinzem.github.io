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


// 5========================================================================================

// window.addEventListener("DOMContentLoaded", () => {
//         const wideBlock = document.querySelector(".slider_wrap");
//         const slider = document.querySelector(".slider");
//         const slides = document.querySelectorAll(".slide");
//         const items = document.querySelectorAll(".item");
//         let scroll = calcScroll();
    
//         window.addEventListener("resize", () => {
//             scroll = calcScroll();
//         })
     
//         wideBlock.addEventListener("mouseenter", () => {
//             document.body.style.overflow = 'hidden';
//             document.body.style.paddingRight = `${scroll}px`;
    
//             wideBlock.addEventListener("wheel", (e) => {
//                 const position = e.deltaY * 0.67;
//                 window.requestAnimationFrame(() => {
//                     backMoving(wideBlock, slider, position);
//                 });
//             })
//         })
        
//         wideBlock.addEventListener("scroll", () => {
    
//             slides.forEach(slide => {
//                 const blockPos = slide.getBoundingClientRect().left;
//                 // const workArea = Math.round(window.innerWidth * 0.2 - window.innerWidth * 0.7);
//                 const leftActiveDot = Math.round(window.innerWidth / 2 - items[0].scrollWidth / 2);
//                 const rightActiveDot = Math.round(window.innerWidth / 2 + items[0].scrollWidth / 6);
//                 const workArea = Math.round(leftActiveDot - rightActiveDot);
//                 const workUnit = workArea / 100;
    
//                 // const workToLeft = Math.round(window.innerWidth * 0.2 - blockPos);
//                 const workToLeft = Math.round(leftActiveDot - blockPos);
               
//                 const procentToLeft = Math.round(workToLeft / workUnit);
                
    
//                 // if (blockPos > window.innerWidth * 0.2 && blockPos < window.innerWidth * 0.7) {
//                 if (blockPos > leftActiveDot && blockPos < rightActiveDot) {
//                     console.log(procentToLeft);
//                     slide.children[0].style.right = (100 - procentToLeft) * -2 + "%";
//                 } else if (blockPos < leftActiveDot && blockPos < rightActiveDot) {
//                     slide.children[0].style.right = "-200%";
//                 } else if (blockPos > leftActiveDot && blockPos > rightActiveDot) {
//                     slide.children[0].style.right = "0%";
//                 }
                
//             })
            
//         })
    
//         wideBlock.addEventListener("mouseleave", () => {
//             document.body.style.overflow = '';
//             document.body.style.paddingRight = `0px`;
//         })
    
//     })
    
    
//     function backMoving(line, slider, position) {
//         line.scrollLeft += position * 1;
//         // const rightPosition = window.getComputedStyle(slider).right.slice(0, -2);
//         // // console.log( -slider.scrollWidth);
//         // if (+rightPosition + position <= 0 && +rightPosition + position >= -slider.scrollWidth + line.clientWidth) {
//         //     slider.style.right = `${+position + +rightPosition}px`; 
//         // } else {
//         //     if (+rightPosition + position > 0 && +rightPosition + position > -slider.scrollWidth + line.clientWidth ) {
//         //         slider.style.right = `0px`; 
//         //     } else if (+rightPosition + position < 0 && +rightPosition + position < -slider.scrollWidth + line.clientWidth) {
//         //         slider.style.right = `${-slider.scrollWidth + line.clientWidth}px`; 
//         //     }
//         // }
//     }   
    



// 4============================================================================

// window.addEventListener("DOMContentLoaded", () => {
//     const wideBlock = document.querySelector(".slider_wrap");
//     const line = document.querySelector(".line");
//     const slider = document.querySelector(".slider");
//     const slides = document.querySelectorAll(".slide");
//     const items = document.querySelectorAll(".item");
//     let scroll = calcScroll();

//     line.style.width = `${slider.scrollWidth}px`;
//     slider.style.right = `${(slider.scrollWidth - wideBlock.clientWidth) * -1}px`;

//     window.addEventListener("resize", () => {
//         scroll = calcScroll();
//     })

 
//     wideBlock.addEventListener("mouseenter", () => {
//         document.body.style.overflow = 'hidden';
//         document.body.style.paddingRight = `${scroll}px`;

//         wideBlock.addEventListener("wheel", (e) => {
//             const position = e.deltaY * 1.5;
//             window.requestAnimationFrame(() => {
//                 backMoving(wideBlock, slider, position);
//             });
//         })
//     })
    
//     wideBlock.addEventListener("wheel", () => {

//         slides.forEach(slide => {
//             const blockPos = slide.getBoundingClientRect().left;
//             // const workArea = Math.round(window.innerWidth * 0.2 - window.innerWidth * 0.7);
//             const workArea = items[0].clientWidth;
//             const workUnit = workArea / 100;

//             // const workToLeft = Math.round(window.innerWidth * 0.2 - blockPos);
//             const workToLeft = Math.round(window.innerWidth / 2 - workArea / 2);
//             const workToRight = Math.round(window.innerWidth / 2 + workArea / 6);
           
//             // const procentToLeft = Math.round(workToLeft / workUnit);
//             const procentToLeft = Math.round(workToLeft - blockPos) / workUnit;
            

//             // if (blockPos > window.innerWidth * 0.2 && blockPos < window.innerWidth * 0.7) {
//             if (blockPos >= workToLeft && blockPos <= workToRight) {
//                 console.log(procentToLeft);
//                 slide.children[0].style.right = (100 + procentToLeft) * -2 + "%";
//             } 
//         })
        
//     })

//     wideBlock.addEventListener("mouseleave", () => {
//         document.body.style.overflow = '';
//         document.body.style.paddingRight = `0px`;
//     })

// })


// function backMoving(line, slider, position) {
//     // line.scrollLeft += position * 1;
    
//     const rightPosition = window.getComputedStyle(slider).right.slice(0, -2);
//     // console.log( -slider.scrollWidth);
//     if (+rightPosition + position <= 0 && +rightPosition + position >= -slider.scrollWidth + line.clientWidth) {
//         slider.style.right = `${+position + +rightPosition}px`; 
//     } else {
//         if (+rightPosition + position > 0 && +rightPosition + position > -slider.scrollWidth + line.clientWidth ) {
//             slider.style.right = `0px`; 
//         } else if (+rightPosition + position < 0 && +rightPosition + position < -slider.scrollWidth + line.clientWidth) {
//             slider.style.right = `${-slider.scrollWidth + line.clientWidth}px`; 
//         }
//     }
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

// 3==================================================================================================

// window.addEventListener("DOMContentLoaded", () => {
//     const wideBlock = document.querySelector(".slider_wrap");
//     const slides = document.querySelectorAll(".slide");
//     let scroll = calcScroll();

//     window.addEventListener("resize", () => {
//         scroll = calcScroll();
//     })

//     // const observer = new IntersectionObserver((entries) => {
//     //     entries.forEach(entry => {
//     //         if (entry.isIntersecting) {
//     //             entry.target.classList.add("active");
//     //         } else {
//     //             entry.target.classList.remove("active");
//     //         }
//     //     });
//     // }, {
//     //     root: wideBlock,
//     //     rootMargin: "0% -10% 0% -10%",
//     //     threshold: 0.5
//     // });

//     // slides.forEach(slide => observer.observe(slide));
 
//     wideBlock.addEventListener("mouseenter", () => {
//         document.body.style.overflow = 'hidden';
//         document.body.style.paddingRight = `${scroll}px`;

//         wideBlock.addEventListener("wheel", (e) => {
//             const activeSlide = document.querySelectorAll(".active");
//             const sizeIndex = 0.66; /* (height / width) */
//             const position = e.deltaY;

//             window.requestAnimationFrame(() => {
//                 backMoving(wideBlock, activeSlide, sizeIndex, position);
//             });
//         })
//     })
    
//     wideBlock.addEventListener("scroll", () => {
//         const scrollLeft = wideBlock.scrollLeft;
//         const blockPos = slides[0].getBoundingClientRect().left;
//         const workArea = Math.round(window.innerWidth * 0.2 - window.innerWidth * 0.7/* 0.8 */);
//         const workUnit = workArea / 100;
//         const workToLeft = Math.round(window.innerWidth * 0.2 - blockPos);

//         const procentToLeft = Math.round(workToLeft / workUnit);

//         if (/* true */ blockPos > window.innerWidth * 0.2 && blockPos < window.innerWidth * 0.7/* 0.8 - slides[0].offsetWidth */) {
//             // const leftPosition = window.getComputedStyle(slides[0]).left.slice(0, -2);
//             // slides[0].children[0].add("active");
//             slides[0].children[0].style.right = (100 - procentToLeft) * -2.1 + "%";
//             console.log(procentToLeft);
//             console.log(blockPos + "px");
//         } else {
//             // slides[0].classList.remove("active");
//         }
//     })

//     wideBlock.addEventListener("mouseleave", () => {
//         document.body.style.overflow = '';
//         document.body.style.paddingRight = `0px`;
//     })

// })


// function backMoving(wideBlock, activeSlide, sizeIndex, position) {
//     wideBlock.scrollLeft += position * 1.2;
//     // const wbPos = window.getComputedStyle(wideBlock).left.slice(0, -2);
//     // if (wbPos <= 0  && wbPos >= wideBlock.clientWidth - 800  ) {
//     // if (dist <= 0 && dist > -(slide.clientWidth) * sizeIndex) {
//         // wideBlock.style.left =`${wbPos - position}px`;
//     // }
    
//     activeSlide.forEach(item => {
//         // const slide = item.children[0];
//         // const leftPosition = window.getComputedStyle(slide).left.slice(0, -2);
//         // const dist = +leftPosition + +(position / (sizeIndex * 5));
//         // if (dist <= 0 && dist > -(slide.clientWidth) * sizeIndex) {
//         //     slide.style.left = `${dist}px`;
//         // }
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



// 2==================================================================================================

// window.addEventListener("DOMContentLoaded", () => {
//     const wideBlock = document.querySelector(".slider_wrap");
//     const slides = document.querySelectorAll(".slide");
//     let scroll = calcScroll();

//     window.addEventListener("resize", () => {
//         scroll = calcScroll();
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
//         root: wideBlock,
//         rootMargin: "0% -10% 0% -10%",
//         threshold: 0.5
//     });

//     slides.forEach(slide => observer.observe(slide));
 
//     wideBlock.addEventListener("mouseenter", () => {
//         document.body.style.overflow = 'hidden';
//         document.body.style.paddingRight = `${scroll}px`;

//         wideBlock.addEventListener("wheel", (e) => {
//             const activeSlide = document.querySelectorAll(".active");
//             const sizeIndex = 0.66; /* (height / width) */
//             const position = e.deltaY;

//             window.requestAnimationFrame(() => {
//                 backMoving(wideBlock, activeSlide, sizeIndex, position);
//             });
//         })
//     })

//     wideBlock.addEventListener("mouseleave", () => {
//         document.body.style.overflow = '';
//         document.body.style.paddingRight = `0px`;
//     })

// })


// function backMoving(wideBlock, activeSlide, sizeIndex, position) {
//     wideBlock.scrollLeft += position * sizeIndex;
//     activeSlide.forEach(item => {
//         const slide = item.children[0];
//         const leftPosition = window.getComputedStyle(slide).left.slice(0, -2);
//         const dist = +leftPosition + +(position / (sizeIndex * 5));
//         if (dist <= 0 && dist > -(slide.clientWidth) * sizeIndex) {
//             slide.style.left = `${dist}px`;
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





// 1==================================================================================================

// window.addEventListener("DOMContentLoaded", () => {
//     const wideBlock = document.querySelector(".slider_wrap");
//     const slides = document.querySelectorAll(".slide");
//     let scroll = calcScroll();

//     window.addEventListener("resize", () => {
//         scroll = calcScroll();
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
//         root: wideBlock,
//         rootMargin: "0% -10% 0% -10%",
//         threshold: 0.5
//     });

//     slides.forEach(slide => observer.observe(slide));
 
//     wideBlock.addEventListener("mouseenter", () => {
//         document.body.style.overflow = 'hidden';
//         document.body.style.paddingRight = `${scroll}px`;

//         wideBlock.addEventListener("wheel", (e) => {
//             const activeSlide = document.querySelectorAll(".active");
//             const sizeIndex = 0.66; /* (height / width) */
//             const position = e.deltaY;

//             window.requestAnimationFrame(() => {
//                 backMoving(wideBlock, activeSlide, sizeIndex, position);
//             });
//             // wideBlock.scrollLeft += position * sizeIndex;
//             // activeSlide.forEach(item => {
//             //     const slide = item.children[0];
//             //     const leftPosition = window.getComputedStyle(slide).left.slice(0, -2);
//             //     const dist = +leftPosition + +(position / (sizeIndex * 5));
//             //     if (dist <= 0 && dist > -(slide.clientWidth) * sizeIndex) {
//             //         slide.style.left = `${dist}px`;
//             //     }
//             // })
//         })
//     })

//     wideBlock.addEventListener("mouseleave", () => {
//         document.body.style.overflow = '';
//         document.body.style.paddingRight = `0px`;
//     })

// })


// function backMoving(wideBlock, activeSlide, sizeIndex, position) {
//     wideBlock.scrollLeft += position * sizeIndex;
//     activeSlide.forEach(item => {
//         const slide = item.children[0];
//         const leftPosition = window.getComputedStyle(slide).left.slice(0, -2);
//         const dist = +leftPosition + +(position / (sizeIndex * 5));
//         if (dist <= 0 && dist > -(slide.clientWidth) * sizeIndex) {
//             slide.style.left = `${dist}px`;
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



// ==================================================================================================
// window.addEventListener("DOMContentLoaded", () => {
//     const wideBlocks = document.querySelectorAll(".slider_wrap");
//     const slider = wideBlocks[0].querySelector(".slider");
//     const slides = document.querySelectorAll(".slide");
//     const scroll = calcScroll();

    
//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 entry.target.classList.add("active");
//             } else {
//                 entry.target.classList.remove("active");
//             }
//         });
//     }, {
//         root: wideBlocks[0],
//         rootMargin: "0% -10% 0% -10%",
//         threshold: 0.5
//     });

//     slides.forEach(slide => observer.observe(slide));

//     wideBlocks.forEach(block => {
//         block.addEventListener("mouseenter", () => {
//             document.body.style.overflow = 'hidden';
//             document.body.style.paddingRight = `${scroll}px`;
//             block.addEventListener("wheel", (e) => {
//                 let position = e.deltaY;
//                 block.scrollLeft += position * 1.5;
//                 const act = document.querySelectorAll(".active");
//                 // console.log(act);
//                 act.forEach(item => {
//                     // console.log(slider.clientWidth);
//                     const l = window.getComputedStyle(item.children[0]).left.slice(0, -2);
//                     const dist = +l + +(position / 7)
//                     if (dist <= 0 && dist > (item.children[0].clientWidth) * -0.65)
//                     item.children[0].style.left = `${dist}px`
//                     console.log(item.children[0].clientWidth * -1);
//                     // console.log(item.children[0].style.left);
//                 })
                
//             })
//         })
//     })

//     wideBlocks.forEach(block => {
//         block.addEventListener("mouseleave", () => {
//             document.body.style.overflow = '';
//             document.body.style.paddingRight = `0px`;
//         })
//     })

// })


