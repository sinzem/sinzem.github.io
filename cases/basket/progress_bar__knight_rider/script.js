const knightRider = document.querySelector('.knight-rider');

function init() {
    for (let i = 0; i < 8; i++) {
        const span = document.createElement('span');
        knightRider.append(span);
    }
}

init();

let step = 0;
const knightRiderSpan = document.querySelectorAll('.knight-rider > span');

function anim() {

    // knightRiderSpan.forEach(item => {
    //     item.style.filter = 'contrast(50%)';
    //     item.style.boxShadow = 'none';
    // })
    if (step == knightRiderSpan.length) {
        step = 0;
        knightRiderSpan.forEach(item => {
            item.style.filter = 'contrast(50%)';
            item.style.boxShadow = 'none';
        })
    }

    knightRiderSpan[step].style.filter = 'contrast(150%)';
    knightRiderSpan[step].style.boxShadow = '0 0 30px #ff4766';
    step++;

   

    setTimeout(anim, 600);
}

anim();