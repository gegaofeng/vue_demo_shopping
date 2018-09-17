import Vue from 'vue';
import VueRouter from 'vue-router';
import Routers from './router';
import Vuex from 'vuex';
import App from './app.vue';
import './style.css';
import product_data from './product';

Vue.use(VueRouter);
Vue.use(Vuex);
//路由配置
const RouterConfig={
    mode:'history',
    routes:Routers
};
const router=new VueRouter(RouterConfig);
router.beforeEach((to,from,next)=>{
    window.document.title=to.meta.title;
    next();
});
router.afterEach((to,from,next)=>{
    window.scrollTo(0,0);
});
const store=new Vuex.Store({
    state:{
        //商品列表数据
        productList:[],
        //购物车数据
        cartList:[]
    },
    getters:{
        brands:state=>{
            const brands=state.productList.map(item=>item.brand);
            return getFilterArray(brands);
        },
        colors:state=>{
            const colors=state.productList.map(item=>item.color);
            return getFilterArray(colors);
        }
    },
    mutations:{
        //获取本地购物车数据
        setCartList(state,localCartList){
            console.log('进入setCartList');
            state.cartList=localCartList;
            console.log(state.cartList);
        },
        //添加商品列表
        setProductList(state,data){
            state.productList=data;
        },
        addCart(state,id){
            //判断购物车中是否存在
            const isAdded=state.cartList.find(item=>item.id===id);
            if (isAdded){
                isAdded.count ++;
            } else {
                state.cartList.push({
                    id:id,
                    count:1
                })
            };
            // console.log(JSON.stringify(state.cartList));
            //将购物车信息存储至本地
            localStorage.setItem("cartList",JSON.stringify(state.cartList));
        },
        //修改商品数量
        editCartCount(state,payload){
            const product=state.cartList.find(item=>item.id===payload.id);
            product.count+=payload.count;
            //将购物车信息存储至本地
            localStorage.setItem("cartList",JSON.stringify(state.cartList));
        },
        //删除商品
        deleteCart(state,id){
            const index=state.cartList.findIndex(item=>item.id===id);
            state.cartList.splice(index,1);
            //将购物车信息存储至本地
            localStorage.setItem("cartList",JSON.stringify(state.cartList));
        },
        //清空购物车
        emptyCart(state){
            state.cartList=[];
            //将购物车信息存储至本地
            localStorage.setItem("cartList",JSON.stringify(state.cartList));
        }
    },
    actions:{
        //获取商品数据
        getProductList(context){
            //异步模拟
            setTimeout(()=>{
                context.commit('setProductList',product_data);
            },500);
        },
        //提交订单
        buy(context){
            return new Promise(resolve => {
                setTimeout(()=>{
                    context.commit('emptyCart');
                    resolve();
                },2000)
            });
        }
    }
});
new Vue({
    el:'#app',
    router:router,
    store:store,
    render:h=>{
        return h(App);
    }
});
//数组去重
function getFilterArray(array) {
    const res=[];
    const json=[];
    for (let i = 0; i < array.length; i++) {
        const _self=array[i];
        if (!json[_self]) {
            res.push(_self);
            json[_self]=1;
        }
    }
    return res;
}