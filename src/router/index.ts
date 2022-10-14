import {createRouter,createWebHashHistory } from 'vue-router'

export default createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:'/',
            meta:{title:'demo'},
            component: () => import('../views/demo/index.vue'),
        },

    ]
})