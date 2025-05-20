<template>
  <Combobox v-model="selectedCity" by="name">
    <ComboboxAnchor class="w-[500px]">
      <div class="relative w-full items-center">
        <ComboboxInput
          v-model="query"
          placeholder="Search for city or state"
          class="h-14"
          :display-value="(val) => val?.name ?? ''"
        />
      </div>
    </ComboboxAnchor>

    <ComboboxList class="w-[400px]">
      <ComboboxEmpty>
        <span v-if="isLoading">Loading...</span> <span v-else>No results found.</span>
      </ComboboxEmpty>

      <ComboboxGroup>
        <ComboboxItem
          v-for="item in featureList"
          :key="item.id"
          :value="item.properties"
          @click="previewCity(item)"
        >
          <div class="flex flex-col">
            <span>{{ item.properties.name }}</span>
            <small>{{ item.properties.full_address }}</small>
          </div>

          <ComboboxItemIndicator>
            <Check class="ml-auto h-4 w-4" />
          </ComboboxItemIndicator>
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue'

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
import { Check } from 'lucide-vue-next'

import { watchDebounced, useVModel } from '@vueuse/core'
import { Constants } from '@/models'
import { mapboxService, type MapboxFeature } from '@/services/api'
import { useRouter } from 'vue-router'

const props = defineProps<{
  modelValue: PropType<MapboxFeature>
}>()
const emit = defineEmits(['update:modelValue'])

const selectedCity = useVModel(props, 'modelValue', emit)
const query = ref<string>('')
const featureList = ref<MapboxFeature[]>([])
const isLoading = ref<boolean>(false)
const router = useRouter()

watchDebounced(
  query,
  () => {
    searchWeather()
  },
  { debounce: Constants.DEBOUNCE_DELAY },
)

async function searchWeather() {
  try {
    if (!query.value.length) {
      featureList.value = []
      return
    }
    isLoading.value = true

    const response = await mapboxService.geolocation.forwardGeocode({
      q: query.value,
      limit: Constants.DEFAULT_FETCH_RECORDS_LIMIT,
      types: ['place'],
    })
    featureList.value = response.features
  } catch (error) {
    console.error('Error fetching weather data:', error)
  } finally {
    isLoading.value = false
  }
}

function previewCity(item: MapboxFeature) {
  router.push({
    name: 'cityView',
    params: {
      city: item?.properties.name,
      // city can be the same as state
      state: item?.properties.place_formatted,
    },
    query: {
      lat: item?.geometry.coordinates[1],
      lon: item?.geometry.coordinates[0],
      preview: 'true',
    },
  })
}
</script>

<style scoped></style>
