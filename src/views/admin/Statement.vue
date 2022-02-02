<template>
  <div>
    <div class="flex flex-wrap">
      <div class="w-full xl:w-8/12 xl:mb-0 px-4">
        <card-account-statement />
      </div>
    </div>
  </div>
</template>
<script>
import CardAccountStatement from "../../components/Cards/CardAccountStatement.vue";

export default {
  components: {
    CardAccountStatement,
  },
};
</script>
