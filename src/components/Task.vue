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
                <div style="height: 50px" class="content line-clamp">
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
</template>

<script>
    export default {
        data() {
            return {
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
.line-clamp{
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    overflow: hidden;
}
</style>