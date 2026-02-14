<template>
  <div class="wrapper">
    <span v-if="title.length > 0" class="text-uppercase">{{ title }}: </span>
    <span>{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  title?: string
  text?: string
}
withDefaults(defineProps<Props>(), {
  title: '',
  text: ''
})
</script>

<style scoped>
.wrapper {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}
</style>
