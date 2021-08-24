<template>
  <div style="padding: 10px">
    <h4> {{ country_data.name }}</h4>
    <p>It's native name is {{ country_data.nativeName }}
      and it is located at {{ country_data.latlng[0] }} latitude
      and {{ country_data.latlng[1] }} longitude
    </p>
    <img :src="country_data.flag"/>
    <div class="grid-container grid-x grid-margin-x grid-padding-x ">
      <div class="cell medium-12 small-12 large-12">
        <vue-tel-input v-model="phoneNumber"
                       v-bind="bindProps"></vue-tel-input>
      </div>
      <div class="cell medium-12 small-12 large-12 space">
        <button @click="verifyPhoneNumber" class="button radius mt10">Verify</button>
      </div>
      <div class="cell medium-12 small-12 large-12">
        <button @click="displayCountry" class="more">See More</button>
      </div>
    </div>
    <modal ref="modalName">
      <template v-slot:header>
        <h3><b>{{ country_data.name }} - {{ country_data.alpha2Code }}</b></h3>
      </template>
      <template v-slot:body>
        <p> The codes for the country are {{ country_data.alpha2Code }}
          and {{ country_data.alpha3Code }}. The country occupies an area of {{ country_data.area }}. It
          capital city is {{ country_data.capital }} and it has a population of {{ country_data.population }}</p>

        <p>The country has the following timezone - {{ country_data.timezones }} and it is located in
          {{ country_data.region }}</p>
      </template>
      <template v-slot:footer>
        <div>
          <button @click="$refs.modalName.closeModal()" class="button radius">Close</button>
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
  props: ['country_data'],
  components: {
    Modal
  },
  data() {
    return {
      countryName: '',
      phoneNumber: '',
      api_key: process.env.VUE_APP_API_KEY,
      bindProps: {
        mode: 'international',
        defaultCountry: this.country_data.alpha2Code,
        placeholder: "Enter a phone number",
      }
    }
  },
  methods: {
    displayCountry() {
      this.$refs.modalName.openModal()
    },
    verifyPhoneNumber() {
      if (this.phoneNumber == null || this.phoneNumber === "") {
        Vue.$toast.open({
          message: 'Kindly provide a phone number',
          type: 'warning',
        });
        return;
      }
      axios
          .get('http://apilayer.net/api/validate?access_key=' + this.api_key + '&number=' + this.phoneNumber)
          .then(response => {

            let results = response.data;
            if (!results.valid || results.country_code !== this.country_data.alpha2Code) {
              Vue.$toast.open({
                message: 'Phone number validation failed for ' + this.country_data.name,
                type: 'error',
              });
            } else {
              Vue.$toast.open({
                message: 'Verification passed',
                type: 'success',
              });
            }
          })
          .catch(error => {
            Vue.$toast.open({
              message: 'Phone number validation failed for ' + this.country_data.name,
              type: 'error',
            });
          })
    }
  },
}
</script>

<style scoped lang="scss">

img {
  width: 100px;
  height: 100px;
  margin-bottom: 50px;
}

.more {
  border-radius: 25px;
  padding: 10px;
  width: 100px;
  background: cadetblue;
  color: white;
  border: 1px solid cadetblue;
}

.space {
  margin-top: 10px;
}
</style>