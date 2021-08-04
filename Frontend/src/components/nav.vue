<template>
    <nav class="home_nav">
        <div class="nav_btn font" @click="users()">Les utilisateurs</div>
        <div @click="user()" class="nav_btn font">Mon compte</div>
        <div @click="logout()" class="nav_btn font">Déconnexion</div>
    </nav>
</template>

<script>
export default {
name: 'Nav',
data : function ()  {
    return { 
    signed: true
    }
}, 
computed : {    
}, 
methods: {
    user: function () {
        this.$router.push('/profile');
    }, 
    logout: function () {
        this.$store.commit('logout');
        this.$router.push('/');
    },
    users: function(){
        this.$router.push('/users');
    }
}
}
</script>

<style>

</style>