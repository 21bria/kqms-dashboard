<script setup>
const { data } = await useFetch('/api/kurs-bi')

// Mata uang yang ingin ditampilkan
const targetCurrencies = ['USD', 'AUD', 'BND', 'EUR', 'JPY'] // JPY sebagai 1 bebas

// Nama panjang tiap mata uang
const currencyNames = {
  USD: 'US DOLLAR',
  AUD: 'AUSTRALIAN DOLLAR',
  BND: 'BRUNEI DOLLAR',
  EUR: 'EURO',
  JPY: 'JAPANESE YEN'
}

// Tanggal update terakhir
const lastUpdate = computed(() => data.value?.updated_at || 'Tidak diketahui')

// Filter hanya mata uang target
const kursTerpilih = computed(() =>
  (data.value?.data || []).filter(item =>
    targetCurrencies.includes(item.mata_uang)
  )
)

// Format ke Rupiah
function formatRupiah(value) {
  const number = parseFloat(value.replace('.', '').replace(',', '.'))
  return isNaN(number)
    ? value
    : new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2
      }).format(number)
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-lg font-bold">Kurs BI</h2>
      <p class="text-xs text-gray-500">Update: {{ lastUpdate }}</p>
    </div>

    <table class="w-full text-sm table-auto">
          <thead class="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
        <tr >
          <th class="p-2 text-left text-xs">Mata Uang</th>
          <th class="p-2 text-right text-xs">Nilai</th>
          <th class="p-2 text-right text-xs">Jual</th>
          <th class="p-2 text-right text-xs">Beli</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in kursTerpilih" :key="item.mata_uang" class="border-t border-gray-200 dark:border-gray-700">
          <td class="p-2">
            {{ item.mata_uang }}
          </td>
          <td class="p-2 text-right">{{ item.nilai }}</td>
          <td class="p-2 text-right">{{ formatRupiah(item.kurs_jual) }}</td>
          <td class="p-2 text-right">{{ formatRupiah(item.kurs_beli) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


