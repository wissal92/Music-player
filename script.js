const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const display = document.querySelector('.display-songs');
//const songTitle = document.querySelector('.song-title');
// const h1 = document.querySelectorAll('h1');

// Song titles
const songs = ['Impossible', 'All-of-me', 'Law', 'i-hate-u-i-love-u'];
const singers = ['James arthur', 'John legend', 'Elissa', 'Gnash']

let songIndex = 2;

loadSong(songs[songIndex]);

function loadSong(song){
   title.innerText = song;
   audio.src = `music/${song}.mp3`;
   cover.src = `imgs/${song}.jpg`;
}

function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}

function prevSong(){
    songIndex--;

    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    
    console.log(songs[songIndex]);

    loadSong(songs[songIndex]);

    playSong();
}

function nextSong(){
    songIndex++;

    if(songIndex > songs.length -1 ){
        songIndex = 0;
    }
    
    console.log(songs[songIndex])
    loadSong(songs[songIndex]);

    playSong();

}

function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progresspercent = (currentTime / duration) * 100;
    progress.style.width = `${progresspercent}%`
}

function setProgress(e){
   const width = this.clientWidth;
   const clickX = e.offsetX;
   const duration = audio.duration;

   audio.currentTime = (clickX / width) * duration;
}

function displaySongs(){
    const songDiv = document.createElement('div');
    songDiv.classList.add('sngDiv');
    console.log(songs)
    songs.map((sng, i) =>{
        return songDiv.innerHTML += ` <button class='song-title'>${sng} - ${singers[i]}</button> `
    })
    
    console.log(songDiv)
    display.appendChild(songDiv)
}

displaySongs()

function start(e){
    const song = e.target.innerHTML.split(' ')[0];
    console.log(song)
    const index = songs.indexOf(song)
    loadSong(songs[index]);
}

//Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying){
        pauseSong()
    } else {
        playSong()
    }
})

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);

display.addEventListener('click', start)



