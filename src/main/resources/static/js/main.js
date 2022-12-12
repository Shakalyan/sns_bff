import {API_URLS, getUserData, sendBlobWithAuthorization, sendQueryWithAuthorization} from "./api_utils.js";
import {songsContainer} from "./containers/songs_container.js";
import {albumsContainer} from "./containers/albums_container.js";
import {performersContainer} from "./containers/performers_container.js";
import {yourMusicContainer} from "./containers/your_music_container.js";

let userData = {};

const accountInfoCard = {
    accountName: document.querySelector("#account_name_field"),
    accountAvatar: document.querySelector("#account_avatar_image"),
    accountAvatarUpload: document.querySelector("#upload_account_avatar_input")
};

accountInfoCard.accountAvatar.addEventListener("click", () => {
    accountInfoCard.accountAvatarUpload.click();
});

accountInfoCard.accountAvatarUpload.addEventListener("change", () => {
    let file = accountInfoCard.accountAvatarUpload.files[0];
    let url = `${API_URLS.host}api/account/avatar`;
    sendBlobWithAuthorization(url, "POST", "avatar", file, userData.token).then((response) => {
        if (response.status === 200) {
            response.text().then((url) => {
                sessionStorage.setItem("avatarUrl", url);
                accountInfoCard.accountAvatar.src = API_URLS.resourceHost + url;
            })
        } else {
            handleAPIError(response);
        }
    });
});

window.addEventListener("load", () => {
    userData = getUserData();
    accountInfoCard.accountName.innerHTML = userData["username"];
    accountInfoCard.accountAvatar.src = API_URLS.resourceHost + userData["avatarUrl"];
    player.onload();
});

window.addEventListener("resize", () => {
    player.setDurationInscriptionsPositions();
});

const searchBar = document.querySelector("#search_bar");
const searchButtonsGroup = {
    song: document.querySelector("#search_button_song"),
    album: document.querySelector("#search_button_album"),
    performer: document.querySelector("#search_button_performer"),
};

for(let key in searchButtonsGroup) {
    searchButtonsGroup[key].addEventListener("click", function() {
        for(let k in searchButtonsGroup)
            searchButtonsGroup[k].classList.remove("search_button_chosen");
        let index = this.id.lastIndexOf("_");
        let chosenKey = this.id.substring(index+1);
        searchButtonsGroup[chosenKey].classList.add("search_button_chosen");
    });
}

function getChosenSearchButton() {
    for(let key in searchButtonsGroup)
        if(searchButtonsGroup[key].classList.contains("search_button_chosen"))
            return key;
}

function openContainer(containerName) {
    songsContainer.container.classList.add("hide");
    albumsContainer.container.classList.add("hide");
    performersContainer.container.classList.add("hide");
    yourMusicContainer.container.classList.add("hide");
    switch (containerName) {
        case "song":
            songsContainer.container.classList.remove("hide");
            return;
        case "album":
            albumsContainer.container.classList.remove("hide");
            return;
        case "performer":
            performersContainer.container.classList.remove("hide");
            return;
        case "yourMusic":
            yourMusicContainer.container.classList.remove("hide");
            return;
    }
}

searchBar.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        const url = `${API_URLS.host}api/find?type=${getChosenSearchButton()}&word=${searchBar.value}`;
        sendQueryWithAuthorization(url, "GET", userData.token).then((response) => {
            if (response.status === 200) {
                openContainer(getChosenSearchButton());
                response.json().then((json) => {
                    switch (getChosenSearchButton()) {
                        case "song":
                            songsContainer.loadSongs(json, userData, null);
                            break;
                        case "album":
                            albumsContainer.entity = "album";
                            albumsContainer.loadAlbums(json);
                            break;
                        case "performer":
                            performersContainer.loadPerformers(json);
                            break;
                    }
                });
            } else {
                handleAPIError(response);
            }
        });
    }
});

const yourMusicButton = document.querySelector("#performer_section_music_button");
yourMusicButton.addEventListener("click", function() {
    const url = `${API_URLS.host}api/albums?performerId=${userData.userId}`;
    sendQueryWithAuthorization(url, "GET", userData.token).then((response) => {
        if (response.status === 200) {
            response.json().then((json) => {
                yourMusicContainer.loadContainer(json);
            });
        } else {
            handleAPIError(response)
        }
    });
    openContainer("yourMusic");
});

function loadYourChosenAlbum() {
    let albumId = yourMusicContainer.getCurrentAlbumId();
    if (albumId === -1)
        return;

    const url = `${API_URLS.host}api/album/songs?albumId=${albumId}`;
    sendQueryWithAuthorization(url, "GET", userData.token).then((response) => {
        if (response.status === 200) {
            response.json().then((json) => {
                yourMusicContainer.loadSongs(json);
            });
        } else {
            handleAPIError(response)
        }
    });
}

yourMusicContainer.albumList.addEventListener("change", function() {
    loadYourChosenAlbum();
});

yourMusicContainer.uploadAlbumImageButton.addEventListener("click", () => {
    yourMusicContainer.uploadAlbumImageInput.click();
});

yourMusicContainer.uploadAlbumImageInput.addEventListener("change", () => {
    yourMusicContainer.setOutputText(`Chosen cover file: ${yourMusicContainer.uploadAlbumImageInput.files[0].name}`);
});

yourMusicContainer.addAlbumButton.addEventListener("click", () => {
    if (yourMusicContainer.uploadAlbumImageInput.files.length === 0) {
        yourMusicContainer.setOutputText("Choose .png file for album's cover");
        return;
    }

    if (yourMusicContainer.albumNameField.value === "") {
        yourMusicContainer.setOutputText("Empty album name");
        return;
    }

    let cover = yourMusicContainer.uploadAlbumImageInput.files[0];
    let albumName = yourMusicContainer.albumNameField.value;
    const url = `${API_URLS.host}api/albums?albumName=${albumName}`;
    sendBlobWithAuthorization(url, "POST", "cover", cover, userData.token).then((response) => {
        if (response.status === 200) {
            response.text().then((albumId) => {
                yourMusicContainer.addAlbum(albumId, albumName);
            });
        } else {
            handleAPIError(response);
        }
    });
});

yourMusicContainer.uploadSongButton.addEventListener("click", () => {
    yourMusicContainer.uploadSongInput.click();
});

yourMusicContainer.uploadSongInput.addEventListener("change", () => {
    let songFile = yourMusicContainer.uploadSongInput.files[0];
    yourMusicContainer.setOutputText(`Chosen song file: ${songFile.name}`);
});

yourMusicContainer.addSongButton.addEventListener("click", () => {
    if (yourMusicContainer.uploadSongInput.files.length === 0) {
        yourMusicContainer.setOutputText("Choose .mp3 song file");
        return;
    }
    if (yourMusicContainer.songNameField.value === "") {
        yourMusicContainer.setOutputText("Empty song name");
        return;
    }
    let albumId = yourMusicContainer.albumList.value;
    if (albumId === -1) {
        yourMusicContainer.setOutputText("Choose album");
        return;
    }
    let songName = yourMusicContainer.songNameField.value;
    let url = `${API_URLS.host}api/album/songs?albumId=${albumId}&songName=${songName}`;
    let songFile = yourMusicContainer.uploadSongInput.files[0];
    sendBlobWithAuthorization(url, "POST", "songFile", songFile, userData.token).then((response) => {
        if (response.status === 200) {
            response.text().then((songId) => {
                yourMusicContainer.addSong(songId, songName);
            });
        } else {
            handleAPIError(response);
        }
    });
});

yourMusicContainer.deleteSongButton.addEventListener("click", () => {
    if (yourMusicContainer.chosenSong == null) {
        yourMusicContainer.setOutputText("Choose song");
        return;
    }
    let songId = yourMusicContainer.chosenSong;
    let url = `${API_URLS.host}api/album/songs?songId=${songId}`;
    sendQueryWithAuthorization(url, "DELETE", userData.token).then((response) => {
        if (response.status === 200) {
            loadYourChosenAlbum();
            yourMusicContainer.setOutputText(`Song was successfully deleted`);
        } else {
            handleAPIError(response);
        }
    });
});

yourMusicContainer.deleteAlbumButton.addEventListener("click", () => {
    if (yourMusicContainer.getCurrentAlbumId() === -1)
        return;
    let albumId = yourMusicContainer.getCurrentAlbumId();
    let url = `${API_URLS.host}api/albums?albumId=${albumId}`;
    sendQueryWithAuthorization(url, "DELETE", userData.token).then((response) => {
        if (response.status === 200) {
            yourMusicContainer.albumList.value = -1;
            yourMusicContainer.loadSongs(null);
        } else {
            handleAPIError(response);
        }
    });
})



songsContainer.playButtonOnClick = (buttonIndex) => {
    player.songsList = songsContainer.songsList;
    player.currentSongIndex = buttonIndex;
    player.checkSongIndex();
    player.loadSong();
    player.play();
};

albumsContainer.albumCardClickHandler = (albumIndex) => {
    let entity = albumsContainer.entity;
    let albumId = albumsContainer.albumsList[albumIndex].albumId;
    let url = `${API_URLS.host}api/${entity}/songs?${entity}Id=${albumId}`;
    sendQueryWithAuthorization(url, "GET", userData.token).then((response) => {
        if (response.status === 200) {
            response.json().then((json) => {
                if (entity === "playlist")
                    songsContainer.loadSongs(json, userData, albumId);
                else if (entity === "album")
                    songsContainer.loadSongs(json, userData, null);
            });
            openContainer("song");
        } else {
            handleAPIError(response);
        }
    });
};

albumsContainer.addPlaylistCardHandler = () => {
    if (albumsContainer.playlistCard.uploadCoverInput.files.length === 0) {
        albumsContainer.playlistCard.outputField.innerHtml = "Choose cover file";
        return;
    }
    if (albumsContainer.playlistCard.nameField.value.length === 0) {
        albumsContainer.playlistCard.outputField.innerHtml = "Name is empty";
        return;
    }

    let cover = albumsContainer.playlistCard.uploadCoverInput.files[0];
    let playlistName = albumsContainer.playlistCard.nameField.value;
    let url = `${API_URLS.host}api/playlists?playlistName=${playlistName}`;
    sendBlobWithAuthorization(url, "POST", "cover", cover, userData.token).then((response) => {
        if (response.status === 200) {
            openAlbumsAndLoadPlaylists();
        } else {
            handleAPIError(response);
        }
    });

};

performersContainer.cardClickHandler = (performerIndex) => {
    albumsContainer.entity = "album";
    let performerId = performersContainer.performersList[performerIndex].performerId;
    let url = `${API_URLS.host}api/albums?performerId=${performerId}`;
    sendQueryWithAuthorization(url, "GET", userData.token).then((response) => {
        if (response.status === 200) {
            response.json().then((json) => {
                albumsContainer.loadAlbums(json);
            });
            openContainer("album");
        } else {
            handleAPIError(response);
        }
    });
};

function addSongToPlaylist(songId, playlistId) {
    let url = `${API_URLS.host}api/playlist/songs?playlistId=${playlistId}&songId=${songId}`;
    sendQueryWithAuthorization(url, "POST", userData.token).then((response) => {
        if (response.status === 200) {
            console.log("Song was successfully added");
            return true;
        } else {
            handleAPIError(response);
            return false;
        }
    });
}

songsContainer.menuPlaylistOnClick = (songId, playlistId) => {
    return addSongToPlaylist(songId, playlistId);
};

songsContainer.likeButtonOnClick = (songId) => {
    return addSongToPlaylist(songId, userData.favouritePlaylistId);
}

songsContainer.removeFromPlaylistButtonClick = (songId, playlistId) => {
    let url = `${API_URLS.host}api/playlist/songs?playlistId=${playlistId}&songId=${songId}`;
    sendQueryWithAuthorization(url, "DELETE", userData.token).then((response) => {
        if (response.status === 200) {
            console.log("Song was successfully deleted");
            return true;
        } else {
            handleAPIError(response);
            return false;
        }
    });
}

function handleAPIError(response) {
    if (response.status === 401) {
        window.open("/", "_self");
    }
}

const playlistsButton = document.querySelector("#playlists_button");
function openAlbumsAndLoadPlaylists() {
    albumsContainer.entity = "playlist";
    let url = `${API_URLS.host}api/playlists?userId=${userData.userId}`;
    sendQueryWithAuthorization(url, "GET", userData.token).then((response) => {
        if (response.status === 200) {
            response.json().then((json) => {
                albumsContainer.loadAlbums(json);
                albumsContainer.addPlaylistCreationCard();
                openContainer("album");
            });
        } else {
            handleAPIError(response);
        }
    });
}

const player = {
    playButton: document.querySelector("#player_play_button"),
    nextButton: document.querySelector("#player_next_button"),
    previousButton: document.querySelector("#player_previous_button"),
    likeButton: document.querySelector("#player_like_button"),
    progressBar: document.querySelector("#player_progress"),

    currentSongElements: {
        albumImg: document.querySelector("#current_song_album"),
        nameElement: document.querySelector("#current_song_name"),
        performerElement: document.querySelector('#current_song_performer'),
    },

    leftDurationInscription: document.querySelector("#duration_inscription1"),
    rightDurationInscription: document.querySelector("#duration_inscription2"),

    songsList: [],
    currentSongIndex: 0,
    audio: new Audio(),
    isPlaying: false,
    loadedMeta: false,

    onload: function() {
        this.setDurationInscriptionsPositions();
        this.progressBar.value = 0;
        this.currentSongElements.albumImg.classList.add("hide");
    },

    loadSong: function() {
        this.loadedMeta = false;
        let song = this.songsList[this.currentSongIndex];
        this.audio.src = API_URLS.resourceHost + song.audioUrl;
        this.currentSongElements.albumImg.src = API_URLS.resourceHost + song.coverUrl;
        this.currentSongElements.albumImg.classList.remove("hide");
        this.currentSongElements.nameElement.innerHTML = song.songName;
        this.currentSongElements.performerElement.innerHTML = song.performerName;
        this.audio.load();
        if (song.isLiked) {
            this.likeButton.innerHTML = "<i class=\"fa-solid fa-heart\"></i>";
            this.likeButton.classList.add("active_button");
        } else {
            this.likeButton.innerHTML = "<i class=\"fa-regular fa-heart\"></i>";
            this.likeButton.classList.remove("active_button");
        }
    },

    loadNext: function() {
        this.currentSongIndex++;
        this.checkSongIndex();
        this.loadSong();
    },

    loadPrevious: function() {
        this.currentSongIndex--;
        this.checkSongIndex();
        this.loadSong();
    },

    checkSongIndex: function() {
        this.previousButton.disabled = this.currentSongIndex <= 0;
        this.nextButton.disabled = this.currentSongIndex >= this.songsList.length - 1;
    },

    play: function() {
        this.audio.play();
        this.isPlaying = true;
        player.playButton.innerHTML = "<i class=\"fa-sharp fa-solid fa-pause\"></i>";
    },

    pause: function() {
        this.audio.pause();
        this.isPlaying = false;
        player.playButton.innerHTML = "<i class=\"fa-solid fa-play\"></i>";
    },

    getDurationInscription: function(duration) {
        let minutes = Math.floor(duration / 60);
        let seconds = Math.floor(duration % 60);
        if (seconds < 10)
            seconds = '0' + seconds;
        return `${minutes}:${seconds}`;
    },

    setDurationInscriptionsPositions: function() {
        let pbRect = this.progressBar.getBoundingClientRect();

        this.leftDurationInscription.style.top = (pbRect.top - 33) + "px";
        this.rightDurationInscription.style.top = this.leftDurationInscription.style.top;

        this.leftDurationInscription.style.left = (pbRect.left - 10) + "px";
        this.rightDurationInscription.style.left = (pbRect.right - 15) + "px";
    }

};

playlistsButton.addEventListener("click", () => {
    openAlbumsAndLoadPlaylists();
});

player.playButton.addEventListener("click", function() {
    if(player.isPlaying) {
        player.pause();
    }
    else {
        player.play();
    }
});

player.nextButton.addEventListener("click", function() {
    player.loadNext();
    player.play();
});

player.previousButton.addEventListener("click", function() {
    player.loadPrevious();
    player.play();
});

player.audio.addEventListener("loadedmetadata", function () {
    player.loadedMeta = true;
    player.progressBar.max = this.duration;
    player.rightDurationInscription.innerHTML = player.getDurationInscription(this.duration);
});

player.audio.addEventListener("timeupdate", function() {
    player.progressBar.value = this.currentTime;
    player.leftDurationInscription.innerHTML = player.getDurationInscription(this.currentTime);
});

player.progressBar.addEventListener("click", (event) => {
    if (!player.loadedMeta)
        return;
    let mouseX = event.clientX;
    let pbRect = player.progressBar.getBoundingClientRect();
    let percent = (mouseX - pbRect.left) / (pbRect.right - pbRect.left);
    player.audio.currentTime = player.audio.duration * percent;
});

player.likeButton.addEventListener("click", () => {
    let song = player.songsList[player.currentSongIndex];
    if (song.isLiked) {
        if (songsContainer.removeFromPlaylistButtonClick(song.songId, userData.favouritePlaylistId)) {
            song.isLiked = false;
            player.likeButton.innerHTML = "<i class=\"fa-regular fa-heart\"></i>";
            player.likeButton.classList.remove("active_button");
        }
    } else {
        if (songsContainer.likeButtonOnClick(song.songId)) {
            song.isLiked = true;
            player.likeButton.innerHTML = "<i class=\"fa-solid fa-heart\"></i>";
            player.likeButton.classList.add("active_button");
        }
    }
});

