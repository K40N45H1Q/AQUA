<style scoped>
nav button[aria-haspopup],
div > button[aria-haspopup] {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  z-index: 1;
}
img {
  width: 40px;
  height: 28px;
  object-fit: cover;
  border-radius: 4px;
  display: block;
}
div > ul {
  position: fixed;
  margin: 0;
  padding: 6px 0;
  list-style: none;
  background: #fff;
  border-radius: 12px;
  min-width: 120px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 6px 20px rgba(0,0,0,0.18);
  z-index: 9999;
  overflow: hidden;
  max-height: calc(100vh - 20px);
  overflow-y: auto;
  left: 0;
  top: 0;
}
div > ul.mobile-full {
  left: auto;
  right: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  border-radius: 0;
  padding: 20px;
  max-height: 100vh;
}
div > ul > li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  cursor: pointer;
  white-space: nowrap;
  color: #111;
  font-size: 14px;
  background: transparent;
}
div > ul > li:hover {
  background: rgba(0,0,0,0.06);
}

div > ul > li span {
  line-height: 1;
  color: #000;
}
@media (max-width: 900px) {
  div > ul {
    border-radius: 12px 0 0 12px;
    min-width: 220px;
    max-width: 92vw;
  }
}
</style>

<template>
  <div>
    <button
      ref="buttonElementRef"
      aria-haspopup="true"
      :aria-expanded="isMenuOpen"
      @click="toggleMenu"
      type="button"
    >
      <img :src="currentLanguage.flag" alt="" />
    </button>

    <ul
      v-show="isMenuOpen"
      ref="menuElementRef"
      :class="{ 'mobile-full': isMobileFullScreen }"
      :style="menuStyles"
      role="menu"
    >
      <li
        v-for="languageItem in languagesList.filter(item => item.code !== locale.value)"
        :key="languageItem.code"
        role="menuitem"
        @click="selectLanguage(languageItem)"
      >
        <img :src="languageItem.flag" alt="" />
        <span>{{ t('languages.' + languageItem.code) }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const locale = i18n.locale
const t = i18n.t

const isMenuOpen = ref(false)
const buttonElementRef = ref(null)
const menuElementRef = ref(null)
const menuStyles = ref({ left: '0px', top: '0px', minWidth: '120px', maxHeight: 'calc(100vh - 20px)' })
const isMobileFullScreen = ref(false)

const languagesList = [
  { code: 'en', flag: '/flags/gb.svg' },
  { code: 'ru', flag: '/flags/ru.svg' }
]

const currentLanguage = computed(() => languagesList.find(item => item.code === locale.value) || languagesList[0])

async function setMenuPosition() {
  const buttonElement = buttonElementRef.value
  const menuElement = menuElementRef.value
  if (!buttonElement || !menuElement) return
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const mobileBreakpoint = 900
  const padding = 8

  if (viewportWidth <= mobileBreakpoint) {
    isMobileFullScreen.value = true
    menuStyles.value = {
      left: 'auto',
      right: '0px',
      top: '0px',
      minWidth: `${Math.min(320, Math.max(220, Math.round(viewportWidth * 0.92)))}px`,
      maxHeight: `${viewportHeight}px`
    }
    await nextTick()
    return
  }

  isMobileFullScreen.value = false
  const buttonRect = buttonElement.getBoundingClientRect()
  const computedMinWidth = Math.max(120, Math.round(buttonRect.width))
  let computedLeft = Math.round(buttonRect.left)
  let computedTop = Math.round(buttonRect.bottom + 6)
  menuStyles.value = { left: `${computedLeft}px`, top: `${computedTop}px`, minWidth: `${computedMinWidth}px`, maxHeight: `calc(100vh - ${padding * 2}px)` }
  await nextTick()
  const menuRect = menuElement.getBoundingClientRect()
  if (menuRect.right > viewportWidth - padding) {
    computedLeft = Math.max(padding, viewportWidth - Math.round(menuRect.width) - padding)
    menuStyles.value.left = `${computedLeft}px`
  }
  if (menuRect.left < padding) {
    menuStyles.value.left = `${padding}px`
  }
  if (menuRect.bottom > viewportHeight - padding) {
    const aboveTop = Math.round(buttonRect.top - Math.round(menuRect.height) - 6)
    if (aboveTop >= padding) {
      menuStyles.value.top = `${aboveTop}px`
    } else {
      menuStyles.value.top = `${padding}px`
      menuStyles.value.maxHeight = `${viewportHeight - padding * 2}px`
    }
  }
}

async function openMenu() {
  isMenuOpen.value = true
  await nextTick()
  setMenuPosition()
}

function closeMenu() {
  isMenuOpen.value = false
}

function toggleMenu() {
  isMenuOpen.value ? closeMenu() : openMenu()
}

function selectLanguage(languageItem) {
  locale.value = languageItem.code
  localStorage.setItem('lang', languageItem.code)
  closeMenu()
}

function handleDocumentClick(event) {
  const targetElement = event.target
  if (!targetElement) return
  if (buttonElementRef.value?.contains(targetElement)) return
  if (menuElementRef.value?.contains(targetElement)) return
  closeMenu()
}

function handleKeyDown(event) {
  if (event.key === 'Escape') closeMenu()
}

function handleScrollOrResize() {
  if (isMenuOpen.value) setMenuPosition()
}

onMounted(() => {
  const savedLanguage = localStorage.getItem('lang')
  if (savedLanguage) locale.value = savedLanguage
  document.addEventListener('click', handleDocumentClick)
  window.addEventListener('resize', handleScrollOrResize)
  window.addEventListener('scroll', handleScrollOrResize, true)
  document.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
  window.removeEventListener('resize', handleScrollOrResize)
  window.removeEventListener('scroll', handleScrollOrResize, true)
  document.removeEventListener('keydown', handleKeyDown)
})
</script>
