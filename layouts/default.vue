<template>
  <div class="min-h-screen flex flex-col">
    <SiteHeader />
    <main class="flex-1 p-4 md:p-6 lg:p-8">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import axios from 'axios'

onMounted(() => {
  const token = localStorage.getItem('access')
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
})
</script>
