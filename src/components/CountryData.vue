<template>
  <div class="grid-container">
    <input type="text" placeholder="search by country name" v-model="countryName">
    <div class="flexbox-container">
      <div v-for="(country, index) in filteredCountries" v-bind:key="index">
        <div class="flexbox-item">
          <p> {{ country.name }}</p>
          <input type="text" placeholder="Verify phone number" v-model="phoneNumber">
          <button @click="verifyPhoneNumber">Verify</button>
          <button @click="displayCountry(country, index)">View Country Details</button>
          <modal ref="modalName">
            <template v-slot:header>
              <h1>Country Details</h1>
            </template>
            <template v-slot:body>
              <p> {{ selectedCountry.name }}</p>
            </template>
            <template v-slot:footer>
              <div>
                <button @click="$refs.modalName[selectedCountryIndex].closeModal()">Close</button>
              </div>
            </template>
          </modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Modal from "./Modal";

// Api Key -- 160bd25861863d078f999773ee1ede65
export default {
  name: "CountryData",
  components: {
    Modal
  },
  data() {
    return {
      allCountries: [],
      selectedCountry: '',
      selectedCountryIndex: '',
      countryName : '',
      phoneNumber : ''
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
    displayCountry(country, index) {
      this.$refs.modalName[index].openModal()
      this.selectedCountry = country
      this.selectedCountryIndex = index
    },
    verifyPhoneNumber(){
      axios
          .get('http://apilayer.net/api/validate?access_key=' + process.env.VUE_APP_API_KEY + '&number=' + this.phoneNumber)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log("Validation error " +  error);
          })
    }
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