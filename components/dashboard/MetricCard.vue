<!-- MetricCard.vue -->
<template>
  <div class="dashboard-card" :class="{ 'border-l-4': highlight }"
    :style="highlight ? `border-color: ${highlightColor}` : ''">

    <!-- Header -->
    <div class="dashboard-card-header">
      <div class="flex items-center">
        <div v-if="icon" class="mr-1 text-gray-500 dark:text-gray-400">
          <component :is="icon" class="h-5 w-5" />
        </div>
        <h3>{{ title }}</h3>
      </div>
      <div>
        <button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- ⬇ Tambahkan custom header slot di sini -->
    <div v-if="$slots.header" class="mb-4">
      <slot name="header" />
    </div>

    <!-- Main content -->
    <div class="dashboard-card-content">
      <slot />
    </div>

    <!-- Footer -->
    <div v-if="footer?.trim() || $slots.footer"class="mt-6 pt-6">
      <slot name="footer">
        {{ footer }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: Object,
    default: null
  },
  highlight: {
    type: Boolean,
    default: false
  },
  highlightColor: {
    type: String,
    default: 'var(--primary-600)'
  }
})
</script>
