const ex1Top = document.querySelector(".ex_1__top");
const ex1Bottom = document.querySelector(".ex_1__bottom");
const ex1Img = document.querySelector(".ex_1__drag")

ex1Top.addEventListener("dragover", ex1AllowDrop);
ex1Bottom.addEventListener("dragover", ex1AllowDrop);

ex1Img.addEventListener("dragstart", ex1Drag);

ex1Top.addEventListener("drop", ex1Drop);
ex1Bottom.addEventListener("drop", ex1Drop);

function ex1AllowDrop(e) {
    e.preventDefault();
}

function ex1Drag(e) {
    e.dataTransfer.setData('id', e.target.id);
}

function ex1Drop(e) {
    let itemId = e.dataTransfer.getData("id");
    e.target.append(document.getElementById(itemId));
}

// ===============================================================================

const ex2Fill = document.querySelector(".ex_2__fill");
const ex2Empties = document.querySelectorAll(".ex_2__empty");

ex2Fill.addEventListener("dragstart", ex2DragStart);
ex2Fill.addEventListener("dragend", ex2DragEnd);

ex2Fill.addEventListener("mousedown", (e) => {
    e.target.style.cursor = "grabbing";
})

ex2Fill.addEventListener("mouseup", (e) => {
    e.target.style.cursor = "grab";
})

ex2Fill.addEventListener("mouseout", (e) => {
    e.target.style.cursor = "grab";
})

for (const ex2Empty of ex2Empties) {
    ex2Empty.addEventListener("dragenter", ex2DragEnter);
    ex2Empty.addEventListener("dragleave", ex2DragLeave);
    ex2Empty.addEventListener("dragover", ex2DragOver);
    ex2Empty.addEventListener("drop", ex2Drop);
}

function ex2DragStart() {
    this.classList.add("ex_2__hold");
    setTimeout(() => this.className = "ex_2__invisible", 0);
}

function ex2DragEnd() {
    this.classList = "ex_2__fill";
    this.style.cursor = "grab";
}

function ex2DragEnter(e) {
    e.preventDefault();
    this.classList.add("ex_2__hovered");
}

function ex2DragLeave() {
    this.classList.remove("ex_2__hovered");
}

function ex2DragOver(e) {
    e.preventDefault();
}

function ex2Drop() {
    this.classList = "ex_2__empty";
    this.append(ex2Fill);
}

// ===============================================================================
class Ex3DragAndDrop {
    selectors = {
        root: '[data-js-dnd]',
    }
    stateClases = {
        isDragging: "ex_3__is-dragging",
    }

    initialState = {
        parentY: null,
        offsetX: null,
        offsetY: null,
        isDragging: false,
        currentDraggingElement: null,
    }

    constructor(mainBlock) {
        this.state = { ...this.initialState };
        this.bindEvents(mainBlock);
    }

    resetState() {
        this.state = { ...this.initialState };
    }

    onPointerDown(event) {
        const { target, x, y } = event;
        
        const isDraggable = target.matches(this.selectors.root);

        if(!isDraggable) return;

        target.classList.add(this.stateClases.isDragging);

        const { left, top } = target.getBoundingClientRect();
        const blockTop = target.parentElement.getBoundingClientRect().top;
        const realTop = y + blockTop;
        
        this.state = {
            parentY: blockTop,
            offsetX: x - left,
            offsetY: realTop - top,
            isDragging: true,
            currentDraggingElement: target,
        }
    }

    onPointerMove(event) {
        if (!this.state.isDragging) return;
        const realTop = event.pageY - window.scrollY;
        const x = event.pageX - this.state.offsetX;
        const y = realTop - this.state.offsetY;

        this.state.currentDraggingElement.style.left = `${x}px`;
        this.state.currentDraggingElement.style.top = `${y}px`;
    }

    onPointerUp() {
        if (!this.state.isDragging) return;

        this.state.currentDraggingElement.classList.remove(this.stateClases.isDragging);
        this.resetState();
    }

    bindEvents(block) {
        const area = document.querySelector(`.${block}`);
        area.addEventListener('pointerdown', (event) => this.onPointerDown(event));
        area.addEventListener('pointermove', (event) => this.onPointerMove(event));
        area.addEventListener('pointerup', () => this.onPointerUp());
    }
}

new Ex3DragAndDrop("ex_3");