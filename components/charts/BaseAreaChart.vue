<template>
  <ClientOnly>
    <ApexChart
      :key="chartKey"
      type="area"
      height="260"
      :series="series"
      :options="mergedOptions"
    />
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

// Theme detection
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

// Force chart to re-render when theme changes by regenerating chart key
const chartKey = computed(() => `chart-area-${isDark.value ? 'dark' : 'light'}`)

// Computed chart options
const mergedOptions = computed(() => ({
  chart: {
    type: 'area',
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
      export: {
        csv: {
          filename: undefined,
          columnDelimiter: ',',
          headerCategory: 'category',
          headerValue: 'value',
          // dateFormatter(timestamp) {
          //   return new Date(timestamp).toDateString()
          // }
        },
        svg: {
          filename: undefined,
          background: isDark.value ? '#0f172a' : '#ffffff' // Background untuk SVG
        },
        png: {
          filename: undefined,
          background: isDark.value ? '#0f172a' : '#ffffff' // Background untuk PNG
        }
      }
    },
    // Hapus fill dari chart, pindah ke series
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 500
    },
    fontFamily: 'Inter, sans-serif'
  },
  
  // Fill untuk area chart
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.3,
      stops: [0, 90, 100]
    }
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
  
  colors: props.colors.length > 0
    ? props.colors
    : isDark.value
      ? ['#60a5fa', '#fbbf24'] // Warna untuk dark theme
      : ['#3b82f6', '#f59e0b'], // Warna untuk light theme
      
  dataLabels: {
    enabled: false
  },
  
  stroke: {
    curve: 'smooth',
    width: [0,2]
  },
  
  xaxis: {
    type: 'category',
    categories: props.categories,
    labels: {
      style: {
        colors: isDark.value ? '#e5e7eb' : '#1e293b'
      }
    },
    axisBorder: {
      color: isDark.value ? '#334155' : '#e5e7eb'
    },
    axisTicks: {
      color: isDark.value ? '#334155' : '#e5e7eb'
    }
  },
  
  yaxis: {
    tickAmount: 5,
    labels: {
      formatter: (val: number) => `${(val / 1000).toFixed(1)}k`,
      style: {
        colors: isDark.value ? '#e5e7eb' : '#1e293b'
      }
    }
  },
  
  tooltip: {
    theme: isDark.value ? 'dark' : 'light',
    style: {
      fontSize: '12px',
      fontFamily: 'Inter, sans-serif'
    }
  },
  
  grid: {
    borderColor: isDark.value ? '#334155' : '#e5e7eb',
    strokeDashArray: 2,
    xaxis: {
      lines: {
        show: false
      }
    },
    yaxis: {
      lines: {
        show: true
      }
    }
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
  },
  
  // Tambahan untuk memastikan export benar
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        // background: isDark.value ? '#0f172a' : '#ffffff'
        background: 'transparent',
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
}))

// Watch untuk memastikan chart ter-update saat tema berubah
watch(isDark, () => {
  // Force re-render dengan delay kecil untuk memastikan theme berubah
  setTimeout(() => {
    // Chart akan re-render karena chartKey berubah
  }, 100)
})
</script>
<style scoped>
/* Tambahan styling untuk memastikan background konsisten */
/* :deep(.apexcharts-canvas) {
  background: v-bind(isDark ? '#0f172a' : '#ffffff') !important;
} */
/* 
:deep(.apexcharts-svg) {
  background: v-bind(isDark ? '#0f172a' : '#ffffff') !important;
} */

/* Styling untuk toolbar */
/* :deep(.apexcharts-toolbar) {
  background: v-bind(isDark ? '#1e293b' : '#f8fafc');
  border-radius: 4px;
}

:deep(.apexcharts-menu-item) {
  color: v-bind(isDark ? '#e5e7eb' : '#1e293b') !important;
}

:deep(.apexcharts-menu-item:hover) {
  background: v-bind(isDark ? '#334155' : '#e2e8f0') !important;
} */
</style>