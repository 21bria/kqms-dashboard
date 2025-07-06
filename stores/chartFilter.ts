// stores/chartFilter.ts
import { defineStore } from 'pinia'
// type FilterType = '' | 'monthly' | 'daily' | 'weekly' | 'yearly' | 'all' | 'range'
type FilterType = 'monthly' | 'daily' | 'weekly' | 'yearly' | 'all' | 'range'


export const useChartFilterStore = defineStore('chartFilter', {
  state: () => {
    const now = new Date()
    const monthIndex = now.getMonth() + 1
    const monthName = now.toLocaleString('default', { month: 'short' })

    return {
      type: 'monthly' as FilterType,
      year: now.getFullYear(),
      month: { name: monthName, value: monthIndex },
      week: null as number | null,
      range: { start: '', end: '' },
      date: ''
    }
  },
  actions: {
    apply(payload: {
      type: FilterType,
      year?: number,
      month?: number,
      week?: number,
      range: { start: string; end: string },
      date: string
    }) {
      this.type = payload.type
      this.year = payload.year ?? null
      this.month = payload.month ? { name: '', value: payload.month } : null
      this.week = payload.week ?? null
      this.range = payload.range
      this.date = payload.date
    }
  }
})
