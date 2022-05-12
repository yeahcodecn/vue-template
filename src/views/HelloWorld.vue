<script setup>
import { ref } from 'vue'
import ColorPicker from '@/components/ColorPicker'
let color = ref('#00FF00')
let swatches = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#577590', '#22223b', '#4a4e69', '#c9ada7']
function changedColor(color) {
  console.warn('Changed Color', color)
}
function swatchAdded(color) {
  console.log('Swatch Added', color)
}
function swatchDeleted(color) {
  console.log('Swatch Deleted', color)
}
</script>

<template>
  <div class="m-6" :style="{ background: color }">
    <color-picker v-model="color" v-model:swatches="swatches" :hide-swatches="false" @change="changedColor" @addSwatch="swatchAdded" @deleteSwatch="swatchDeleted"></color-picker>
  </div>
</template>

<style scoped lang="scss"></style>
