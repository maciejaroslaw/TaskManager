<template>
    <div class="">
        <div class="card">
            <div class="card-image">
                <div class="tile is-vertical notification" 
                :class="taskColor">
                    <p class="title is-4">{{task.title}}</p>
                    <p class="subtitle is-6">{{task.completed ? 'Completed' : 'In-progress'}}</p>
                    <a @click.prevent="handleEditTask(task)" :style="[isAdmin ? {'right': 'calc(1rem + 40px)'} : {'right': '1rem'}]" href="" class="editTask">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="#ffffff" d="M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z"/></svg>
                    </a>
                    <a @click.prevent="modalDelTask = !modalDelTask" v-if="isAdmin" href="" class="delTask">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="#ffffff" d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/></svg>
                    </a>
                </div>
            </div>
            <div class="card-content">
                <div class="media is-justify-content-space-between">
                    <div class="media-left">
                        <p class="title is-5">Task description</p>
                    </div>
                </div>
                <div class="content">
                    {{task.description}}
                </div>
                <div class="is-flex is-justify-content-end">
                    <span v-if="task.priority === 'Standard'" class="tag is-info">Standard</span>
                    <span v-if="task.priority === 'Important'" class="tag is-warning">Important</span>
                    <span v-if="task.priority === 'Very important'" class="tag is-danger">Very important</span>
                </div>
            </div>
        </div>
    </div>
    <div class="modal edit-task-modal" :class="[modalEditTask ? 'is-active': '']">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <div class="block content">
                    <h1>Edit task</h1>
                    <input v-model="taskToEdit.title" class="input is-medium" type="text" placeholder="Task title">
                    <textarea v-model="taskToEdit.description" class="textarea mt-4" placeholder="Task description"></textarea>
                    <div class="is-flex is-justify-content-space-between">
                        <div class="select mt-4">
                            <select v-model="taskToEdit.priority">
                                <option value="" selected disabled>Priority</option>
                                <option value="Standard">Standard</option>
                                <option value="Important">Important</option>
                                <option value="Very important">Very important</option>
                            </select>
                        </div>
                        <div class="block mt-4">
                            <label class="checkbox">
                                <input v-model="taskToEdit.completed" type="checkbox">
                                Mark as completed
                            </label>
                        </div>
                    </div>
                    <div class="is-flex is-justify-content-space-between mt-4">
                        <button @click.prevent="modalEditTask = !modalEditTask" class="button is-danger">Discard Changes</button>
                        <button @click.prevent="editTask" class="button is-success">Edit Task</button>
                    </div>
                </div>
            </div>
        </div>
        <button @click="modalEditTask = !modalEditTask" class="modal-close is-large" aria-label="close"></button>
    </div>
    <div class="modal edit-task-modal" :class="[modalDelTask ? 'is-active': '']">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <div class="block content">
                    <h1>Delete this task?</h1>
                    <div class="is-flex is-justify-content-space-between mt-4">
                        <button @click.prevent="modalDelTask = !modalEDelask" class="button is-danger">No</button>
                        <button @click.prevent="deleteTask" class="button is-success">Yes</button>
                    </div>
                </div>
            </div>
        </div>
        <button @click="modalEditTask = !modalEditTask" class="modal-close is-large" aria-label="close"></button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                taskToEdit: {},
                modalEditTask: false,
                modalDelTask: false,
            }
        },
        computed: {
            taskColor(){
                if(this.$props.task.completed){
                    return 'is-success'
                }else{
                    if(this.$props.task.priority === 'Standard'){
                        return 'is-info';
                    }else if(this.$props.task.priority === 'Important'){
                        return 'is-warning'
                    }else if(this.$props.task.priority === 'Very important'){
                        return 'is-danger'
                    }else{
                        return ''
                    }
                }
            }
        },
        props: ['task', 'isAdmin'],
        methods: {
            handleEditTask(task){
                this.taskToEdit = {...task};
                this.modalEditTask = !this.modalEditTask; 
            },
            editTask(){
                this.$axios.put(`${this.$api_url}/edit-task`, {
                    taskToEdit: this.taskToEdit,
                }, {headers: this.$token()}).then(res=>{
                    this.$emit('refresh');
                    this.modalEditTask = !this.modalEditTask;
                }).catch(err=>{
                    this.$store.dispatch("err/setError", err.response.data.message);
                });
            },
            deleteTask(){
                // console.log(this.$props.task);
                this.$axios.delete(`${this.$api_url}/admin/delete-task/${this.$props.task.id}`,  {headers: this.$token()}).then(res=>{
                    this.$emit('refresh');
                }).catch(err=>console.log(err));
            },
        }
    }
</script>

<style lang="scss" scoped>
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
    right: 1rem;
    top: .5rem;
    opacity: 0;
    transition: all 100ms ease-in;   
}
.card:hover .editTask, .card:hover .delTask{
    opacity: 1;
};
.addTask{
    cursor: pointer;
}
</style>