<template>
  <v-card :color="color()" variant="tonal">
    <v-card-text
      ><b class="title d-inline-block text-truncate">{{ title }}</b>
      <div class="float-right d-inline-block">{{ value }}/{{ max }}</div>
    </v-card-text>
    <v-progress-linear
      v-if="active"
      class="progress"
      :active="active"
      :indeterminate="false"
      :model-value="Math.ceil((value / max) * 100)"
      absolute
      :color="color()"
    ></v-progress-linear>
  </v-card>
</template>

<script setup lang="ts">
export interface Props {
  title: string
  value: number
  max: number
  active: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  value: 0,
  max: Infinity,
  active: true
})

const colorGood = 'grey-darken-3'
const colorWarn = 'red-darken-4'

const color = () => {
  if (props.active) {
    if (props.value > props.max) {
      return colorWarn
    }
    return colorGood
  }
  return colorGood
}
</script>

<style scoped>
.progress {
  bottom: 0;
  top: auto !important;
}

.title {
  max-width: 70%;
}
</style>
