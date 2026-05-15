<template>
  <div class="wrapper" ref="root">
    <h1 class="title">
      <span>{{ t('header.title.part1') }}</span>
      <span>{{ t('header.title.part2') }}</span>
    </h1>

    <form @submit.prevent>
      <label>
        {{ t('search.placeLabel') }}
        <div class="dropdown">
          <div class="dropdown-selected" :class="{ placeholder: selectedPlaceIndex === null }" @click.stop="toggle(1)">
            <span v-if="selectedPlaceIndex === null">{{ t('search.placeLabel') }}</span>
            <span v-else>{{ places[selectedPlaceIndex] }}</span>
          </div>
          <div class="dropdown-list" v-if="open === 1">
            <div class="dropdown-item" v-for="(item, i) in places" :key="`place-${i}`" @click.stop="select(1, i)">
              {{ item }}
            </div>
            <div v-if="places.length === 0" class="dropdown-item disabled">{{ t('search.noPlaces') }}</div>
          </div>
        </div>
      </label>

      <label>
        {{ t('search.categoryLabel') }}
        <div class="dropdown">
          <div class="dropdown-selected" :class="{ placeholder: selectedCategoryIndex === null }" @click.stop="toggle(2)">
            <span v-if="selectedCategoryIndex === null">{{ t('search.categoryLabel') }}</span>
            <span v-else>{{ categories[selectedCategoryIndex] }}</span>
          </div>
          <div class="dropdown-list" v-if="open === 2">
            <div class="dropdown-item" v-for="(item, i) in categories" :key="`cat-${i}`" @click.stop="select(2, i)">
              {{ item }}
            </div>
            <div v-if="categories.length === 0" class="dropdown-item disabled">{{ t('search.noCategories') }}</div>
          </div>
        </div>
      </label>

      <label>
        {{ t('search.keywordLabel') }}
        <input type="text" :placeholder="t('search.keywordLabel')" v-model="keyword" />
      </label>

      <button class="search-btn" @click="onSearch">{{ t('search.button') }}</button>
    </form>
  </div>
</template>

<script>
import localeData from '../i18n/locale.json'

export default {
  name: 'SearchForm',
  data() {
    return {
      open: null,
      selectedPlaceIndex: null,
      selectedCategoryIndex: null,
      keyword: '',
      _localeData: localeData || {}
    }
  },
  computed: {
    _locale() {
      try {
        return (this.$i18n?.locale || this.$i18n?.global?.locale || localStorage.getItem('lang') || 'ru').split('-')[0]
      } catch { return 'ru' }
    },
    places() { return this._getArray('search.places') },
    categories() { return this._getArray('search.categories') }
  },
  methods: {
    _getArray(key) {
      const langData = this._localeData[this._locale] || this._localeData.ru || {}
      const value = key.split('.').reduce((obj, part) => obj?.[part], langData)
      return Array.isArray(value) && value.length > 0 ? value : []
    },
    t(key, ...args) {
      if (typeof this.$t === 'function') {
        try { const res = this.$t(key, ...args); if (res && res !== key) return res } catch {}
      }
      const langData = this._localeData[this._locale] || this._localeData.ru || {}
      const value = key.split('.').reduce((obj, part) => obj?.[part], langData)
      return typeof value === 'string' ? value : (args[0] || key)
    },
    toggle(id) { this.open = this.open === id ? null : id },
    select(id, index) {
      if (id === 1) this.selectedPlaceIndex = index
      if (id === 2) this.selectedCategoryIndex = index
      this.open = null
    },
    onSearch() {
      this.$emit('search', {
        place: this.selectedPlaceIndex !== null ? this.places[this.selectedPlaceIndex] : null,
        category: this.selectedCategoryIndex !== null ? this.categories[this.selectedCategoryIndex] : null,
        keyword: this.keyword?.trim() || null
      })
    }
  },
  mounted() {
    this._outsideHandler = (e) => { if (this.$refs.root && !this.$refs.root.contains(e.target)) this.open = null }
    window.addEventListener('click', this._outsideHandler)
  },
  beforeUnmount() { window.removeEventListener('click', this._outsideHandler) }
}
</script>

<style scoped>
.wrapper { height: 530px; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #1538d4; }
.title { text-align: center; margin: 25px 0; }
.title span:nth-child(1) { color: #ffffff; }
.title span:nth-child(2) { color: #00ff00; }
form { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; width: 100%; max-width: 900px; margin: 0 auto; background: #ffffff; padding: 25px; border-radius: 15px; align-items: center; position: relative; }
@media (max-width: 768px) { .title { font-size: 17px; } .wrapper { height: 430px; } form { border-radius: 0; grid-template-columns: 1fr; } }
label { display: flex; flex-direction: column; gap: 6px; width: 100%; font-size: 15px; color: black; }
input, .dropdown-selected, .dropdown-item { font-family: inherit; font-size: 16px; color: black !important; }
input { height: 50px; border: 2px solid black; border-radius: 0; padding: 0 15px; width: 100%; box-sizing: border-box; }
input::placeholder { color: #888888; opacity: 0.7; }
.dropdown { position: relative; width: 100%; cursor: pointer; }
.dropdown-selected { height: 50px; border: 2px solid black; border-radius: 0; padding: 0 15px; display: flex; align-items: center; cursor: pointer; user-select: none; background: #fff; box-sizing: border-box; }
.placeholder { color: #888888 !important; opacity: 0.7; }
.dropdown-list { position: absolute; top: 52px; left: 0; right: 0; background: white; border: 2px solid black; z-index: 9999; max-height: 250px; overflow-y: auto; box-shadow: 0 6px 18px rgba(0,0,0,0.08); }
.dropdown-item { padding: 10px 15px; cursor: pointer; white-space: nowrap; }
.dropdown-item:hover { background: #eaeaea; }
.dropdown-item.disabled { color: #888; cursor: default; background: transparent; }
.search-btn { grid-column: 1 / -1; height: 50px; background: #00c853; border: none; border-radius: 0; color: white; font-size: 18px; cursor: pointer; width: 100%; }
.search-btn:hover { background: #00b44a; }
.dropdown-selected > span { display: block; width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: inherit; line-height: 50px; }
</style>