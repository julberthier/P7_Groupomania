import { createWebHistory, createRouter } from "vue-router";
import login from '@/components/login.vue';
import profile from '@/components/profile.vue';
import home from '@/components/home.vue';

const routes = [
    {
        name: 'login', 
        path: '/',
        component: login,
    }, 
    {
        name: 'profile',
        path: '/profile',
        component: profile,
        props: true,
    }, 
    {
        name: 'home',
        path: '/home',
        component: home,
        props: true,
    }   
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;