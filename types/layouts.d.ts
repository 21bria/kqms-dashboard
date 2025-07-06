// types/layouts.d.ts
declare module 'nuxt/schema' {
  interface PageMeta {
    layout?: 'default' | 'auth' // tambahkan layout kamu di sini
  }
}

export {}