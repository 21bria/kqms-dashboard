<template>
  <ClientOnly>
    <ApexChart ref="chart" height="270"  :options="mergedOptions" :series="series" />
  </ClientOnly>
</template>

<script setup lang="ts">
import ApexChart from 'vue3-apexcharts'
import { ref, computed, watch } from 'vue'

const props = defineProps({
  series: {
    type: Array,
    required: true
  },
  colors: {
    type: Array,
    default: () => []
  },
  title: { type: String, default: '' }
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
      enabled: false
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
    fontFamily: 'Inter, sans-serif',
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
  xaxis: {
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
    labels: {
      formatter: (val: number) => `${(val / 1000).toFixed(1)}k`,
      style: {
        colors: isDark.value ? '#e5e7eb' : '#1e293b'
      }
    }
  },

  legend: {
    show: true,
    showForSingleSeries: true,
    customLegendItems: ['Actual', 'Plan'],
    markers: {
      fillColors: ['#34d399', '#f5b849']
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '50%',
      endingShape: 'rounded',
      dataLabels: {
        position: 'top'
      }
    }
  },
  dataLabels: {
    enabled: false
  },
   fill: {
        // opacity: [0.46, 0.25, 1],
        type: 'gradient',
        gradient: {
            inverseColors: false,
            shade: 'light',
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.30,
            stops: [0, 100, 100, 100]
        }
    },
}))

// ====== 2. Theme Options
const getThemeOptions = () => ({
  theme: {
    mode: isDark.value ? 'dark' : 'light'
  },
  colors: props.colors.length > 0
    ? props.colors
    : isDark.value
      ? ['#34d399', '#f5b849']
      : ['#34d399', '#f5b849'],
  tooltip: {
    theme: isDark.value ? 'dark' : 'light'
  },
  grid: {
    borderColor: isDark.value ? '#334155' : '#e5e7eb',
    strokeDashArray: 2
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
