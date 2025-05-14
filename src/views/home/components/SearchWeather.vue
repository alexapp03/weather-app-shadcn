<template>
  <Combobox v-model="selectedCity" by="label">
    <ComboboxAnchor>
      <div class="relative w-full max-w-sm items-center">
        <ComboboxInput v-model="query" placeholder="Search for city or state" />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
          <Search class="size-4 text-muted-foreground" />
        </span>
      </div>
    </ComboboxAnchor>

    <ComboboxList>
      <ComboboxEmpty> No results found. </ComboboxEmpty>

      <ComboboxGroup>
        <ComboboxItem v-for="item in featureList" :key="item.id" :value="item.properties.name">
          {{ item.properties.name }}

          <ComboboxItemIndicator>
            <Check class="ml-auto h-4 w-4" />
          </ComboboxItemIndicator>
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
} from '@/components/ui/combobox'
import { Check, Search } from 'lucide-vue-next'

import { watchDebounced, useVModel } from '@vueuse/core'
import { Constants } from '@/models'
import { mapboxService, type MapboxFeature } from '@/services/api'

const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits(['update:modelValue'])

const selectedCity = useVModel(props, 'modelValue', emit)
const query = ref<string>('')
const featureList = ref<MapboxFeature[]>([])

watchDebounced(
  query,
  () => {
    searchWeather()
  },
  { debounce: Constants.DEBOUNCE_DELAY },
)

async function searchWeather() {
  console.log('searchWeather', query.value)
  if (!query.value.length) {
    featureList.value = []
    return
  }
  const response = await mapboxService.geolocation.forwardGeocode({
    q: query.value,
    types: ['place'],
  })
  featureList.value = response.features
}
</script>

<style scoped></style>
