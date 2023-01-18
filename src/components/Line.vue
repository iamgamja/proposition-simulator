<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getWidth, getOneLineHeight } from '../util/getSize'

const props = defineProps<{
  idx: number
  isFirst: boolean
  isLast: boolean
  isTmp: boolean
}>()

const emit = defineEmits(['inc', 'dec'])

const nameInputEle = ref<HTMLInputElement | null>(null)
const expressionTextareaEle = ref<HTMLInputElement | null>(null)

const nameValue = ref('')
const expressionValue = ref('')

const isEmpty = computed(() => {
  return !nameValue.value && !expressionValue.value
})

function updateLinesCount() {
  if (props.isTmp && !isEmpty.value) emit('inc')
  if (props.isLast && isEmpty.value) emit('dec')
}

function updateSize() {
  // name
  if (!nameInputEle.value) throw new Error('없는')

  nameInputEle.value.style.width = `${getWidth(nameInputEle.value)}px`

  // expression
  if (!expressionTextareaEle.value) throw new Error('없는')

  expressionTextareaEle.value.style.height = '0'
  const line = getOneLineHeight()
  expressionTextareaEle.value.style.height = `${line * Math.floor((expressionTextareaEle.value.scrollHeight - line) / line)}px`
}

onMounted(() => {
  updateSize()
})
</script>

<template>
  <div class="line" :class="{ 'last-line': isTmp && !isFirst }">
    <input class="line-input name-input" ref="nameInputEle" v-model="nameValue" @keyup="updateLinesCount" @input="updateSize" />
    <span class="equal"> = </span>
    <textarea class="line-input expression-input" ref="expressionTextareaEle" v-model="expressionValue" @keyup="updateLinesCount" @input="updateSize" />
  </div>
</template>

<style scoped>
.line {
  display: flex;
  align-items: center;

  border: 0.1rem coral solid;
  /* border: 0.1rem chocolate solid; */
  border-radius: 0.3rem;
  margin-bottom: 0.5rem;

  font-family: monospace;
}

.last-line {
  opacity: 0.3;
}

.equal {
  margin: 0 0.2rem;
}

.line-input {
  border: 0.1rem cyan solid;
  margin: 0.1rem;
  padding: 0.6rem;

  font-family: monospace;
}

.expression-input {
  flex: 1;
  resize: none;
  overflow-y: hidden;
}
</style>
