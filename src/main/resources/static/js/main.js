let musicButton = document.querySelector("#music_button");
let contentContainer = document.querySelector(".content_container");

musicButton.addEventListener("click", function() {
    console.log("CLICK");
    let element = document.createElement("div");
    element.classList.add("music");
    contentContainer.appendChild(element);
});