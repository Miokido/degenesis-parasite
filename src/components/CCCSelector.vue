<template>
  <div class="selections">
    <v-container class="d-flex justify-center pa-0">
      <div class="d-flex flex-wrap">
        <div @click="selectionChanged(item)" v-for="item in items" :key="item.name">
          <v-card
            role="button"
            class="archetypeButton ma-2 pa-3 d-flex flex-column align-center justify-center"
            :color="item.name == props.value.name ? 'red-darken-4' : ''"
          >
            <EditorArchetype
              :type="type"
              :typeLabel="$t(`messages.${type}`)"
              :archetype="item.name"
              :label="labels.get(item) || ''"
              :description="descriptions.get(item) || ''"
              :showType="false"
              :smallLabel="true"
              :inverted="item.name == props.value.name"
              :item="item"
            ></EditorArchetype>
          </v-card>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EditorArchetype from './EditorArchetype.vue'
import type { Named } from '@/config/model';

const props = defineProps<{
  type: string,
  title: string,
  items: Named[],
  labels: Map<Named, string>,
  value: Named,
  descriptions: Map<Named, string>,
}>()

const showOverlay = ref(false)

const emit = defineEmits<{
  (e: 'change', value: Named): void
}>()

const selectionChanged = (v: Named) => {
  emit('change', v)
  showOverlay.value = false
}
</script>

<style scoped>

.archetypeButton {
  width: 10vw;
  min-width: 8em;
  aspect-ratio: 1;
}
</style>
