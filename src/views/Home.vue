<template>
  <div class=" h-screen w-full flex justify-center items-center space-x-3 bg-purple-600">
    <Player file="https://api.songofgod.ru/files/fr/crois_seulement/audios/005.mp3"/>
  </div>
</template>

<script>
// @ is an alias to /src


import Player from "../components/Player";
export default {
  name: "Home",
  components: {Player},
};
</script>
