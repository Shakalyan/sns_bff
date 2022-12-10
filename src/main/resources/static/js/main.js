import {API_URLS, sendJSONQuery, sendQuery, sendBlobWithAuthorization, getUserData,
        sendJSONQueryWithAuthorization, sendQueryWithAuthorization} from "./api_utils.js";
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
                            songsContainer.loadSongs(json);
                            break;
                        case "album":
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

yourMusicContainer.albumList.addEventListener("change", function() {
    let albumId = yourMusicContainer.albumList.value;
    if (albumId == -1)
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
    })
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
    const url = `${API_URLS.host}api/albums?name=${yourMusicContainer.albumNameField.value}`;
    sendBlobWithAuthorization(url, "POST", "cover", cover, userData.token).then((response) => {
        console.log(response);
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
    let albumId = 10001;
    let url = `${API_URLS.host}api/album/songs?albumId=${albumId}`;
    let song = yourMusicContainer.uploadSongInput.files[0];
    sendBlobWithAuthorization(url, "POST", "song", song, userData.token).then((response) => {
        console.log(response);
    });
});

const player = {
    playButton: document.querySelector("#player_play_button"),
    nextButton: document.querySelector("#player_next_button"),
    previousButton: document.querySelector("#player_previous_button"),
    progressBar: document.querySelector("#player_progress"),

    currentSongElements: {
        albumImg: document.querySelector("#current_song_album"),
        nameElement: document.querySelector("#current_song_name"),
        performerElement: document.querySelector('#current_song_performer'),
    },

    songsList: [],
    currentSongIndex: 0,
    audio: new Audio(),
    isPlaying: false,

    loadSong: function() {
        let song = this.songsList[this.currentSongIndex];
        this.audio.src = API_URLS.resourceHost + song.audioUrl;
        this.currentSongElements.albumImg.src = API_URLS.resourceHost + song.coverUrl;
        this.currentSongElements.nameElement.innerHTML = song.songName;
        this.currentSongElements.performerElement.innerHTML = song.performerName;
        this.audio.load();
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
    }

};

songsContainer.playButtonOnClick = (buttonIndex) => {
    player.songsList = songsContainer.songsList;
    player.currentSongIndex = buttonIndex;
    player.checkSongIndex();
    player.loadSong();
    player.play();
};

albumsContainer.albumCardClickHandler = (albumIndex) => {
    let albumId = albumsContainer.albumsList[albumIndex].albumId;
    let url = `${API_URLS.host}api/album/songs?albumId=${albumId}`;
    sendQueryWithAuthorization(url, "GET", userData.token).then((response) => {
        if (response.status == 200) {
            response.json().then((json) => {
                songsContainer.loadSongs(json)
            });
            openContainer("song");
        } else {
            handleAPIError(response);
        }
    });
};

performersContainer.cardClickHandler = (performerIndex) => {
    let performerId = performersContainer.performersList[performerIndex].performerId;
    let url = `${API_URLS.host}api/albums?performerId=${performerId}`;
    sendQueryWithAuthorization(url, "GET", userData.token).then((response) => {
        if (response.status == 200) {
            response.json().then((json) => {
                albumsContainer.loadAlbums(json)
            });
            openContainer("album");
        } else {
            handleAPIError(response);
        }
    });
};

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
    player.progressBar.max = this.duration;
});

player.audio.addEventListener("timeupdate", function() {
    player.progressBar.value = this.currentTime;
});

function handleAPIError(response) {
    if (response.status === 401) {
        window.open("/", "_self");
    }
}