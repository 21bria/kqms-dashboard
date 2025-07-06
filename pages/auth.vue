<template>
  <LoginForm />
</template>

<script setup>
definePageMeta({
    layout: 'auth'
})

import { useColorMode } from '#imports'

const colorMode = useColorMode()

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>
