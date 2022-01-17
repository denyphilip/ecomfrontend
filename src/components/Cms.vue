<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-sm-9 padding-right">
              <div class="product-information" v-for="(cms, index) in details"
                      v-bind:key="index">
           
                <h1>{{ cms.title }}</h1>
                <h4>{{cms.body}}</h4>
               <img
                    :src="cms.image"
                    class="share img-responsive"
                    alt=""
                />
          </div>
            </div>
     
        </div>
      </div>
  </section>
</template>

<script>
import { cmsById } from "@/common/Service.js";
export default {
  name: "Cms",
  data() {
    return {
      paramm: undefined,
      details: null,
    };
  },
   watch: {
    $route(to) {
      this.paramm = to.params.id;
      cmsById(this.paramm).then((res) => {
        this.details = res.data.cmsbyid;
        console.log(res.data);
      });
    },
  },
  created() {
    this.paramm = this.$route.params.id;
  },
  mounted() {
    cmsById(this.paramm)
      .then((res) => {
        this.details = res.data.cmsbyid;
        console.log(this.details);
      })
      .catch((error) => {
        console.log("Something Wrong " + error);
      });
  },

};
</script>

<style>
</style>