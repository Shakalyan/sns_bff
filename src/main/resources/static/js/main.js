import {API_URLS, sendJSONQuery, sendQuery} from "./api_utils.js";
import {musicContainer} from "./containers/music_container.js";

let USER_TOKEN = 123;
const music_button = document.querySelector("#music_button");

music_button.addEventListener("click", function() {
    console.log("Start load");
    let audio = new Audio("http://localhost:8080/ws.mp3");
    audio.play().catch((er) => {
        console.log(`error ${er}`);
    });
    console.log("End load");
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

searchBar.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        const url = `${API_URLS.host}api/${USER_TOKEN}/find?type=${getChosenSearchButton()}&word=${searchBar.value}`;
        sendQuery(url, "GET").then((response) => {
            if (response.status === 200) {
                response.json().then((json) => {
                    musicContainer.loadSongs(json);
                });
            }
        });
    }
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
        this.audio.src = `${API_URLS.resourceHost}data/${song.performerId}/${song.albumId}/${song.songId}.mp3`;
        console.log(this.audio.src);
        this.currentSongElements.albumImg.src = `${API_URLS.resourceHost}data/${song.performerId}/${song.albumId}/img.png`;
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

/*
player.songsList.push(new Song("vb",
                             "../../../../server/noize/new_album",
                                  "Вселенная бесконечна?", "Новый альбом", "Noize MC"));

player.songsList.push(new Song("ws",
                             "../../../../server/rhcp/stadium_arcadium",
                                  "Wet Sand", "Stadium Arcadium", "Red Hot Chilli Peppers"));
player.currentSongIndex = 1;
player.checkSongIndex();
player.loadSong();
*/

musicContainer.playButtonOnClick = (buttonIndex) => {
    player.songsList = musicContainer.songsList;
    player.currentSongIndex = buttonIndex;
    player.checkSongIndex();
    player.loadSong();
    player.play();
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
