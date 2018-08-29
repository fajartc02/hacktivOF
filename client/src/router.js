import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/',
          component: () => import('@/components/QuestionsContent.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('@/components/RegisterForm.vue')
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('@/components/LoginForm.vue')
        },
        {
          path: '/myquestions',
          name: 'myquestions',
          component: () => import('@/components/QuestionsTable.vue')
        },
        {
          path: '/myquestions/create',
          name: 'createQuestion',
          component: () => import('@/components/FormAddQuestion.vue')
        },
        {
          path: '/myquestions/edit/:id',
          name: 'editQuestion',
          component: () => import('@/components/EditQuestion.vue'),
          props: true
        },
        {
          path: '/myquestions/detail/:id',
          name: 'detailQuestion',
          component: () => import('@/components/DetailQuestion.vue'),
          props: true
        },
        {
          path: '/myquestions/:idQ/answer/edit/:id',
          name: 'updateAnswer',
          component: () => import('@/components/EditAnswer.vue'),
          props: true
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
