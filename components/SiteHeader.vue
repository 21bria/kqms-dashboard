<template>
  <header class="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
    <nav class="container max-w-[1640px] mx-auto px-4 py-4 flex items-center justify-between"> 

      <!-- Logo -->
      <div class="flex items-center space-x-1">
        <NuxtLink to="/dashboard" class="flex items-center space-x-1">
          <img src="/colorful.png" alt="Logo" class="w-9 h-9" />
          <h1 class="text-xl font-semibold text-gray-900 dark:text-white hello">KQMS</h1>
        </NuxtLink>
      </div>

      <!-- Navigation Menu (Desktop) -->
    
      <!-- Right Side Controls -->
      <div class="flex items-center space-x-4">
        <!-- Dark/Light mode toggle -->
        <button @click="toggleColorMode"
          class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <svg v-if="isLightMode" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700 dark:text-gray-200"
            viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700 dark:text-gray-200"
            viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clip-rule="evenodd" />
          </svg>
        </button>
        <div class="relative mt" v-click-outside="closeUserApp">
          <button @click="showApps = !showApps"
            class="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
            <svg xmlns="http://www.w3.org/2000/svg" height="19px" viewBox="0 -960 960 960" width="19px"
              fill="currentColor">
              <path
                d="M80-560v-320h320v320H80Zm80-80h160v-160H160v160ZM80-80v-320h320v320H80Zm80-80h160v-160H160v160Zm400-400v-320h320v320H560Zm80-80h160v-160H640v160ZM560-80v-320h320v320H560Zm80-80h160v-160H640v160ZM320-640Zm0 320Zm320-320Zm0 320Z" />
            </svg>
          </button>
          <!-- Menu -->
          <div v-if="showApps"
            class="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-50 animate-fade-in">
            <div class="mt-2 mb-3 flex items-center justify-between">
              <span class="border-b w-1/5 lg:w-1/4 border-gray-300 dark:border-gray-600"></span>
              <p class="text-sm text-center  text-gray-500 dark:text-gray-400 ">Apps</p>
              <span class="border-b w-1/5 lg:w-1/4 border-gray-300 dark:border-gray-600"></span>
            </div>
            <!-- Grid -->
            <div class="grid grid-cols-3 gap-4">
              <NuxtLink to="/dashboard/quick" @click="closeUserApp">
                <button
                  class="flex flex-col items-center text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-200 bg-gray-50 dark:bg-gray-200/30 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                    class="h-6 w-6 text-gray-600 dark:text-gray-100" fill="currentColor">
                    <path
                      d="M480-80 360-642l-88 402H80v-80h128l113-520h79l122 572 78-332h80l72 280h128v80H690l-48-188-82 348h-80Z" />
                  </svg>
                  <span class="mt-1">Quick</span>
                </button>
              </NuxtLink>
              <button
                class="flex flex-col items-center text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-200 bg-gray-50 dark:bg-gray-200/30 p-3 rounded-lg">

                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                  class="h-6 w-6 text-gray-600 dark:text-gray-100" fill="currentColor" stroke="currentColor">
                  <path
                    d="m40-240 240-320 180 240h300L560-586 460-454l-50-66 150-200 360 480H40Zm521-80Zm-361 0h160l-80-107-80 107Zm0 0h160-160Z" />
                </svg>
                <span class="mt-1">Mining</span>
              </button>
              <button
                class="flex flex-col items-center text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-200 bg-gray-50 dark:bg-gray-200/30 p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                  class="h-6 w-6 text-gray-600 dark:text-gray-100" fill="currentColor">
                  <path
                    d="M120-160v-520l160 120 200-280 200 160h160v520H120Zm200-120 160-220 280 218v-318H652L496-725 298-447l-98-73v144l120 96Z" />
                </svg>
                <span class="mt-1">Geology</span>
              </button>
              <button
                class="flex flex-col items-center text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-200 bg-gray-50 dark:bg-gray-200/30 p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                  class="h-6 w-6 text-gray-600 dark:text-gray-100" fill="currentColor" stroke="currentColor">
                  <path
                    d="M320-414v-306h120v306l-60-56-60 56Zm200 60v-526h120v406L520-354ZM120-216v-344h120v224L120-216Zm0 98 258-258 142 122 224-224h-64v-80h200v200h-80v-64L524-146 382-268 232-118H120Z" />
                </svg>
                <span class="mt-1">Selling</span>
              </button>
              <button
                class="flex flex-col items-center text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-200 bg-gray-50 dark:bg-gray-200/30 p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                  class="h-6 w-6 text-gray-600 dark:text-gray-100" fill="currentColor">
                  <path
                    d="M42-120v-112q0-33 17-62t47-44q51-26 115-44t141-18q77 0 141 18t115 44q30 15 47 44t17 62v112H42Zm80-80h480v-32q0-11-5.5-20T582-266q-36-18-92.5-36T362-320q-71 0-127.5 18T142-266q-9 5-14.5 14t-5.5 20v32Zm240-240q-66 0-113-47t-47-113h-10q-9 0-14.5-5.5T172-620q0-9 5.5-14.5T192-640h10q0-45 22-81t58-57v38q0 9 5.5 14.5T302-720q9 0 14.5-5.5T322-740v-54q9-3 19-4.5t21-1.5q11 0 21 1.5t19 4.5v54q0 9 5.5 14.5T422-720q9 0 14.5-5.5T442-740v-38q36 21 58 57t22 81h10q9 0 14.5 5.5T552-620q0 9-5.5 14.5T532-600h-10q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T442-600H282q0 33 23.5 56.5T362-520Zm300 160-6-30q-6-2-11.5-4.5T634-402l-28 10-20-36 22-20v-24l-22-20 20-36 28 10q4-4 10-7t12-5l6-30h40l6 30q6 2 12 5t10 7l28-10 20 36-22 20v24l22 20-20 36-28-10q-5 5-10.5 7.5T708-390l-6 30h-40Zm20-70q12 0 21-9t9-21q0-12-9-21t-21-9q-12 0-21 9t-9 21q0 12 9 21t21 9Zm72-130-8-42q-9-3-16.5-7.5T716-620l-42 14-28-48 34-30q-2-5-2-8v-16q0-3 2-8l-34-30 28-48 42 14q6-6 13.5-10.5T746-798l8-42h56l8 42q9 3 16.5 7.5T848-780l42-14 28 48-34 30q2 5 2 8v16q0 3-2 8l34 30-28 48-42-14q-6 6-13.5 10.5T818-602l-8 42h-56Zm28-90q21 0 35.5-14.5T832-700q0-21-14.5-35.5T782-750q-21 0-35.5 14.5T732-700q0 21 14.5 35.5T782-650ZM362-200Z" />
                </svg>
                <span class="mt-1">Safety</span>
              </button>
              <button
                class="flex flex-col items-center text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-200 bg-gray-50 dark:bg-gray-200/30 p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                  class="h-6 w-6 text-gray-600 dark:text-gray-100" fill="currentColor">
                  <path
                    d="M120-120v-80l80-80v160h-80Zm160 0v-240l80-80v320h-80Zm160 0v-320l80 81v239h-80Zm160 0v-239l80-80v319h-80Zm160 0v-400l80-80v480h-80ZM120-327v-113l280-280 160 160 280-280v113L560-447 400-607 120-327Z" />
                </svg>
                <span class="mt-1">HR</span>
              </button>
            </div>
            <p class="border-b  border-gray-300 dark:border-gray-600 mt-3 "></p>
            <!-- View All Button -->
            <div class="mt-2 text-center">
              <button class="text-sm text-blue-600 dark:text-blue-400 hover:underline">View All Apps →</button>
            </div>
          </div>
        </div>

        <!-- Notifications -->
        <!-- User Account Dropdown -->
        <div class="relative" v-click-outside="closeUserMenu">
          <button @click="toggleUserMenu" class="flex items-center space-x-2 focus:outline-none">
            <div class="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center">
              <span class="text-sm font-medium">{{ initials }}</span>
            </div>
            <!-- <span class="text-sm font-medium text-gray-700 dark:text-gray-200 hidden md:block">Meinardus</span> -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 hidden md:block" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </button>

          <!-- User Menu Dropdown -->
          <div v-if="isUserMenuOpen"
            class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 animate-fade-in">

            <p
              class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              {{ userEmail }}
            </p>
            <NuxtLink to="/account"
              class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              Your Account
            </NuxtLink>
            <NuxtLink to="/account/settings"
              class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              Settings
            </NuxtLink>
            <div class="border-t border-gray-200 dark:border-gray-700 my-1"></div>
            <button @click="handleLogout"
              class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              Sign Out
            </button>
          </div>
        </div>

        <!-- Mobile menu button -->
        <button @click="toggleMobileMenu"
          class="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden bg-white dark:bg-gray-800 shadow-inner py-2 animate-fade-in">
      <div class="container mx-auto px-4 space-y-1">
        <NuxtLink to="/dashboard"
          class="block py-2 px-3 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
          Dashboard
        </NuxtLink>
        <NuxtLink to="/analytics"
          class="block py-2 px-3 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
          Analytics
        </NuxtLink>
        <NuxtLink to="/reports"
          class="block py-2 px-3 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
          Reports
        </NuxtLink>
        <NuxtLink to="/mining"
          class="block py-2 px-3 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
          Mining Operations
        </NuxtLink>
        <NuxtLink to="/geology"
          class="block py-2 px-3 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
          Geology
        </NuxtLink>
        <NuxtLink to="/safety"
          class="block py-2 px-3 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
          Safety
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, type DirectiveBinding } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'



// State
const isUserMenuOpen = ref(false)
const isMobileMenuOpen = ref(false)
const showApps = ref(false)
const userEmail = ref<string>('')

const colorMode = useColorMode()
const router = useRouter()

// Dark/light mode toggle
const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const isLightMode = computed(() => colorMode.value === 'light')

// User menu toggles
const toggleUserMenu = () => (isUserMenuOpen.value = !isUserMenuOpen.value)
const toggleMobileMenu = () => (isMobileMenuOpen.value = !isMobileMenuOpen.value)
const closeUserMenu = () => (isUserMenuOpen.value = false)
const closeUserApp = () => (showApps.value = false)

// Custom directive (Type-safe)
const vClickOutside = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const handler = (event: MouseEvent) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event)
      }
    }
    // Attach to element with a symbol to avoid TS error
    (el as any)._clickOutsideHandler = handler
    document.addEventListener('click', handler)
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener('click', (el as any)._clickOutsideHandler)
  }
}

// Initials from email
const initials = computed(() => {
  const email = userEmail.value
  if (email.includes('@')) return email.split('@')[0].slice(0, 2).toUpperCase()
  if (email.length > 1) return email.slice(0, 2).toUpperCase()
  return 'US'
})

// Register directive on mount
defineExpose({})
onMounted(() => {
  const nuxtApp = useNuxtApp()
  nuxtApp.vueApp.directive('click-outside', vClickOutside)

  const storedEmail = localStorage.getItem('email')
  userEmail.value = storedEmail || 'user@example.com'
})

// Logout function
const handleLogout = () => {
  if (process.client) {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    localStorage.removeItem('email')
    localStorage.removeItem('user')

    delete axios.defaults.headers.common['Authorization']
    router.push('/auth')

    window.location.href = 'http://localhost:8001/api/accounts/logout/'
  }
}
</script>

<style scoped>
.hello {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.4rem;
  padding: 0.1rem;
}
</style>