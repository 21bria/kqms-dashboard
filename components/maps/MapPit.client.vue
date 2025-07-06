<template>
  <ClientOnly>
    <LMap :zoom="16" :center="[-0.0758889, 129.4485194]" style="height: 620px; width: 100%;"
      :use-global-leaflet="false">
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors" />

      <!-- Marker: titik tengah Pulau Gebe -->
      <LMarker :lat-lng="[-0.0758889, 129.4485194]">
        <LPopup>Pulau Gebe</LPopup>
      </LMarker>
    </LMap>
  </ClientOnly>
</template>

<script setup>
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
</script>
