import { createWebHistory, createRouter } from "vue-router";
import homepage from '@/components/homepage.vue';
import profile from '@/components/profile.vue';

const routes = [
    {
        name: 'homepage', 
        path: '/',
        component: homepage,
    }, 
    {
        name: 'profile',
        path: '/profile',
        component: profile,
        props: true
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;