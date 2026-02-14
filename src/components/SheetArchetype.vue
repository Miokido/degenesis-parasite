<template>
  <div>
      <div class="archetypeTitle d-flex justify-center text-uppercase">{{ typeLabel }}</div>
    <div class="archetype text-uppercase d-flex justify-center mb-3">{{ label }}</div>
    <div class="d-flex justify-center">
      <img class="archetypeLogo" :src="`logotypes/${type}s/${archetype}.svg`" />
    </div>
  </div>
</template>
3
<script setup lang="ts">
export interface Props {
  type: string
  typeLabel: string
  archetype: string
  label: string
}
defineProps<Props>()
</script>

<style scoped>
.archetype {
  letter-spacing: 0.2em;
  font-size: larger;
}

.archetypeTitle {
  font-size: xx-small;
  opacity: 0.5;
}

.archetypeLogo {
  width: 30%;
  aspect-ratio: 1;
}
</style>
