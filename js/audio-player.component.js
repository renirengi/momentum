import playList from './playlist.js';

export class AudioPlayerComponent extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.audio = new Audio();
    this.audioState = {
      currentTime: 0,
      playing: false,
      currentItemIndex: 0,
      muted: false,
      volumeValue: 0.5
    };
  }

  connectedCallback() {
    const template = `
      <link href="./css/audio-player.component.css" rel="stylesheet" type="text/css">
      <div class="song-name"></div>
      <div class="player-controls">
        <button class="play-prev player-icon"></button>
        <button class="action play player-icon"></button>
        <button class="play-next player-icon"></button>
        <div class="curr-time" id="curr-time">00:00</div>
        <input type="range" value="0" min="0" max="100" step="1" class="progress-bar" id="progress-bar" />
        <div class="duration" id="duration">00:00</div>
        <button id="mute" class="mute true" type="button"></button>
        <input type="range" min="0" max="100" value="50" step="1" class="volume" id="volume" />
      </div>
      <ul class="play-list"></ul>
    `;

    this.shadow.innerHTML = template;


    
    this.songNameElement = this.shadow.querySelector('.song-name');
    this.currentTimeElement = this.shadow.getElementById('curr-time');
    this.durationTimeElement = this.shadow.getElementById('duration');
    this.playListElement = this.shadow.querySelector('.play-list');

    
    this.playPauseButtonElement = this.shadow.querySelector('.action');
    this.previousButtonElement = this.shadow.querySelector('.play-prev');
    this.nextButtonElement = this.shadow.querySelector('.play-next');
    this.muteButtonElement = this.shadow.getElementById('mute');

    
    this.progressBarElement = this.shadow.getElementById('progress-bar');
    this.volumeScaleElement = this.shadow.querySelector('.volume');

    this.#createPlayListItems();

    this.#initializePlayer();
  }

  #initializePlayer() {
    this.#loadAudioTrack(0);

    this.playPauseButtonElement.addEventListener('click', () => this.playPauseAudio());
    this.audio.addEventListener('timeupdate', () => this.audioProgress());
    this.progressBarElement.addEventListener('click', (e) => this.rewindAudioTrack(e));
    this.muteButtonElement.addEventListener('click', () => this.muteUnmuteAudio());
    this.volumeScaleElement.addEventListener('change', () => this.changeAudioVolume());
    this.previousButtonElement.addEventListener('click', () => this.playPreviousTrack());
    this.nextButtonElement.addEventListener('click', () => this.playNextTrack());
  }

  #loadAudioTrack(index = 0, autoplay = false) {
    
    this.audio.pause();
    this.audioState.playing = false;
    
    this.#setCurrentSong(index);
    const currentTrackParams = this.#getCurrentSong();
    
    this.audio.src = currentTrackParams.src;
    this.#updateCurrentSongTitle();
    this.#updateActivePlayListItem();

    if (autoplay) {
      this.#playAudio();
    }
  }

  playPauseAudio() {
    if (!this.audioState.playing) {
      this.#playAudio();
    } else {
      this.#pauseAudio();
    }
  }

  #playAudio() {
    this.audio.currentTime = this.audioState.currentTime;
    this.audio.play();
    this.audioState.playing = true;
    this.playPauseButtonElement.classList.remove('play');
    this.playPauseButtonElement.classList.add('pause');
  }

  #pauseAudio() {
    this.audio.pause();
    this.audioState.playing = false;
    this.playPauseButtonElement.classList.remove('pause');
    this.playPauseButtonElement.classList.add('play');
  }

  playPreviousTrack() {
    const { currentItemIndex } = this.audioState;
    const previousTrackIndex = currentItemIndex === 0 ? playList.length - 1 : currentItemIndex - 1;

    this.#loadAudioTrack(previousTrackIndex, true);
  }

  playNextTrack() {
    const { currentItemIndex } = this.audioState;
    const previousTrackIndex = currentItemIndex === (playList.length - 1) ? 0 : currentItemIndex + 1;

    this.#loadAudioTrack(previousTrackIndex, true);
  }

  muteUnmuteAudio() {
    if (this.audioState.muted) {
      this.#unmuteAudio();
    } else {
      this.#muteAudio();
    }
  }

  #unmuteAudio(onVolumeScaleChange = false) {
    this.#setVolume(this.audioState.volumeValue > 0 ? this.audioState.volumeValue : 0.1, onVolumeScaleChange);
    this.#showUnmutedButton();
    this.audioState.muted = false;
  }

  #muteAudio() {
    this.#setVolume(0);
    this.#showMutedIcon();
    this.audioState.muted = true;
  }


  #audioTime(time) {
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
    return minutesVal + ':' + secondsVal;
  }

  audioProgress() {
    const { currentTime, duration } = this.audio;
    const progress = (currentTime * 100) / duration;

    if (!isNaN(progress)) {
      this.audioState.currentTime = currentTime;
      this.progressBarElement.value = progress;
      this.currentTimeElement.innerHTML = this.#audioTime(currentTime);
      this.durationTimeElement.innerHTML = this.#audioTime(duration);

      if (currentTime === duration) {
        this.playNextTrack();
      }
    }
  }

  rewindAudioTrack(e) {
    let bounds = e.target.getBoundingClientRect();
    let mouseX = e.clientX - bounds.left;

    let progress = mouseX / this.progressBarElement.offsetWidth;
    this.audio.currentTime = this.audio.duration * progress;
  }

  changeAudioVolume() {
    const volume = this.volumeScaleElement.value / 100;

    if (volume === 0) {
      this.#muteAudio();
    } else {
      this.audioState.volumeValue = volume;
      this.#unmuteAudio(true);
    }
  }

  #getCurrentSong() {
    return playList[this.audioState.currentItemIndex];
  }

  #setCurrentSong(index) {
    this.audioState.currentItemIndex = index;
    this.audioState.currentTime = 0;
  }

  #createPlayListItems() {
    const listItems = playList.map((item) => {
      const li = document.createElement('li');

      li.textContent = item.title;

      return li;
    });

    this.playListElement.append(...listItems);
    this.playListItemElements = this.shadow.querySelectorAll('.play-list li');
  }

  #updateActivePlayListItem() {
    const activeItemClassName = 'active';

    this.playListItemElements.forEach((element) => element.classList.remove(activeItemClassName));
    this.playListItemElements[this.audioState.currentItemIndex].classList.add(activeItemClassName);
  }

  #updateCurrentSongTitle() {
    const currentSong = this.#getCurrentSong();

    this.songNameElement.textContent = currentSong.title;
  }

  #showMutedIcon() {
    this.muteButtonElement.classList.remove('true');
    this.muteButtonElement.classList.add('false');
  }

  #showUnmutedButton() {
    this.muteButtonElement.classList.remove('false');
    this.muteButtonElement.classList.add('true');
  }

  #setVolume(volume, onVolumeScaleChange = false) {
    this.audio.volume = volume;

    if (!onVolumeScaleChange) {
      this.volumeScaleElement.value = volume * 100;
    }
  }
}
