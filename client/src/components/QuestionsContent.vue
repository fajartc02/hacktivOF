<template>
  <div>
    <div v-for="(dataQuestion, index) in dataQuestions" :key="index">
      <v-layout row wrap>
        <v-flex xs12>
          <v-jumbotron>
            <v-container fill-height>
              <v-layout align-center>
                <v-flex>
                  <h3 class="display-3 text-lg-left">{{dataQuestion.title}}</h3>
                  <div>
                    <h5 class="text-lg-left">Question: </h5>
                    <p class="text-lg-left" v-html="dataQuestion.description"></p>
                    <hr>
                    <p class="text-lg-left">Post By: {{dataQuestion.UserId.name}}.</p>
                    <p class="text-lg-left">On: {{dataQuestion.UserId.createdAt.slice(0,10)}}.</p>
                  </div>
                  <v-divider class="my-3"></v-divider>
                  <v-flex xs1>
                    <router-link :to="`/myquestions/detail/${dataQuestion._id}`">
                      <v-btn class="mx-0" color="primary" large>
                        See more
                      </v-btn>
                    </router-link>
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-container>
          </v-jumbotron>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
  import {
    mapActions
  } from "vuex";
  import axios from "axios";
  
  export default {
    data() {
      return {
        dataQuestions: ""
      };
    },
    methods: {
      getAllQuestions() {
        axios
          .get("http://localhost:3000/questions")
          .then(result => {
            this.dataQuestions = result.data.data;
            console.log(this.dataQuestions);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    created() {
      this.getAllQuestions();
    }
  };
</script>

<style>
  
</style>
