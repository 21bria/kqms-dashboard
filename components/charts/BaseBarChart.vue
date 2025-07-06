<template>
  <ClientOnly>
    <ApexChart
      ref="chart"
      height="230"
      type="bar"
      :options="mergedOptions"
      :series="series"
    />
  </ClientOnly>
</template>
<script setup lang="ts">
import ApexChart from 'vue3-apexcharts'
import { ref, computed, watch } from 'vue'
// import { useColorMode } from '#imports'

const props = defineProps({
  series: {
    type: Array,
    required: true
  },
  categories: {
    type: Array,
    default: () => []
  },
  colors: {
    type: Array,
    default: () => []
  },
   title: { type: String, default: '' },
})

const chart = ref<ApexCharts | null>(null)
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

// ====== 1. Static Chart Options
const baseOptions = computed(() => ({
  chart: {
    type: 'bar',
    background: 'transparent',
    zoom: {
      enabled: true,
      type: 'x',
      autoScaleYaxis: true
    },
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false
      },
      autoSelected: 'zoom'
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 500
    },
    fontFamily: 'Inter, sans-serif',
  },
  title: { //  pindahkan ke sini
    text: props.title,
    align: 'left',
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: isDark.value ? '#e5e7eb' : '#1e293b'
    }
  },
  xaxis: {
    categories: props.categories
  },
  plotOptions: {
  bar: {
    dataLabels: {
      position: 'top'
    },
    columnWidth: '55%',
    endingShape: 'rounded'
  }
},
dataLabels: {
  enabled: false,
  formatter: (val:number) => `${(val / 1000).toFixed()}k`,
  offsetY: -10,
  style: {
    fontSize: '12px',
    fontWeight: 'bold',
    colors: [isDark.value ? '#e5e7eb' : '#1e293b']
  }
},
legend: {
  position: 'top', // ⬅️ ini penting
  horizontalAlign: 'center',
  labels: {
    colors: isDark.value ? '#e5e7eb' : '#1e293b'
  }
}
}))


// ====== 2. Theme Options
const getThemeOptions = () => ({
  theme: {
    mode: isDark.value ? 'dark' : 'light'
  },
  colors: props.colors.length > 0
    ? props.colors
    : isDark.value
    ? ['#60a5fa', '#f87171']
    : ['#3b82f6', '#ef4444'],
 xaxis: {
    categories: props.categories,
    labels: {
      style: {
        colors: isDark.value ? '#e5e7eb' : '#1e293b'
      }
    }
  },
  yaxis: {
     tickAmount: 4,
  labels: {
    formatter: (val:number) => `${(val / 1000).toFixed()}k`,  // ubah ke 'k' misalnya
    style: {
      colors: isDark.value ? '#e5e7eb' : '#1e293b'
    }
  }
},
  tooltip: {
    theme: isDark.value ? 'dark' : 'light'
  },
  grid: {
    borderColor: isDark.value ? '#334155' : '#e5e7eb',
    strokeDashArray: 2
  },
  legend: {
  position: 'top',
  horizontalAlign: 'center',
  fontSize: '12px',
  labels: {
    colors: isDark.value ? '#e5e7eb' : '#1e293b'
  }
}
})

// ====== 3. Merged Options
const mergedOptions = computed(() => ({
  ...baseOptions.value,
  ...getThemeOptions()
}))

// ====== 4. Update on theme change
watch(isDark, () => {
  if (chart.value?.updateOptions) {
    chart.value.updateOptions(getThemeOptions(), false, true)
  }
})

</script>

