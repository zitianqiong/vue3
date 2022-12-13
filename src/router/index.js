/* eslint-disable no-undef */
// 引入 vueRouter
import {
    createRouter,
    createWebHistory
} from 'vue-router'
import home from '../views/home.vue'
import AppLayout from '../layout/AppLayout.vue'
import NotFound from '../views/404.vue'
import {get} from "../api/index.js";
import store from "../store/index.js";

const routes = [
    {
        path: '/',
        name: "主页",
        component: AppLayout,
        redirect: '/home',
        children:[
            {
                path: 'home',
                name: 'home',
                component: home,
                meta: {
                    breadNumber: 2
                }
            },
            {
                path: '/main',
                name: '主页',
                component: () => import('../views/main/index.vue'),
                meta: {
                    breadNumber: 2
                }
            },
            {
                path: '/minecraft',
                name: 'mc',
                component: () => import('../views/minecraft/index.vue'),
                meta: {
                    breadNumber: 2
                }
            },
            {
                path: '/doc',
                name: '文档',
                component: () => import('../views/document/index.vue'),
                meta: {
                    requireAuth: true,
                    breadNumber: 2
                }
            },
            {
                path: '/setting',
                name: '设置',
                component: () => import('../views/setting/index.vue'),
                meta: {
                    requireAuth: true,
                    breadNumber: 2
                }
            },
            {
                path: '/sidebar',
                name: 'sidebar',
                component: () => import('../components/sidebar.vue'),
                meta: {
                    requireAuth: true,
                    breadNumber: 2
                }
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
    if (sessionStorage.getItem("tokenStr") || localStorage.getItem("tokenStr") || store.state.tokenStr) {
        // initMenu(router, store);
        if (!sessionStorage.getItem("user")) {
            return get('/user/info').then(resp => {
                if (resp) {
                    //存入用户信息
                    sessionStorage.setItem("user", JSON.stringify(resp));
                    store.commit("setUserInfo", resp.data)
                    next();
                }
            });
        }
        next();
    } else {
        if (!to.meta.requireAuth) {
            next();
        } else {
            next('/login');
        }
    }
})

export default router
