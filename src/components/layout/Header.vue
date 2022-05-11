<script setup>
import { ref, toRefs, watch, reactive } from 'vue'
let notificationOpen = ref(false)
let dropdownOpen = ref(false)
// let isDark = ref(false)
const props = defineProps({
  sidebarOpen: {
    type: Boolean,
    required: true,
    default: () => false
  }
})
const refs = toRefs(props)
const emits = defineEmits(['update:sidebarOpen', 'changeDark'])
let isSidebarOpen = ref(false)
watch(refs.sidebarOpen, (val) => {
  isSidebarOpen.value = val
})
watch(isSidebarOpen, (val) => {
  emits('update:sidebarOpen', val)
})
let data = reactive({
  dark: ref(false)
})
function isDarkHandler() {
  data.dark = !data.dark
  document.documentElement.classList.toggle('dark')
  emits('changeDark', data.dark)
}
</script>
<template>
  <header class="flex justify-between items-center py-4 px-6 bg-white dark:bg-gray-500 border-b-4 border-indigo-600">
    <div class="flex items-center">
      <!-- 侧边栏展开折叠按钮 开始 -->
      <button @click="isSidebarOpen = true" class="text-gray-500 dark:text-slate-100 focus:outline-none lg:hidden">
        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </button>
      <!-- 侧边栏展开折叠按钮 开始 -->
      <!-- 搜索框 开始 -->
      <div class="relative mx-4 lg:mx-0">
        <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
          <svg class="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </span>

        <input class="dark:bg-slate-200 dark:text-grey-200 text-gray-700 form-input w-32 sm:w-64 rounded-md pl-10 pr-4 focus:border-indigo-600" type="text" placeholder="Search" />
      </div>
      <!-- 搜索框 结束 -->
    </div>

    <div class="flex items-center">
      <!-- 主题颜色 开始 -->
      <button aria-hidden="true" class="relative focus:outline-none" @click="isDarkHandler">
        <div class="w-12 h-6 transition bg-blue-100 rounded-full outline-none dark:bg-blue-400"></div>
        <div
          class="absolute top-0 left-0 inline-flex items-center justify-center w-6 h-6 transition-all duration-150 transform scale-110 rounded-full shadow-sm translate-x-0 -translate-y-px bg-white text-blue-700"
          :class="!data.dark ? 'translate-x-0 -translate-y-px  bg-white text-blue-700' : 'translate-x-6 text-blue-100 bg-blue-800'">
          <svg :class="!data.dark ? 'block' : 'hidden'" class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
          </svg>
          <svg :class="!data.dark ? 'hidden' : 'block'" class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
          </svg>
        </div>
      </button>
      <!-- 主题颜色 结束 -->
      <!-- 通知按钮 开始 -->
      <div class="relative">
        <div @click="notificationOpen = !notificationOpen" class="dropdown flex mx-4 text-gray-600 focus:outline-none">
          <svg class="h-6 w-6 text-slate-900 dark:text-slate-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"></path>
          </svg>
          <div class="menu absolute right-0 mt-6 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-10" :class="!notificationOpen ? 'hidden' : 'block'">
            <a href="#" class="flex items-center px-4 py-3 text-gray-600 hover:text-white hover:bg-indigo-600 dark:bg-slate-200 dark:hover:bg-indigo-600 -mx-2">
              <img class="h-8 w-8 rounded-full object-cover mx-1" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=334&amp;q=80" alt="avatar" />
              <p class="text-sm mx-2"><span class="font-bold" href="#">Sara Salah</span> replied on the <span class="font-bold text-indigo-400" href="#">Upload Image</span> artical . 2m</p>
            </a>
            <a href="#" class="flex items-center px-4 py-3 text-gray-600 hover:text-white hover:bg-indigo-600 dark:bg-slate-200 dark:hover:bg-indigo-600 -mx-2">
              <img class="h-8 w-8 rounded-full object-cover mx-1" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=634&amp;q=80" alt="avatar" />
              <p class="text-sm mx-2"><span class="font-bold" href="#">Slick Net</span> start following you . 45m</p>
            </a>
            <a href="#" class="flex items-center px-4 py-3 text-gray-600 hover:text-white hover:bg-indigo-600 dark:bg-slate-200 dark:hover:bg-indigo-600 -mx-2">
              <img class="h-8 w-8 rounded-full object-cover mx-1" src="https://images.unsplash.com/photo-1450297350677-623de575f31c?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=334&amp;q=80" alt="avatar" />
              <p class="text-sm mx-2"><span class="font-bold" href="#">Jane Doe</span> Like Your reply on <span class="font-bold text-indigo-400" href="#">Test with TDD</span> artical . 1h</p>
            </a>
            <a href="#" class="flex items-center px-4 py-3 text-gray-600 hover:text-white hover:bg-indigo-600 dark:bg-slate-200 dark:hover:bg-indigo-600 -mx-2">
              <img class="h-8 w-8 rounded-full object-cover mx-1" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=398&amp;q=80" alt="avatar" />
              <p class="text-sm mx-2"><span class="font-bold" href="#">Abigail Bennett</span> start following you . 3h</p>
            </a>
          </div>
        </div>
        <!-- 通知按钮 遮罩层 开始 -->
        <div @click="notificationOpen = false" class="fixed inset-0 h-full w-full z-5" :class="!notificationOpen ? 'hidden' : 'block'"></div>
        <!-- 通知按钮 遮罩层 结束 -->
      </div>
      <!-- 通知按钮 结束 -->
      <!-- 头像下拉 开始 -->
      <div class="relative">
        <button @click="dropdownOpen = !dropdownOpen" class="relative block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none">
          <img class="h-full w-full object-cover" src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=296&amp;q=80" alt="Your avatar" />
        </button>

        <div @click="dropdownOpen = false" class="fixed inset-0 h-full w-full z-10" :class="!dropdownOpen ? 'hidden' : 'block'"></div>

        <div class="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10" :class="!dropdownOpen ? 'hidden' : 'block'">
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white dark:bg-slate-200 dark:hover:bg-indigo-600">Profile</a>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white dark:bg-slate-200 dark:hover:bg-indigo-600">Products</a>
          <a href="/login" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white dark:bg-slate-200 dark:hover:bg-indigo-600">Logout</a>
        </div>
      </div>
      <!-- 头像下拉 结束 -->
    </div>
  </header>
</template>
<style scoped lang="scss">
.form-input {
  appearance: none;
  border-color: #e2e8f0;
  border-width: 1px;
  border-radius: 0.25rem;
  padding: 0.5rem 2.5rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgb(66 153 225 / 50%);
    border-color: #63b3ed;
  }
}
.dropdown:hover .menu {
  display: block;
}
</style>
