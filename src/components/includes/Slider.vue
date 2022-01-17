<template>
  <section id="slider">
    <!--slider-->
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div id="slider-carousel" class="carousel slide" data-ride="carousel">
              <ol class="carousel-indicators">
              <li
                v-for="(i, index) in arr"
                v-bind:key="index"
                data-target="#slider-carousel"
                :data-slide-to="index"
                v-bind:class="index == 0 ? 'active' : ''"
              ></li>
            </ol>
            <div class="carousel-inner">
              <div class="item active">
                <div class="col-sm-6">
                  <h1><span>E</span>-SHOPPER</h1>
                  <h2>{{ arr[0].caption }}</h2>
                </div>
                <div class="col-sm-6">
                  <img
                    :src="arr[0].image"
                    class="girl img-responsive"
                    alt=""
                    width="400"
                    height="300"
                  />
                </div>
              </div>

              <div class="item" v-for="(i, index) in arr.slice(1)" :key="index">
                <div class="col-sm-6">
                  <h1><span>E</span>-SHOPPER</h1>
                  <h2>{{ i.caption }}</h2>
                  <button type="button" class="btn btn-default get">
                    Get it now
                  </button>
                </div>
                <div class="col-sm-6">
                  <img
                    :src="i.image"
                    class="girl img-responsive"
                    alt=""
                    width="400"
                    height="300"
                  />
                </div>
              </div>
            </div>
            <a
              href="#slider-carousel"
              class="left control-carousel hidden-xs"
              data-slide="prev"
            >
              <i class="fa fa-angle-left"></i>
            </a>
            <a
              href="#slider-carousel"
              class="right control-carousel hidden-xs"
              data-slide="next"
            >
              <i class="fa fa-angle-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { banner } from "@/common/Service";
export default {
  name: "Slider",
  data() {
    return {
      arr: [],
    };
  },
  created() {
    this.banners();
  },
  methods: {
    banners() {
      banner()
        .then((res) => {
          this.arr = res.data.banner;
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


