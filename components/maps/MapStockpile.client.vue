<template>
  <ClientOnly>
    <l-map
      style="height: 500px; width: 100%"
      :zoom="5"
      :center="[ -2.5, 118 ]"
      :use-global-leaflet="false"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <l-geo-json
        v-if="geojson"
        :geojson="geojson"
        :options-style="styleFeature"
        @feature-mouseover="highlightFeature"
        @feature-mouseout="resetHighlight"
        @feature-click="zoomToFeature"
      />
    </l-map>
  </ClientOnly>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { ref, onMounted } from 'vue'
import {
  LMap,
  LTileLayer,
  LGeoJson
} from '@vue-leaflet/vue-leaflet'

const geojson = ref(null)

const styleFeature = () => ({
  weight: 1,
  opacity: 1,
  color: 'white',
  dashArray: '3',
  fillOpacity: 0.7,
  fillColor: getColor(Math.random() * 1000)
})

function getColor(d: number) {
  return d > 1000 ? '#800026' :
         d > 500  ? '#BD0026' :
         d > 200  ? '#E31A1C' :
         d > 100  ? '#FC4E2A' :
         d > 50   ? '#FD8D3C' :
         d > 20   ? '#FEB24C' :
         d > 10   ? '#FED976' :
                    '#FFEDA0'
}

function highlightFeature(e: any) {
  e.target.setStyle({
    weight: 3,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7
  })
}

function resetHighlight(e: any) {
  e.target.setStyle(styleFeature())
}

function zoomToFeature(e: any) {
  e.target._map.fitBounds(e.target.getBounds())
}

onMounted(async () => {
  // const res = await fetch('https://raw.githubusercontent.com/superpikar/indonesia-geojson/master/indonesia.geojson')
   const res = await fetch('https://raw.githubusercontent.com/superpikar/indonesia-geojson/master/indonesia-province.json')
    // Tampilkan nama-nama yang tersedia
  const data = await res.json()

  // Tampilkan nama-nama yang tersedia
  console.log(data.features.map(f => f.properties?.state || f.properties?.name || f.properties?.slug))

  geojson.value = data
  
})
</script>
