// Datos de ejemplo
const albums = [
    { title: "Midnights", artist: "Taylor Swift", emoji: "🌙", likes: 2450000, image: "img/albums/midnights.jpg" },
    { title: "Un Verano Sin Ti", artist: "Bad Bunny", emoji: "🏖️", likes: 1800000, image: "img/albums/un-verano-sin-ti.jpg" },
    { title: "Harry's House", artist: "Harry Styles", emoji: "🏠", likes: 1600000, image: "img/albums/harrys-house.jpg" },
    { title: "SOUR", artist: "Olivia Rodrigo", emoji: "🍋", likes: 1400000, image: "img/albums/sour.jpg" },
    { title: "Planet Her", artist: "Doja Cat", emoji: "👽", likes: 1200000, image: "img/albums/planet-her.jpg" },
    { title: "Folklore", artist: "Taylor Swift", emoji: "🌲", likes: 2100000, image: "img/albums/folklore.jpg" },
    { title: "Future Nostalgia", artist: "Dua Lipa", emoji: "💫", likes: 1350000, image: "img/albums/future-nostalgia.jpg" },
    { title: "After Hours", artist: "The Weeknd", emoji: "🌃", likes: 1750000, image: "img/albums/after-hours.jpg" }
];

const trendingSongs = [
    { title: "Anti-Hero", artist: "Taylor Swift", likes: 8500000 },
    { title: "As It Was", artist: "Harry Styles", likes: 7200000 },
    { title: "Unholy", artist: "Sam Smith ft. Kim Petras", likes: 6800000 },
    { title: "Tití Me Preguntó", artist: "Bad Bunny", likes: 6400000 },
    { title: "About Damn Time", artist: "Lizzo", likes: 5900000 },
    { title: "Heat Waves", artist: "Glass Animals", likes: 5700000 },
    { title: "Stay", artist: "The Kid LAROI & Justin Bieber", likes: 5500000 },
    { title: "Good 4 U", artist: "Olivia Rodrigo", likes: 5200000 }
];

const genres = [
    { name: "Pop", emoji: "🎤", color: "#ff6b6b" },
    { name: "Rock", emoji: "🎸", color: "#4ecdc4" },
    { name: "Hip Hop", emoji: "🎵", color: "#45b7d1" },
    { name: "Reggaeton", emoji: "💃", color: "#96ceb4" },
    { name: "Electronic", emoji: "🔊", color: "#feca57" },
    { name: "R&B", emoji: "🎷", color: "#ff9ff3" },
    { name: "Indie", emoji: "🌈", color: "#54a0ff" },
    { name: "Latin", emoji: "🌶️", color: "#5f27cd" }
];

let currentSong = null;
let isPlaying = false;
let currentSongIndex = 0;
let likedSongs = new Set();

// Generar álbumes
function generateAlbums() {
    const albumsGrid = document.getElementById('albumsGrid');
    albumsGrid.innerHTML = '';
    
    albums.forEach((album, index) => {
        const albumCard = document.createElement('div');
        albumCard.className = 'album-card';
        albumCard.innerHTML = `
            <div class="album-cover">
                <img src="${album.image}" alt="${album.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="emoji-fallback" style="display: none;">${album.emoji}</div>
            </div>
            <div class="album-title">${album.title}</div>
            <div class="artist-name">${album.artist}</div>
            <button class="play-btn" onclick="playAlbum(${index})">▶️ Reproducir</button>
            <div class="likes" style="margin-top: 10px;">❤️ ${formatLikes(album.likes)}</div>
        `;
        albumsGrid.appendChild(albumCard);
    });
}

// Generar trending
function generateTrending() {
    const trendingList = document.getElementById('trendingList');
    trendingList.innerHTML = '';
    
    trendingSongs.forEach((song, index) => {
        const trendingItem = document.createElement('div');
        trendingItem.className = 'trending-item';
        trendingItem.innerHTML = `
            <div class="trending-number">${index + 1}</div>
            <div class="trending-info">
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
            </div>
            <div class="likes">❤️ ${formatLikes(song.likes)}</div>
        `;
        trendingItem.onclick = () => playSong(song, index);
        trendingList.appendChild(trendingItem);
    });
}

// Generar géneros
function generateGenres() {
    const genresGrid = document.getElementById('genresGrid');
    genresGrid.innerHTML = '';
    
    genres.forEach(genre => {
        const genreCard = document.createElement('div');
        genreCard.className = 'genre-card';
        genreCard.style.background = `linear-gradient(135deg, ${genre.color}40, ${genre.color}20)`;
        genreCard.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 10px;">${genre.emoji}</div>
            <div style="font-size: 1.2rem; font-weight: bold;">${genre.name}</div>
        `;
        genreCard.onclick = () => exploreGenre(genre.name);
        genresGrid.appendChild(genreCard);
    });
}

// Formatear likes
function formatLikes(likes) {
    if (likes >= 1000000) {
        return (likes / 1000000).toFixed(1) + 'M';
    } else if (likes >= 1000) {
        return (likes / 1000).toFixed(1) + 'K';
    }
    return likes.toString();
}

// Cambiar sección
function showSection(section) {
    // Ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    
    // Mostrar sección seleccionada
    document.getElementById(section).classList.add('active');
    event.target.classList.add('active');
}

// Reproducir álbum
function playAlbum(index) {
    const album = albums[index];
    currentSong = {
        title: album.title + " - Canción 1",
        artist: album.artist,
        emoji: album.emoji,
        image: album.image
    };
    updatePlayer();
}

// Reproducir canción
function playSong(song, index) {
    currentSong = song;
    currentSongIndex = index;
    updatePlayer();
}

// Actualizar reproductor
function updatePlayer() {
    if (!currentSong) return;
    
    document.getElementById('player').style.display = 'flex';
    document.getElementById('playerTitle').textContent = currentSong.title;
    document.getElementById('playerArtist').textContent = currentSong.artist;
    
    // Actualizar imagen del reproductor
    const playerCover = document.getElementById('playerCover');
    if (currentSong.image) {
        playerCover.innerHTML = `<img src="${currentSong.image}" alt="${currentSong.title}" onerror="this.style.display='none'; this.parentElement.textContent='${currentSong.emoji || '🎵'}';">`;
    } else {
        playerCover.textContent = currentSong.emoji || '🎵';
    }
    
    isPlaying = true;
    document.getElementById('playPauseBtn').textContent = '⏸️';
}

// Toggle reproducir/pausar
function togglePlay() {
    if (!currentSong) return;
    
    isPlaying = !isPlaying;
    document.getElementById('playPauseBtn').textContent = isPlaying ? '⏸️' : '▶️';
}

// Canción anterior
function previousSong() {
    if (currentSongIndex > 0) {
        currentSongIndex--;
        playSong(trendingSongs[currentSongIndex], currentSongIndex);
    }
}

// Siguiente canción
function nextSong() {
    if (currentSongIndex < trendingSongs.length - 1) {
        currentSongIndex++;
        playSong(trendingSongs[currentSongIndex], currentSongIndex);
    }
}

// Toggle me gusta
function toggleLike() {
    if (!currentSong) return;
    
    const songId = currentSong.title + currentSong.artist;
    const likeBtn = document.getElementById('likeBtn');
    
    if (likedSongs.has(songId)) {
        likedSongs.delete(songId);
        likeBtn.textContent = '🤍';
    } else {
        likedSongs.add(songId);
        likeBtn.textContent = '❤️';
    }
}

// Explorar género
function exploreGenre(genreName) {
    alert(`Explorando género: ${genreName}. ¡Próximamente más canciones de este género!`);
}

// Simular actualización de tendencias
function updateTrendingLikes() {
    trendingSongs.forEach(song => {
        song.likes += Math.floor(Math.random() * 1000);
    });
    generateTrending();
}

// Inicializar la aplicación
function init() {
    generateAlbums();
    generateTrending();
    generateGenres();
    
    // Actualizar likes cada 30 segundos
    setInterval(updateTrendingLikes, 30000);
}

// Inicializar cuando se carga la página
window.addEventListener('load', init);