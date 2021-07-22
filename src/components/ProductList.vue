<template>
  <section class="wrapper">
    <div class="flex align-items-center justify-content-between">
      <h1>Products</h1>
      total: {{ totalFilteredProducts }}
    </div>
    <div>
      <ul>
        <li v-for="(category, index) of categories" :key="index">
          <CategoryFilter
            :category="category"
            @selectedCategory="selectCategory"
          />
        </li>
      </ul>
    </div>
    <ul>
      <li v-for="product in filteredList" :key="product.id">
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
              <AddToCartButton :product="product" @addItem="onAddItem">
                <span>Add to cart</span>
              </AddToCartButton>
            </div>
          </article>
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, computed } from "vue";
import { Product } from "@/types";
import { useProductApi } from "@/composables/productsApi";

import StaticPrice from "@/components/StaticPrice.vue";
import AddToCartButton from "@/components/AddToCartButton.vue";
import CategoryFilter from "@/components/CategoryFilter.vue";

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    list: Product[];
  }
}

export default defineComponent({
  components: {
    StaticPrice,
    AddToCartButton,
    CategoryFilter,
  },
  // data() {
  //   return {
  //     list: [] as Product[],
  //   };
  // },
  // computed: {
  //   totalProducts() {
  //     return this.list.length;
  //   },
  // },
  // async created() {
  //   this.list = await productService.get();
  // },
  // methods: {
  //   onAddItem(product: Product) {
  //     console.log(product);
  //   },
  // },
  async setup() {
    const { list, totalProducts } = await useProductApi();
    const onAddItem = (product: Product) => {
      console.log(product.title);
    };

    const categories = list.value.reduce(
      (accumulated: string[], current: Product) => {
        if (!accumulated.some((category) => category === current.category)) {
          accumulated.push(current.category);
        }
        return accumulated;
      },
      []
    );

    const selectedCategories: Ref<string[]> = ref([]);

    const selectCategory = (category: string) => {
      if (selectedCategories.value.indexOf(category) === -1) {
        selectedCategories.value.push(category);
      } else {
        selectedCategories.value.splice(
          selectedCategories.value.indexOf(category),
          1
        );
      }
    };

    const filteredList = computed<Product[]>(() => {
      return list.value.filter((product) => {
        return selectedCategories.value.some((category) => {
          return category === product.category;
        });
      });
    });

    const totalFilteredProducts = computed(() => filteredList.value.length);

    return {
      selectCategory,
      selectedCategories,
      categories,
      filteredList,
      totalFilteredProducts,
      onAddItem,
    };
  },
});
</script>

<style>
.product-container--has-discount {
  background-color: rgba(255, 238, 0, 0.4);
}
</style>
