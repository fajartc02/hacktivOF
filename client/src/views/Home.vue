<template>
  <div class="home">
    <Navbar :navUser="user"/>
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <router-view @user-is-login="isUser"></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue'
import {mapState} from 'vuex'


export default {
  name: 'home',
  data() {
    return {
      user: ''
    }
  },
  methods: {
    isUser(dataUser) {
      this.user = dataUser
    }
  },
  components: {
    HelloWorld,
    Navbar
  },
  computed: {
    ...mapState([
      'dataUser'
    ])
  },
  mounted() {
    // console.log('hui',this.dataUser);
  },
}
</script>
