import './css/main.css'
import './scss/main.scss'

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import Trafficlight from './components/Trafficlight.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/red', name: 'red', component: Trafficlight, props: { current: 'red', dur: 10} },
        { path: '/yellow', name: 'yellow', component: Trafficlight, props: { current: 'yellow', dur: 3} },
        { path: '/green', name: 'green', component: Trafficlight, props: { current: 'green', dur: 15} },
        { path: '*',  redirect: '/red' }
    ]
});

new Vue({
    el: '#app',
    router,
    render: h => h(App),
});

