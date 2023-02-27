<template>
  <div>
    <div class="add-buttons-box">
      <button v-on:click="backForm()">Home</button>
      <button v-on:click="logout()">Logout</button>
    </div>
    <div class="add-box">
      <form class="form">
        <input placeholder="name" type="text" v-model="dataProduct.name" />
        <input placeholder="description" type="text" v-model="dataProduct.description" />
        <div class="price-box">
          <label>price $</label>
          <input style="width:40px" placeholder="price" type="number" v-model="dataProduct.price" />
        </div>
        <div class="image-input">
          <input class="customFileInput" type="file" @change="changeFiles" ref="miarchivo" />
        </div>
        <div v-if="images">
          <p>loaded images {{this.images.length}}</p>
          <div v-for="(image, index) in images" :key="index">
            <div>
              <img :src="image" style="height:60px" />
              <button @click="deleteImage(index)">x</button>
            </div>
          </div>
        </div>
        <h3 style="color:red">{{ this.error }}</h3>
        <button v-on:click.prevent="addImages()">up Images selected</button>
        <button style="margin-bottom:200px" v-on:click.prevent="addProduct()">Confirm</button>
      </form>
    </div>
  </div>
</template>

<script>
import { GET_TOKEN, SET_AUTHENTICATION } from "../store/storeconstants";
import axios from "axios";
export default {
  name: "formView",
  data() {
    return {
      products: [],
      imageToLoad: "",
      images: [],
      dataProduct: {
        SKU: "2342232",
        code: 1203,
        name: "",
        description: "",
        pictures: [],
        price: 0,
        currency: ".s/",
        __v: 0
      },
      error: ""
    };
  },
  methods: {
    async addImages() {
      try {
        let body = await new FormData();
        body.set("key", "f52c0378412494390d152818ad190a0b");
        body.append("image", this.$refs.miarchivo.files[0]);
        let res = await axios.post("https://api.imgbb.com/1/upload", body);
        this.images.push(res.data.data.display_url);
        this.$refs.miarchivo.value = null;
        this.dataProduct.pictures = this.images;
      } catch (e) {
        console.log(e);
      }
    },
    deleteImage(index) {
      this.images.splice(index, 1);
    },
    async addProduct() {
      console.log(this.products);
      console.log(this.dataProduct);
      const { name, description, price, pictures } = this.dataProduct;
      if (!name || !description || !price || !pictures) {
        this.error = "please complete all inputs";
      } else {
        try {
          let config = {
            headers: {
              Authorization:
                "Bearer " + this.$store.getters[`auth/${GET_TOKEN}`],
              "Content-Type": "application/json"
            }
          };
          let response = await axios.post(
            "http://vps.churrasco.digital:3005/addproduct",
            this.dataProduct,
            config
          );
          this.$router.push("/home");
          console.log(response);
        } catch (e) {
          console.log(e);
        }
      }
    },
    backForm() {
      this.$router.push("/home");
    },
    logout() {
      this.$store.commit(`auth/${SET_AUTHENTICATION}`, false);
      this.$router.push("/");
    }
  }
};
</script>

<style>
.add-box {
  display: flex;
  justify-content: center;
}
.price-box {
  display: flex;
  justify-content: space-around;
}
.form {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  width: 300px;
}
.form input {
  margin-top: 10px;
}
.image-input {
  border: 1px solid grey;
  border-radius: 20px;
  background-color: #3c347d;
  margin-top: 30px;
}
input {
  border-radius: 10px;
  height: 30px;
  padding-left: 10px;
}
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
.customFileInput::-webkit-file-upload-button {
  visibility: hidden;
}

.customFileInput::before {
  content: "choose";
}

label {
  margin-top: 20px;
}
</style>