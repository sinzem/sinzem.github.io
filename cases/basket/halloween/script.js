const header = document.querySelector('.site-header');
const spider = document.querySelector('.spider');

const audio = new Audio();
audio.preload = 'auto';
audio.src = './RE.mp3';

spider.addEventListener('click', () => {
    if(audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

document.querySelector('.halloween-on').onchange = function() {
    if (this.checked) {
        header.classList.add('site-header-bg');
        spider.classList.add('spider-animation');
    } else {
        header.classList.remove('site-header-bg');
        spider.classList.remove('spider-animation');
    }
}