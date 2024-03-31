/* (from WebDesign master) */
// let zSpacing = -1000; /* (переменная для расстояния между фреймами) */
// let lastPos = zSpacing / 5; /* (начальная позиция фрейма при появлении) */
// let $frames = document.getElementsByClassName("frame"); /* (получаем из верстки фреймы) */
// let frames = Array.from($frames); /* (превращаем в массив) */ 
// let zVals = []; /* (массив, в который поместим значения перспективы для каждого фрейма) */

// window.onscroll = function() {

//     let top = document.documentElement.scrollTop;
//     let delta = lastPos - top; /* (условная переменная(так как весь слайдер представлен на одном экране, значения scrollTop как-бы не существует), которая отобразит количество cкролла от начальной позиции при появлении) */

//     lastPos = top;

//     frames.forEach(function(n, i) { /* (перебираем фреймы, по индексу каждому высчитываем глубину и добавляем значения в массив zVals) */
//         zVals.push((i * zSpacing) + zSpacing);
//         zVals[i] += delta * -5.5; /* (подвязываем глубину к скроллу, от умножаемого значения будет зависеть скорость) */
//         let frame = frames[i];
//         let transform = `translateZ(${zVals[i]}px)`;
//         let opacity = zVals[i] < Math.abs(zSpacing) / 1.8 ? 1 : 0; /* (выводим в переменную глубину, по достижению которой фрейм станет прозрачным) */
//         frame.setAttribute("style", `transform: ${transform}; opacity: ${opacity}`);
//     })
// }

// window.scrollTo(0, 1); /* (вручную запускаем скролл при загрузке, иначе слои будут наложены друг на друга до первой прокрутки) */

// let soundButton = document.querySelector(".soundbutton");
// let audio = document.querySelector(".audio");

// soundButton.addEventListener("click", (e) => {
//     soundButton.classList.toggle("paused");
//     audio.paused ? audio.play() : audio.pause();
// })

// window.onfocus = function() {
//     soundButton.classList.contains("paused") ? audio.pause() : audio.play();
// }

// window.onblur = function() {
//     audio.pause();
// }
// -----------------------------------------------------------------

window.addEventListener("DOMContentLoaded", () => {

	const frames = document.querySelectorAll('.frame');
    // const body = document.querySelector(".body");
    let persp = 200;
   
    // body.style.height = `${frames.length * 1000 + 1500}px` ;

    window.addEventListener("scroll", () => { 
        let scroll = document.documentElement.scrollTop;
        frames.forEach((frame, i) => {

            let distance = persp - (i * 1000) + scroll;
            frame.style.transform = `translateZ(${distance}px`;
            frame.style.display = distance < 1000 && distance > -3000 ? "flex" : "none"; 
            frame.style.opacity = distance > 400 ? 0 : 1;
            
        })
    })

    window.scroll(0, 1);

    let soundButton = document.querySelector('.soundbutton'),
		audio = document.querySelector('.audio');

    soundButton.addEventListener('click', () => {
        soundButton.classList.toggle('paused');
        audio.paused ? audio.play() : audio.pause();
    })

    window.addEventListener("focus", () => {
        soundButton.classList.contains('paused') ? audio.play() : audio.pause();
    })

    window.addEventListener("blur", () => {
        audio.pause();
    })
})