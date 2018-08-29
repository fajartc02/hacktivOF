<template>
    <v-toolbar color="blue-grey lighten-1" fixed style="opacity: 0.8">
    <v-layout row wrap>
      <v-flex xs4>
        <v-toolbar-title class="black--text">HacktivOverFlow</v-toolbar-title>
      </v-flex>
      <v-flex xs3>
        <v-toolbar-title class="black--text"><router-link to="/" style="text-decoration: none">Home</router-link></v-toolbar-title>
      </v-flex>
      <v-flex xs3>
        <div v-if="isLogin">
          <v-toolbar-title class="black--text"><router-link to="/myquestions" style="text-decoration: none">My Questions</router-link></v-toolbar-title>
        </div> 
      </v-flex>
    </v-layout>
    <v-spacer></v-spacer>
    <v-text-field append-icon="search" placeholder="Search"></v-text-field>
    <div v-if="!isLogin">
      <router-link to="/login"><v-btn color="info">Signin</v-btn></router-link>
      <router-link to="/register"><v-btn color="info">Signup</v-btn></router-link>
    </div>
    <div v-else>
      <v-btn color="warning" @click="logout">Logout</v-btn>
    </div>
  </v-toolbar>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      isLogin: false
    };
  },
  methods: {
    ...mapActions(['login', 'signup']),
    logout() {
      localStorage.removeItem('token')
      this.isLogin = false
      this.$router.push('/login')
    },
    signupUser() {
      let newUser = {
        name: this
      }
    }
  },
  watch: {
    isLogin: function() {
      console.log('chance')
    },
    navUser: function() {
      this.isLogin = true
    }
  },
  computed: {
    ...mapState({
      dataUser: 'dataUser'
    })
  },
  mounted() {
    console.log(this.dataUser)
    if(!localStorage.getItem('token')) {
      this.$router.push('/login')
      this.isLogin = false
    } else {
      this.isLogin = true
    }
  },
  props: ['navUser']
};
</script>

<style>
</style>
