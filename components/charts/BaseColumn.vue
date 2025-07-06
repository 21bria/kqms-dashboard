<template>
    <ClientOnly>
        <ApexChart ref="chart" type="line" height="260" :series="series" :options="mergedOptions" />
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
    categories: {
        type: Array,
        default: () => []
    },
    colors: {
        type: Array,
        default: () => []
    },
    title: {
        type: String,
        // default: 'Monthly Trend Mining'
    }
})


const chart = ref<ApexCharts | null>(null)
// ApexChart, bukan ApexChartsLib
// const chart = ref<InstanceType<typeof ApexChart> | null>(null)

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
    plotOptions: {
        bar: {
            columnWidth: '50%'
        }
    },

    stroke: {
        curve: 'smooth',
        width: [0, 0,3]
    },
    // markers: {
    //     size: [4, 0],
    //     strokeWidth: 2,
    //     hover: {
    //         sizeOffset: 2
    //     }
    // },
    
    fill: {
        type: 'gradient',
        gradient: {
            inverseColors: false,
            shade: 'light',
            type: "vertical",
            shadeIntensity:0.7,
            opacityFrom: 0.75,
            opacityTo: 0.25,
             stops: [0, 100, 100, 100]
        }
    },
      dataLabels: {
            enabled: true,
           formatter: (val: number) => `${(val / 1000).toFixed(1)}k`,
            offsetY: -15,
            style: {
                fontSize: '10px',
                // colors: ["#8c9097"]
            }
        },
    xaxis: {
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
        },
         tickAmount: 4
    },
    yaxis: 
        {
            labels: {
                formatter: (val: number) => `${(val / 1000).toFixed(1)}k`,
                style: {
                    colors: isDark.value ? '#e5e7eb' : '#1e293b'
                }
            },
            // axisTicks: { show: true },
            // axisBorder: { show: false },
        },
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
        ? props.colors
        : isDark.value
            ? ['#60a5fa', '#facc15']
            : ['#3b82f6', '#f59e0b']
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
