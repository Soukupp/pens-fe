import { createRouter, RouteRecordRaw,createWebHistory } from 'vue-router';
import Home from '../views/home.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/data-view',
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/data-view',
                name: 'data-page',
                meta: {
                    title: '数据分析',
                },
                component: () => import('../views/DataPage.vue'),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;
