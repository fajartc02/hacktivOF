<template>
    <v-container grid-list-xs>
    <h1>Register</h1>
    <h3>Hacktiv OverFlow</h3>
    <v-layout wrap row>
        <v-flex xs4>
            
        </v-flex>
        <v-flex xs4>
            <v-form v-model="valid" ref="form">
                <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Name"
                required
                ></v-text-field>
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
                @click="signupUser"
                >
                Signup
                </v-btn>
                <v-btn @click="clear">clear</v-btn>
            </v-form>
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
      name: "",
      nameRules: [
        v => !!v || "name is required",
        v => v.length <= 225 || "E-mail must be valid"
      ],
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
    ...mapActions(["signup"]),
    signupUser() {
      let user = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.signup(user)
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
