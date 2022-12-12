export const yourMusicContainer = {
    container: document.querySelector("#your_music_container"),

    uploadAlbumImageInput: document.querySelector("#upload_album_image_input"),
    uploadAlbumImageButton: document.querySelector("#upload_album_image_button"),
    addAlbumButton: document.querySelector("#add_album_button"),
    deleteAlbumButton: document.querySelector("#delete_album_button"),
    albumNameField: document.querySelector("#new_album_name_field"),
    albumList: document.querySelector("#performer_album_dropdown_list"),

    uploadSongButton: document.querySelector("#upload_song_button"),
    uploadSongInput: document.querySelector("#upload_song_input"),
    addSongButton: document.querySelector("#add_song_button"),
    deleteSongButton: document.querySelector("#delete_song_button"),
    songNameField: document.querySelector("#new_song_name_field"),
    songsTable: document.querySelector("#performer_section_table"),
    chosenSong: null,

    outputField: document.querySelector("#performer_section_output_field"),

    loadSongs: function(json) {
        this.chosenSong = null;
        this.songsTable.innerHTML =
            "<tr class=\"performer_section_table_row\">\n" +
            "    <th class=\"performer_section_header\">id</th>\n" +
            "    <th class=\"performer_section_header\">name</th>\n" +
            "</tr>";

        if (json == null)
            return;

        for (let i = 0; i < json.length; ++i) {
            let song = json[i];
            this.addSong(song["songId"], song["songName"]);
        }
    },

    addSong: function(songId, songName) {
        let songRow = document.createElement("tr");
        songRow.innerHTML +=
            `<td class="performer_section_header">${songId}</td>
             <td class="performer_section_header">${songName}</td>`;
        songRow.songId = songId;
        songRow.addEventListener("dblclick", () => {
            this.chosenSong = songRow.songId;
            this.setOutputText(`Chosen song id: ${songRow.songId}`);
        });
        this.songsTable.appendChild(songRow);
    },

    addAlbum: function(albumId, albumName) {
        let albumOption = document.createElement("option");
        albumOption.innerText = albumName;
        albumOption.value = albumId;
        this.albumList.appendChild(albumOption);
    },

    getCurrentAlbumId: function() {
        return this.albumList.value;
    },

    loadContainer: function(json) {
        this.chosenSong = null;
        this.albumList.innerHTML = `<option value="-1"></option>`;
        for (let i = 0; i < json.length; ++i) {
            let album = json[i];
            this.addAlbum(album["albumId"], album["albumName"]);
        }
    },

    setOutputText: function(text) {
        this.outputField.innerHTML = text;
    }
}