import {API_URLS} from "../api_utils.js";

export const albumsContainer = {
    container: document.querySelector("#albums_container"),

    albumsList: [],

    albumCardClickHandler: function(index){},

    entity: "album",

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
    },

    playlistCard: {
        nameField: null,
        uploadCoverInput: null,
        outputField: null
    },

    addPlaylistCardHandler: function() {},

    addPlaylistCreationCard: function() {
        let playlistCreationCard = document.createElement("div");
        playlistCreationCard.classList.add("album_card");
        playlistCreationCard.innerHTML += `<img class="album_img" src="../../img/playlistCreationImg.png">`;
        playlistCreationCard.addEventListener("click", () => {
            this.addPlaylistCardHandler();
        });

        let nameField = document.createElement("input");
        nameField.classList.add("playlist_card_input");
        nameField.placeholder = "Playlist name";
        this.playlistCard.nameField = nameField;

        let uploadCoverInput = document.createElement("input");
        uploadCoverInput.type = "file";
        uploadCoverInput.style.display = "none";
        this.playlistCard.uploadCoverInput = uploadCoverInput;

        let uploadCoverButton = document.createElement("button");
        uploadCoverButton.classList.add("performer_section_icon_button");
        uploadCoverButton.innerHTML = "<i class=\"fa-solid fa-upload\"></i>";
        uploadCoverButton.addEventListener("click", () => {
            this.playlistCard.uploadCoverInput.click();
        });

        let outputField = document.createElement("span");
        outputField.classList.add("performer_section_output_field");
        this.playlistCard.outputField = outputField;

        playlistCreationCard.appendChild(nameField);
        playlistCreationCard.appendChild(uploadCoverInput);
        playlistCreationCard.appendChild(uploadCoverButton);
        playlistCreationCard.appendChild(outputField);

        this.container.appendChild(playlistCreationCard);
    }



}