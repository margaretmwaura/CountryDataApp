<template>
  <div class="grid-container">
    <input type="text" placeholder="search by country name" v-model="countryName">
    <div class="flexbox-container">
      <div v-for="(country, index) in filteredCountries" v-bind:key="index">
        <div class="flexbox-item">
           <country :country_data="country"></country>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Country from "./Country";

export default {
  name: "CountryData",
  components: {
    Country
  },
  data() {
    return {
      allCountries: [],
      countryName : '',
    }
  },
  methods: {
    getAllCountries() {
      axios
          .get('https://restcountries.eu/rest/v2/all')
          .then(response => {
            this.allCountries = response.data
          })
          .catch(error => {
            console.log(error);
          })
    },
  },
  mounted() {
    this.getAllCountries();
  },
  computed: {
    filteredCountries: function () {

      let countries = this.allCountries;
      let countryName = this.countryName;

      if(!countryName){
        return countries;
      }

      let searchString = countryName.trim().toLowerCase();

      countries = countries.filter(function(item){
        if(item.name.toLowerCase().indexOf(searchString) !== -1){
          return item;
        }
      })

      return countries;
    }
  }
}
</script>

<style scoped>

.flexbox-container {
  display: flex;
  height: 100%;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
}

.flexbox-item {
  width: 100px;
  min-width: 300px;
  min-height: 300px;
  border: solid 2px green;
  margin: 10px;
}

</style>