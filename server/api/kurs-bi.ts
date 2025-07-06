import { JSDOM } from 'jsdom'
import fetch from 'node-fetch'

export default defineCachedEventHandler(async () => {
  const res = await fetch('https://www.bi.go.id/id/statistik/informasi-kurs/transaksi-bi/default.aspx')
  const html = await res.text()
  const dom = new JSDOM(html)
  const document = dom.window.document

  const rows = document.querySelectorAll('table.table-striped tbody tr')
  const data: any[] = []

  rows.forEach(row => {
    const cols = row.querySelectorAll('td')
    if (cols.length >= 4) {
      data.push({
        mata_uang: cols[0].textContent?.trim(),
        nilai: cols[1].textContent?.trim(),
        kurs_jual: cols[2].textContent?.trim(),
        kurs_beli: cols[3].textContent?.trim()
      })
    }
  })

  const updateBox = document.querySelector('.search-box-wrapper span')
  const lastUpdate = updateBox?.textContent?.trim() || 'Tidak diketahui'

  return {
    updated_at: lastUpdate,
    data: data
  }
}, {
   maxAge: 600 // cache 10 menit (600 detik)
})
