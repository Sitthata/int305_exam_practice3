<script setup>
import { ref, onMounted, watch } from "vue";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase/init.js";
import { useRoute } from "vue-router";
import QueryList from "../components/QueryList.vue";
import ProductList from "../components/ProductList.vue";
import { query } from "firebase/firestore";
import { orderBy } from "firebase/firestore";
import { where } from "firebase/firestore";
import { limit } from "firebase/firestore";

const category = ref("");
const products = ref([]);
const heading = ref("");
const route = useRoute();

async function getQuery() {
  const qryId = route.params.qryId;
  products.value = [];
  let qry = null;
  let prodRef = collection(db, "myproducts");

  if (qryId == 1) {
    heading.value = "Order by price";
    category.value = ""; /* All categories */
    /** add your query here */
    qry = query(prodRef, orderBy("price", "desc"));
  } else if (qryId == 2) {
    heading.value = "Sort by title (desc)";
    category.value = ""; /* All categories */
    qry = query(prodRef, orderBy("title", "desc"));
  } else if (qryId == 3) {
    heading.value = "Fiction";
    category.value = "Book";
    qry = query(prodRef, where("keywords", "array-contains", "Fiction"));
  } else if (qryId == 4) {
    heading.value = `Word "life`;
    category.value = `Book`;
    qry = query(prodRef, where("keywords", "array-contains", "Life"));
  } else if (qryId == 5) {
    heading.value = `#pages between 300 and 400 (Sort by pages)`;
    category.value = `Book`;
    qry = query(
      prodRef,
      where("pages", "<", 400),
      where("pages", ">", 300),
      orderBy("pages", "desc")
    );
  } else if (qryId == 6) {
    heading.value = `(Bestseller or Award) and price less than 20USD`;
    category.value = `Book`;
    qry = query(
      prodRef,
      where("keywords", "array-contains-any", ["Bestseller", "Award"]),
      where("price", "<", 20)
    );
  } else if (qryId == 7) {
    qry = query(prodRef, where("brand", "==", "Samsung"));
  } else if (qryId == 8) {
    qry = query(
      prodRef,
      where("brand", "==", "Apple"),
      where("price", "<", 20)
    );
  } else if (qryId == 9) {
    qry = query(
      prodRef,
      where("colors", "array-contains-any", ["Silver", "Red"])
    );
  } else if (qryId == 10) {
    qry = query(prodRef, orderBy("price", "desc"), limit(1));
  }

  const productSnap = await getDocs(qry);
  products.value = productSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

onMounted(() => {
  getQuery();
});

watch(() => route.params.qryId, getQuery);
</script>

<template>
  <QueryList :category="category" />
  <h1>{{ heading }}</h1>
  <ProductList :category="category" :products="products" />
</template>

<style scoped>
h1 {
  text-align: center;
  color: blue;
}
</style>
