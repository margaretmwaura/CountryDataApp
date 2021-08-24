<template>
  <div>
    <p> {{ country_data.name }}</p>
    <input type="text" placeholder="Verify phone number" v-model="phoneNumber">
    <button @click="verifyPhoneNumber">Verify</button>
    <button @click="displayCountry">View Country Details</button>
    <modal ref="modalName">
      <template v-slot:header>
        <h1>Country Details</h1>
      </template>
      <template v-slot:body>
        <p> {{ country_data.name }}</p>
      </template>
      <template v-slot:footer>
        <div>
          <button @click="$refs.modalName.closeModal()">Close</button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import axios from "axios";
import Modal from "./Modal";
export default {
  name: "Country",
  props : ['country_data'],
  components: {
    Modal
  },
  data() {
    return {
      allCountries: [],
      countryName : '',
      phoneNumber : '',
      api_key : process.env.VUE_APP_API_KEY
    }
  },
  methods: {
    displayCountry() {
      this.$refs.modalName.openModal()
    },
    verifyPhoneNumber(){
      axios
          .get('http://apilayer.net/api/validate?access_key=' + this.api_key + '&number=' + this.phoneNumber)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log("Validation error " +  error);
          })
    }
  },
}
</script>

<style scoped>

</style>