<template>
  <div class="player-container">
    <audio :loop="looping" ref="audio" :src="file" @timeupdate="update" @loadeddata="load"
           @pause="playing = false" @play="playing = true" preload="auto" class="hidden"></audio>
    <router-link to="" class="w-20 h-20 rounded  ">
      <img src="@/assets/hqdefault.jpg" class="img-artist">
    </router-link>
    <div class="player-wrapper">
      <div class="song-title">un jour sur le chemin</div>
      <div class="time-progress-bar-block">
        <div class="flex justify-between items-center w-full">
          <span>{{ convertTimeHHMMSS(this.currentSeconds) }}</span>
          <span>{{ convertTimeHHMMSS(this.durationSeconds) }}</span>
        </div>
        <div class="w-full ">
          <div class="progress-bar" @click="seek">
            <div :style="progressStyle" class="progress-bar-seek" title="Seek"></div>
          </div>
        </div>
      </div>
      <div class="btn-actions-container">
        <div class="flex flex-row space-x-4 items-center">
            <span id="download" @click.prevent="download" class="btn-icon">
              <DownloadIcon class="w-5 h-5"/>
            </span>
          <span class="btn-icon">
              <MusicNoteIcon class="w-5 h-5"/>
            </span>

          <span @click.prevent="rewind" class="btn-icon hidden lg:flex">
              <RewindIcon class="w-6 h-6"/>
            </span>
          <span v-if="!playing" class="btn-icon" id="play" @click.prevent="playing = !playing" :title="(playing) ? 'Pause' : 'Play'">
              <PlayIcon class="w-6 h-6"/>
            </span>
          <span v-if="playing" class="btn-icon" id="stop" @click.prevent="stop" title="Stop">
               <PauseIcon class="w-6 h-6" :class="playing ? 'text-purple-500':''"/>
            </span>
          <span @click="fastForward" class="btn-icon hidden lg:flex">
              <FastForwardIcon class="w-6 h-6"/>
            </span>
          <span class="relative mt-1 btn-icon">
              <refresh-icon @click.prevent="looping = !looping" class="w-5 h-5 "
                            :class="[looping ? 'text-purple-500': '' ]"/>
              <span v-if="looping" class="is-looping-audio"></span>
            </span>
          <div id="volume" @mouseenter="showVolume = true">
            <a class="relative space-x-2"
               :title="volumeTitle" href="#">
                <span @click.prevent="mute" class="absolute -inset-y-2.5 btn-icon">
                  <VolumeUpIcon v-if="!muted" class="w-6 h-6"/>
                  <VolumeOffIcon v-else class="w-6 h-6"/>
                </span>
            </a>
          </div>
          <span class="relative left-3" @mouseleave="showVolume = false">
              <input v-model.lazy.number="volume" v-show="showVolume"
                     class="volume-range"
                     type="range"
                     min="0"
                     max="100"/>
            </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {
  PauseIcon,
  PlayIcon,
  RefreshIcon,
  RewindIcon,
  MusicNoteIcon,
  VolumeOffIcon,
  VolumeUpIcon,
  DownloadIcon,
  FastForwardIcon
} from "@heroicons/vue/outline";

export default {
  name: "Player",
  components: {
    FastForwardIcon,
    DownloadIcon,
    PauseIcon,
    PlayIcon,
    RefreshIcon,
    RewindIcon,
    MusicNoteIcon,
    VolumeOffIcon,
    VolumeUpIcon
  },
  props: {
    autoPlay: {
      type: Boolean,
      default: false
    },
    file: {
      type: String,
      default: null
    },
    loop: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentSeconds: 0,
      durationSeconds: 0,
      loaded: false,
      looping: false,
      playing: false,
      previousVolume: 35,
      showVolume: false,
      volume: 100
    }
  },
  computed: {
    progressBar() {
      return {
        'width': 20 + '%'
      }
    },
    muted() {
      return this.volume / 100 === 0;
    },
    percentComplete() {
      return parseInt(this.currentSeconds / this.durationSeconds * 100);
    },
    progressStyle() {
      return {width: `${this.percentComplete}%`};
    },
    volumeTitle() {
      return `Volume (${this.volume}%)`;
    }
  },
  filters: {},
  watch: {
    playing(value) {
      if (value) {
        return this.$refs.audio.play();
      }
      this.$refs.audio.pause();
    },
    volume() {
      this.$refs.audio.volume = this.volume / 100;
    }
  },
  methods: {
    convertTimeHHMMSS(val) {
      let hhmmss = new Date(val * 1000).toISOString().substr(11, 8);

      return hhmmss.indexOf("00:") === 0 ? hhmmss.substr(3) : hhmmss;
    },

    download() {
      this.stop();
      window.open(this.file, 'download');
    },
    load() {
      if (this.$refs.audio.readyState >= 2) {
        this.loaded = true;
        this.durationSeconds = parseInt(this.$refs.audio.duration);

        return this.playing = this.autoPlay;
      }

      throw new Error('Failed to load sound file.');
    },
    mute() {
      if (this.muted) {
        return this.volume = this.previousVolume;
      }

      this.previousVolume = this.volume;
      this.volume = 0;
    },
    seek(e) {
      if (!this.loaded) return;

      const bounds = e.target.getBoundingClientRect();
      const seekPos = (e.clientX - bounds.left) / bounds.width;

      this.$refs.audio.currentTime = parseInt(this.$refs.audio.duration * seekPos);
    },

    rewind() {
      if (this.currentSeconds > 0) {
        this.$refs.audio.currentTime -= parseInt(this.$refs.audio.duration * 0.05);
      }
    },

    fastForward() {
      if (this.currentSeconds < this.durationSeconds) {
        this.$refs.audio.currentTime += parseInt(this.$refs.audio.duration * 0.05);
      }
    },

    stop() {
      this.playing = false;
      this.$refs.audio.currentTime = 0;
    },

    update() {
      this.currentSeconds = parseInt(this.$refs.audio.currentTime);
    }

  },
  created() {
    this.looping = this.loop;
  }

};
</script>
<style scoped>
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 15px;
  width: 15px;
  background: #ffffff;
  box-shadow: -405px 0 0 400px #8b5cf6;
  border-radius: 50%;

}
</style>
