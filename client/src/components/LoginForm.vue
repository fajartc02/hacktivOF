<template>
    <v-container grid-list-xs>
    <h1>Login</h1>
    <h3>Hacktiv OverFlow</h3>
    <v-layout wrap row>
        <v-flex xs4>
            
        </v-flex>
        <v-flex xs4>
            <v-form v-model="valid" ref="form">
                <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
                ></v-text-field>
                <v-text-field
                v-model="password"
                :rules="passRules"
                :counter="10"
                label="Password"
                type="password"
                required
                ></v-text-field>
                <v-btn
                :disabled="!valid"
                @click="loginUser"
                >
                Login
                </v-btn>
                <v-btn @click="clear">clear</v-btn>
            </v-form>
            <h2>Or</h2>
            <v-btn color="info">Login with Facebook</v-btn>
        </v-flex>
    </v-layout>
    </v-container>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
import swal from "sweetalert2";

export default {
  data() {
    return {
      valid: true,
      password: "",
      passRules: [
        v => !!v || "Name is required",
        v => v.length <= 10 || "Name must be less than 10 characters"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    ...mapActions(["userLogin"]),
    loginUser() {
      let user = {
        email: this.email,
        password: this.password
      }
      this.userLogin(user)
      this.$emit('user-is-login', user)
    },
    clear() {
      this.$refs.form.reset()
    }
  }
};
</script>

<style>
.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
}
</style>
