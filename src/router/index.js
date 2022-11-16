/* eslint-disable no-undef */
// 引入 vueRouter
import {
    createRouter,
    createWebHistory
} from 'vue-router'
import home from '../views/home.vue'
import AppLayout from '../layout/AppLayout.vue'
import NotFound from '~/views/404.vue'
import {get} from "../api/index.js";

const routes = [
    {
        path: '/',
        name:"AppLayout",
        component: AppLayout,
        redirect: '/home',
        children:[
            {
                path: 'home',
                name: 'home',
                component: home,
            },
            {
                path: '/main',
                name: 'main',
                component: () => import('~/views/main/index.vue'),
            },
            {
                path: '/minecraft',
                name: 'mc',
                component: () => import('~/views/minecraft/index.vue'),
            },
            {
                path: '/doc',
                name: 'doc',
                component: () => import('~/views/document/index.vue'),
            },
            {
                path: '/setting',
                name: 'setting',
                component: () => import('~/views/setting/index.vue'),
            },
            {
                path: '/:pathMatch(.*)*',    // 捕获所有路由或 404 Not found 路由
                component: home
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login') next();
    if (window.sessionStorage.getItem("tokenStr")) {
        // initMenu(router, store);
        if (!window.sessionStorage.getItem("user")) {
            return get('/user/info').then(resp => {
                if (resp) {
                    //存入用户信息
                    window.sessionStorage.setItem("user", JSON.stringify(resp));
                    next();
                }
            });
        }
        next();
    } else {
        if (to.path === '/') {
            next('/login');
        }
        else {
            next('/login');
        }
    }
})


export default router
