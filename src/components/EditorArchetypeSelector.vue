<template>
  <v-card class="ma-0 px-4 pt-5" @click="showDialog = true">
    <EditorArchetype
      role="button"
      :type="type"
      :typeLabel="typeLabel"
      :archetype="props.value.name"
      :label="label"
      :description="description"
    >
      <v-dialog class="dialog" v-model="showDialog" width="auto">
        <v-card>
          <v-card-text>
            <CCCSelector
              :type="type"
              :title="$t(`messages.${type}`)"
              :items="items"
              :labels="labels"
              :descriptions="descriptions"
              :value="props.value"
              @change="
                (c) => {
                  $emit('change', c)
                  showDialog = false
                }
              "
            />
          </v-card-text>
        </v-card>
      </v-dialog>
    </EditorArchetype>
  </v-card>
</template>

<script setup lang="ts">
import type { Named } from '@/config/model';
import EditorArchetype from './EditorArchetype.vue'
import CCCSelector from './CCCSelector.vue'
import { ref } from 'vue'

const props = defineProps<{
  type: string,
  typeLabel: string,
  label: string,
  value: Named,
  items: Named[],
  labels: Map<Named, string>,       // Ajout de la virgule
  descriptions: Map<Named, string>,  // Ajout de la virgule
  description?: string               // Corrigé (suppression du ? après string)
}>()

const emit = defineEmits<{
  (e: 'change', value: Named): void
}>()

const showDialog = ref(false)
</script>

<style scoped>
.dialog {
  max-width: 74em;
}
</style>
