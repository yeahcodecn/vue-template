<script setup>
import { ref, onMounted, nextTick, toRefs, computed, onBeforeUnmount } from 'vue'
const props = defineProps({
  modelValue: {
    type: String,
    default: '#00FF00'
  },
  swatches: {
    type: Array,
    default: () => []
  },
  hideSwatches: Boolean
})
const refs = toRefs(props)
const $emit = defineEmits(['update:modelValue', 'update:swatches', 'change', 'deleteSwatch', 'addSwatch'])
let canvasCursor = ref(null)
let canvas = ref(null)
let line = ref(null)
let lineCursor = ref(null)
let opacityLine = ref(null)
let opacityCursor = ref(null)
let draggingLineCursor = ref(false)
let draggingCanvasCursor = ref(false)
let draggingOpacityCursor = ref(false)
let dragStartColor = ref(null)
let lineWidth = ref(160)
let lineLeft = ref(0)
let canvasWidth = ref(208)
let canvasLeft = ref(0)
let canvasTop = ref(0)
let canvasHeight = ref(0)
let opacityWidth = ref(160)
let opacityLeft = ref(0)
let percentageOpacity = ref(0)
let percentageBlack = ref(0)
let percentageWhite = ref(0)
let inputType = ref('rgba')
let colorLazy = ref({
  r: 255,
  g: 219,
  b: 0,
  a: 1,
  hexa: '#FFFE00FF'
})
let colorData = ref({
  r: 0,
  g: 0,
  b: 0,
  a: 1,
  hexa: '#000000FF'
})
let lineColorData = ref({
  r: 0,
  g: 0,
  b: 0
})
let swatchesLazy = ref([])
const mousedownCanvas = (e) => {
  if (e.which !== 1) {
    return
  }
  registerListeners()

  dragStartColor.value = color.value
  draggingCanvasCursor.value = true
  setSizePoses()
  // this.canvasCursor = this.$refs.canvasCursor
  canvasCursor.value.style.transform = `translate(${e.offsetX}px, ${e.offsetY}px)`
  percentageBlack.value = e.offsetY / canvasHeight.value
  percentageWhite.value = 1 - e.offsetX / canvasWidth.value
  setColorData()
  e.stopPropagation()
  e.preventDefault()
}
const setSizePoses = () => {
  let boundingRect = line.value.getBoundingClientRect()
  lineLeft.value = boundingRect.left

  let canvBoundingRect = canvas.value.getBoundingClientRect()
  canvasLeft.value = canvBoundingRect.left
  canvasTop.value = canvBoundingRect.top
  canvasHeight.value = canvBoundingRect.height

  let opacityBoundingRect = opacityLine.value.getBoundingClientRect()
  opacityLeft.value = opacityBoundingRect.left
}
const validateHexChar = (c) => {
  if (c.length < 0 || c.length > 1) return '0'
  if (isNaN(c)) {
    let validChars = ['A', 'B', 'C', 'D', 'E', 'F']
    if (validChars.includes(c.toUpperCase())) {
      return c.toUpperCase()
    } else {
      return '0'
    }
  } else {
    return c
  }
}
const cleanHexa = (hexa) => {
  if (!hexa || hexa.length < 3) return '#000000FF'
  let _cleaned = hexa.toUpperCase()
  if (_cleaned.startsWith('#')) _cleaned = _cleaned.substr(1)
  if (_cleaned.length < 3) return '#000000FF'
  let r, g, b, a
  r = g = b = '00'
  a = 'FF'
  if (_cleaned.length === 3) {
    let rgb = _cleaned
      .split('')
      .map((r) => `0${r}`)
      .map((r) => validateHexChar(r))
    r = rgb[0]
    g = rgb[1]
    b = rgb[2]
  } else if (_cleaned.length >= 6) {
    let rgb = _cleaned.split('').map((r) => validateHexChar(r))
    r = rgb[0] + rgb[1]
    g = rgb[2] + rgb[3]
    b = rgb[4] + rgb[5]
    if (rgb.length === 8) {
      a = rgb[6] + rgb[7]
    }
  }
  return `#${r}${g}${b}${a}`
}
const parseHexa = (hexa) => {
  let hexaArr = cleanHexa(hexa).substr(1).split('')

  let h = hexaArr[0] + hexaArr[1]
  let e = hexaArr[2] + hexaArr[3]
  let x = hexaArr[4] + hexaArr[5]
  let ha = hexaArr[6] + hexaArr[7]
  let r = parseInt(h, 16)
  let g = parseInt(e, 16)
  let b = parseInt(x, 16)
  let a = parseInt(ha, 16) / 255

  return {
    hexa: '#' + h + e + x + ha,
    r,
    g,
    b,
    a
  }
}
const initSwatches = () => {
  if (refs.swatches.value !== null && Array.isArray(refs.swatches.value)) {
    let cleanedSwatches = refs.swatches.value.map((s) => cleanHexa(s))
    cleanedSwatches.forEach((swatch) => {
      if (!swatchesLazy.value.includes(swatch)) {
        swatchesLazy.value.push(swatch)
      }
    })
  } else {
    let cleanedSwatches = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#577590', '#22223b', '#4a4e69', '#c9ada7'].map((s) => cleanHexa(s))
    swatchesLazy.value = cleanedSwatches
  }
}
const componentToHex = (c) => {
  let hex = c.toString(16).toUpperCase()
  return hex.length == 1 ? '0' + hex : hex
}
const validate = () => {
  let r = Number(colorLazy.value.r)
  let g = Number(colorLazy.value.g)
  let b = Number(colorLazy.value.b)
  let a = Number(colorLazy.value.a)
  if (isNaN(r) || r === null) r = 0
  if (isNaN(g) || g === null) g = 0
  if (isNaN(b) || b === null) b = 0
  if (isNaN(a) || a === null) a = 1
  r = Math.min(255, Math.max(0, r))
  g = Math.min(255, Math.max(0, g))
  b = Math.min(255, Math.max(0, b))
  a = Math.min(1, Math.max(0, a))
  colorData.value.r = r
  colorData.value.g = g
  colorData.value.b = b
  colorData.value.a = a
  colorData.value.hexa = '#' + componentToHex(r) + componentToHex(g) + componentToHex(b) + componentToHex(Math.round(a * 255))
  colorLazy.value.hexa = colorData.value.hexa
}
const normalizeColorData = () => {
  let normalized = {
    r: null,
    g: null,
    b: null,
    variable: null
  }
  let { r, g, b } = colorData.value
  if (b > g && b > r) {
    normalized.b = 1
  } else if (g > r && g > b) {
    normalized.g = 1
  } else {
    normalized.r = 1
  }
  if (r < g && r < b) {
    normalized.r = 0
  } else if (g < r && g < b) {
    normalized.g = 0
  } else {
    normalized.b = 0
  }
  Array.from('rgb').forEach((col) => {
    if (normalized[col] === null) {
      normalized.variable = col
      normalized[col] = colorData.value[col] / 255
    }
  })
  return normalized
}
const setUICursors = () => {
  setSizePoses()
  percentageOpacity.value = colorData.value.a
  let opacityX = percentageOpacity.value * opacityWidth.value
  opacityCursor.value.style.transform = `translate(${opacityX}px, 0px)`

  let normalized = normalizeColorData()

  let sector = 0,
    variablePerc = 0
  if (normalized.variable === 'r') {
    if (normalized.g === 1) {
      sector = 1
      variablePerc = 1 - colorData.value.r / 255
    } else if (normalized.b === 1) {
      sector = 4
      variablePerc = colorData.value.r / 255
    }
  } else if (normalized.variable === 'b') {
    if (normalized.r === 1) {
      sector = 5
      variablePerc = 1 - colorData.value.b / 255
    } else if (normalized.g === 1) {
      sector = 2
      variablePerc = colorData.value.b / 255
    }
  } else {
    if (normalized.r === 1) {
      sector = 0
      variablePerc = colorData.value.g / 255
    } else if (normalized.b === 1) {
      sector = 3
      variablePerc = 1 - colorData.value.g / 255
    }
  }
  let sectorLength = lineWidth.value / 6
  let variableSectorLeft = variablePerc * sectorLength

  let lineCursorLeft = sectorLength * sector + variableSectorLeft
  lineCursor.value.style.transform = `translate(${lineCursorLeft}px, 0px)`

  lineColorData.value.r = Math.min(255, Math.max(0, Math.round(normalized.r * 255)))
  lineColorData.value.g = Math.min(255, Math.max(0, Math.round(normalized.g * 255)))
  lineColorData.value.b = Math.min(255, Math.max(0, Math.round(normalized.b * 255)))

  Array.from('rgb').forEach((col) => {
    if (lineColorData.value[col] === 0) {
      percentageWhite.value = colorData.value[col] / 255
    } else if (lineColorData.value[col] === 255) {
      percentageBlack.value = 1 - colorData.value[col] / 255
    }
  })
  let canvCursorX = canvasWidth.value * (1 - percentageWhite.value)
  let canvCursorY = canvasHeight.value * percentageBlack.value
  canvasCursor.value.style.transform = `translate(${canvCursorX}px, ${canvCursorY}px)`
}
const init = () => {
  if (refs.modelValue.value) {
    colorLazy.value = parseHexa(refs.modelValue.value)
  }
  if (!refs.hideSwatches.value) {
    initSwatches()
  }
  validate()
  setUICursors()
}
onMounted(async () => {
  await nextTick(() => {
    init()
  })
})
const modelValue = computed({
  get: () => refs.modelValue.value,
  set: (val) => $emit('update:modelValue', val)
})
const hasSelectedSwatch = computed(() => {
  return swatchesLazy.value.includes(modelValue.value)
})
const opacityLineBackground = computed(() => {
  let opaque = `rgba(${colorData.value.r}, ${colorData.value.g}, ${colorData.value.b}, 0)`
  let solid = `rgba(${colorData.value.r}, ${colorData.value.g}, ${colorData.value.b}, 1)`
  return `linear-gradient(to right, ${opaque}, ${solid})`
})
const color = computed(() => {
  return `rgba(${colorData.value.r}, ${colorData.value.g}, ${colorData.value.b}, ${colorData.value.a})`
})
const canvasColor = computed(() => `rgba(${lineColorData.value.r}, ${lineColorData.value.g}, ${lineColorData.value.b}, 1)`)
const setColorData = () => {
  let targetVal = 255 * (1 - percentageBlack.value)
  targetVal = Math.min(255, Math.max(0, Math.round(targetVal)))

  let remainingR = targetVal - lineColorData.value.r
  let remainingG = targetVal - lineColorData.value.g
  let remainingB = targetVal - lineColorData.value.b

  let rDiff = percentageWhite.value * remainingR
  let gDiff = percentageWhite.value * remainingG
  let bDiff = percentageWhite.value * remainingB

  let r = lineColorData.value.r + rDiff
  let g = lineColorData.value.g + gDiff
  let b = lineColorData.value.b + bDiff

  colorData.value.r = Math.min(targetVal, Math.max(0, Math.round(r)))
  colorData.value.g = Math.min(targetVal, Math.max(0, Math.round(g)))
  colorData.value.b = Math.min(targetVal, Math.max(0, Math.round(b)))
  colorData.value.a = Math.min(1, Math.max(0, Number(percentageOpacity.value.toFixed(2))))

  colorLazy.value.r = colorData.value.r
  colorLazy.value.g = colorData.value.g
  colorLazy.value.b = colorData.value.b
  colorLazy.value.a = colorData.value.a

  colorData.value.hexa = '#' + componentToHex(colorData.value.r) + componentToHex(colorData.value.g) + componentToHex(colorData.value.b) + componentToHex(Math.round(colorData.value.a * 255))
  colorLazy.value.hexa = colorData.value.hexa
  modelValue.value = colorData.value.hexa
}
const unregisterListeners = () => {
  document.removeEventListener('mouseup', mouseup)
  document.removeEventListener('mousemove', mousemove)
}
const calculateLineColor = (linePos) => {
  let perc = linePos / lineWidth.value
  let value = perc % (1 / 6)
  let colorPerc = value / (1 / 6)
  let percRed = 1
  let percGreen = 1
  let percBlue = 1

  if (perc < 1 / 6) {
    percGreen = colorPerc
    percBlue = 0
  } else if (perc < 2 / 6) {
    percRed = 1 - colorPerc
    percBlue = 0
  } else if (perc < 3 / 6) {
    percRed = 0
    percBlue = colorPerc
  } else if (perc < 4 / 6) {
    percRed = 0
    percGreen = 1 - colorPerc
  } else if (perc < 5 / 6) {
    percRed = colorPerc
    percGreen = 0
  } else {
    percGreen = 0
    percBlue = 1 - colorPerc
  }
  lineColorData.value.r = Math.min(255, Math.max(0, Math.round(percRed * 255)))
  lineColorData.value.g = Math.min(255, Math.max(0, Math.round(percGreen * 255)))
  lineColorData.value.b = Math.min(255, Math.max(0, Math.round(percBlue * 255)))
}
const mouseup = () => {
  if (draggingLineCursor.value || draggingCanvasCursor.value || draggingOpacityCursor.value) {
    if (dragStartColor.value !== color.value) {
      $emit('change', colorData.value.hexa)
    }
  }
  draggingLineCursor.value = false
  draggingCanvasCursor.value = false
  draggingOpacityCursor.value = false
  unregisterListeners()
}
const mousemove = (e) => {
  if (draggingLineCursor.value) {
    let pos = e.pageX - lineLeft.value
    pos = Math.min(lineWidth.value, Math.max(0, pos))
    lineCursor.value.style.transform = `translate(${pos}px, 0px)`
    calculateLineColor(pos)
  } else if (draggingCanvasCursor.value) {
    let posX = e.pageX - canvasLeft.value
    let posY = e.pageY - canvasTop.value
    posX = Math.min(canvasWidth.value, Math.max(0, posX))
    posY = Math.min(canvasHeight.value, Math.max(0, posY))
    canvasCursor.value.style.transform = `translate(${posX}px, ${posY}px)`
    percentageBlack.value = posY / canvasHeight.value
    percentageWhite.value = 1 - posX / canvasWidth.value
  } else if (draggingOpacityCursor.value) {
    let pos = e.pageX - opacityLeft.value
    pos = Math.min(opacityWidth.value, Math.max(0, pos))
    opacityCursor.value.style.transform = `translate(${pos}px, 0px)`
    percentageOpacity.value = pos / opacityWidth.value
  }
  setColorData()
}
const registerListeners = () => {
  document.addEventListener('mouseup', mouseup)
  document.addEventListener('mousemove', mousemove)
}
const mousedownLine = (e) => {
  if (e.which !== 1) {
    return
  }
  registerListeners()

  dragStartColor.value = color.value
  draggingLineCursor.value = true
  setSizePoses()
  lineCursor.value.style.transform = `translate(${e.offsetX}px, 0px)`
  calculateLineColor(e.offsetX)
  setColorData()
  e.stopPropagation()
  e.preventDefault()
}
const mousedownOpacity = (e) => {
  if (e.which !== 1) {
    return
  }
  registerListeners()

  dragStartColor.value = color.value
  draggingOpacityCursor.value = true
  setSizePoses()
  opacityCursor.value.style.transform = `translate(${e.offsetX}px, 0px)`
  percentageOpacity.value = e.offsetX / opacityWidth.value
  setColorData()
  e.stopPropagation()
  e.preventDefault()
}
const inputUpdated = () => {
  validate()
  setUICursors()
}
const validateHexa = () => {
  let parsedColor = parseHexa(colorLazy.value.hexa)
  colorData.value = { ...parsedColor }

  colorLazy.value.r = colorData.value.r
  colorLazy.value.g = colorData.value.g
  colorLazy.value.b = colorData.value.b
  colorLazy.value.a = colorData.value.a
}
const hexaInputUpdated = () => {
  validateHexa()
  setUICursors()
}
const blurInputR = () => {
  colorLazy.value.r = colorData.value.r
}
const blurInputG = () => {
  colorLazy.value.g = colorData.value.g
}
const blurInputB = () => {
  colorLazy.value.b = colorData.value.b
}
const blurInputA = () => {
  colorLazy.value.a = colorData.value.a
}
const blurInputHexa = () => {
  colorLazy.value.hexa = colorData.value.hexa
}
const toggleInputs = () => {
  if (inputType.value === 'rgba') {
    inputType.value = 'hexa'
  } else {
    inputType.value = 'rgba'
  }
}
const selectSwatch = (swatchHexa) => {
  var parsedHexa = parseHexa(swatchHexa)
  colorData.value = { ...parsedHexa }
  colorLazy.value = { ...parsedHexa }
  modelValue.value = parsedHexa.hexa
  $emit('change', colorData.value.hexa)

  setUICursors()
}
const deleteSwatch = (swatch) => {
  swatchesLazy.value = swatchesLazy.value.filter((s) => s !== swatch)
  $emit('update:swatches', swatchesLazy.value)
  $emit('deleteSwatch', swatch)
}
const addRemoveCurrentSwatch = () => {
  if (hasSelectedSwatch.value) {
    deleteSwatch(modelValue.value)
  } else {
    swatchesLazy.value.push(modelValue.value)
    $emit('update:swatches', swatchesLazy.value)
    $emit('addSwatch', modelValue.value)
  }
}
onBeforeUnmount(() => {
  unregisterListeners()
})
</script>

<template>
  <div class="border min-w-min w-min rounded-lg bg-white">
    <div class="p-4 w-60">
      <div class="w-52 h-40" :style="{ backgroundColor: canvasColor }">
        <div class="w-full h-full" style="background-image: linear-gradient(90deg, #fff, rgba(204, 154, 129, 0))">
          <div ref="canvas" class="w-full h-full relative cursor-pointer" style="background-image: linear-gradient(0deg, #000, rgba(204, 154, 129, 0))" @mousedown="mousedownCanvas">
            <div ref="canvasCursor" class="h-4 w-4 border border-gray-200 rounded-full bg-white absolute -left-2 -top-2 pointer-events-none" style="box-shadow: 2px 2px 2px 0 rgb(0 0 0 / 20%)"></div>
          </div>
        </div>
      </div>
      <div class="w-52 flex my-2">
        <div class="w-8 h-8 rounded-lg" style="background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAJElEQVQYV2NctWrVfwYkEBYWxojMZ6SDAmT7QGx0K1EcRBsFAADeG/3M/HteAAAAAElFTkSuQmCC') repeat">
          <div :style="{ backgroundColor: color }" class="w-full h-full rounded-lg" />
        </div>
        <div>
          <div ref="line" class="w-40 h-3 ml-4 relative cursor-pointer rounded" style="background-image: linear-gradient(90deg, red 0, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, red)" @mousedown="mousedownLine">
            <div ref="lineCursor" class="h-4 w-4 border border-gray-200 rounded-full bg-white absolute -left-2 pointer-events-none" style="top: -2px; box-shadow: 2px 2px 2px 0 rgb(0 0 0 / 20%)"></div>
          </div>
          <div
            ref="opacityLine"
            class="w-40 h-3 ml-4 mt-2 relative cursor-pointer rounded"
            style="background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAJElEQVQYV2NctWrVfwYkEBYWxojMZ6SDAmT7QGx0K1EcRBsFAADeG/3M/HteAAAAAElFTkSuQmCC') repeat"
            @mousedown="mousedownOpacity">
            <div class="w-full h-full relative" :style="{ background: opacityLineBackground }">
              <div ref="opacityCursor" class="h-4 w-4 border border-gray-200 rounded-full bg-white absolute -left-2 pointer-events-none" style="top: -2px; box-shadow: 2px 2px 2px 0 rgb(0 0 0 / 20%)"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <div v-show="inputType === 'rgba'" class="flex">
          <div>
            <p class="text-center text-gray-500 text-sm">R</p>
            <input v-model="colorLazy.r" @input="inputUpdated" @blur="blurInputR" class="shadow appearance-none border rounded text-center w-10 h-8 text-grey-darker" />
          </div>
          <div class="mx-1">
            <p class="text-center text-gray-500 text-sm">G</p>
            <input v-model="colorLazy.g" @input="inputUpdated" @blur="blurInputG" class="shadow appearance-none border rounded text-center w-10 h-8 text-grey-darker" />
          </div>
          <div class="mr-1">
            <p class="text-center text-gray-500 text-sm">B</p>
            <input v-model="colorLazy.b" @input="inputUpdated" @blur="blurInputB" class="shadow appearance-none border rounded text-center w-10 h-8 text-grey-darker" />
          </div>
          <div>
            <p class="text-center text-gray-500 text-sm">A</p>
            <input v-model="colorLazy.a" @input="inputUpdated" @blur="blurInputA" class="shadow appearance-none border rounded text-center w-10 h-8 text-grey-darker" />
          </div>
        </div>
        <div v-show="inputType === 'hexa'" class="mr-3">
          <p class="text-gray-500 text-center text-sm">HEXA</p>
          <input v-model="colorLazy.hexa" @input="hexaInputUpdated" @blur="blurInputHexa" class="shadow appearance-none border rounded text-center w-40 h-8 text-grey-darker" />
        </div>
        <div class="px-2 text-gray-500 cursor-pointer" @mousedown.prevent @click.stop.prevent="toggleInputs">
          <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z" />
          </svg>
        </div>
      </div>
      <div v-if="!hideSwatches" class="flex mt-2 flex-wrap px-1">
        <template v-for="swatch in swatchesLazy" :key="swatch">
          <div class="w-8 h-8 m-1 relative cursor-pointer rounded-full shadow-md" :style="{ backgroundColor: swatch }" @click="selectSwatch(swatch)">
            <div v-show="modelValue === swatch" class="h-full w-full rounded-full border-2 border-gray-200 p-0 relative"></div>
          </div>
        </template>
        <div class="w-8 h-8 m-1 cursor-pointer rounded-full shadow-md text-gray-600 flex items-center justify-center" :style="{ backgroundColor: color }" @click.stop="addRemoveCurrentSwatch">
          <svg v-if="!hasSelectedSwatch" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6 text-slate-100">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          <svg v-else class="h-5 w-5 text-slate-100" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
