<template>
    <div v-if="!loading">
        <div class="columns is-justify-content-center mt-4">
            <div v-for="user in users" :key="user.id" class="column is-one-quarter">
                <div class="card">
                    <div class="card-image">
                        <figure class="image is-4by3 notification" :class="[user.role === 'admin' ? 'is-warning' : 'is-success']">

                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="media is-justify-content-space-between">
                            <div class="media-left">
                                <p class="title is-4">{{user.username}}</p>
                                <p class="subtitle is-6">{{user.role}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // setup () {
        
    //     onMounted(()=> {
    //         console.log(this.$token);
    //     })

    //     return {}
    // }
    data(){
        return {
            users: null,
            loading: true,
            modal: false,
            userToEdit: {
                username: '',
                role: '',
            },
        };
    },
    computed:{
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
        editUserType(user){
            this.modal = true;
            this.userToEdit = user
        }
    },
    mounted(){
        this.$axios.get(`${this.$api_url}/admin/users`, {headers: this.$token()}).then(res=>{
            this.users = res.data.users;
            this.loading = false
        }).catch(err=>console.log(err));
    }
}
</script>

<style lang="scss" scoped>

</style>