<template>
  <div class="wrapper">
    <h1 class="title">
      <span>C нами Вы найдете </span>
      <span>работу своей мечты.</span>
    </h1>

    <form>
      <label>
        Место работы
        <div class="dropdown" @click="toggle(1)">
          <div class="dropdown-selected" :class="{ placeholder: !selected1 }">
            {{ selected1 || "Выбрать место работы" }}
          </div>
          <div class="dropdown-list" v-if="open === 1">
            <div class="dropdown-item"
                 v-for="(item, i) in places"
                 :key="item"
                 :class="{ first: i === 0, last: i === places.length - 1 }"
                 @click.stop="select(1, item)">
              {{ item }}
            </div>
          </div>
        </div>
      </label>

      <label>
        Категория работы
        <div class="dropdown" @click="toggle(2)">
          <div class="dropdown-selected" :class="{ placeholder: !selected2 }">
            {{ selected2 || "Выбрать категорию" }}
          </div>
          <div class="dropdown-list" v-if="open === 2">
            <div class="dropdown-item"
                 v-for="(item, i) in categories"
                 :key="item"
                 :class="{ first: i === 0, last: i === categories.length - 1 }"
                 @click.stop="select(2, item)">
              {{ item }}
            </div>
          </div>
        </div>
      </label>

      <label>
        Ключевое слово
        <input type="text" placeholder="Введите запрос" />
      </label>

      <button class="search-btn">Показать результаты</button>
    </form>
  </div>
</template>

<style scoped>
.wrapper {
    height: 530px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #1538d4;
}

.title {
    text-align: center;
    margin: 25px 0;
}

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
    padding: 25px;
    border-radius: 15px;

    /* ВЫРАВНИВАНИЕ ВСЕХ ЭЛЕМЕНТОВ ПО ЦЕНТРУ ВЕРТИКАЛЬНО */
    align-items: center;
}

/* MOBILE */
@media (max-width: 768px) {
    .title {
        font-size: 17px;
    }
    .wrapper {
        height: 430px;
    }
    form {
        border-radius: 0;
        grid-template-columns: 1fr;
    }
}

/* ЛЕЙБЛЫ — ВИДИМЫЕ */
label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
    font-size: 15px;
    color: black;
}

/* === ЕДИНЫЙ СТИЛЬ ДЛЯ INPUT И DROPDOWN === */
input,
.dropdown-selected,
.dropdown-item {
    font-family: inherit;
    font-size: 16px;
    color: black;
}

/* INPUT */
input {
    height: 50px;
    border: 2px solid black;
    border-radius: 0;
    padding: 0 15px;
    width: 100%;
}

input::placeholder {
    color: #888888;
    opacity: 0.7;
}

/* DROPDOWN */
.dropdown {
    position: relative;
    width: 100%;
}

.dropdown-selected {
    height: 50px;
    border: 2px solid black;
    border-radius: 0;
    padding: 0 15px;
    display: flex;
    align-items: center;
    color: black;
}

/* placeholder dropdown */
.placeholder {
    color: #888888 !important;
    opacity: 0.7;
}

.dropdown-list {
    position: absolute;
    top: 52px;
    left: 0;
    right: 0;
    background: white;
    border: 2px solid black;
    border-radius: 0;
    z-index: 10;
}

.dropdown-item {
    padding: 10px 15px;
    cursor: pointer;
    color: black;
}

.dropdown-item:hover {
    background: #eaeaea;
}

/* КНОПКА НА ВСЮ ШИРИНУ */
.search-btn {
    grid-column: 1 / -1;
    height: 50px;
    background: #00c853;
    border: none;
    border-radius: 0;
    color: white;
    font-size: 18px;
    cursor: pointer;
    width: 100%;
}

.search-btn:hover {
    background: #00b44a;
}

</style>


<script>
export default {
  data() {
    return {
      open: null,
      selected1: "",
      selected2: "",
      places: ["Рига", "Даугавпилс", "Юрмала"],
      categories: ["IT", "Строительство", "Логистика"]
    }
  },
  methods: {
    toggle(id) {
      this.open = this.open === id ? null : id
    },
    select(id, value) {
      if (id === 1) this.selected1 = value
      if (id === 2) this.selected2 = value
      this.open = null
    }
  }
}
</script>
