<template>
  <v-container grid-list-xs>
    <h1>Edit Answer</h1>
    <h3>Hacktiv OverFlow</h3>
    <v-layout wrap row>
      <v-flex xs2>
  
      </v-flex>
      <v-flex xs8>
        <v-form v-model="valid" ref="form">
          <!-- <v-text-field v-model="answer" :rules="answerRules" label="answer" required></v-text-field> -->
          <wysiwyg v-model="answer" required/>
          <!-- <v-text-field v-model="description" :rules="descriptionRules" label="description" required></v-text-field> -->
          <v-btn :disabled="!valid" @click="editAnswer">
            Submit
          </v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex"
import axios from "axios"


export default {
  data() {
    return {
      valid: true,
      answer: "",
      answerRules: [
        v => !!v || "answer is required",
        v => v.length <= 1000 || "answer must be less than 1000 characters"
      ],
      dataAns: ''
    };
  },
  methods: {
    ...mapActions(["updateQuestion", "updateAnswer"]),
    clear() {
      this.$refs.form.reset();
    },
    editAnswer() {
      let data = {
        answer: this.dataAns,
        id: this.$route.params.id,
        token: localStorage.getItem("token")
      }
      this.dataAns.answer = this.answer
      this.updateAnswer(data)
    },
    getOneAnswer(data) {
      axios
        .get(`http://localhost:3000/questions/answer/${data.id}?idQ=${data.idQ}`, {
          headers: { token: data.token }
        })
        .then(result => {
          this.dataAns = result.data.data
          this.answer = result.data.data.answer
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    let data = {
      id: this.$route.params.id,
      idQ: this.$route.params.idQ,
      token: localStorage.getItem("token")
    };
    this.getOneAnswer(data)
  },
};
</script>

<style>
</style>
