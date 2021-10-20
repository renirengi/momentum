import playList from './playList.js';

export function initAudio() {
    window.addEventListener('load', () => initPlayer());
   }

   function initPlayer(){
       const controls = document.querySelector('.player-controls');
       const prev = document.querySelector('.play-prev')
       const actionButton = document.querySelector('.action');
       const next = document.querySelector('.prev-next');
    
       const progressBar = document.getElementById('progress-bar');
        const currTime = document.getElementById('curr-time');
        const durationTime = document.getElementById("duration");
        const muteButton = document.getElementById("mute");
        const volumeScale = document.querySelector(".volume");
        const audio= new Audio();

       actionButton.addEventListener('click', playAudio);
       audio.addEventListener('timeupdate', audioProgress);
       progressBar.addEventListener('click', audioChangeTime);
       muteButton.addEventListener('click', audioMute);
        volumeScale.addEventListener('change', audioChangeVolume);

       let isPlay=false;
       let temp=3;
       

       function playAudio(){
           audio.src=playList[temp].src;
           ///const res = await fetch(playList);
            ///const data = await res.json(); 
           audio.currentTime=0; 
           console.log (playList[temp]['duration']);

           if(isPlay===false){
             audio.play();
             isPlay=true;
             actionButton.classList.toggle("pause");
           }
           else {
               audio.pause();
               isPlay=false;
               actionButton.classList.toggle("pause");
               //durationTime.innerHTML=;

           }
           //if (durationTime.innerHTML == "00:00") {
            //durationTime.innerHTML = audioTime(audio.duration);
        //}
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
           let progress = audio.currentTime / audio.duration;
            progressBar.value = progress * 100;
            currTime.innerHTML = audioTime(audio.currentTime);
            
            durationTime.innerHTML = audioTime(audio.duration);
            
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
                muteButton.classList.toggle('true');
            } else {
                muteButton.classList.toggle('true');
            }
        }
    
        function audioMute() {
            if (audio.volume === 0) {
                audio.volume = volumeScale.value / 100;
                muteButton.classList.toggle('true');
            }
            else {
                audio.volume = 0;
                muteButton.classList.toggle('true');
            }
        }


   }