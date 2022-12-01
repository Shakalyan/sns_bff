export const songsContainer = {
    container: document.querySelector("#songs_container"),
    songsList: [],

    playButtonOnClick: function(index) {console.log(`Index= ${index}`)},
    likeButtonOnClick: function(index) {},

    loadSongs: function(json) {
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
            playButton.addEventListener("click", function() {
                playButtonClickEvent(playButton.musicIndex);
            });

            let likeButton = document.createElement("button");
            likeButton.classList.add("music_button");
            likeButton.type = "submit";
            likeButton.innerHTML = "<i class=\"fa-regular fa-heart\"></i>";
            likeButton.musicIndex = i;
            likeButton.addEventListener("click", function() {
                likeButtonClickEvent(likeButton.musicIndex);
            });

            buttons.appendChild(playButton);
            buttons.appendChild(likeButton);
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