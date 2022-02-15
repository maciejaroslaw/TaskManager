<template>
    <div>
        <div class="columns is-flex-wrap-wrap mt-4">
            <transition-group name="list-complete">
                <div v-for="task in tasks" :key="task.id" class="list-complete-item column is-one-quarter">
                    <Task @refresh="getTasks()" :task="task" :isAdmin="isAdmin" />
                </div>
            </transition-group>
            <div v-if="isAdmin" class="column is-one-quarter">
                <div class="card">
                    <div class="card-image">
                        <div class="tile is-justify-content-center notification is-white">
                            <div @click="modalCreateTask = !modalCreateTask" class="icon is-medium addTask">
                                <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="#48c78e" d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z"/></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal create-task-modal" :class="[modalCreateTask ? 'is-active': '']">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="box">
                    <div class="block content">
                        <h1>Create task</h1>
                        <input v-model="newTask.title" class="input is-medium" type="text" placeholder="Task title">
                        <textarea v-model="newTask.description" class="textarea mt-4" placeholder="Task description"></textarea>
                        <div class="select mt-4">
                            <select v-model="newTask.priority">
                                <option value="" selected disabled>Priority</option>
                                <option value="Standard">Standard</option>
                                <option value="Important">Important</option>
                                <option value="Very important">Very important</option>
                            </select>
                        </div>
                        <div class="is-flex is-justify-content-center mt-4">
                            <button @click.prevent="createTask" class="button is-success">Create Task</button>
                        </div>
                    </div>
                </div>
            </div>
            <button @click="modalCreateTask = !modalCreateTask" class="modal-close is-large" aria-label="close"></button>
        </div>
    </div>
</template>

<script>
import Task from '../components/Task.vue';
export default {
    data() {
        return {
            tasks: null,
            newTask: {
                title: '',
                description: '',
                priority: '', 
            },
            taskToEdit: {},
            modalCreateTask: false,
            modalEditTask: false,
        }
    },
    components: {
        Task,
    },
    computed: {
        currentUser(){
            return this.$store.state.auth.user;
        },
        isAdmin(){
            if(this.currentUser){
                return this.currentUser.role === "admin"
            }else{
                return false;
            }
        }
    },
    methods: {
        getTasks(){
            this.$axios.get('http://localhost:3000/tasks', {headers: this.$token()}).then(res=>{
                this.tasks = res.data.tasks
            }).catch(err=>{
                this.$store.dispatch("err/setError", err.response.data.message);
            })
        },
        createTask(){
            this.$axios.post('http://localhost:3000/admin/create-task', {
                title: this.newTask.title,
                description: this.newTask.description,
                priority: this.newTask.priority,
            }, {headers: this.$token()}).then(res=>{
                this.getTasks();
                this.modal = false;
            }).catch(err=>{
                this.$store.dispatch("err/setError", err.response.data.message);
            });
        },
    },
    mounted(){
        this.getTasks();
    }
}
</script>

<style lang="scss">
.list-complete-item {
  transition: all 300ms;
  /* display: inline-block; */
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>