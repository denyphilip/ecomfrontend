<template>
  <div class="container">
      <h1>View/Track order </h1>
      <table class="table table-striped">
  <thead>
      <tr><h3>Welcome {{this.firstName}} {{this.lastName}}</h3></tr>
    <tr>
      <th scope="col">Order id</th>
      <th scope="col">products</th>
      <th scope="col">total</th>
     
      <th>order status</th>
    </tr>
  </thead>
  <tbody v-for="(order,index) in details" :key="index">
    <tr  >
      <td>{{order.oid}}</td>
      <td>product name: {{order.pname}}</td>
      <td>&#8377; {{order.amount}}</td>
      <td>{{order.status==0?'Processsing':'Delivered'}}</td>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script>

import { orderDetails } from "@/common/Service";
export default {
  name:"Trackorder",
  data() {
    return {
      uid: localStorage.getItem("user_id"),
      firstName:'',
      lastName:'',
      email:'',
    details:[]
    };
  },
  mounted() {
    orderDetails(this.uid)
      .then((res) => {
        this.details = res.data.orders;
        this.firstName=res.data.firstname;
        this.lastName=res.data.lastname;
        this.email=res.data.email;
      console.log(this.details,this.firstname,this.lastname,this.email);
       
      })
      .catch((error) => {
        console.log("Something Wrong " + error);
      });
  },
};
</script>

<style>

</style>