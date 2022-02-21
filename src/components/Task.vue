<template>
    <div style="cursor: pointer" class="">
        <div @click="$emit('openEdit')" class="card">
            <div class="card-image">
                <div class="tile is-vertical notification" 
                :class="taskColor">
                    <p class="title is-4">{{task.title}}</p>
                    <p class="subtitle is-6">{{task.completed ? 'Completed' : 'In-progress'}}</p>
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
    
    <div class="modal" :class="[modalDelTask ? 'is-active': '']">
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

.no-margin{
    margin: 0 !important;
}
.card:hover{
    transition: all ease-out 300ms;
    transform: scale(1.10);
};
.card{
    transition: all ease-out 300ms;
}
</style>