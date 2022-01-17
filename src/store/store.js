import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
export default new Vuex.Store({
    // plugins: [createPersistedState()],
    state:{
        token:'',
       emailid:'',
       cnt:0,
       cart:JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [],
    },
    getters:{
        inCart: state => state.cart
     },
    mutations:{
        tokenemail(state,payload){
            return state.token=payload.id,state.emailid=payload.uid;
        },
        change(state){
            return state.cart=JSON.parse(localStorage.getItem('cart'));
        },
        cnt(state){
            return state.cnt=state.cart.length;
        },
        LOGOUT(state){
            state.token="",
            state.emailid="",
            window.localStorage.removeItem('token'),
            window.localStorage.removeItem('uid'),
            window.localStorage.removeItem("cart"),
            window.localStorage.removeItem("total"),
            window.localStorage.removeItem("user_id")

        },
        SET_CART:(state,data)=>{
            console.log(data);
            let flag = true;
            state.cart.forEach((element,index) => {
                if(element.id == data.id)
                {
                    state.cart[index].quantity = state.cart[index].quantity+1;
                    flag=false;
                }
            });
            if(flag)
            {
                state.cart.push(data);
                state.cnt=state.cart.length;
            }
            localStorage.setItem('cart',JSON.stringify(state.cart));
        },
       
          
       
    },
    actions:{
        token(context,payload){
            context.commit('tokenemail',payload)
        },
        logout(context){
            context.commit('LOGOUT')
            this.$router.push("/login");
        },
        addTocart({commit},data){
            commit('SET_CART',data);
        },
       
    }
})


