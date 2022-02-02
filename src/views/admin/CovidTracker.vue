  <template>
  <div class="flex flex-wrap" v-if="!loading">
    <div class="w-full xl:w-8/12">
      <div
        class="
          relative
          flex flex-col
          min-w-0
          break-words
          bg-white
          w-full
          mb-6
          shadow-lg
          rounded
          p-10
        "
      >
        <main>
          <data-title :text="title" :dataDate="dataDate"></data-title>
          <data-boxes :stats="stats"></data-boxes>
          <country-select
            :countries="countries"
            @get-country="getCountryData"
          ></country-select>
          <base-button mode="mt with-mt" v-if="stats.Country" @click="resetData">
            <i class="fas fa-window-restore"></i> Clear Data</base-button
          >
        </main>
        <main v-if="loading">
          <base-spinner :loading="loading" :color="color"></base-spinner>
        </main>
      </div>
    </div>
  </div>
</template>
<script>
import DataTitle from "@/components/Covid/DataTitle.vue";
import DataBoxes from "@/components/Covid/DataBoxes.vue";
import CountrySelect from "@/components/Covid/CountrySelect.vue";

export default {
  components: { DataTitle, DataBoxes, CountrySelect },
  data() {
    return {
      loading: true,
      title: "Global",
      dataDate: "",
      stats: {},
      countries: [],
      color: "emerald",
    };
  },
  methods: {
    async fetchCovidData() {
      const res = await fetch("https://api.covid19api.com/summary");

      const data = await res.json();
      return data;
    },
    getCountryData(country) {
      this.stats = country;
      this.title = country.Country;
    },
    async resetData() {
      this.loading = true;
      const data = await this.fetchCovidData();
      this.stats = data.Global;
      this.title = "Global";
      this.loading = false;
    },
  },
  async created() {
    const data = await this.fetchCovidData();
    this.dataDate = data.Date;
    this.stats = data.Global;
    this.countries = data.Countries;
    this.loading = false;
  },
};
</script>

<style scoped>
</style>