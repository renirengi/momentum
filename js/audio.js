import playList from './playList.js';

export function initAudio() {
    window.addEventListener('load', () => initPlayer());
   }

   function initPlayer(){
       const audioPlayer = document.querySelector('.player');
       const volumeScale = document.querySelector(".volume");
       const durationTime = document.getElementById("duration");
       const songName = document.querySelector(".song-name");

       //const prev = document.querySelector('.play-prev')
       const actionButton = document.querySelector('.action');
       //const next = document.querySelector('.prev-next');
    
        const progressBar = document.getElementById('progress-bar');
        const currTime = document.getElementById('curr-time');
       
        const muteButton = document.getElementById("mute");
        const audio= new Audio()
        

       actionButton.addEventListener('click', playAudio);
       audio.addEventListener('timeupdate', audioProgress);
       progressBar.addEventListener('click', audioChangeTime);
       muteButton.addEventListener('click', audioMute);
       volumeScale.addEventListener('change', audioChangeVolume);

       
       let temp=0;
       const audioState = {
        currentTime: 0,
        playing: false,
      }; 
       songName.textContent=playList[temp]['title'];
       audio.currentTime=0;


       function playAudio() {
        audio.src = playList[temp].src;
    
        if (!audioState.playing) {
          audio.currentTime = audioState.currentTime;
          audio.play();
          actionButton.classList.remove('play');
          actionButton.classList.add('pause');
        } else {
          audio.pause();
          actionButton.classList.remove('pause');
          actionButton.classList.add('play');
        }
    
        audioState.playing = !audioState.playing;
      }
        
        function audioTime(time) {
            time = Math.floor(time);
            let minutes = Math.floor(time / 60);
            let seconds = Math.floor(time - minutes * 60);
            let minutesVal = minutes;
            let secondsVal = seconds;
            if (minutes < 10) {
                minutesVal = '0' + minutes;
            }
            if (seconds < 10) {
                secondsVal = '0' + seconds;
            }
            return minutesVal + ":" + secondsVal;
        }
    
        function audioProgress() {
            const { currentTime, duration } = audio;
            const progress = currentTime * 100 / duration;
        
            if (!isNaN(progress)) {
              audioState.currentTime = currentTime;
              progressBar.value = progress;
              currTime.innerHTML = audioTime(currentTime);
              durationTime.innerHTML = audioTime(duration);
            }
            
        }

        function audioChangeTime(e) {
            let bounds = e.target.getBoundingClientRect();
            let mouseX = e.clientX - bounds.left;
    
            let progress = mouseX / progressBar.offsetWidth;
            audio.currentTime = audio.duration * progress;
        }

        function audioChangeVolume() {
            audio.volume = volumeScale.value / 100;
            if (audio.volume == 0) {
                muteButton.classList.remove('true');
                muteButton.classList.add('false');
            } else {
                muteButton.classList.remove('false');
                muteButton.classList.add('true');
            }
        }
    
        function audioMute() {
            if (audio.volume === 0) {
                audio.volume = volumeScale.value / 100;
                muteButton.classList.remove('true');
                muteButton.classList.add('false');
            }
            else {
                audio.volume = 0;
                muteButton.classList.remove('false');
                muteButton.classList.add('true');
            }
        }
    }


   