import { createWebHistory, createRouter } from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/auth/Login.vue"
import Register from "../components/auth/Register.vue";
import UsersList from "../components/UsersList.vue"; 
import TasksList from "../views/TasksList.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/users",
    name: "users",
    component: UsersList,
  },
  {
    path: "/tasks",
    name: "tasks",
    component: TasksList,
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