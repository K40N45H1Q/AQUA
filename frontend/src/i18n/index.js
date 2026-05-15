// i18n/index.js — ГАРАНТИРОВАННО РАБОЧИЙ

import { createI18n } from "vue-i18n"
import raw from "./locale.json"

const messages = raw.default || raw

export default createI18n({
  legacy: false,
  locale: localStorage.getItem("lang") || "ru",
  fallbackLocale: "ru",
  messages
})
