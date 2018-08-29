import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert2'
import router from './router'
// import {firebase, provider} from '@/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataUser: '',
    dataQuestions: '',
    confRemoved: ''
  },
  mutations: {
    USER_LOGIN: function (state, payload) {
      state.dataUser = payload
    },
    GET_MYARTICLE: function (state, payload) {
      state.dataQuestions = payload
    },
    CONF_REMOVED: function (state, payload) {
      state.confRemoved = payload
    }
  },
  actions: {
    loginFb() { // from auth firebase
      firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken
        // The signed-in user info.
        var user = result.user
        // ...
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // The email of the user's account used.
        var email = error.email
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential
        // ...
      });
    },
    loginFacebook() {

    },

    myQuestions({
      commit
    }, token) {
      axios.get('http://localhost:3000/questions/myquestions', {
          headers: {
            token: token
          }
        })
        .then((result) => {
          // console.log(result.data.data)
          commit('GET_MYARTICLE', result.data.data)
        })
        .catch((err) => {
          console.log(err)
        });
    },

    login({
      commit
    }, data) {
      axios.post('http://localhost:3000/signin', data)
        .then(result => {
          localStorage.setItem('token', token)
        })
        .catch(err => {
          console.log(err)
        })
    },

    signup({commit}, data) {
      axios.post('http://localhost:3000/signup', data)
        .then(result => {
          swal('successfully to register', '', 'success')
          router.push('/login')
        })
        .catch(err => {
          swal('Failed to register', '', 'error')
          console.log(err)
        })
    },

    userLogin({
      commit
    }, data) {
      axios.post('http://localhost:3000/signin', data)
        .then(result => {
          let token = result.data.token
          swal(`hello, ${result.data.data.name}`)
          localStorage.setItem('token', token)
          commit('USER_LOGIN', result.data.data)
          router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    submitQuestion({
      commit
    }, data) {
      let newQ = {
        title: data.title,
        description: data.description
      }
      axios.post('http://localhost:3000/questions', newQ, {
          headers: {
            token: data.token
          }
        })
        .then((result) => {
          swal('success to Question', 'success')
          router.push('/myquestions')
        })
        .catch((err) => {
          swal('failed to submit', 'error')
        });
    },
    updateQuestion({
      commit
    }, data) {
      if (data.votes) {
        var updatedQ = {
          title: data.title,
          description: data.description,
          votes: data.votes
        }
      } else {
        var updatedQ = {
          title: data.title,
          description: data.description,
        }
      }
      axios
        .put(`http://localhost:3000/questions/update/${data.id}`, updatedQ, {
          headers: {
            token: data.token
          }
        })
        .then(result => {
          if (data.votes) {
            // swal('success to vote Question', 'success')
          } else {
            swal('success to update Question', 'success')
            router.push('/myquestions')
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    removeQuestion({
      commit
    }, data) {
      axios.delete(`http://localhost:3000/questions/remove/${data.id}`, {
          headers: {
            token: data.token
          }
        })
        .then(result => {
          // this.myQuestions(data.token)
          commit('CONF_REMOVED', result)
          router.push('/myquestions')
          swal('success to removed Question', 'success')
        })
        .catch(err => {
          console.log(err)
        })
    },
    getOneQuestion({
      commit
    }, data) {
      axios
        .get(`http://localhost:3000/questions/getOne/${data.id}`, {
          headers: {
            token: data.token
          }
        })
        .then(result => {
          this.title = result.data.data.title
          this.description = result.data.data.description
        })
        .catch(err => {
          console.log(err)
        })
    },
    submitAnswer({
      commit
    }, data) {
      let newAns = {
        answer: data.answer
      }
      axios
        .post(`http://localhost:3000/questions/answer/${data.id}`, newAns, {
          headers: {
            token: data.token
          }
        })
        .then(result => {
          swal('answer posted', '', 'success')
          commit('CONF_REMOVED', 'confirm')
          // console.log(result)
        })
        .catch(err => {
          swal('answer posted', '', 'info')
          console.log(err)
        })
    },
    updateAnswer({
      commit
    }, data) {
      axios.post(`http://localhost:3000/questions/answer/update/${data.id}`, data.answer, {
          headers: {
            token: data.token
          }
        })
        .then(result => {
          swal('Success to update', 'success')
        })
        .catch(err => {
          swal('Failed', 'error')
        })
    },
    voteAnswer({
      commit
    }, data) {

    },
    voteQuestion({
      commit
    }, data) {
      axios.put(`http://localhost:3000/questions/upVote/${data.id}`, {}, {
          headers: {
            token: data.token
          }
        })
        .then((result) => {
          swal('successfully to vote', 'success')
          commit('CONF_REMOVED', 'conf')
        })
        .catch((err) => {
          swal('you cannot vote again', 'info')
        })
    },
    voteDwnQuestion({
      commit
    }, data) {
      axios.put(`http://localhost:3000/questions/dwnVote/${data.id}`, {}, {
          headers: {
            token: data.token
          }
        })
        .then((result) => {
          swal('successfully to vote', 'success')
          commit('CONF_REMOVED', 'confi')
        })
        .catch((err) => {
          swal('you cannot vote again', 'info')
        })
    },
  }
})