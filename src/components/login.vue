
<template>
  <div class="login-box">
    <form class="login-form">
      <img class="logo" src="@/assets/logo.png" />
      <div class="input-box">
        <input placeholder="Username" type="text" v-model="input.username" />
        <input placeholder="Password" type="password" v-model="input.password" />
        <p style="color:red">{{ this.output }}</p>
        <div class="label-box">
          <div>
            <input type="checkbox" />
            <label>remember</label>
          </div>
          <button class="login-btn" type="submit" v-on:click.prevent="login()">Log in</button>
        </div>
      </div>
      <div class="banner-text">
        <p>under services under your control</p>
      </div>
    </form>
  </div>
</template>
<script>
import {
  SET_USERNAME,
  SET_TOKEN,
  SET_AUTHENTICATION
} from "../store/storeconstants";
import axios from "axios";
export default {
  name: "LoginView",
  data() {
    return {
      input: {
        username: "",
        password: ""
      },
      error: ""
    };
  },
  methods: {
    async login() {
      if (!this.input.username || !this.input.password) {
        this.error = "please enter username and password";
      } else {
        try {
          let response = await axios.post(
            "http://vps.churrasco.digital:3005/login",
            this.input
          );
          this.$store.commit(`auth/${SET_USERNAME}`, this.input.username);
          this.$store.commit(`auth/${SET_TOKEN}`, response.data.token);
          this.$store.commit(`auth/${SET_AUTHENTICATION}`, true);
          this.$router.push("/home");
        } catch (e) {
          this.error = "invalid username or password";
          console.log(e);
        }
      }
    }
  }
};
</script>

<style>
.login-box {
  background-color: #2c2558;
  display: flex;
  justify-content: center;
}
.login-form {
  margin-top: 100px;
  padding: 50px;
}
.input-box {
  display: flex;
  flex-direction: column;
}
.input-box input {
  height: 30px;
  border-radius: 10px;
}
.logo {
  width: 160px;
  margin-bottom: 20px;
}
.label-box {
  display: flex;
  justify-content: space-around;
  width: 230px;
}
.label-box input {
  height: 10px;
}
.login-btn {
  background-color: #3c347d;
  color: #ffffff;
  padding: 5px 10px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 12px;
}
label {
  font-size: 12px;
  color: grey;
}
.banner-text {
  margin-top: 160px;
  font-size: 10px;
  display: flex;
  justify-content: center;
  color: gray;
}
</style>