export const songsContainer = {
    container: document.querySelector("#songs_container"),
    menuContainer: document.querySelector("#menu_container"),
    songsList: [],

    playButtonOnClick: function(index) {},
    likeButtonOnClick: function(songId) {},
    menuPlaylistOnClick: function(songId, playlistId) {},
    removeFromPlaylistButtonClick: function(songId, playlistId) {},

    mouseLeaveMenuHandler: function() {
        this.menuContainer.innerHTML = "";
    },

    switchLikeSongButton: function(songId, like) {
        for (let i = 0; i < this.songsList.length; ++i) {
            if (this.songsList[i].songId === songId) {
                let likeButton = this.songsList[i].likeButton;
                let icon = this.songsList[i].likeButton.icon;
                if (like) {
                    icon.classList.remove("fa-regular");
                    icon.classList.add("fa-solid");
                    likeButton.classList.add("active_button");
                } else {
                    icon.classList.remove("fa-solid");
                    icon.classList.add("fa-regular");
                    likeButton.classList.remove("active_button");
                }
            }
        }
    },

    loadSongs: function(json, userData, playlistId) {
        this.songsList = [];

        this.container.innerHTML =
            "<div class=\"music_columns\">\n" +
            "   <p class=\"column c1\"></p>\n" +
            "   <p class=\"column c2\">Song</p>\n" +
            "   <p class=\"column c2\">Album</p>\n" +
            "   <p class=\"column c2\">Author</p>\n" +
            "</div>";

        const playButtonClickEvent = this.playButtonOnClick.bind(this);
        const likeButtonClickEvent = this.likeButtonOnClick.bind(this);
        const clearMenuContainer = this.mouseLeaveMenuHandler.bind(this);
        const menuPlaylistClickEvent = this.menuPlaylistOnClick.bind(this);
        const removeFromPlaylistClickEvent = this.removeFromPlaylistButtonClick.bind(this);

        for (let i = 0; i < json.length; ++i) {
            let song = json[i];
            let row = document.createElement("div");
            row.classList.add("music");

            let buttons = document.createElement("div");
            buttons.classList.add("music_service_buttons", "c1");

            let playButton = document.createElement("button");
            playButton.classList.add("music_button");
            playButton.type = "submit";
            playButton.innerHTML = "<i class=\"fa-solid fa-play\"></i>";
            playButton.musicIndex = i;
            playButton.addEventListener("click", function () {
                playButtonClickEvent(playButton.musicIndex);
            });

            let likeButton = document.createElement("button");
            likeButton.classList.add("music_button");
            likeButton.type = "submit";
            likeButton.musicIndex = i;

            if (song.isLiked) {
                let icon = document.createElement("i");
                icon.classList.add("fa-solid", "fa-heart");
                likeButton.appendChild(icon);
                likeButton.icon = icon;
                likeButton.classList.add("active_button");
            } else {
                let icon = document.createElement("i");
                icon.classList.add("fa-regular", "fa-heart");
                likeButton.appendChild(icon);
                likeButton.icon = icon;
                likeButton.classList.remove("active_button");
            }

            likeButton.addEventListener("click", function () {
                if (song.isLiked) {
                    removeFromPlaylistClickEvent(song.songId, userData.favouritePlaylistId).then((result) => {
                        if (result) {
                            song.isLiked = false;
                            likeButton.icon.classList.remove("fa-solid");
                            likeButton.icon.classList.add("fa-regular");
                            likeButton.classList.remove("active_button");
                        }
                    });
                } else {
                    likeButtonClickEvent(song.songId).then((result) => {
                        if (result) {
                            song.isLiked = true;
                            likeButton.icon.classList.remove("fa-regular");
                            likeButton.icon.classList.add("fa-solid");
                            likeButton.classList.add("active_button");
                        }
                    });
                }
            });

            song.likeButton = likeButton;

            let addToPlaylistButton = document.createElement("button");
            addToPlaylistButton.classList.add("music_button");
            addToPlaylistButton.type = "submit";
            addToPlaylistButton.musicIndex = i;
            let menuContainer = this.menuContainer;

            if (playlistId != null) {
                addToPlaylistButton.innerHTML = "<i class=\"fa-solid fa-minus\"></i>";
                addToPlaylistButton.addEventListener("click", function () {
                    removeFromPlaylistClickEvent(song.songId, playlistId);
                });
            } else {
                addToPlaylistButton.innerHTML = "<i class=\"fa-regular fa-plus\"></i>";
                addToPlaylistButton.addEventListener("click", function () {
                    let playlistsMenu = document.createElement("div");
                    playlistsMenu.classList.add("playlists_list_menu");

                    for (let i in userData.playlists) {
                        let playlist = userData.playlists[i];
                        let playlistNote = document.createElement("p");
                        playlistNote.classList.add("playlist_list_element");
                        playlistNote.innerHTML = playlist.playlistName;
                        playlistNote.playlistId = playlist.playlistId;
                        playlistNote.addEventListener("click", () => {
                            menuPlaylistClickEvent(song.songId, playlistNote.playlistId);
                            clearMenuContainer();
                        });
                        playlistsMenu.appendChild(playlistNote);
                    }

                    let buttonRect = addToPlaylistButton.getBoundingClientRect();
                    playlistsMenu.style.left = buttonRect.left + "px";
                    playlistsMenu.style.top = buttonRect.top + "px";
                    playlistsMenu.addEventListener("mouseleave", () => {
                        clearMenuContainer();
                    })
                    menuContainer.appendChild(playlistsMenu);
                });
            }

            buttons.appendChild(playButton);
            buttons.appendChild(likeButton);
            buttons.appendChild(addToPlaylistButton);
            row.appendChild(buttons);

            let names = `<p class="column c2 music_text">${song["songName"]}</p>
                        <p class="column c2 music_text">${song["albumName"]}</p>
                        <p class="column c2 music_text">${song["performerName"]}</p>`;
            row.insertAdjacentHTML("beforeend", names);

            this.songsList.push(song);
            this.container.appendChild(row);

        }
    }
}