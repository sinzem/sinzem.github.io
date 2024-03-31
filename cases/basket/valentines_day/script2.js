const hearts = document.querySelectorAll('.heart');

function heartsAnimation() {
    for (let i = 0; i < hearts.length; i++) {
        let time = rand(300, 800)/100;
        let left = rand(0, 98);
        let bottom = rand(0, 100);
        hearts[i].style.bottom = bottom + 'vh'
        hearts[i].style.left = left + 'vw';
        hearts[i].style.animation = `love ${time}s linear infinite`
    }
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);  
}

requestAnimationFrame(heartsAnimation);