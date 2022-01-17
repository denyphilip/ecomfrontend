<template>
  <div>
    <section id="cart_items">
      <div class="container">
        <div class="breadcrumbs">
          <ol class="breadcrumb">
            <li><a href="#">Home</a></li>
            <li class="active">Shopping Cart</li>
          </ol>
        </div>
        <div class="table-responsive cart_info">
          <table class="table table-condensed">
            <thead>
              <tr class="cart_menu">
                <td class="image">Item</td>
                <td class="description"></td>
                <td class="price">Price</td>
                <td class="quantity">Add to cart</td>
                <td class="total">Remove</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr class="cart-menu" v-for="cart in details" :key="cart.id">
                <td class="cart_product">
                  <img
                    :src="cart.image"
                    alt=""
                    width="100px"
                    height="100px"
                  />
                </td>
                <td class="cart_description">
                  <h4>
                    <a href="">{{ cart.pname }}</a>
                  </h4>
                  
                </td>
                <td class="cart_price">
                  <p>{{ cart.price }}</p>
                </td>
                <td>
                  <button
                    class="cart_quantity_delete btn btn-warning"
                    @click="addItem(cart.product_id)"
                  >
                    Add to cart
                  </button>
                </td>
                <td class="cart_delete">
                  <button
                    class="cart_quantity_delete btn btn-danger"
                    @click="delItem(cart.id)"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <!--/#cart_items-->
  </div>
  <!--/#do_action-->
</template>

<script>
import { getWishlist } from "@/common/Service.js";
import { deletewishlist } from "@/common/Service.js";
export default {
  name: "Wishlist",
  data() {
    return {
      details: "",
      num: 0,
      uid: localStorage.getItem("user_id"),
      // server: "http://127.0.0.1:8000/uploads/",
    };
  },
  methods: {
    addItem(id) {
      this.$router.push(`/productdetails/${id}`);
    },
    delItem(id) {
      deletewishlist(id).then((res) => {
        console.log(res.data);
        this.getData();
      });
    },
    getData() {
      getWishlist(this.uid).then((res) => {
        this.details = res.data.items;
        console.log(res.data);
      });
    },
  },
  mounted: function mounted() {
    this.getData();
  },
};
</script>
<style>
</style>