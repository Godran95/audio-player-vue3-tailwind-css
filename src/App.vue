<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";



export default {
  name: "App",
  components: {

  },

  computed: {
    ...mapState(["waitLoader"]),
  },
};
</script>
<style>
#app {
  font-family: Inter, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background: #999;
  border-radius: 5px;
}

::-webkit-scrollbar-track {
  background: #e6e6e6;
}
</style>
