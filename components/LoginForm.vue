<template>
  <div
    class="min-h-screen flex items-center justify-center  bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-100">
    <div class="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-sm lg:max-w-5xl w-full">


      <!-- Gambar kiri, hanya di layar besar -->
      <div class="hidden lg:block lg:w-1/2 relative">
        <transition name="fade" mode="out-in">
          <img :src="images[currentIndex]" :key="images[currentIndex]"
            class="object-cover w-full h-full absolute inset-0 transition duration-700" />
        </transition>
      </div>

      <!-- Form login kanan -->
      <div class="w-full p-10 lg:p-12 lg:w-1/2 min-h-[550px] bg-white dark:bg-gray-800 transition-colors duration-300">

        <!-- <h2 class="text-2xl font-semibold text-gray-700 text-center">KAWI</h2> -->
        <!-- Logo -->

        <!-- Toggle pojok kanan -->
        <div class="flex justify-end">
          <!-- Dark/Light mode toggle -->
          <button @click="toggleColorMode"
            class="p-2 dark:bg-gray-700  dark:border-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ">
            <svg v-if="isLightMode" xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-700 dark:text-gray-200" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700 dark:text-gray-200"
              viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clip-rule="evenodd" />
            </svg>
          </button>

        </div>
        <NuxtLink to="/auth" class="flex justify-center mb-4">
          <img src="/colorful.png" alt="Logo" class="h-12" />
        </NuxtLink>
        <p class="text-xl text-gray-600 dark:text-gray-300 text-center">Welcome to KQMS!</p>

        <!-- Login sosial -->
        <div class="flex justify-center space-x-4 mt-4">
          <a href="http://localhost:8001/oidc/authenticate/"
            class="p-3 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-600">
            <img src="/google.svg" alt="Google" class="w-6 h-6" />
          </a>
          <a href="#"
            class="p-3 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-600">
            <img src="/outlook.svg" alt="Outlook" class="w-6 h-6" />
          </a>
        </div>
        <!-- Separator -->
        <div class="mt-4 flex items-center justify-between">
          <span class="border-b w-1/5 lg:w-1/4 border-gray-300 dark:border-gray-600"></span>
          <a href="#" class="text-xs text-center text-gray-500 dark:text-gray-400 uppercase">or login with
            email</a>
          <span class="border-b w-1/5 lg:w-1/4 border-gray-300 dark:border-gray-600"></span>
        </div>
        <!-- Email -->
        <div class="mt-4">
          <label class="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Username</label>
          <input v-model="email"
            class="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:outline-none focus:shadow-outline border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full appearance-none focus:ring-gray-500"
            type="email" />
        </div>
        <!-- Password -->
        <div class="relative mt-4">
          <label class="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Password</label>
          <input :type="showPassword ? 'text' : 'password'" v-model="password" required placeholder=""
            class="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded shadow-sm focus:ring-gray-500 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100 focus:outline-none" />
          <button type="button" @click="showPassword = !showPassword"
            class="absolute right-3 top-9 text-sm text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white mt-1">
            {{ showPassword ? '🙈' : '👁️' }}
          </button>
        </div>
        <!-- Submit -->
        <div class="mt-8">
          <button @click="handleLogin"
            class="bg-gray-700 dark:bg-gray-600 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600 dark:hover:bg-gray-500">
            Sign In
          </button>
        </div>

        <!-- Error -->
        <div v-if="error" class="mt-4 text-red-500 text-sm text-center">{{ error }}</div>
        <!-- Sign Up -->
        <div class="mt-4 flex items-center justify-between">
          <span class="border-b w-1/5 md:w-1/4 border-gray-300 dark:border-gray-600"></span>
          <a href="#" class="text-xs text-gray-500 dark:text-gray-400 uppercase">or sign up</a>
          <span class="border-b w-1/5 md:w-1/4 border-gray-300 dark:border-gray-600"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// definePageMeta({ layout: 'auth' })
definePageMeta({ layout: 'auth' } as any)


import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useColorMode } from '#imports'
import axios from 'axios'

// Dark mode
const colorMode = useColorMode()
const toggleColorMode = (): void => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const isLightMode = computed(() => colorMode.value === 'light')

// Router
const router = useRouter()
const route = useRoute()

// Form state
const email = ref<string>('')
const password = ref<string>('')
const error = ref<string>('')
const loading = ref<boolean>(false)
const showPassword = ref<boolean>(false)

// Slideshow logic
const images: string[] = [
  '/assets/images/engineers.jpg',
  '/assets/images/truck-2.jpg',
  '/assets/images/truck-1.jpg'
]
const currentIndex = ref<number>(0)
let intervalId: NodeJS.Timeout | null = null

onMounted(() => {
  // Auto slide
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length
  }, 4000)

  // Handle redirect with token
  const token = route.query.token as string | undefined
  const refresh = route.query.refresh as string | undefined
  const user = route.query.user as string | undefined

  if (token) {
    localStorage.setItem('access', token)
    if (refresh) localStorage.setItem('refresh', refresh)
    if (user) {
      localStorage.setItem('user', user)
      localStorage.setItem('email', user)
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    router.push('/dashboard')
  }
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})

// Login submit
const handleLogin = async (): Promise<void> => {
  loading.value = true
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'Email and password are required.'
    loading.value = false
    return
  }

  try {
    const res = await axios.post('http://localhost:8001/api/token/', {
      username: email.value,
      password: password.value
    })

    const { access, refresh } = res.data

    localStorage.setItem('access', access)
    localStorage.setItem('refresh', refresh)
    localStorage.setItem('email', email.value)
    axios.defaults.headers.common['Authorization'] = `Bearer ${access}`

    router.push('/dashboard')
  } catch (e: any) {
    if (e.response?.data) {
      const errData = e.response.data
      const firstKey = Object.keys(errData)[0]
      error.value = errData[firstKey][0] || 'Login failed.'
    } else {
      error.value = 'Login gagal. Periksa koneksi atau kredensial.'
    }
  } finally {
    loading.value = false
  }
}

// Axios refresh interceptor
axios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refresh')
      if (refreshToken) {
        try {
          const res = await axios.post('http://localhost:8001/api/token/refresh/', {
            refresh: refreshToken
          })

          const newAccess = res.data.access
          localStorage.setItem('access', newAccess)
          axios.defaults.headers.common['Authorization'] = `Bearer ${newAccess}`

          // Ulangi request sebelumnya
          error.config.headers['Authorization'] = `Bearer ${newAccess}`
          return axios(error.config)
        } catch (refreshError) {
          console.error('Refresh token invalid:', refreshError)
          localStorage.clear()
          window.location.href = '/auth'
        }
      }
    }
    return Promise.reject(error)
  }
)
</script>
