<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Your Account</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-1">Manage your profile and preferences</p>
    </div>

    <div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
      <div class="px-6 py-8 border-b border-gray-200 dark:border-gray-700">
        <div class="flex flex-col md:flex-row md:items-center">
          <div class="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <div class="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              JD
            </div>
          </div>
          <div class="flex-1">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">John Doe</h2>
            <p class="text-gray-600 dark:text-gray-400">Mining Operations Manager</p>
            <div class="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              john.doe@nickelmine.example.com
            </div>
            <div class="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +1 (555) 123-4567
            </div>
          </div>
          <div class="mt-4 md:mt-0">
            <button class="btn btn-primary">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Account Information</h3>
          <button class="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 text-sm font-medium transition-colors">
            Edit
          </button>
        </div>
        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Employee ID</p>
            <p class="mt-1 text-gray-900 dark:text-white">NM-7842</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Department</p>
            <p class="mt-1 text-gray-900 dark:text-white">Operations</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Role</p>
            <p class="mt-1 text-gray-900 dark:text-white">Manager</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Location</p>
            <p class="mt-1 text-gray-900 dark:text-white">Site A - Main Office</p>
          </div>
        </div>
      </div>

      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Security</h3>
          <button class="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 text-sm font-medium transition-colors">
            Change
          </button>
        </div>
        <div class="mt-4">
          <p class="text-sm text-gray-500 dark:text-gray-400">Password</p>
          <p class="mt-1 text-gray-900 dark:text-white">••••••••••</p>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Last changed: 45 days ago</p>
        </div>
      </div>

      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Preferences</h3>
        </div>
        <div class="mt-4 space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-900 dark:text-white">Email Notifications</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Receive daily reports and alerts via email</p>
            </div>
            <div class="relative inline-block w-12 mr-2 align-middle select-none">
              <input type="checkbox" id="toggle-email" class="sr-only" checked />
              <label for="toggle-email" class="block h-6 rounded-full overflow-hidden cursor-pointer bg-gray-300 dark:bg-gray-700">
                <span class="block h-6 w-6 rounded-full bg-white transform translate-x-6 transition-transform duration-200"></span>
              </label>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-900 dark:text-white">SMS Alerts</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Receive critical alerts via SMS</p>
            </div>
            <div class="relative inline-block w-12 mr-2 align-middle select-none">
              <input type="checkbox" id="toggle-sms" class="sr-only" checked />
              <label for="toggle-sms" class="block h-6 rounded-full overflow-hidden cursor-pointer bg-gray-300 dark:bg-gray-700">
                <span class="block h-6 w-6 rounded-full bg-white transform translate-x-6 transition-transform duration-200"></span>
              </label>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-900 dark:text-white">Dark Mode</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Use dark theme for interface</p>
            </div>
            <div class="relative inline-block w-12 mr-2 align-middle select-none">
              <input type="checkbox" id="toggle-theme" class="sr-only" :checked="colorMode === 'dark'" @change="toggleColorMode" />
              <label for="toggle-theme" class="block h-6 rounded-full overflow-hidden cursor-pointer bg-gray-300 dark:bg-gray-700">
                <span class="block h-6 w-6 rounded-full bg-white transform transition-transform duration-200" :class="colorMode === 'dark' ? 'translate-x-6' : 'translate-x-0'"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="px-6 py-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Sessions</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div class="flex items-center">
              <div class="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <p class="text-gray-900 dark:text-white font-medium">Current Session</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">Chrome on macOS • San Francisco, USA</p>
              </div>
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-400">Active now</span>
          </div>
          
          <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div class="flex items-center">
              <div class="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <p class="text-gray-900 dark:text-white font-medium">Safari on iPhone</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">San Francisco, USA</p>
              </div>
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-400">3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Get color mode from provide
const { mode: colorMode, toggle: toggleColorMode } = inject('colorMode')
</script>