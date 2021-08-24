<template>
  <div id="app">
     <CountryData></CountryData>
  </div>
</template>

<script>
import CountryData from "./components/CountryData";
export default {
  name: 'App',
  components: {
    CountryData
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
