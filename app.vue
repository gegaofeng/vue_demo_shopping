<template>
    <div>
        <div class="header">
            <router-link to="/list" class="header-title">电商网站示例</router-link>
            <div class="header-menu">
                <router-link to="/cart" class="header-menu-cart">
                    购物车
                    <span v-if="cartList.length">{{ cartList.length }}</span>
                </router-link>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        computed: {
            cartList () {
                return this.$store.state.cartList;
            }
        },
        created(){
            //从本地获取购物车数据
            // console.log(JSON.parse(localStorage.getItem('cartList')));
            if(JSON.parse(localStorage.getItem('cartList'))!=null){
				this.$store.commit('setCartList',JSON.parse(localStorage.getItem('cartList')));
			}			
        }
    }
</script>