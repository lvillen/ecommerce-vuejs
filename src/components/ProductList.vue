<template>
  <section class="wrapper">
    <div class="flex align-items-center justify-content-between">
      <h1>Products</h1>
      total: {{ totalProducts }}
    </div>
    <ul>
      <li v-for="product in list" :key="product.id">
        <router-link :to="`/detail/${product.id}`">
          <article
            class="grid product-container card"
            :class="{
              'product-container--has-discount': product.discount !== '0.0',
            }"
          >
            <div class="product-container__content">
              <h2>
                {{ product.title }}
              </h2>
              <p>
                <span class="grey-text">Author: </span>
                <strong>{{ product.author }}</strong>
              </p>
              <p>
                <span class="grey-text">Publisher: </span>
                {{ product.publisher }}
              </p>
              <p>
                <span class="grey-text">Year: </span>{{ product.published }}
              </p>
            </div>
            <div class="flex align-items-center justify-content-between">
              <StaticPrice :quantity="product.price" />
              <span v-if="product.discount !== '0.0'"
                >¡Producto con descuento!</span
              >
              <AddToCartButton :product="product" @addItem="onAddItem" />
            </div>
          </article>
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { productService } from "@/services/products.ts";

import { Product } from "@/types";

import StaticPrice from "@/components/StaticPrice.vue";
import AddToCartButton from "@/components/AddToCartButton.vue";

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    list: Product[];
  }
}

export default defineComponent({
  components: {
    StaticPrice,
    AddToCartButton,
  },
  data() {
    return {
      list: [] as Product[],
    };
  },
  computed: {
    totalProducts() {
      return this.list.length;
    },
  },
  async created() {
    this.list = await productService.get();
  },
  methods: {
    onAddItem(product: Product) {
      console.log(product);
    },
  },
});
</script>

<style>
.product-container--has-discount {
  background-color: rgba(255, 238, 0, 0.4);
}
</style>
