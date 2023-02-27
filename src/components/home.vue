<template>
  <div class="home-box">
    <div class="add-buttons-box">
      <button v-on:click="handleForm()">Add Product</button>
      <button v-on:click="logout()">Logout</button>
    </div>
    <div class="col-md-12" v-for="(product, index) in products" :key="index">
      <div>
        <h3>{{product.name}}</h3>
        <img :src="product.pictures" style="height:40px" />
      </div>
    </div>
  </div>
</template>
  <script>
import { GET_TOKEN, SET_AUTHENTICATION } from "../store/storeconstants";
import axios from "axios";
export default {
  name: "homeView",
  data() {
    return {
      products: [],
      error: ""
    };
  },
  mounted() {
    let config = {
      headers: {
        Authorization: "Bearer " + this.$store.getters[`auth/${GET_TOKEN}`]
      }
    };
    axios
      .get("http://vps.churrasco.digital:3005/products", config)
      .then(response => (this.products = response.data.reverse()));
  },
  methods: {
    handleForm() {
      this.$router.push("/form");
    },
    logout() {
      this.$store.commit(`auth/${SET_AUTHENTICATION}`, false);
      this.$router.push("/");
    }
  }
};
</script>

<style>
.add-buttons-box {
  display: flex;
  justify-content: space-around;
  padding-top: 40px;
}
button {
  background-color: #3c347d;
  color: #ffffff;
  padding: 5px 10px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 10px;
}
</style>