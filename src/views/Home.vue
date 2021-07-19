<template>
  <div class="home">
    <div v-if="error">Sorry, something went wrong...</div>
    <Suspense>
      <template #default>
        <ProductList />
      </template>
      <template v-if="!error" #fallback>Loading...</template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, Ref, ref } from "vue";

import ProductList from "@/components/ProductList.vue";

export default defineComponent({
  name: "Home",
  components: {
    ProductList,
  },
  setup() {
    const error: Ref<unknown> = ref();
    onErrorCaptured((errorCaptured) => {
      error.value = errorCaptured;
    });
    return {
      error,
    };
  },
});
</script>
