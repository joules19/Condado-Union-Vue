<template>
  <main>
    <div class="container">
      <input
        @change="warning()"
        v-model="value"
        type="range"
        class="mySlider"
        min="3"
        max="12"
      />
      <span :style="warning()" class="rangeValue"> {{ value }} </span>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      value: "3",
    };
  },

  methods: {
    warning: function () {
      if (this.value > 6) {
        return {
          color: "#e74c3c",
          animation: "anim .3s ease-in 1 alternate",
        };
      }
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  background-color: #2f3640;
}

.container {
  position: relative;
  height: 45px;
  width: 400px;
}

.container .mySlider {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 400px;
  height: 10px !important;
  background-color: #02253d;
  border-radius: 20px;
  outline: none;
  opacity: 0.9;
  transition: opacity 0.2s ease-in;
  -webkit-transition: opacity 0.2s ease-in;
}
/*hover on range slider*/

.container .mySlider:hover {
  opacity: 1;
}
/* chrome and safari supporter */

.container .mySlider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: #46ffb6;
  cursor: pointer;
  -webkit-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
  border: 2px solid #d3d3d3;
}
/* mozila firefox supporter */

.container .mySlider::-moz-range-thumb {
  -moz-appearance: none;
  appearance: none;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #46ffb6;
  cursor: pointer;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
  border: 2px solid #d3d3d3;
}
/* hover on slider thumb */

.container .mySlider::-webkit-slider-thumb:hover {
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.4);
}
/* Range Value Span */

.container .rangeValue {
  position: absolute;
  height: 40px;
  width: 60px;
  right: -20px;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #fff;
  color: #fff;
  font-weight: 600;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-align: center;
  font-size: 22px;
  line-height: 38px;
}
/* Draw with ::before on span*/

.container .rangeValue::before {
  position: absolute;
  content: "";
  height: 10px;
  width: 10px;
  background-color: #2f3640;
  top: 14px;
  left: -6px;
  border-top: 1px solid transparent;
  border-bottom: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid transparent;
  transform: rotate(45deg);
}
/*animation key frames*/

@keyframes anim {
  0% {
    right: -20px;
  }
  25% {
    right: -10px;
  }
  50% {
    right: -30px;
  }
  70% {
    right: -10px;
  }
  100% {
    right: -20px;
  }
}
</style>