import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../components/auth/Login.vue"
import Register from "../components/auth/Register.vue";
import UsersList from "../components/UsersList.vue"; 
import TasksList from "../views/TasksList.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      enterClass: 'animate__animated animate__slideInLeft',
      leaveClass: 'animate__animated animate__slideOutRight',
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      enterClass: 'animate__animated animate__slideInLeft',
      leaveClass: 'animate__animated animate__slideOutRight',
    }
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      enterClass: 'animate__animated animate__slideInRight',
      leaveClass: 'animate__animated animate__slideOutLeft',
    }
  },
  {
    path: "/users",
    name: "users",
    component: UsersList,
    meta: {
      enterClass: 'animate__animated animate__slideInLeft',
      leaveClass: 'animate__animated animate__slideOutRight',
    }
  },
  {
    path: "/tasks",
    name: "tasks",
    component: TasksList,
    meta: {
      enterClass: 'animate__animated animate__slideInLeft',
      leaveClass: 'animate__animated animate__slideOutRight',
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/'];
  const authRequired = !publicPages.includes(to.path);
  const logged = localStorage.getItem('user');
  if(authRequired && !logged){
    next('/login')
  }else{
    next();
  }
})

export default router;