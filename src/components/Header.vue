<template>
  <header id="header">
    <!--header-->
    <div class="header_top">
      <!--header_top-->
      <div class="container">
        <div class="row">
          <div class="col-sm-6">
            <div class="contactinfo">
              <ul class="nav nav-pills">
                <li>
                  <a href="#"><i class="fa fa-phone"></i> +2 95 01 88 821</a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-envelope"></i> info@domain.com</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="social-icons pull-right">
              <ul class="nav navbar-nav">
                <li>
                  <a href="#"><i class="fa fa-facebook"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-twitter"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-linkedin"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-dribbble"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-google-plus"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--/header_top-->
    <div class="header-middle">
      <!--header-middle-->
      <div class="container">
        <div class="row">
          <div class="col-sm-4">
            <div class="logo pull-left">
              <a href="index.html"><img src="images/home/logo.png" alt="" /></a>
            </div>
            <div class="btn-group pull-right">
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-default dropdown-toggle usa"
                  data-toggle="dropdown"
                >
                  USA
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                  <li><a href="#">Canada</a></li>
                  <li><a href="#">UK</a></li>
                </ul>
              </div>

              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-default dropdown-toggle usa"
                  data-toggle="dropdown"
                >
                  DOLLAR
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                  <li><a href="#">Canadian Dollar</a></li>
                  <li><a href="#">Pound</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-sm-8">
            <div class="shop-menu pull-right">
              <ul class="nav navbar-nav">
                <li>
                  <router-link to="/wishlist"
                    ><i class="fa fa-star"></i> Wishlist</router-link
                  >
                </li>
                <li>
                  <router-link to="/cart"
                    ><i class="fa fa-shopping-cart"></i> Cart <span class="badge badge-success">{{this.$store.state.cnt}}</span></router-link
                  >
                </li>
                <li>
                  <router-link to="/register" v-if="!user"
                    ><i class="fa fa-user"></i> Register</router-link
                  >
                </li>
                <li>
                  <router-link to="/login" v-if="!user"
                    ><i class="fa fa-lock"></i>Login</router-link
                  >
                </li>
                <li>
                  <router-link to="#" v-if="user"
                    >Welcome {{ user }}</router-link
                  >
                </li>
                <li>
                  <a href="javascript:void(0)" v-if="user" @click="logout"
                    ><i class="fa fa-sign-out"></i>Log out</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--/header-middle-->

    <div class="header-bottom">
      <!--header-bottom-->
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <div class="navbar-header">
              <button
                type="button"
                class="navbar-toggle"
                data-toggle="collapse"
                data-target=".navbar-collapse"
              >
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            </div>
            <div class="mainmenu pull-left">
              <ul class="nav navbar-nav collapse navbar-collapse">
                <li><router-link to="/" class="active">Home</router-link></li>
                <li class="dropdown">
                  <a href="#">Explore<i class="fa fa-angle-down"></i></a>
                  <ul role="menu" class="sub-menu">
                    <li v-for="(c, index) in cms" :key="index">
                      <router-link :to="`/cms/${c.id}`">{{c.title}}</router-link>
                    </li>
                  </ul>
                </li>
                <li class="dropdown" >
                  <a href="#" v-if="user">My Account<i class="fa fa-angle-down"></i></a>
                  <ul role="menu" class="sub-menu" v-if="user">
                    <li><router-link to="/profile">My Profile</router-link></li>
                    <li><router-link to="/editprofile">Edit Profile</router-link></li>
                    <li><router-link to="/changepass">Change Password</router-link></li>
                      <li><router-link to="/trackorder">Track Orders</router-link></li>
                  </ul>
                </li>
                <li>
                  <router-link to="/contact">Contact Us </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { cms } from "@/common/Service";
import { mapState } from "vuex";
export default {
  name: "Header",
  data(){
    return{cms:[],user:''}
  },
  computed: mapState({
    // token: (state) => state.token,
    // emailid: (state) => state.emailid,
    inCart() { return this.$store.getters.inCart},
    numInCart() { return this.$store.commit('cnt')}
  }),
   created(){
      let token=localStorage.getItem('token');
      if(token!=null){
        this.user=  localStorage.getItem('uid') ;
       
        
      }
       this.showcms();
      
  },
  methods: {
    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('cart');
         localStorage.removeItem('total');
        localStorage.removeItem('uid'); 
        localStorage.removeItem('user_id');
        this.$swal('Logout Successfully!!');
        window.location.reload();
    },
     showcms() {
      cms()
        .then((res) => {
          this.cms = res.data.cms;
          // console.log(this.cms);
        })
        .catch((error) => {
          console.log("Something Wrong " + error);
        });
    },
  },
  

};
</script>

<style>
</style>