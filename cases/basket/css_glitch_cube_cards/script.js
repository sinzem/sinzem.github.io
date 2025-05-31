const button = document.getElementById("deliveryBtn");
const circle = document.getElementById("circleIcon");
const btnText = document.getElementById("btnText");
const truck = document.getElementById("truckClone");
const check = document.getElementById("checkIcon");

button.addEventListener("click", () => {
    if (button.classList.contains("disabled")) return;

    button.classList.add("disabled");
    circle.classList.add("shrink");
    btnText.textContent = "On the way";
    btnText.classList.add("centered");
    check.classList.remove("visible");

    setTimeout(() => {
        truck.classList.add("animate");
    }, 400);

    setTimeout(() => {
        truck.classList.remove("animate");
        btnText.textContent = "Done";
        check.classList.add("visible");
    }, 2000)

    setTimeout(() => {
        check.classList.remove("visible");
        circle.classList.remove("shrink");
        btnText.textContent = "Deliver";
        btnText.classList.remove("centered");
        button.classList.remove("disabled");
    }, 3000)
})