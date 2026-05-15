<template>
  <teleport to="body">
    <div
      v-if="modelValue"
      class="modal-overlay"
      @click.self="close"
      role="presentation"
    >
      <div
        class="modal"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
        ref="dialog"
      >
        <header class="modal-header">
          <h2 class="modal-title">{{ title }}</h2>
          <button class="modal-close" @click="close" aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </header>

        <form class="modal-body" @submit.prevent="submit">
          <label class="field">
            <span class="field-label">{{ $t('email') }}</span>
            <input ref="firstInput" v-model="email" type="email" required autocomplete="email" />
          </label>

          <label class="field">
            <span class="field-label">{{ $t('password') }}</span>
            <input v-model="password" type="password" required autocomplete="current-password" />
          </label>

          <div class="modal-actions">
            <button type="submit" class="btn primary">{{ $t('sign') }}</button>
            <button type="button" class="btn" @click="close">{{ $t('up') }}</button>
          </div>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  // Ожидается ключ перевода, например 'login'
  title: { type: String, default: '🔒' }
})
const emit = defineEmits(['update:modelValue', 'submit'])

const email = ref('')
const password = ref('')
const dialog = ref(null)
const firstInput = ref(null)

function close() {
  emit('update:modelValue', false)
}

function submit() {
  emit('submit', { email: email.value, password: password.value })
  // очищаем поля после отправки
  email.value = ''
  password.value = ''
  close()
}

function onKeydown(e) {
  if (e.key === 'Escape') close()
}

watch(() => props.modelValue, (val) => {
  if (val) {
    // фокус на первый инпут
    setTimeout(() => firstInput.value?.focus(), 0)
    document.addEventListener('keydown', onKeydown)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', onKeydown)
    document.body.style.overflow = ''
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.36);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}
.modal {
  width: 420px;
  max-width: calc(100% - 32px);
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  overflow: hidden;
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.modal-title { font-size: 18px; font-weight: 600; color: #111; margin: 0; }
.modal-close {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.modal-body { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
.field { display: flex; flex-direction: column; gap: 6px; }
.field-label { font-size: 13px; color: #555; }
input[type="email"], input[type="password"] {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.08);
  font-size: 14px;
  outline: none;
}
input:focus {
  box-shadow: 0 0 0 3px rgba(21,56,212,0.12);
  border-color: rgba(21,56,212,0.6);
}
.modal-actions { display:flex; gap: 8px; justify-content: flex-end; margin-top: 6px; }
.btn { padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(0,0,0,0.08); background: #fff; cursor: pointer; }
.btn.primary { background: rgba(21,56,212,0.95); color: #fff; border: none; }

button {
    width: 100%;
    background-color: #00c853 !important;
    color: #000 !important;
    border: 1px solid black !important;
}

button:hover {
    color: #fff;
    background-color: #4f46e5;
}

.modal-close {
    width: max-content;
    border-radius: 50%;
}

input {
    color: black !important;
    outline: none !important;
    border: 1px solid black !important;
}
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.36);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

</style>
