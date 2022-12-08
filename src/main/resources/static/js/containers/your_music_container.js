export const yourMusicContainer = {
    container: document.querySelector("#your_music_container"),

    uploadAlbumImageInput: document.querySelector("#upload_album_image_input"),
    uploadAlbumImageButton: document.querySelector("#upload_album_image_button"),
    addAlbumButton: document.querySelector("#add_album_button"),
    albumNameField: document.querySelector("#new_album_name_field"),
    albumList: document.querySelector("#performer_album_dropdown_list"),

    uploadSongButton: document.querySelector("#upload_song_button"),
    uploadSongInput: document.querySelector("#upload_song_input"),
    addSongButton: document.querySelector("#add_song_button"),
    songNameField: document.querySelector("#new_song_name_field"),
    songsTable: document.querySelector("#performer_section_table"),

    outputField: document.querySelector("#performer_section_output_field"),

    loadSongs: function(json) {
        this.songsTable.innerHTML =
            "<tr class=\"performer_section_table_row\">\n" +
            "    <th class=\"performer_section_header\">id</th>\n" +
            "    <th class=\"performer_section_header\">name</th>\n" +
            "</tr>";

        for (let i = 0; i < json.length; ++i) {
            let song = json[i];
            this.songsTable.innerHTML +=
            `<tr>
                <td class="performer_section_header">${song["songId"]}</td>
                <td class="performer_section_header">${song["songName"]}</td>
            </tr>`;
        }
    },

    addAlbum: function(albumId, albumName) {
        let albumOption = document.createElement("option");
        albumOption.innerText = albumName;
        albumOption.value = albumId;
        this.albumList.appendChild(albumOption);
    },

    loadContainer: function(json) {
        this.albumList.innerHTML = `<option value="-1"></option>`;
        console.log(json);
        for (let i = 0; i < json.length; ++i) {
            let album = json[i];
            this.addAlbum(album["albumId"], album["albumName"]);
        }
    },

    setOutputText: function(text) {
        this.outputField.innerHTML = text;
    }
}