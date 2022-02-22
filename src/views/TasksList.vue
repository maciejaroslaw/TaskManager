<template>
    <div>
        <div class="columns is-flex-wrap-wrap mt-4">
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
        <div class="modal edit-task-modal" :class="[modalEditTask ? 'is-active': '']">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div style="margin-bottom: -10px;" class="tile is-vertical notification" 
                :class="taskToEditColor">
                    <p  v-show="toEdit != true" class="title is-2 no-margin">{{taskToEdit.title}}</p>
                    <input v-show="toEdit == true" v-model="taskToEdit.title" class="input is-large" type="text" placeholder="Task title">
                    <p class="subtitle is-size-6">{{taskToEdit.completed ? 'Completed' : 'In-progress'}}</p>
                    <a @click.prevent="switchEdit(true)"  :style="[isAdmin ? {'right': 'calc(1rem + 40px)'} : {'right': '1rem'}]" href="" class="editTask">
                    <!--     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.<path fill="#ffffff" d="M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z"/></svg>
                    </a>
                    <a @click.prevent="modalDelTask = !modalDelTask" v-if="isAdmin" href="" class="delTask">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. <path fill="#ffffff" d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/></svg>
                    </a>
                    -->
                </div>
                <div class="box">
                    <div class="block content">
                        <div v-show="!toEdit" style="min-height: 8rem; padding: calc(0.75em - 1px)">
                            {{taskToEdit.description}}
                        </div>
                        <textarea v-show="toEdit" v-model="taskToEdit.description" class="textarea mt-4" placeholder="Task description"></textarea>
                        <div class="is-flex is-justify-content-space-between">
                            <div class="block mt-4">
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
                        <div v-show="!toEdit" class="is-flex is-justify-content-space-between mt-4">
                            <button v-if="isAdmin" class="button is-danger">Delete task</button>
                            <button @click.prevent="switchEdit(true)" class="button is-success">Edit Task</button>
                        </div>
                        <div v-show="toEdit" class="is-flex is-justify-content-space-between mt-4">
                            <button @click.prevent="modalEditTask = !modalEditTask" class="button is-danger">Discard changes</button>
                            <button @click.prevent="editTask" class="button is-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <button @click="modalEditTask = !modalEditTask" class="modal-close is-large" aria-label="close"></button>
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
            taskToEdit: {
                title: '',
                description: '',
                priority: '',
            },
            toEdit: false,
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
        handleEditTask(task){
            this.taskToEdit = {...task};
            this.modalEditTask = !this.modalEditTask; 
        },
        switchEdit(toEdit){
            console.log(toEdit);
            this.toEdit = toEdit;
        },
        getTasks(){
            this.$axios.get(`${this.$api_url}/tasks`, {headers: this.$token()}).then(res=>{
                this.tasks = res.data.tasks
            }).catch(err=>{
                this.$store.dispatch("err/setError", err.response.data.message);
            })
        },
        createTask(){
            this.$axios.post(`${this.$api_url}/admin/create-task`, {
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