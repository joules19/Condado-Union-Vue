<template>
<div class="xl:w-4/12">
  <select
    @change="onChange"
    class="form-select mt-10 mb-3 block w-full border p-3 rounded"
    v-model="selected"
  >
    <option value="0">---Select Country---</option>
    <option v-for="country in countries" :value="country.ID" :key="country.ID">
      {{ country.Country }}
    </option>
  </select>
</div>
</template>

<script>
// import moment from "moment";
export default {
  name: "CountrySelect",
  props: ["countries"],
  emits: ["get-country"],
  data() {
    return {
      selected: 0,
    };
  },
  methods: {
    onChange() {
      const country = this.countries.find((item) => item.ID === this.selected);
    
      this.$emit("get-country", country);
    },
  },
};
</script>