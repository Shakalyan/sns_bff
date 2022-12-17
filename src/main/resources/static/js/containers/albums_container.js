import {API_URLS} from "../api_utils.js";

export const albumsContainer = {
    container: document.querySelector("#albums_container"),

    albumsList: [],

    albumCardClickHandler: function(index){},
    deleteButtonClickHandler: function(playlistId) {},

    entity: "album",

    loadAlbums: function(json) {
        this.albumsList = [];
        this.container.innerHTML = "";

        let albumCardClickHandler = this.albumCardClickHandler.bind(this);
        let deleteButtonClickHandler = this.deleteButtonClickHandler.bind(this);

        for (let i = 0; i < json.length; ++i) {
            let album = json[i];
            this.albumsList.push(album);

            let albumCard = document.createElement("div");
            albumCard.classList.add("album_card");

            const pathToAlbumImg = API_URLS.resourceHost + album["coverUrl"];
            const songs = `Songs: ${album["songsCount"]}`;
            albumCard.innerHTML =
                            `<img class="album_img" src=${pathToAlbumImg}>
                             <p class="album_description">${album["albumName"]}</p>
                             <p class="album_description">${album["performerName"]}</p>
                             <p class="album_description">${songs}</p>`;

            if (this.entity === "playlist") {
                let deleteButton = document.createElement("button");
                deleteButton.classList.add("album_follow_button");

                let icon = document.createElement("i");
                icon.classList.add("fa-solid", "fa-minus");
                icon.name = "delete_button";
                deleteButton.name = "delete_button";
                deleteButton.appendChild(icon);
                deleteButton.addEventListener("click", function() {
                    deleteButtonClickHandler(album.albumId);
                });
                albumCard.insertAdjacentElement("beforeend", deleteButton);
            }

            albumCard.index = i;
            albumCard.name = "album_card";
            albumCard.addEventListener("click", function(e) {
                console.log(e.target.name);
                if (e.target.name === "delete_button") {
                    e.preventDefault();
                    e.stopPropagation();
                } else {
                    albumCardClickHandler(albumCard.index);
                }
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

        let icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-upload");
        icon.name = "upload_button";
        uploadCoverButton.name = "upload_button";
        uploadCoverButton.appendChild(icon);
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

        playlistCreationCard.addEventListener("click", () => {
            this.addPlaylistCardHandler();
        });

        this.container.appendChild(playlistCreationCard);
    }



}