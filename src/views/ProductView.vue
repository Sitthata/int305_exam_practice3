<script setup>
import { ref, onMounted, watch } from "vue";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase/init.js";
import { useRoute } from "vue-router";
import QueryList from "../components/QueryList.vue";
import ProductList from "../components/ProductList.vue";
import { query } from "firebase/firestore";
import { where } from "firebase/firestore";

const category = ref();
const products = ref([]);
const route = useRoute();

async function getProducts() {
  category.value = route.params.category || "";
  /* add your code here */
  const productRef = collection(db, "myproducts");
  let qry;
  if (!category.value) {
    qry = query(productRef);
  } else {
    qry = query(productRef, where("category", "==", category.value));
  }

  const productSnap = await getDocs(qry);

  products.value = productSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log(products.value);
}

onMounted(() => {
  getProducts();
});

watch(() => route.params.category, getProducts);
</script>

<template>
  <QueryList :category="category" />
  <ProductList :category="category" :products="products" />
</template>

<style scoped></style>
