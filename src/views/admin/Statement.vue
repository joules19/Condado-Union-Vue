<template>
  <transition name="statement">
    <div class="flex flex-wrap">
      <div class="w-full xl:w-8/12 xl:mb-0 px-4">
        <card-account-statement />
      </div>
    </div>
  </transition>
</template>
<script>
import CardAccountStatement from "../../components/Cards/CardAccountStatement.vue";

export default {
  components: {
    CardAccountStatement,
  },
};
</script>


<style>
.statement-enter-active {
  animation: modal 0.3s ease-out;
}

.statement-leave-active {
  animation: modal 0.3s ease-in reverse;
}

@keyframes modal {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
