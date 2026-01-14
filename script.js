// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('May 23, 2026 08:30:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Indicator Click
document.querySelector('.scroll-indicator').addEventListener('click', function () {
    document.querySelector('.wedding-details').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});


window.addEventListener('load', function () {
    // Force sections to be visible
    const sections = document.querySelectorAll('.wedding-details, .journey-section, .footer');
    sections.forEach(section => {
        section.style.display = 'block';
        section.style.visibility = 'visible';
        section.style.opacity = '1';
    });

    // Trigger initial animation for visible items
    setTimeout(() => {
        animateTimeline();
    }, 500);

    // Failsafe: Ensure all items become visible after a short delay
    // This handles cases where scroll events/intersection observer might not trigger
    setTimeout(() => {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => item.classList.add('visible'));
    }, 1500);
});

// Timeline Animation on Scroll
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const itemBottom = item.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        // Check if item is in viewport
        if (itemTop < windowHeight * 0.8 && itemBottom > 0) {
            item.classList.add('visible');
        }
    });
}

// Parallax Effect for Hero Section
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    if (hero && heroContent) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
}

// Stagger Timeline Animation
function staggerTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item.visible');

    timelineItems.forEach((item, index) => {
        const parentColumn = item.closest('.journey-column');
        const itemsInColumn = parentColumn.querySelectorAll('.timeline-item.visible');
        const itemIndex = Array.from(itemsInColumn).indexOf(item);

        item.style.transitionDelay = `${itemIndex * 0.1}s`;
    });
}

// Intersection Observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all timeline items and ensure visibility
document.addEventListener('DOMContentLoaded', function () {
    const timelineItems = document.querySelectorAll('.timeline-item, .together-item');
    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Ensure all sections are visible
    const sections = document.querySelectorAll('.wedding-details, .journey-section, .footer');
    sections.forEach(section => {
        section.style.display = 'block';
        section.style.visibility = 'visible';
        section.style.opacity = '1';
    });
});

// Scroll Events
let ticking = false;
function requestTick() {
    if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}

function updateOnScroll() {
    animateTimeline();
    parallaxEffect();
    staggerTimelineAnimation();
    ticking = false;
}

window.addEventListener('scroll', requestTick);

// Add hover effects for timeline items
document.querySelectorAll('.timeline-content').forEach(item => {
    item.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });

    item.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add touch support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function (e) {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function (e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndY < touchStartY - 50) {
        // Swipe up - scroll down
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
    if (touchEndY > touchStartY + 50) {
        // Swipe down - scroll up
        window.scrollBy({
            top: -window.innerHeight,
            behavior: 'smooth'
        });
    }
}

// Add keyboard navigation
document.addEventListener('keydown', function (e) {
    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            window.scrollBy({
                top: window.innerHeight,
                behavior: 'smooth'
            });
            break;
        case 'ArrowUp':
            e.preventDefault();
            window.scrollBy({
                top: -window.innerHeight,
                behavior: 'smooth'
            });
            break;
        case 'Home':
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            break;
        case 'End':
            e.preventDefault();
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
            break;
    }
});

// Add print styles trigger
window.addEventListener('beforeprint', function () {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', function () {
    document.body.classList.remove('printing');
});

// Performance optimization - debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(updateOnScroll, 10);
window.addEventListener('scroll', debouncedScrollHandler);

// Add resize handler for responsive adjustments
window.addEventListener('resize', debounce(function () {
    // Recalculate animations on resize
    animateTimeline();
}, 250));

// ===========================================
// MUSIC PLAYER FUNCTIONALITY
// ===========================================

// Wedding song playlist - Update these with your actual audio files
const playlist = [
    {
        title: "Berakhirlah Pencarianku",
        artist: "Hafiz Suip",
        src: "music/Berakhirlah Pencarianku.mp3",
        cover: "asset/hafizsuip.jpeg"
    },
    {
        title: "Kamu Yang Kutunggu",
        artist: "Rossa feat. Afgan",
        src: "music/Kamu Yang Kutunggu.mp3",
        cover: "asset/Rossa feat. Afgan.jpg"
    },
    {
        title: "Hingga Tua Bersama",
        artist: "Rizky Febian",
        src: "music/Hingga Tua Bersama.mp3",
        cover: "asset/rizkyfebian.jpg"
    },
    {
        title: "Hari Ini",
        artist: "Hael Husaini",
        src: "music/Hari Ini.mp3",
        cover: "asset/haelhusaini.jpg"
    },
];

// Music Player Elements
const musicPlayer = document.getElementById('music-player');
const playerMini = document.getElementById('player-mini');
const playerExpanded = document.getElementById('player-expanded');
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const miniPlayBtn = document.getElementById('mini-play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const volumeSlider = document.getElementById('volume-slider');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const songTitleEl = document.getElementById('song-title');
const songArtistEl = document.getElementById('song-artist');
const albumArtEl = document.getElementById('album-art');
const miniTitleEl = document.getElementById('mini-title');
const miniArtistEl = document.getElementById('mini-artist');
const miniAlbumArtEl = document.getElementById('mini-album-art');
const playerCloseBtn = document.getElementById('player-close-btn');
const playlistToggle = document.getElementById('playlist-toggle');
const playlistEl = document.getElementById('playlist');

let currentTrack = 0;
let isPlaying = false;
let hasUserInteracted = false;

// Initialize music player
function initMusicPlayer() {
    // Set initial volume
    audioPlayer.volume = 0.5;
    volumeSlider.style.setProperty('--volume', '50%');

    // Load first track
    loadTrack(currentTrack);

    // Build playlist UI
    buildPlaylist();

    // Event listeners
    playBtn.addEventListener('click', togglePlay);
    miniPlayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlay();
    });
    prevBtn.addEventListener('click', prevTrack);
    nextBtn.addEventListener('click', nextTrack);

    // Progress bar
    progressBar.addEventListener('input', seekTo);
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('loadedmetadata', updateDuration);
    audioPlayer.addEventListener('ended', nextTrack);

    // Volume
    volumeSlider.addEventListener('input', setVolume);

    // Player expand/collapse
    playerMini.addEventListener('click', expandPlayer);
    playerCloseBtn.addEventListener('click', collapsePlayer);

    // Playlist toggle
    playlistToggle.addEventListener('click', togglePlaylist);

    // Welcome overlay - Enter button to start music
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const enterBtn = document.getElementById('enter-btn');

    if (enterBtn && welcomeOverlay) {
        // Prevent scrolling while overlay is visible
        document.body.classList.add('no-scroll');

        enterBtn.addEventListener('click', function () {
            // Hide overlay with animation
            welcomeOverlay.classList.add('hidden');

            // Enable scrolling again
            document.body.classList.remove('no-scroll');

            // Scroll to top of page
            window.scrollTo(0, 0);

            // Start playing music
            hasUserInteracted = true;
            playAudio();

            // Remove overlay from DOM after animation
            setTimeout(() => {
                welcomeOverlay.style.display = 'none';
            }, 600);
        });

        // Also allow clicking anywhere on overlay to enter
        welcomeOverlay.addEventListener('click', function (e) {
            if (e.target === welcomeOverlay) {
                enterBtn.click();
            }
        });
    }
}

// Load track
function loadTrack(index) {
    const track = playlist[index];
    audioPlayer.src = track.src;

    // Update UI
    songTitleEl.textContent = track.title;
    songArtistEl.textContent = track.artist;
    albumArtEl.src = track.cover;
    miniTitleEl.textContent = track.title;
    miniArtistEl.textContent = track.artist;
    miniAlbumArtEl.src = track.cover;

    // Update playlist active state
    updatePlaylistActiveState();

    // Reset progress
    progressBar.value = 0;
    progressBar.style.setProperty('--progress', '0%');
    currentTimeEl.textContent = '0:00';
}

// Build playlist UI
function buildPlaylist() {
    playlistEl.innerHTML = '';
    playlist.forEach((track, index) => {
        const item = document.createElement('div');
        item.className = 'playlist-item' + (index === currentTrack ? ' active' : '');
        item.innerHTML = `
            <img src="${track.cover}" alt="${track.title}" class="playlist-item-art">
            <div class="playlist-item-info">
                <div class="playlist-item-title">${track.title}</div>
                <div class="playlist-item-artist">${track.artist}</div>
            </div>
            <div class="playlist-item-play">
                <i class="fas fa-play"></i>
            </div>
        `;
        item.addEventListener('click', () => {
            currentTrack = index;
            loadTrack(currentTrack);
            playAudio();
        });
        playlistEl.appendChild(item);
    });
}

// Update playlist active state
function updatePlaylistActiveState() {
    const items = playlistEl.querySelectorAll('.playlist-item');
    items.forEach((item, index) => {
        if (index === currentTrack) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Toggle play/pause
function togglePlay() {
    if (isPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
}

// Play audio
function playAudio() {
    audioPlayer.play().then(() => {
        isPlaying = true;
        updatePlayButtonIcon();
        musicPlayer.classList.add('playing');
    }).catch(err => {
        console.log('Autoplay prevented:', err);
    });
}

// Pause audio
function pauseAudio() {
    audioPlayer.pause();
    isPlaying = false;
    updatePlayButtonIcon();
    musicPlayer.classList.remove('playing');
}

// Update play button icon
function updatePlayButtonIcon() {
    const icon = isPlaying ? 'fa-pause' : 'fa-play';
    playBtn.innerHTML = `<i class="fas ${icon}"></i>`;
    miniPlayBtn.innerHTML = `<i class="fas ${icon}"></i>`;
}

// Previous track
function prevTrack() {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
    if (isPlaying) playAudio();
}

// Next track
function nextTrack() {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    playAudio(); // Always play next track
}

// Update progress bar
function updateProgress() {
    if (audioPlayer.duration) {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progress;
        progressBar.style.setProperty('--progress', `${progress}%`);
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    }
}

// Update duration display
function updateDuration() {
    durationEl.textContent = formatTime(audioPlayer.duration);
}

// Seek to position
function seekTo() {
    const seekTime = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
}

// Set volume
function setVolume() {
    const volume = volumeSlider.value / 100;
    audioPlayer.volume = volume;
    volumeSlider.style.setProperty('--volume', `${volumeSlider.value}%`);
}

// Format time (mm:ss)
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Expand player
function expandPlayer() {
    musicPlayer.classList.add('expanded');
    playerExpanded.classList.add('active');
}

// Collapse player
function collapsePlayer() {
    musicPlayer.classList.remove('expanded');
    playerExpanded.classList.remove('active');
}

// Toggle playlist
function togglePlaylist() {
    playlistEl.classList.toggle('active');
    const toggleText = playlistEl.classList.contains('active') ? 'Hide Playlist' : 'View Playlist';
    playlistToggle.querySelector('span').textContent = toggleText;
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initMusicPlayer);