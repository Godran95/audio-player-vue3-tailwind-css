<template>
  <div class=" h-screen w-full flex justify-center items-center  bg-purple-600">
    <Player :file="song"/>
  </div>
</template>

<script>
// @ is an alias to /src


import Player from "../components/Player";

export default {
  name: "Home",
  components: {Player},

  data() {
    return {
      song: {
        mainUrl: "https://api.songofgod.ru/files/fr/crois_seulement/audios/005.mp3",
        chord: "https://api.songofgod.ru/files/fr/crois_seulement/chords/005.mp3",
        title: "Moment de priere"
      }
    }
  },
};
</script>
