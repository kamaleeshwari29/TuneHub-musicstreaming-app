document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const songContainer = document.getElementById("songContainer");
    const songs = document.querySelectorAll(".song-card");
    const noResultsMessage = document.querySelector(".no-results");

    // Search functionality
    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase();
        let hasResults = false;

        songs.forEach(song => {
            const title = song.getAttribute("data-song").toLowerCase();
            const singer = song.getAttribute("data-singer").toLowerCase();

            if (title.includes(query) || singer.includes(query)) {
                song.style.display = "block";
                hasResults = true;
            } else {
                song.style.display = "none";
            }
        });

        noResultsMessage.style.display = hasResults ? "none" : "block";
    });

    // Favorite songs functionality
    document.querySelectorAll(".favorite").forEach(favoriteBtn => {
        favoriteBtn.addEventListener("click", function () {
            const songCard = this.closest(".song-card");
            const songTitle = songCard.getAttribute("data-song");
            let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

            if (favorites.includes(songTitle)) {
                favorites = favorites.filter(song => song !== songTitle);
                this.classList.remove("liked");
            } else {
                favorites.push(songTitle);
                this.classList.add("liked");
            }

            localStorage.setItem("favorites", JSON.stringify(favorites));
        });
    });

    // Playlist functionality
    document.querySelectorAll(".add-to-playlist").forEach(button => {
        button.addEventListener("click", function () {
            const songCard = this.closest(".song-card");
            const songTitle = songCard.getAttribute("data-song");
            let playlist = JSON.parse(localStorage.getItem("playlist")) || [];

            if (playlist.includes(songTitle)) {
                playlist = playlist.filter(song => song !== songTitle);
                this.textContent = "Add to Playlist";
            } else {
                playlist.push(songTitle);
                this.textContent = "Remove from Playlist";
            }

            localStorage.setItem("playlist", JSON.stringify(playlist));
        });
    });

    // Load favorite songs
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    document.querySelectorAll(".favorite").forEach(favoriteBtn => {
        const songCard = favoriteBtn.closest(".song-card");
        const songTitle = songCard.getAttribute("data-song");
        if (favorites.includes(songTitle)) {
            favoriteBtn.classList.add("liked");
        }
    });

    // Load playlist songs
    let playlist = JSON.parse(localStorage.getItem("playlist")) || [];
    document.querySelectorAll(".add-to-playlist").forEach(button => {
        const songCard = button.closest(".song-card");
        const songTitle = songCard.getAttribute("data-song");
        if (playlist.includes(songTitle)) {
            button.textContent = "Remove from Playlist";
        }
    });
});
