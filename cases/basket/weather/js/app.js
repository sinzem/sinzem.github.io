// document.addEventListener('mousemove', (e) => { /* (следим за движениями мышки, передаем в документ переменные с градусами наклона, подключаем в css) */
//     Object.assign(document.documentElement, {
//         style: `
//             --move-x: ${(e.clientX - window.innerWidth / 2) * -.005}deg;
//             --move-y: ${(e.clientY - window.innerHeight / 2) * -.01}deg
//         `
//     }) 
// })

const layers = document.querySelector(".layers__container");
document.addEventListener('mousemove', (e) => { 
    let x = (e.clientX - window.innerWidth / 2) / -200;
    let y = (e.clientY - window.innerHeight / 2) / -100;
    layers.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
})