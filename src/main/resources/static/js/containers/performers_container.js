import {API_URLS} from "../api_utils.js";

export const performersContainer = {
    container: document.querySelector("#performers_container"),

    performersList: [],

    cardClickHandler: function(index) {},
    likeButtonClickHandler: function(performerId, isLiked) {},

    loadPerformers: function(json) {
        this.performersList = [];
        this.container.innerHTML = "";

        let cardClickHandler = this.cardClickHandler.bind(this);
        let likeButtonClickHandler = this.likeButtonClickHandler.bind(this);

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
            let icon = document.createElement("i");
            if (performer.isLiked) {
                icon.classList.add("fa-solid", "fa-heart");
            } else {
                icon.classList.add("fa-regular", "fa-heart");
            }
            icon.name = "like_button";
            likeButton.name = "like_button";
            likeButton.appendChild(icon);

            //performer.isLiked = false; //DELETE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

            likeButton.addEventListener("click", () => {
                console.log(performer.isLiked);
                likeButtonClickHandler(performer.performerId, performer.isLiked).then((result) => {
                    if (result) {
                        console.log(performer.isLiked);
                        if (performer.isLiked) {
                            performer.isLiked = false;
                            icon.classList.remove("fa-solid");
                            icon.classList.add("fa-regular");
                            likeButton.classList.remove("active_button");
                        } else {
                            performer.isLiked = true;
                            icon.classList.remove("fa-regular");
                            icon.classList.add("fa-solid");
                            likeButton.classList.add("active_button");
                        }
                    }
                });
            });

            performerCard.appendChild(likeButton);

            performerCard.index = i;

            performerCard.addEventListener("click", function(e) {
                if (e.target.name === "like_button") {
                    e.preventDefault();
                    e.stopPropagation();
                } else {
                    cardClickHandler(performerCard.index);
                }
            });

            this.container.appendChild(performerCard);
        }
    }
}