// Selecting DOM
const body = document.querySelector('body')
const modalBtn = document.querySelector('#modal__btn')
const playBtn = document.querySelector('.play__btn')
const prevBtn = document.querySelector('.prev__btn')
const nextBtn = document.querySelector('.next__btn')
const btnOpen = document.querySelector('#btn__open')
const btnClose = document.querySelector('#btn__close')
const asideClose = document.querySelector('aside')
const title = document.querySelector('#audio__title')
const audio = document.querySelector('audio')
const progressContainer = document.querySelector('.audio__progress')
const progressBar = document.querySelector('.progress')
const listItem = document.querySelectorAll('aside ul li')
const arrlistItem = Array.from(listItem);
const listInfo = document.querySelectorAll('.list__info i')

// Song Titles
const songs = [
  'সুরা ফাতিহা',
  'আয়াতুল কুরসি',
  'সুরা রহমান',
  'সুরা মুলক',
  'সুরা ত্বীন'
]


let songIndex = 0;
loadSong(songs[songIndex])
function loadSong(song) {
  title.innerText = song
  audio.src = `assets/${ song }.mp3`
  listItem[songIndex].classList.add('playing')
}
 


  
// Play Song 
function playSong() {

  listInfo[songIndex].classList.remove('fa-play');

  listInfo[songIndex].classList.add('fa-pause');

  playBtn.querySelector('i.fas').classList.remove('fa-play');

  playBtn.querySelector('i.fas').classList.add('fa-pause')

  audio.play()

}

// Pause Song
function pauseSong() {

  listInfo[songIndex].classList.add('fa-play')

  listInfo[songIndex].classList.remove('fa-pause')

  playBtn.querySelector('i.fas').classList.add('fa-play')

  playBtn.querySelector('i.fas').classList.remove('fa-pause')

  audio.pause()
}

// Previous song
function prevSong() {
  songIndex--
  if (songIndex < 0) {
    songIndex = songs.length - 1

    listItem[0].classList.remove('playing')
    
    listInfo[0].classList.remove('fa-pause')

    listInfo[0].classList.add('fa-play')

  } else if (songIndex !== 0) {      
    listItem[songIndex + 1].classList.remove('playing')

    listInfo[songIndex + 1].classList.remove('fa-pause')

    listInfo[songIndex + 1].classList.add('fa-play')
  } else if (songIndex === 0) {
    listItem[songIndex + 1].classList.remove('playing')

    listInfo[songIndex + 1].classList.remove('fa-pause')

    listInfo[songIndex + 1].classList.add('fa-play')
  }

  listItem[songIndex].classList.add('playing')

  loadSong(songs[songIndex])

  playSong();
}

// Next song
function nextSong() {
  songIndex++

  if (songIndex > songs.length - 1) {
    listItem[songs.length - 1].classList.remove('playing')
    listInfo[songIndex - 1].classList.remove('fa-pause');
    listInfo[songIndex - 1].classList.add('fa-play');
    songIndex = 0
  } else if (songIndex !== songs.length - 1) {
    listItem[songIndex - 1].classList.remove('playing')
    listInfo[songIndex - 1].classList.remove('fa-pause');
    listInfo[songIndex - 1].classList.add('fa-play');
  } else if (songIndex === songs.length - 1) {
    listItem[songIndex - 1].classList.remove('playing')
    listInfo[songIndex - 1].classList.remove('fa-pause');
    listInfo[songIndex - 1].classList.add('fa-play');
  }

  loadSong(songs[songIndex]);
  
  playSong();

  listItem[songIndex].classList.add('playing')
}

// Progress Bar
function updateProgress(e){
  const {duration,currentTime} = e.srcElement
  const progressPercent = (currentTime / duration) * 100
  progressBar.style.width = `${progressPercent}%`
  
}

function setProgress(e){
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration
  console.log(duration)
  audio.currentTime = (clickX / width) * duration
}

// Event Listeners
modalBtn.addEventListener('click',()=>{
  body.classList.remove('modal__overlay')
  modalBtn.parentElement.style.display = 'none'
})
btnOpen.addEventListener('click', () =>{
  asideClose.classList.toggle('aside__open')

  btnOpen.classList.add('d-none')
})
btnClose.addEventListener('click', () =>{
  asideClose.classList.remove('aside__open')

  btnOpen.classList.remove('d-none');
})
playBtn.addEventListener('click', () =>{
  const isPlaying = playBtn.querySelector('i.fas').classList.contains('fa-play');

  if (isPlaying) {
    playSong();
  } else {
    pauseSong();
  }
})
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click',setProgress)
audio.addEventListener('ended',nextSong)

// Key Events
document.body.onkeyup = function (e) {
  if (e.keyCode == 32) {
    const isPlaying = playBtn.querySelector('i.fas').classList.contains('fa-play');
    if (isPlaying) {
      playSong();
    } else {
      pauseSong();
    }
  } else if (e.keyCode == 39 || e.keyCode == 40) {
    nextSong();
  } else if (e.keyCode == 37 || e.keyCode == 38) {
    prevSong();
  }
}


