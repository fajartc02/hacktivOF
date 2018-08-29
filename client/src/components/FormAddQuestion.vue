<template>
  <v-container grid-list-xs>
    <h1>Create Question</h1>
    <h3>Hacktiv OverFlow</h3>
    <v-layout wrap row>
      <v-flex xs2>
  
      </v-flex>
      <v-flex xs8>
        <v-form v-model="valid" ref="form">
          <v-text-field v-model="title" :rules="titleRules" label="Title" required></v-text-field>
          <wysiwyg v-model="description" required/>
          <!-- <v-text-field v-model="description" :rules="descriptionRules" label="description" required></v-text-field> -->
          <v-btn :disabled="!valid" @click="addQuestion" >
            Submit
          </v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      valid: true,
      title: "",
      titleRules: [
        v => !!v || "Title is required",
        v => v.length <= 1000 || "Title must be less than 1000 characters"
      ],
      description: ""
    };
  },
  methods: {
    ...mapActions([
      'submitQuestion'
    ]),
    clear() {
      this.$refs.form.reset();
    },
    addQuestion() {
      let data = {
        title: this.title,
        description: this.description,
        token: localStorage.getItem('token')
      }
      this.submitQuestion(data)
    }
  }
};
</script>

<style>
</style>
