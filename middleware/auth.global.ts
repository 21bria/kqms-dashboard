export default defineNuxtRouteMiddleware((to) => {
  if (!process.client) return

  const token = localStorage.getItem('access')
  const publicPages = ['/auth', '/login', '/sso']

  if (!token && !publicPages.includes(to.path)) {
    return navigateTo('/auth')
  }

  if (token && publicPages.includes(to.path)) {
    return navigateTo('/dashboard')
  }
})
