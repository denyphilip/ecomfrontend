<template>
  <div class="container">
    <div class="row">
      <Sidebar />
      <div class="col-sm-9 padding-right">
        <div class="features_items">
          <!--features_items-->
          <h2 class="title text-center">Features Items</h2>
          <div class="col-sm-4" v-for="(i, index) in arr" :key="index">
            <div class="product-image-wrapper">
              <div class="single-products">
                <div class="productinfo">
                  <router-link :to="`/productdetails/${i.pid}`">
                    <img
                      :src="i.images[0].image"
                      class="girl img-responsive"
                      alt=""
                  /></router-link>

                  <div class="text-center">
                    <h2>&#8377; {{ i.attributes.price }}</h2>
                    <div>{{ i.name }}</div>
                    <ul>
                      <li>
                        <a
                          href="#"
                          @click="addCartBtn(i.pid,i.attributes.price,i.images[0].image)"
                          class="btn btn-default add-to-cart"
                          ><i class="fa fa-shopping-cart"></i>Add to cart</a
                        >
                      </li>
                      <li>
                        <a @click="addToWishlist(i)" href="javascript:void(0)"  class="btn btn-default add-to-cart"
                          ><i class="fa fa-plus-square"></i>Add to wishlist</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "./includes/Sidebar.vue";
import { categorybyid } from "@/common/Service";
import { wishlist } from "@/common/Service";
export default {
  name: "Category",
  components: {
    Sidebar,
  },
  data() {
    return {
      arr: [],
      paramm: undefined,
      user_id:localStorage.getItem("user_id")
    };
  },
  watch: {
    $route(to) {
      this.paramm = to.params.id;
      categorybyid(this.paramm).then((res) => {
        this.arr = res.data.categorybyid;
        console.log(res.data);
      });
    },
  },
  created() {
    this.paramm = this.$route.params.id;
  },
  mounted() {
    categorybyid(this.paramm)
      .then((res) => {
        this.arr = res.data.categorybyid;
        console.log(this.arr);
      })
      .catch((error) => {
        console.log("Something Wrong " + error);
      });
  },
  methods: {
    addCartBtn(id,price,image) {
      this.$store.dispatch("addTocart", { id:id,price:price,image:image ,quantity: 1 });
    },
     addToWishlist(product) {
      let obj = {
        user_id: this.user_id,
        product_id: product.pid,
        pname: product.name,
        price: product.attributes.price,
        image: product.images[0].image,
      };
      wishlist(obj).then((res) => {
        if (res.data.message == "already added") {
          this.$swal("already added", "", "error");
        } else {
          this.$swal("added to wishlist", "", "success");
        }
        console.log(res.data);
      });
    },
  },
};
</script>

<style>
</style>