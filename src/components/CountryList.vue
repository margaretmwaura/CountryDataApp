<template>
  <div class="grid-container">

    <h2><b>Did you know ? <span>🤔</span> </b></h2>
    <h4><b>There are 195 countries in the world today. This total comprises 193 countries
      that are member states of the United Nations
      and 2 countries that are non-member observer states: the Holy See and the State of Palestine.</b></h4>

    <input type="text" placeholder="search by country name" v-model="countryName">
    <div v-if="filteredCountries.length > 0">
      <div class="flexbox-container">
        <div v-for="(country, index) in filteredCountries" v-bind:key="index">
          <div class="flexbox-item">
            <country :country_data="country"></country>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <h5><b>There are no countries with that name 😓</b></h5>
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
      countryName: '',
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
            Vue.$toast.open({
              message: 'An error occurred while getting the countries',
              type: 'error',
            });
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

      if (!countryName) {
        return countries;
      }

      let searchString = countryName.trim().toLowerCase();

      countries = countries.filter(function (item) {
        if (item.name.toLowerCase().indexOf(searchString) !== -1) {
          return item;
        }
      })

      return countries;
    }
  }
}
</script>

<style scoped lang="scss">

.flexbox-container {
  display: flex;
  height: 100%;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
}

.flexbox-item {
  padding-top: 10px;
  width: 100px;
  min-width: 350px;
  min-height: 450px;
  border: solid 2px #d8ebda;
  margin: 10px;
}

input {
  border-radius: 25px;
  border: 2px solid #d8ebda;
  padding: 10px;
  display: table-cell;
  width: 80%;
  margin: 5%;
}

input::-webkit-input-placeholder {
  font-size: 16px;
  line-height: 3;
  color: black;
}

</style>