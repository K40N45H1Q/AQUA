<template>
  <div class="search-wrapper" ref="root">
    <h1 class="title">
      <span>{{ t('header.title.part1') }}</span>
      <span>{{ t('header.title.part2') }}</span>
    </h1>

    <form @submit.prevent>
      <!-- PLACE -->
      <label class="field">
        {{ t('search.placeLabel') }}
        <div class="dropdown" ref="placeRoot">
          <div
            id="dropdown-selected-place"
            class="dropdown-selected"
            :class="{ placeholder: selectedPlaceIndex === null }"
            @click.stop="toggle(1)"
            role="button"
            :aria-expanded="open === 1"
            :aria-controls="'dropdown-list-place'"
            tabindex="0"
            @keydown.enter.prevent="toggle(1)"
            @keydown.space.prevent="toggle(1)"
          >
            <span v-if="selectedPlaceIndex === null">{{ t('search.placeLabel') }}</span>
            <span v-else>{{ places[selectedPlaceIndex] }}</span>
          </div>

          <teleport to="body" v-if="open === 1">
            <div
              id="dropdown-list-place"
              class="dropdown-list-teleported"
              :style="teleportStyles[1]"
              ref="teleportedPlace"
              role="listbox"
              :aria-labelledby="'dropdown-selected-place'"
              @keydown.escape.prevent="close()"
              @click.stop
            >
              <div
                class="dropdown-item"
                v-for="(item, i) in places"
                :key="`place-${i}`"
                role="option"
                :aria-selected="selectedPlaceIndex === i"
                @click.stop="select(1, i)"
                @keydown.enter.prevent="select(1, i)"
                tabindex="0"
              >
                {{ item }}
              </div>
              <div v-if="places.length === 0" class="dropdown-item disabled">{{ t('search.noPlaces') }}</div>
            </div>
          </teleport>
        </div>
      </label>

      <!-- CATEGORY -->
      <label class="field">
        {{ t('search.categoryLabel') }}
        <div class="dropdown" ref="categoryRoot">
          <div
            id="dropdown-selected-category"
            class="dropdown-selected"
            :class="{ placeholder: selectedCategoryIndex === null }"
            @click.stop="toggle(2)"
            role="button"
            :aria-expanded="open === 2"
            :aria-controls="'dropdown-list-category'"
            tabindex="0"
            @keydown.enter.prevent="toggle(2)"
            @keydown.space.prevent="toggle(2)"
          >
            <span v-if="selectedCategoryIndex === null">{{ t('search.categoryLabel') }}</span>
            <span v-else>{{ categories[selectedCategoryIndex] }}</span>
          </div>

          <teleport to="body" v-if="open === 2">
            <div
              id="dropdown-list-category"
              class="dropdown-list-teleported"
              :style="teleportStyles[2]"
              ref="teleportedCategory"
              role="listbox"
              :aria-labelledby="'dropdown-selected-category'"
              @keydown.escape.prevent="close()"
              @click.stop
            >
              <div
                class="dropdown-item"
                v-for="(item, i) in categories"
                :key="`cat-${i}`"
                role="option"
                :aria-selected="selectedCategoryIndex === i"
                @click.stop="select(2, i)"
                @keydown.enter.prevent="select(2, i)"
                tabindex="0"
              >
                {{ item }}
              </div>
              <div v-if="categories.length === 0" class="dropdown-item disabled">{{ t('search.noCategories') }}</div>
            </div>
          </teleport>
        </div>
      </label>

      <!-- KEYWORD -->
      <label class="field">
        {{ t('search.keywordLabel') }}
        <input
          type="text"
          :placeholder="t('search.keywordLabel')"
          v-model="keyword"
          @keydown.enter.prevent="onSearch"
        />
      </label>

      <button class="search-btn" type="button" @click="onSearch">{{ t('search.button') }}</button>
    </form>
  </div>
</template>

<script>
import localeData from '../i18n/locale.json'
import { ref, reactive, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'SearchForm',
  setup(_, { emit }) {
    // i18n: используем useI18n если доступен
    let i18n
    try {
      i18n = useI18n({ useScope: 'global' })
    } catch (e) {
      i18n = null
    }

    // state
    const open = ref(null)
    const selectedPlaceIndex = ref(null)
    const selectedCategoryIndex = ref(null)
    const keyword = ref('')
    const _localeData = localeData || {}

    // refs
    const root = ref(null)
    const placeRoot = ref(null)
    const categoryRoot = ref(null)
    const teleportedPlace = ref(null)
    const teleportedCategory = ref(null)

    // teleport styles
    const teleportStyles = reactive({
      1: { position: 'absolute', left: '0px', top: '0px', width: '200px', zIndex: '2147483647' },
      2: { position: 'absolute', left: '0px', top: '0px', width: '200px', zIndex: '2147483647' }
    })

    // локаль (берём из i18n если есть, иначе из localStorage)
    const _locale = computed(() => {
      try {
        if (i18n && i18n.locale) {
          return (typeof i18n.locale === 'string' ? i18n.locale : i18n.locale.value).split('-')[0]
        }
        return (localStorage.getItem('lang') || 'ru').split('-')[0]
      } catch {
        return 'ru'
      }
    })

    // получение массивов из locale.json
    const _getArray = (key) => {
      const langData = _localeData[_locale.value] || _localeData.ru || {}
      const value = key.split('.').reduce((obj, part) => obj?.[part], langData)
      return Array.isArray(value) && value.length > 0 ? value : []
    }

    const places = computed(() => _getArray('search.places'))
    const categories = computed(() => _getArray('search.categories'))

    // функция перевода: сначала i18n.t, затем fallback в locale.json
    const t = (key, ...args) => {
      // 1) try i18n.t if available
      try {
        if (i18n && typeof i18n.t === 'function') {
          const res = i18n.t(key, ...args)
          // i18n.t может вернуть ключ если не найден — проверяем
          if (res && res !== key) return res
        }
      } catch (e) {
        // ignore
      }
      // 2) fallback to local JSON
      const langData = _localeData[_locale.value] || _localeData.ru || {}
      const value = key.split('.').reduce((obj, part) => obj?.[part], langData)
      if (typeof value === 'string') return value
      // 3) last resort: return provided default or key
      return args[0] || key
    }

    // позиционирование телепорта
    const updateTeleportPosition = (id) => {
      const rootEl = id === 1 ? placeRoot.value : categoryRoot.value
      if (!rootEl) return
      const rect = rootEl.getBoundingClientRect()
      teleportStyles[id] = {
        position: 'absolute',
        left: `${rect.left + window.scrollX}px`,
        top: `${rect.bottom + window.scrollY + 6}px`,
        width: `${rect.width}px`,
        zIndex: '2147483647'
      }
    }

    const toggle = async (id) => {
      open.value = open.value === id ? null : id
      await nextTick()
      if (open.value === id) updateTeleportPosition(id)
    }

    const close = () => { open.value = null }

    const select = (id, index) => {
      if (id === 1) selectedPlaceIndex.value = index
      if (id === 2) selectedCategoryIndex.value = index
      open.value = null
    }

    const onSearch = () => {
      emit('search', {
        place: selectedPlaceIndex.value !== null ? places.value[selectedPlaceIndex.value] : null,
        category: selectedCategoryIndex.value !== null ? categories.value[selectedCategoryIndex.value] : null,
        keyword: keyword.value?.trim() || null
      })
      open.value = null
    }

    const onGlobalClick = (e) => {
      const target = e.target
      const isInsideRoot = root.value && root.value.contains(target)
      const isInsideTeleportedPlace = teleportedPlace.value && teleportedPlace.value.contains && teleportedPlace.value.contains(target)
      const isInsideTeleportedCategory = teleportedCategory.value && teleportedCategory.value.contains && teleportedCategory.value.contains(target)
      if (!isInsideRoot && !isInsideTeleportedPlace && !isInsideTeleportedCategory) {
        open.value = null
      }
    }

    const onScrollOrResize = () => {
      if (open.value === 1) updateTeleportPosition(1)
      if (open.value === 2) updateTeleportPosition(2)
    }

    watch(open, (val) => {
      if (val) nextTick(() => updateTeleportPosition(val))
    })

    onMounted(() => {
      window.addEventListener('click', onGlobalClick, true)
      window.addEventListener('resize', onScrollOrResize)
      window.addEventListener('scroll', onScrollOrResize, true)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('click', onGlobalClick, true)
      window.removeEventListener('resize', onScrollOrResize)
      window.removeEventListener('scroll', onScrollOrResize, true)
    })

    return {
      root, placeRoot, categoryRoot, teleportedPlace, teleportedCategory,
      open, selectedPlaceIndex, selectedCategoryIndex, keyword,
      places, categories, t,
      toggle, select, onSearch, close,
      teleportStyles
    }
  }
}
</script>

<!-- Scoped styles оставлены для компонента -->
<style scoped>
.search-wrapper {
  height: 530px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(21, 56, 212, 0.9);
}

.title { text-align: center; margin: 25px 0; font-weight: 600; letter-spacing: 0.3px; }
.title span:nth-child(1) { color: #ffffff; }
.title span:nth-child(2) { color: #00ff00; }

form {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  background: #ffffff;
  padding: 28px;
  border-radius: 16px;
  align-items: center;
  position: relative;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
}

.field { display: flex; flex-direction: column; gap: 6px; width: 100%; font-size: 15px; color: #111; font-weight: 500; }

input, .dropdown-selected, .dropdown-item { font-family: inherit; font-size: 16px; color: #111 !important; }

input {
  height: 50px;
  border: 1.5px solid #d0d0d0;
  border-radius: 10px;
  padding: 0 15px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  transition: 0.2s ease;
  background: #fff;
}

input:focus { border-color: #1538d4; box-shadow: 0 0 0 3px rgba(21, 56, 212, 0.15); }
input::placeholder { color: #888; opacity: 0.7; }

.dropdown { position: relative; width: 100%; cursor: pointer; }
.dropdown-selected {
  height: 50px;
  border: 1.5px solid #d0d0d0;
  border-radius: 10px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  background: #fff;
  box-sizing: border-box;
  transition: 0.2s ease;
}
.dropdown-selected:hover { border-color: #b5b5b5; }
.placeholder { color: #888 !important; opacity: 0.7; }
.dropdown-selected > span {
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: inherit;
  line-height: 50px;
}

.search-btn {
  grid-column: 1 / -1;
  height: 50px;
  background: #00c853;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 18px;
  cursor: pointer;
  width: 100%;
  transition: 0.2s ease;
  font-weight: 600;
}
.search-btn:hover { background: #00b44a; transform: translateY(-1px); }
.search-btn:active { transform: translateY(0); }

@media (max-width: 768px) {
  .title { font-size: 20px; }
  .search-wrapper { height: 430px; align-items: center; justify-content: center; }
  form { border-radius: 0; grid-template-columns: 1fr; padding: 20px; }
}

.dropdown-item { padding: 10px 15px; cursor: pointer; white-space: nowrap; transition: 0.15s ease; }
.dropdown-item:hover { background: #f3f6ff; }
.dropdown-item.disabled { color: #888; cursor: default; background: transparent; }

/* скрываем скролл внутри scoped стилей */
.dropdown-list-teleported { scrollbar-width: none; }
.dropdown-list-teleported::-webkit-scrollbar { width: 0; height: 0; }
</style>

<!-- Глобальные стили для телепортированных списков (обязательно не scoped) -->
<style>
.dropdown-list-teleported {
  position: absolute;
  background: #fff;
  border: 1.5px solid #e0e0e0;
  max-height: 250px;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0,0,0,0.12);
  border-radius: 10px;
  z-index: 2147483647;
  -webkit-overflow-scrolling: touch;
}
.dropdown-list-teleported .dropdown-item { padding: 10px 15px; cursor: pointer; white-space: nowrap; }
.dropdown-list-teleported .dropdown-item:hover { background: #f3f6ff; }
</style>
