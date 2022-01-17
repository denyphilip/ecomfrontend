<template>
  <div class="col-sm-3 container">
    <div class="left-sidebar">
      <h2>Category</h2>
      <div class="panel-group category-products" id="accordian">
        <!--category-productsr-->
        <div class="panel panel-default" v-for="(i, index) in arr" :key="index">
          <div class="panel-heading">
            <h4 class="panel-title">
              <router-link :to="`/categorybyid/${i.id}`">{{i.name}}</router-link>
            </h4>
          </div>
        </div>
      </div>
      <!--/category-products-->
    </div>
  </div>
</template>

<script>
import { category } from "@/common/Service";
export default {
  name: "Sidebar",
   data() {
    return {
      arr: [],
      
    };
  },
  created() {
    this.categories();
  },
  methods: {
    categories() {
      category()
        .then((res) => {
          this.arr = res.data.category;
          // console.log(this.arr);
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