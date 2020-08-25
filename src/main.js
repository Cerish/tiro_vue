import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store'
import ElementUI from 'element-ui';

import globalFun from '@/utils/globalFun.js'
Vue.use(globalFun);

import {postRequest} from "./utils/api";
import {postKeyValueRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import {getRequest} from "./utils/api";

Vue.prototype.postRequest = postRequest;
Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.getRequest = getRequest;

import storage from "./utils/storage.js";
Vue.prototype.storage = storage;

Vue.config.productionTip = false

// 引入css
import '@/assets/css/index.scss'
import 'normalize.css/normalize.css' // reset css
import 'font-awesome/css/font-awesome.min.css'
import 'element-ui/lib/theme-chalk/index.css';

// 引入组件
import SvgIcon from '@/components/utils/Icon.vue';
Vue.component("svg-icon", SvgIcon);

// 默认先去找index.js下的文件
import i18n from './lang/index.js'

// 全局 mixins
import role from '@/mixins/role.js';
Vue.mixin(role);

Vue.use(ElementUI,{size:'small'});

const _this = new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
export default _this;
