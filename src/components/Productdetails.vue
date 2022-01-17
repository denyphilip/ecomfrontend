<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-sm-9 padding-right">
          <div class="product-details">
            <!--product-details-->
            <div class="col-sm-5">
              <div class="view-product">
                <img :src="details[0].images[0].image" alt="" />
              </div>
              <div
                id="similar-product"
                class="carousel slide"
                data-ride="carousel"
              >
                <!-- Wrapper for slides -->
                <div class="carousel-inner">
                  <div class="item active ">
                     <a href=""  v-for="(img, index) in details[0].images"
                      v-bind:key="index"> <img
                        :src="img.image"
                        alt=""
                     width="50" height="50"
                    /></a>
                     
                  </div>
                </div>

                <!-- Controls -->
                <a
                  class="left item-control"
                  href="#similar-product"
                  data-slide="prev"
                >
                  <i class="fa fa-angle-left"></i>
                </a>
                <a
                  class="right item-control"
                  href="#similar-product"
                  data-slide="next"
                >
                  <i class="fa fa-angle-right"></i>
                </a>
              </div>
            </div>
            <div class="col-sm-7"  v-for="(pro, index) in details"
                      v-bind:key="index">
              <div class="product-information">
                <!--/product-information-->
                <h1>{{ pro.name }}</h1>
                <span>
                  <span>&#8377; {{ pro.price }}</span>
                  <label>Quantity:</label>
                  <input type="text" v-model="pro.quantity" />
                  <button type="button"   @click="addCartBtn(pro.pid,pro.price,pro.images[0].image)"  class="btn btn-fefault cart">
                    <i class="fa fa-shopping-cart"></i>
                    Add to cart
                  </button>
                </span>
                <p><b>Features:</b> {{ pro.features }}</p>
                <a href=""
                  ><img
                    src="images/product-details/share.png"
                    class="share img-responsive"
                    alt=""
                /></a>
              </div>
              <!--/product-information-->
            </div>
          </div>
          <!--/product-details-->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { productDetails } from "@/common/Service.js";
export default {
  name: "Productdetails",
  data() {
    return {
      pid: this.$route.params.id,
      details: null,
    };
  },
  mounted() {
    productDetails(this.pid).then((res) => {
      console.log(res.data);
      this.details = res.data.products;
    });
  },
methods:{
  
 addCartBtn(id,price,image){
        this.$store.dispatch('addTocart',{ id:id,price:price,image:image ,quantity: 1});
    }
},
};
</script>

<style>
</style>