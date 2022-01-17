<template>
  <section id="cart_items">
    <div class="container">
      <div class="shopper-informations">
        <div class="row">
          <div class="col-sm-10 clearfix">
            <div class="bill-to">
              <p>Bill To</p>
              <div class="form-one">
                <form>
                  <input
                    type="text"
                    placeholder="Email*"
                    name="email"
                    v-model="user.email"
                  />
                  <input
                    type="text"
                    placeholder="Full Name *"
                    name="name"
                    v-model="user.name"
                  />
                  <input
                    type="text"
                    placeholder="Address "
                    name="address"
                    v-model="user.address"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="review-payment">
        <h2>Review & Payment</h2>
      </div>

      <div class="table-responsive cart_info">
        <table class="table table-condensed">
          <thead>
            <tr class="cart_menu">
              <td class="image">Item</td>
              <td class="price">Price</td>
              <td class="quantity">Quantity</td>
              <td class="total">Total</td>
              <td></td>
            </tr>
          </thead>
          <tbody v-for="(item, i) in carts" :key="i">
            <tr>
              <td class="cart_product">
                <a href="">
                  <img
                    :src="item.image"
                    width="200"
                    height="150"
                    alt="Card image cap"
                /></a>
              </td>
              <td class="cart_price">
                <p>{{ item.price }}</p>
              </td>
              <td class="cart_quantity">
                <div class="cart_quantity_button">
                  <input
                    class="cart_quantity_input"
                    type="text"
                    name="quantity"
                    v-model="item.quantity"
                    autocomplete="off"
                    size="2"
                    readonly
                  />
                </div>
              </td>
              <td class="cart_total">
                <p class="cart_total_price">
                  {{ item.price * item.quantity }}
                </p>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4">&nbsp;</td>
              <td colspan="2">
                <table class="table table-condensed total-result">
                  <tr>
                    <td>Total</td>
                    <td>
                      <!-- <span>{{ check() }}</span> -->
                      <span>{{ carttotal }}</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="row col-sm-3">
         <div class="payment-options">
            <h2>Payment Methods:</h2>
            <span>
                <label><input type="radio" value="cod" checked/> Cash On Delivery</label>
            </span>
        </div>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="form-group col-sm-3">
          <input
            type="text"
            name="code"
            v-model="code"
            id="code"
            class="form-control"
            :class="{ 'is-invalid': submitted && $v.code.$error }"
          />
          <div v-if="submitted && $v.code.$error" class="invalid-feedback">
            <span v-if="!$v.code.required">*code is required</span>
          </div>
          <div class="form-group">
            <button class="btn btn-primary">Apply Coupon</button>
          </div>
        </div>
      </form>
      <div class="text-right">
        <a
          href="javascript:void(0)"
          class="btn btn-primary"
          @click="placeOrder()"
        >
          Place Order</a
        >
      </div>
    </div>
  </section>
  <!--/#cart_items-->
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { coupon } from "@/common/Service.js";
import { userAddress } from "@/common/Service.js";
import { order } from "@/common/Service.js";
import { orderProduct } from "@/common/Service.js";
import { usedCoupon } from "@/common/Service.js";
export default {
  name: "Checkout",
  data() {
    return {
      user_id: localStorage.getItem("user_id"),
      products: JSON.parse(localStorage.getItem("cart")),
      product_id: 0,
      address_id: 0,
      coupon_id:0,
      quantity: 0,
      order_id: 0,
      coupon_used: 0,
      user: {
        email: "",
        name: "",
        address: "",
      },

      cod: 0,
      online: 1,
      carts: [],
      discount: 0,
      total: 0,
      details: null,
      submitted: false,
      code: "",
      carttotal: localStorage.getItem("total"),
    };
  },
  validations: {
    code: { required },
  },
  created() {
    this.viewCart();
    // console.log(this.products);
  },
  methods: {
    placeOrder() {
      let data = { user_id: this.user_id, address: this.user.address };

      //  console.log(data);
      userAddress(data)
        .then((res) => {
          if (res.data.error == 0) {
            this.address_id = res.data.address_id;
            let orderdata = {
              user_id: this.user_id,
              address_id: this.address_id,
              amount: this.carttotal,
              coupon_used: this.coupon_used,
            };
            // console.log(orderdata);
            if (this.address_id != undefined) {
              order(orderdata).then((res) => {
                this.order_id = res.data.order_id;
                if (this.order_id) {
                  for (var a in this.products) {
                    console.log(a, " = ", this.products[a].id);
                    let orderproduct = {
                      order_id: this.order_id,
                      product_id: this.products[a].id,
                      quantity: this.products[a].quantity,
                      total_price: this.carttotal,
                    };
                    orderProduct(orderproduct).then((res) => {
                      console.log(res.data.id);
                    });
                  }
                    let coupondata={coupon_id:this.details.id, user_id: this.user_id,order_id: this.order_id,discounted_price:this.discount};
                        usedCoupon(coupondata).then((res) => {
                      console.log(res.data.coupondata);
                     
                    });
                }
              });
            }
            localStorage.removeItem('cart');
             localStorage.removeItem('total');
            this.$swal({
              title: "order placed successfully",
              text: "Redirecting...",
              icon: "success",
              timer: 2000,
              buttons: false,
            }).then(() => {
              this.$router.push("/");
            });
          } else {
            this.$swal("  something went wrong ", "", "error");
          }
        })
        .catch((error) => {
          console.log("Something Wrong " + error);
        });
    },

    viewCart() {
      if (localStorage.getItem("cart")) {
        this.carts = JSON.parse(localStorage.getItem("cart"));
      }
    },

    handleSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      if (this.coupon_used == 0) {
        coupon(this.code)
          .then((res) => {
            if (res.data.error == 0) {
              this.details = res.data.coupon;
              if (this.details.cart_value <= this.carttotal) {
                if (this.details.type == "fixed") {
                  this.carttotal = this.carttotal - this.details.value;
                  this.discount = this.details.value;
                } else {
                  this.carttotal = (this.details.value / 100) * this.carttotal;
                  this.discount = this.details.value;
                }
                this.coupon_used = 1;
                this.$swal("Coupon applied successfully", "", "success");
              } else {
                this.$swal("Please enter valid coupon", "", "error");
              }
            } else {
              this.$swal("Please enter valid coupon", "", "error");
            }
          })
          .catch((error) => {
            console.log("Something Wrong " + error);
          });
      } else {
        this.$swal("Copoun already appllied", "", "error");
      }
    },
  },
};
</script>

<style>
</style>