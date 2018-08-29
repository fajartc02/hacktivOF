<template>
    <v-layout row wrap>
        <v-flex xs3>
            
        </v-flex>
        <v-flex xs6>
            <v-card>
                <v-card-title>
                    <router-link to="/myquestions/create">Create new Questions</router-link>
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
                </v-card-title>
                <v-data-table :headers="headers" :items="dataQuestions" :search="search">
                    <template slot="items" slot-scope="props">
                            <td>{{ props.item.title }}</td>
                            <td class="text-xs-center">{{ props.item.createdAt.slice(0, 10) }}</td>
                            <td class="text-xs-center"><router-link class="styleLink" color="dark" :to="`/myquestions/edit/${props.item._id}`"><v-btn color="dark">Edit</v-btn></router-link> | <router-link class="styleLink" to=""><v-btn color="dark" @click="deleteQuestion(props.item._id)">Delete</v-btn></router-link></td>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        Your search for "{{ search }}" found no results.
                    </v-alert>
                </v-data-table>
                <v-container grid-list-xs>
                </v-container>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Title",
          align: "Center",
          sortable: false,
          value: "title"
        },
        // { text: "description", value: "description", align: "Center" },
        { text: "Created At", value: "createdAt", align: "Center" },
        { text: "Actions", value: "Actions", align: "Center" }
      ],
      questions: this.dataQuestions,
    };
  },
  methods: {
    ...mapActions(["myQuestions", "removeQuestion"]),
    getMyQuestions() {
      let token = localStorage.getItem("token")

      this.myQuestions(token)
    },
    deleteQuestion(id) {
        let data = {
            id: id,
            token: localStorage.getItem('token')
        }
        this.removeQuestion(data)
        // this.myQuestions(localStorage.getItem('token'))
    }
  },
  computed: {
    ...mapState(["dataQuestions", 'confRemoved'])
  },
  watch: {
      confRemoved: function() {
        // console.log('masuk')
        this.getMyQuestions();
      }
  },
  created() {
    this.getMyQuestions();
  }
};
</script>

<style>
</style>
