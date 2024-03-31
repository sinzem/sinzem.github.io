const buttonOn = document.querySelector('.on');
const buttonOff = document.querySelector('.off');
const img = document.querySelector('.wrap-img > img');

// buttonOn.onclick = () => start(6);

// buttonOff.onclick = () => pause();

// document.querySelector('.buttons').onclick = function(event) {
//     if (!event.target.classList.contains('speed')) return;
//     // pause();
//     let speed = event.target.getAttribute('data-speed');
//     start(speed);
// }

// function pause() {
//     img.style.animationPlayState = 'paused'; /* (пауза позволяет плавно остановить вращение, если просто прописать запуск через тоггл - из места, в котором остановили, будет резко возвращать к началу анимации) */
// }

// function start(speed) {
//     img.style.animationDuration = speed + 's';
//     img.style.animationPlayState = 'running';
// }

// ------------------------------------------------------------------

// buttonOn.onclick = function() {
//     img.style.animationDuration = 6 + 's';
//     img.style.animationPlayState = 'running';
// }

// buttonOff.onclick = function() {
//     // img.style.animationDuration = 6 + 's';
//     img.style.animationPlayState = 'paused';
// }

// document.querySelector('.buttons').onclick = function(event) {
//     if (!event.target.classList.contains('speed')) return;
//     let speed = event.target.getAttribute('data-speed');
//     img.style.animationDuration = speed + 's';
// }

// ------------------------------------------------------------------
let angle = 0;
let time = 16;
let flag = false;
let en = false;

function start() {
    setTimeout(function start() {
        angle < 360 ? angle = angle + 3 : angle = 0;
        img.style.transform = `rotate(${angle}deg)`;
        en ? setTimeout(start, time) : null;
    }, time);
};

buttonOn.onclick = () => {
    en = true;
    time = 16;
    !flag ? start() : null;
    flag = true;
};

buttonOff.onclick = () => {
    en = false;
    flag = false;
};

document.querySelector('.buttons').onclick = function(event) {
    if (!event.target.classList.contains('speed')) return;
    let speed = event.target.getAttribute('data-speed');
    time = 16 / speed;
};




