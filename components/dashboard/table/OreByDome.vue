<template>
    <div>
        <ul v-if="items.length > 0" class="divide-y divide-gray-200 dark:divide-gray-700 mt-3">
            <li v-for="(item, idx) in items" :key="idx" class="flex items-center justify-between py-3">
                <div class="flex items-center gap-3 truncate max-w-[60%]">
                    <div class="bg-indigo-50 dark:bg-gray-700 dark:text-gray-400 p-2 rounded-full">
                        <GlobeAltIcon class="w-5 h-5 text-indigo-600" />
                    </div>
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
                        {{ item.pile_id || 'None' }}
                    </span>
                    <span class="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">
                        {{ item.nama_material }}
                    </span>
                </div>
                <div class="flex items-center gap-4 text-sm whitespace-nowrap">
                    <span class="text-gray-800 dark:text-gray-200">{{ item.total_ore }}</span>
                    <span class="text-gray-600 dark:text-gray-300">{{ item.ni }}</span>
                    <span
                        class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-500 dark:text-gray-300">
                        {{ item.grade }}
                    </span>
                </div>
            </li>
        </ul>
        <div v-else class="text-gray-400 text-base min-h-[320px] flex items-center justify-center">
            No data available.
        </div>
    </div>
</template>


<script setup>
import { GlobeAltIcon } from '@heroicons/vue/24/solid'

// Terima data dari Parent
defineProps({
    items: {
        type: Array,
        default: () => []
    }
})


</script>
