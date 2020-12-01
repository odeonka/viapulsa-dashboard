import Vue from 'vue'
import firebase from 'firebase';
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import Login from '@/views/Login';
import ConvertPulsa from '@/views/CS/Convert'
import Dashboard from '@/views/master/Dashboard'
import Analyst from '@/views/analyst/Dashboard'
import pencariandataa from '@/views/analyst/pencariandataa'
import BadData from '@/views/baddata'
import AnalystOngoing from '@/views/analyst/Uncomplete'
import Seller from '@/views/seller/Seller'
import {db} from '../main'

//debug
import ConvertMagang from '@/views/CS/Debug'

Vue.use(VueRouter)

const routes = [
  {
    path: '/bad-data',
    name: 'bad-data',
    component: BadData,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/selling-pulsa',
    name: 'dashboardseller',
    component: Seller,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/analyst/pencariandataa',
    name: 'pencariandataa',
    component: pencariandataa,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/analyst',
    name: 'analyst',
    component: Analyst,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/analyst-ongoing',
    name: 'analystongoing',
    component: AnalystOngoing,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/convert-pulsa',
    name: 'convertpulsa',
    component: ConvertPulsa,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/convert-magang',
    name: 'convertpulsamagang',
    component: ConvertMagang,
    meta: {
      requiresAuth: true
    }
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser){
    db.collection('users').where('email', '==', currentUser.email).get().then(querySnapshot => {
      const documents = querySnapshot.docs.map(doc => doc.data())
      const type = documents[0].type
      if(type == 'cs'){
        next('convert-pulsa')
      } else if(type == 'magang'){
        console.log(type)
        next({ path: '/convert-magang' })
      } else if(type == 'seller'){
        next('selling-pulsa')
      } else if(type == 'master'){
        next('dashboard')
      } else if(type == 'analyst'){
        next('analyst')
      }else if(type == 'analyst'){
        next('pencariandataa')
      }
      else next();
    })
  }
  else next();
});

export default router
