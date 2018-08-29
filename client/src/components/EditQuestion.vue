<template>
    <v-container grid-list-xs>
    <h1>Edit Question</h1>
    <h3>Hacktiv OverFlow</h3>
    <v-layout wrap row>
      <v-flex xs2>
        
      </v-flex>
      <v-flex xs8>
        <v-form v-model="valid" ref="form">
          <v-text-field v-model="title" :rules="titleRules" label="Title" required></v-text-field>
          <wysiwyg v-model="description" required/>
          <!-- <v-text-field v-model="description" :rules="descriptionRules" label="description" required></v-text-field> -->
          <v-btn :disabled="!valid" @click="editQuestion" >
            Submit
          </v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import axios from 'axios'

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
    ...mapActions(["updateQuestion"]),
    clear() {
      this.$refs.form.reset();
    },
    editQuestion() {
      let data = {
        title: this.title,
        description: this.description,
        id: this.$route.params.id,
        token: localStorage.getItem("token")
      };
      this.updateQuestion(data)
    },
    getOneQuestion(data) {
      axios
        .get(`http://localhost:3000/questions/getOne/${data.id}`, {
          headers: { token: data.token }
        })
        .then(result => {
          this.title = result.data.data.title
          this.description = result.data.data.description
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    let data = {
      id: this.$route.params.id,
      token: localStorage.getItem("token")
    }
    this.getOneQuestion(data)
  }
};
</script>

<style>
</style>
