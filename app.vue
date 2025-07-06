<!-- <template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template> -->

<template>
  <div class="min-h-screen flex flex-col">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useColorMode } from '#imports'
import { onMounted } from 'vue'
import axios from 'axios'
// Akses color mode dari Nuxt bawaan
const colorMode = useColorMode()

// Fungsi toggle dark/light
const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

onMounted(() => {
  const token = localStorage.getItem('access')
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
})

</script>

<!-- <style>
@import "leaflet/dist/leaflet.css";
</style> -->