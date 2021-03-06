<template>
    <div style="position: absolute; min-width: 100%">
        <div v-if="!isLoading" class="columns is-flex-wrap-wrap mt-4 mx-0">
            <transition-group name="list-complete">
                <div v-for="task in tasks" :key="task.id" class="list-complete-item column is-one-quarter">
                    <Task @openEdit="handleEditTask(task)" @refresh="getTasks()" :task="task" :isAdmin="isAdmin" />
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
        <div v-else class="is-flex is-justify-content-center">
            <button class="button is-light is-loading is-large">White</button>
        </div>
        <div class="modal edit-task-modal is-clipped" :class="[modalEditTask ? 'is-active': '']">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div style="margin-bottom: -10px;" class="tile is-vertical notification" 
                :class="taskToEditColor">
                    <p  v-show="toEdit != true" class="title is-2 no-margin">{{taskToEdit.title}}</p>
                    <input v-show="toEdit == true" v-model="taskToEdit.title" class="input is-large" type="text" placeholder="Task title">
                    <p class="subtitle is-size-6">{{taskToEdit.completed ? 'Completed' : 'In-progress'}}</p>
                </div>
                <div class="box">
                    <div class="block content">
                        <div v-show="!toEdit" style="min-height: 8rem; padding: calc(0.75em - 1px)">
                            {{taskToEdit.description}}
                        </div>
                        <textarea v-show="toEdit" v-model="taskToEdit.description" class="textarea mt-4" placeholder="Task description"></textarea>
                        <div :class="[toEdit ? 'is-justify-content-space-between' : 'is-justify-content-end']" class="is-flex">
                            <div v-show="toEdit" class="block mt-4">
                                <label class="checkbox">
                                    Mark as completed
                                    <input v-model="taskToEdit.completed" type="checkbox">
                                </label>
                            </div>
                            <div v-show="toEdit" class="select mt-4">
                                <select  v-model="taskToEdit.priority">
                                    <option value="" selected disabled>Priority</option>
                                    <option value="Standard">Standard</option>
                                    <option value="Important">Important</option>
                                    <option value="Very important">Very important</option>
                                </select>
                            </div>
                            <div  v-show="!toEdit" class="mt-4">
                                <span v-show="taskToEdit.priority === 'Standard'" class="tag is-info is-medium">Standard</span>
                                <span v-show="taskToEdit.priority === 'Important'" class="tag is-warning is-medium">Important</span>
                                <span v-show="taskToEdit.priority === 'Very important'" class="tag is-danger is-medium">Very important</span>
                            </div>
                        </div>
                        <div v-show="!toEdit">
                            <div :class="[isAdmin ? 'is-justify-content-space-between' : 'is-justify-content-center']" class="is-flex mt-4">
                                <button @click="modalDelTask = !modalDelTask" v-if="isAdmin" class="button is-danger is-outlined">Delete task</button>
                                <button @click.prevent="switchEdit(true)" class="button is-info is-outlined">Edit Task</button>
                            </div>
                        </div>
                        <div v-show="toEdit">
                            <div class="is-flex is-justify-content-space-between mt-4">
                                <button @click.prevent="switchEdit(false)" class="button is-danger">Discard changes</button>
                                <button @click.prevent="editTask" class="button is-success">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button @click="switchEdit(false)" class="modal-close is-large" aria-label="close"></button>
        </div>
        <div class="modal create-task-modal is-clipped" :class="[modalCreateTask ? 'is-active': '']">
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
        <div class="modal delete-task-modal is-clipped" :class="[modalDelTask ? 'is-active': '']">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="box">
                    <div class="block content">
                        <h1>Delete this task?</h1>
                        <div class="is-flex is-justify-content-space-between mt-4">
                            <button @click.prevent="modalDelTask = !modalDelTask" class="button is-danger">No</button>
                            <button @click.prevent="deleteTask" class="button is-success">Yes</button>
                        </div>
                    </div>
                </div>
            </div>
            <button @click="modaDeleteTask = !modaDeleteTask" class="modal-close is-large" aria-label="close"></button>
        </div>
    </div>
</template>

<script>
import Task from '../components/Task.vue';
export default {
    data() {
        return {
            isLoading: true,
            tasks: null,
            newTask: {
                title: '',
                description: '',
                priority: '', 
            },
            taskToEdit: {
                title: '',
                description: '',
                priority: '',
            },
            toEdit: false,
            modalCreateTask: false,
            modalEditTask: false,
            modalDelTask: false,
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
        },
        taskToEditColor(){
            if(this.taskToEdit.completed){
                return 'is-success'
            }else{
                if(this.taskToEdit.priority === 'Standard'){
                    return 'is-info';
                }else if(this.taskToEdit.priority === 'Important'){
                    return 'is-warning'
                }else if(this.taskToEdit.priority === 'Very important'){
                    return 'is-danger'
                }else{
                    return ''
                }
            }
        }
    },
    methods: {
        switchEdit(toEdit){
            if(toEdit == false){
                this.taskToEdit = {}
                this.modalEditTask = false
            }
            this.toEdit = toEdit;
        },
        getTasks(){
            this.$axios.get(`${this.$api_url}/tasks`, {headers: this.$token()}).then(res=>{
                this.tasks = res.data.tasks;
                this.isLoading = false;
            }).catch(err=>{
                this.$store.dispatch("err/setError", err.response.data.message);
            })
        },
        createTask(){
            for(const [key, val] of Object.entries(this.newTask)){
                if(val === "" || val === null){
                    this.$store.dispatch("err/setError", `${key} cannot be empty!`)
                    return;
                }
            }
            this.$axios.post(`${this.$api_url}/admin/tasks`, {
                title: this.newTask.title,
                description: this.newTask.description,
                priority: this.newTask.priority,
            }, {headers: this.$token()}).then(res=>{
                this.getTasks();
                this.modalCreateTask = false;
            }).catch(err=>{
                this.$store.dispatch("err/setError", err.response.data.message);
            });
        },
        handleEditTask(task){
            this.taskToEdit = {...task};
            this.modalEditTask = !this.modalEditTask; 
        },
        editTask(){
            this.$axios.put(`${this.$api_url}/tasks/${this.taskToEdit.id}`, {
                taskToEdit: this.taskToEdit,
            }, {headers: this.$token()}).then(res=>{
                this.getTasks();
                this.modalEditTask = !this.modalEditTask;
                this.taskToEdit = {};
                this.toEdit = false;
            }).catch(err=>{
                this.$store.dispatch("err/setError", err.response.data.message);
            });
        },
        deleteTask(){
            this.$axios.delete(`${this.$api_url}/admin/tasks/${this.taskToEdit.id}`,  {headers: this.$token()}).then(res=>{
                this.getTasks();
                this.modalDelTask = false;
                this.modalEditTask = false;
                this.toEdit = false;
                this.taskToEdit = {};
            }).catch(err=>console.log(err));
        },
    },
    mounted(){
        this.getTasks();
    }
}
</script>

<style lang="scss">
.editTask{
    width: 25px;
    position: absolute;
    // right: calc(1rem + 40px);
    top: .6rem;
    opacity: 0;
    transition: all 100ms ease-in;
};
.delTask{
    width: 30px;
    position: absolute;
    right: .5rem;
    top: .5rem;
    opacity: 0;
    transition: all 100ms ease-in;   
}
.modal-content:hover .delTask, .modal-content:hover .editTask{
    opacity: 1;
};
.addTask{
    cursor: pointer;
}++
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