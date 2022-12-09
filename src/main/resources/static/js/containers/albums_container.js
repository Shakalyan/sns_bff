import {API_URLS} from "../api_utils.js";

export const albumsContainer = {
    container: document.querySelector("#albums_container"),

    albumsList: [],

    albumCardClickHandler: function(index){},

    loadAlbums: function(json) {
        this.albumsList = [];
        this.container.innerHTML = "";

        let albumCardClickHandler = this.albumCardClickHandler.bind(this);

        for (let i = 0; i < json.length; ++i) {
            let album = json[i];
            this.albumsList.push(album);

            let albumCard = document.createElement("div");
            albumCard.classList.add("album_card");

            const pathToAlbumImg = API_URLS.resourceHost + album["coverUrl"];
            const followers = `Followers: ${album["followers"]}`;
            const songs = `Songs: ${album["songsCount"]}`;
            albumCard.innerHTML =
                            `<img class="album_img" src=${pathToAlbumImg}>
                             <p class="album_description">${album["albumName"]}</p>
                             <p class="album_description">${album["performerName"]}</p>
                             <p class="album_description">${followers}</p>
                             <p class="album_description">${songs}</p>`;

            let likeButton = document.createElement("button");
            likeButton.classList.add("album_follow_button");
            likeButton.innerHTML = "<i class=\"fa-regular fa-heart\"></i>";
            albumCard.insertAdjacentElement("beforeend", likeButton);

            albumCard.index = i;
            albumCard.addEventListener("click", function() {
                albumCardClickHandler(albumCard.index);
            });

            this.container.appendChild(albumCard);
        }
    }
}