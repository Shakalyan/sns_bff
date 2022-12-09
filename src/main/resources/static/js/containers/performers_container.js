import {API_URLS} from "../api_utils.js";

export const performersContainer = {
    container: document.querySelector("#performers_container"),

    performersList: [],

    cardClickHandler: function(index) {},

    loadPerformers: function(json) {
        this.performersList = [];
        this.container.innerHTML = "";

        let cardClickHandler = this.cardClickHandler.bind(this);

        for (let i = 0; i < json.length; ++i) {
            let performer = json[i];

            this.performersList.push(performer);

            let performerCard = document.createElement("div");
            performerCard.classList.add("performer_card");

            let performerImgUrl = API_URLS.resourceHost + performer["avatarUrl"];
            let followers = `Followers: ${performer["followers"]}`;
            performerCard.innerHTML =
                `<img class="performer_img" src=${performerImgUrl}>
                 <p class="performer_description">${performer["performerName"]}</p>
                 <br>
                 <p class="performer_description">${followers}</p>`;

            let likeButton = document.createElement("button");
            likeButton.classList.add("performer_follow_button");
            likeButton.innerHTML = "<i class=\"fa-regular fa-heart\"></i>";

            performerCard.appendChild(likeButton);

            performerCard.index = i;

            performerCard.addEventListener("click", function() {
                cardClickHandler(performerCard.index);
            });

            this.container.appendChild(performerCard);
        }
    }
}