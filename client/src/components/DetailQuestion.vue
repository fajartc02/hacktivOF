<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12>
        <v-jumbotron>
          <v-container fill-height>
            <v-layout align-center>
              <v-flex>
                <h1>Question</h1>
                <h3 class="display-3 text-lg-left">{{dataQuestion.title}}</h3>
                <div>
                  <p class="text-lg-left">{{dataQuestion.description}}.</p>
                  <hr>
                  <p class="text-lg-left">Posted By: {{dataQuestion.UserId.name}}</p>
                  <p class="text-lg-left">On: {{dataQuestion.UserId.createdAt.slice(0,10)}}</p>
                </div>
                <v-divider class="my-3"></v-divider>
                <v-btn v-if="vote" flat icon color="blue lighten-2" @click="voteUpQuestion(dataQuestion)">
                  <v-icon>thumb_up</v-icon>{{dataQuestion.upVotes.length}}
                </v-btn>
                <v-btn v-else flat icon color="blue lighten-2" @click="voteUpQuestion(dataQuestion)">
                  <v-icon>thumb_up</v-icon>{{dataQuestion.upVotes.length}}
                </v-btn>
                <v-btn flat icon color="red lighten-2" @click="voteDownQuestion(dataQuestion)">
                  <v-icon>thumb_down</v-icon>{{dataQuestion.downVotes.length}}
                </v-btn>
                <v-flex xs1>
  
                </v-flex>
              </v-flex>
            </v-layout>
          </v-container>
        </v-jumbotron>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs1>
  
      </v-flex>
      <v-flex xs10>
        <h2>Answer</h2>
        <wysiwyg v-model="answer" placeholder="Answer" required/>
        <v-btn v-if="token !== ''" @click="postAnswer">
          Post
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="dataQuestion.answers.length !== 0" v-for="(answer, index) in dataQuestion.answers" :key="index">
      <v-flex xs1>
  
      </v-flex>
      <v-flex xs10>
        <h3 class="display-3 text-lg-left">{{answer.name}}</h3>
        <div>
          <p class="text-lg-left" v-html="answer.answer"></p>
          <hr>
          <p class="text-lg-left">Answer By: {{answer.name}}</p>
          <p class="text-lg-left">On: {{answer.date.slice(0,10)}}</p>
          <v-btn flat icon color="blue lighten-2" @click="voteUpAnswer">
            <v-icon>thumb_up</v-icon>
          </v-btn>
          <v-btn flat icon color="red lighten-2" @click="voteDownAnswer">
            <v-icon>thumb_down</v-icon>
          </v-btn>
            <router-link class="styleLink" color="dark" :to="`/myquestions/${dataQuestion._id}/answer/edit/${answer._id}`">
              <v-btn color="blue" dark>
                <v-icon dark>build</v-icon> Edit Answer
              </v-btn>
            </router-link>
        </div>
        <v-divider class="my-3"></v-divider>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs1>
  
      </v-flex>
      <div>
        <v-flex xs10>
  
        </v-flex>
      </div>
    </v-layout>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import axios from "axios"
import swal from 'sweetalert2';

export default {
  data() {
    return {
      dataQuestion: "",
      answer: "",
      vote: true,
      isTrue: false,
      user: '',
      token: localStorage.getItem('token') || ''
    };
  },
  methods: {
    ...mapActions(["submitAnswer", "voteQuestion", "voteDwnQuestion"]),
    getUser() {
      // if (this.dataQuestion.UserId.name === ) {
      //   console.log("masuk");
      //   this.isTrue = true;
      // }
    },
    getOneQuestion(data) {
      axios
        .get(`http://localhost:3000/questions/getOne/${data.id}`, {
          headers: {
            token: data.token
          }
        })
        .then(result => {
          this.dataQuestion = result.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    postAnswer() {
      let data = {
        id: this.$route.params.id,
        token: localStorage.getItem("token"),
        answer: this.answer
      };
      this.submitAnswer(data);
    },
    voteUpAnswer() {},
    voteDownAnswer() {},
    voteUpQuestion(dataQ) {
      this.vote = false;
      dataQ.votes += 1;
      let data = {
        id: this.$route.params.id,
        votes: dataQ.votes,
        token: localStorage.getItem("token")
      };
      this.voteQuestion(data);
    },
    voteDownQuestion(dataQ) {
      this.vote = false;
      dataQ.votes += 1;
      let data = {
        id: this.$route.params.id,
        votes: dataQ.votes,
        token: localStorage.getItem("token")
      };
      this.voteDwnQuestion(data);
    }
  },

  computed: {
    ...mapState(["confRemoved"])
  },
  watch: {
    confRemoved: function() {
      let data = {
        id: this.$route.params.id,
        token: localStorage.getItem("token")
      };

      this.getOneQuestion(data);
    }
  },
  created() {
    let data = {
      id: this.$route.params.id,
      token: localStorage.getItem("token")
    };
    this.getOneQuestion(data)
    if(!localStorage.getItem('token')) {
      swal('you must be login')
      this.$router.push('/login')
    }
  }
};
</script>

<style>
</style>
