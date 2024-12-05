<script setup>
import { RouterView } from "vue-router";
import { ref, onMounted } from "vue";
import { query, collection, getDocs, doc } from "firebase/firestore";
import db from "./firebase/init.js";
import CategoryList from "./components/CategoryList.vue";

const categories = ref([]);

async function getCategories() {
  /* add your code here */
  const categoriesRef = collection(db, "mycategories");
  const categoriesSnap = await getDocs(categoriesRef);
  categories.value = categoriesSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

onMounted(() => {
  getCategories();
});
</script>

<template>
  <CategoryList :categories="categories" />
  <div class="content">
    <RouterView />
  </div>
</template>

<style scoped></style>
