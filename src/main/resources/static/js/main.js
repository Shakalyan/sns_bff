

const music_button = document.querySelector("#music_button");
music_button.addEventListener("click", function() {
    console.log("Start load");
    let audio = new Audio("http://localhost:8080/ws.mp3");
    audio.play().catch((er) => {
        console.log(`error ${er}`);
    });
    console.log("End load");
});


const searchButtonsGroup = {
    song: document.querySelector("#search_button_song"),
    album: document.querySelector("#search_button_album"),
    performer: document.querySelector("#search_button_performer"),
};

function Song(id, path, name, album, performer) {
    this.id = id;
    this.audioPath = `${path}/${id}.mp3`;
    this.albumImgPath = `${path}/img.png`;
    this.name = name;
    this.album = album;
    this.performer = performer;
}

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
        this.audio.src = song.audioPath;
        this.currentSongElements.albumImg.src = song.albumImgPath;
        this.currentSongElements.nameElement.innerHTML = song.name;
        this.currentSongElements.performerElement.innerHTML = song.performer;
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
    },

    pause: function() {
        this.audio.pause();
        this.isPlaying = false;
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

player.playButton.addEventListener("click", function() {
    if(player.isPlaying) {
        player.pause();
        player.playButton.innerHTML = "<i class=\"fa-solid fa-play\"></i>";
    }
    else {
        player.play();
        player.playButton.innerHTML = "<i class=\"fa-sharp fa-solid fa-pause\"></i>";
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
