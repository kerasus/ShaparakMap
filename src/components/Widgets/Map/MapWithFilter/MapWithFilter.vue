<template>
  <div class="MapWithFilter">
    <q-no-ssr>
      <inner-map-with-filter v-if="mounted" />
    </q-no-ssr>
  </div>
</template>

<script>
import InnerMapWithFilter from 'src/components/Widgets/Map/MapWithFilter/InnerMapWithFilter.vue'

export default {
  name: 'MapWithFilter',
  components: { InnerMapWithFilter },
  data: () => {
    return {
      mounted: false
    }
  },
  mounted () {
    this.mounted = true
  }
}
</script>
