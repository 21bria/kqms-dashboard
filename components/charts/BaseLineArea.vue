<template>
  <ClientOnly>
    <ApexChart ref="chart" type="line" height="270" :series="series" :options="mergedOptions" />
  </ClientOnly>
</template>



<script setup lang="ts">
import ApexChart from 'vue3-apexcharts'
import { ref, computed, watch } from 'vue'

// Props
const props = defineProps({
  series: {
    type: Array as () => ApexAxisChartSeries,
    required: true
  },
  categories: {
    type: Array as () => string[],
    default: () => []
  },
  colors: {
    type: Array as () => string[],
    default: () => []
  },
  title: {
    type: String,
    default: ''
  }
})

const chart = ref<ApexCharts | null>(null)

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

// === BASE OPTIONS
const baseOptions = computed(() => ({
  chart: {
    type: 'line',
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
      }
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 500
    },
    fontFamily: 'Inter, sans-serif'
  },

  title: {
    text: props.title,
    align: 'left',
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: isDark.value ? '#e5e7eb' : '#1e293b'
    }
  },
  labels: props.categories,
  markers: {
    size: 0
  },

  fill: {
    type: 'solid',
    opacity: [1, 0.30]
  },

  stroke: {
    curve: 'smooth',
    width: [3, 0]
  },

  dataLabels: {
    enabled: false
  },

  yaxis: [
    {
      // title: {
      //   text: 'Plan',
      // },
      labels: {
        formatter: (val: number) => `${(val / 1000).toFixed(1)}k`,
        style: {
          colors: isDark.value ? '#e5e7eb' : '#1e293b'
        }
      }
    },
    {
      opposite: true,
      show:false,
         labels: {
        formatter: (val: number) => `${(val / 1000).toFixed(1)}k`,
        style: {
          colors: isDark.value ? '#e5e7eb' : '#1e293b'
        }
      }
      // title: {
      //   text: 'Actual',
      // },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
    theme: isDark.value ? 'dark' : 'light'
  },
  grid: {
    borderColor: isDark.value ? '#334155' : '#e5e7eb',
    strokeDashArray: 2
  },
  legend: {
    position: 'bottom',
    horizontalAlign: 'center',
    labels: {
      colors: isDark.value ? '#e5e7eb' : '#1e293b'
    },
    markers: {
      width: 12,
      height: 12,
      radius: 2
    }
  }
}))

// === THEME OPTIONS
const getThemeOptions = () => ({
  theme: {
    mode: isDark.value ? 'dark' : 'light'
  },
  colors: props.colors.length > 0
    ? props.colors : isDark.value
      ? ['#60a5fa', '#facc15'] : ['#3b82f6', '#f59e0b']
})

// === MERGED OPTIONS
const mergedOptions = computed(() => ({
  ...baseOptions.value,
  ...getThemeOptions()
}))

// === WATCH THEME CHANGE
watch(isDark, () => {
  if (chart.value?.updateOptions) {
    chart.value.updateOptions(getThemeOptions(), false, true)
  }
})
</script>
