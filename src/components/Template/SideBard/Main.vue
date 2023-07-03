<template>
  <div class="white-sidebar-color">
    <div class="sidebar-container">
      <div class="sidemenu-container navbar-collapse collapse fixed-menu">
        <ul class="sidemenu page-header-fixed"
            data-keep-expanded="false"
            data-auto-scroll="true"
            data-slide-speed="200">
          <li class="sidebar-toggler-wrapper hide">
            <div class="sidebar-toggler">
              <span />
            </div>
          </li>
          <li class="sidebar-user-panel">
            <div class="user-panel">
              <div class="pull-left image">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Bank_Sepah_logo.svg/1200px-Bank_Sepah_logo.svg.png"
                     class="img-circle user-img-circle"
                     alt="User Image">
              </div>
              <div class="pull-left info">
                <p> بانک سپه </p>
                <div class="info-action">
                  <q-btn flat
                         round
                         icon="email" />
                  <q-btn flat
                         round
                         icon="person" />
                  <q-btn flat
                         round
                         icon="power_settings_new" />
                </div>
              </div>
            </div>
          </li>
        </ul>
        <q-list bordered
                class="rounded-borders">
          <q-expansion-item v-model="branchesExpanded"
                            expand-separator
                            icon="account_balance"
                            label="Branches">
            <q-list bordered
                    separator>

              <q-item v-ripple
                      tag="label">
                <q-item-section side
                                top>
                  <q-checkbox v-model="branches" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Branch</q-item-label>
                  <q-item-label caption>
                    point
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-ripple
                      tag="label">
                <q-item-section>
                  <q-item-label>Branch with CC</q-item-label>
                  <q-item-label caption>
                    <q-option-group v-model="branchesCC"
                                    :options="branchesRadioOptions"
                                    dense
                                    color="primary"
                                    inline />
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-ripple
                      tag="label">
                <q-item-section>
                  <q-item-label>Branch with ATM</q-item-label>
                  <q-item-label caption>
                    <q-option-group v-model="branchesATM"
                                    :options="branchesRadioOptions"
                                    dense
                                    color="primary"
                                    inline />
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-ripple
                      tag="label">
                <q-item-section>
                  <q-item-label>Branch with EC</q-item-label>
                  <q-item-label caption>
                    <q-option-group v-model="branchesEC"
                                    :options="branchesRadioOptions"
                                    dense
                                    color="primary"
                                    inline />
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-ripple
                      tag="label">
                <q-item-section>
                  <q-item-label>Branch with SB</q-item-label>
                  <q-item-label caption>
                    <q-option-group v-model="branchesSB"
                                    :options="branchesRadioOptions"
                                    dense
                                    color="primary"
                                    inline />
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-ripple
                      tag="label">
                <q-item-section>
                  <q-item-label>Branch with POS</q-item-label>
                  <q-item-label caption>
                    <q-option-group v-model="branchesPOS"
                                    :options="branchesRadioOptions"
                                    dense
                                    color="primary"
                                    inline />
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-ripple
                      tag="label">
                <q-item-section>
                  <q-item-label>Branch with CVV2</q-item-label>
                  <q-item-label caption>
                    <q-option-group v-model="branchesCVV2"
                                    :options="branchesRadioOptions"
                                    dense
                                    color="primary"
                                    inline />
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-ripple
                      tag="label">
                <q-item-section>
                  <q-item-label>Branch with CP</q-item-label>
                  <q-item-label caption>
                    <q-option-group v-model="branchesCP"
                                    :options="branchesRadioOptions"
                                    dense
                                    color="primary"
                                    inline />
                  </q-item-label>
                </q-item-section>
              </q-item>

            </q-list>
          </q-expansion-item>
          <q-expansion-item v-model="branches2Expanded"
                            expand-separator
                            icon="account_balance"
                            label="Branches 2">
            <q-list bordered
                    separator>

              <q-item v-ripple
                      tag="label">
                <q-item-section side
                                top>
                  <q-checkbox v-model="branches2" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Branch</q-item-label>
                  <q-item-label caption>
                    point
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-ripple
                      tag="label">
                <q-item-section>
                  <q-item-label>Branch with CC</q-item-label>
                  <q-item-label caption>
                    <q-option-group v-model="branches2CC"
                                    :options="branchesRadioOptions"
                                    dense
                                    color="primary"
                                    inline />
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-ripple
                      tag="label">
                <q-item-section>
                  <q-item-label>Branch with ATM</q-item-label>
                  <q-item-label caption>
                    <q-option-group v-model="branches2ATM"
                                    :options="branchesRadioOptions"
                                    dense
                                    color="primary"
                                    inline />
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-ripple
                      tag="label">
                <q-item-section>
                  <q-item-label>Branch with EC</q-item-label>
                  <q-item-label caption>
                    <q-option-group v-model="branches2EC"
                                    :options="branchesRadioOptions"
                                    dense
                                    color="primary"
                                    inline />
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-ripple
                      tag="label">
                <q-item-section>
                  <q-item-label>Branch with SB</q-item-label>
                  <q-item-label caption>
                    <q-option-group v-model="branches2SB"
                                    :options="branchesRadioOptions"
                                    dense
                                    color="primary"
                                    inline />
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-ripple
                      tag="label">
                <q-item-section>
                  <q-item-label>Branch with POS</q-item-label>
                  <q-item-label caption>
                    <q-option-group v-model="branches2POS"
                                    :options="branchesRadioOptions"
                                    dense
                                    color="primary"
                                    inline />
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-ripple
                      tag="label">
                <q-item-section>
                  <q-item-label>Branch with CVV2</q-item-label>
                  <q-item-label caption>
                    <q-option-group v-model="branches2CVV2"
                                    :options="branchesRadioOptions"
                                    dense
                                    color="primary"
                                    inline />
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-ripple
                      tag="label">
                <q-item-section>
                  <q-item-label>Branch with CP</q-item-label>
                  <q-item-label caption>
                    <q-option-group v-model="branches2CP"
                                    :options="branchesRadioOptions"
                                    dense
                                    color="primary"
                                    inline />
                  </q-item-label>
                </q-item-section>
              </q-item>

            </q-list>
          </q-expansion-item>
          <q-expansion-item v-model="locationsExpanded"
                            expand-separator
                            icon="room"
                            label="Locations">
            <q-list bordered
                    separator>

              <q-item v-ripple
                      tag="label">
                <q-item-section side
                                top>
                  <q-checkbox v-model="transport" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>Transport</q-item-label>
                  <q-item-label caption>
                    point
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-if="false"
                      v-ripple
                      tag="label">
                <q-item-section side
                                top>
                  <q-checkbox v-model="water" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>water</q-item-label>
                  <q-item-label caption>
                    polygon
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-ripple
                      tag="label">
                <q-item-section side
                                top>
                  <q-checkbox v-model="pofw" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>bank</q-item-label>
                  <q-item-label caption>
                    polygon
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-if="false"
                      v-ripple
                      tag="label">
                <q-item-section side
                                top>
                  <q-checkbox v-model="places" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>places</q-item-label>
                  <q-item-label caption>
                    polygon
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-ripple
                      tag="label">
                <q-item-section side
                                top>
                  <q-checkbox v-model="natrual" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>natural</q-item-label>
                  <q-item-label caption>
                    polygon
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-if="false"
                      v-ripple
                      tag="label">
                <q-item-section side
                                top>
                  <q-checkbox v-model="landuse" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>landuse</q-item-label>
                  <q-item-label caption>
                    polygon
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-if="false"
                      v-ripple
                      tag="label">
                <q-item-section side
                                top>
                  <q-checkbox v-model="buildings" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>buildings</q-item-label>
                  <q-item-label caption>
                    polygon
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-if="false"
                      v-ripple
                      tag="label">
                <q-item-section side
                                top>
                  <q-checkbox v-model="railway" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>railway</q-item-label>
                  <q-item-label caption>
                    polyline
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-if="false"
                      v-ripple
                      tag="label">
                <q-item-section side
                                top>
                  <q-checkbox v-model="roads" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>roads</q-item-label>
                  <q-item-label caption>
                    polyline
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-if="false"
                      v-ripple
                      tag="label">
                <q-item-section side
                                top>
                  <q-checkbox v-model="waterWay" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>waterWay</q-item-label>
                  <q-item-label caption>
                    polyline
                  </q-item-label>
                </q-item-section>
              </q-item>

            </q-list>
          </q-expansion-item>
        </q-list>
        <div>
          <q-input v-model="placesFilter"
                   label="مکان ها"
                   :loading="placesList.loading"
                   v-on:keydown.enter.prevent="placesFilterAction">
            <template #after>
              <q-btn v-if="placesFilter"
                     round
                     color="danger"
                     class="clear-search-bar"
                     icon="clear"
                     size="sm"
                     :loading="placesList.loading"
                     @click="clearSearch(false)" />
            </template>
          </q-input>
          <q-btn color="primary"
                 class="full-width"
                 :loading="placesList.loading"
                 @click="placesFilterAction">
            جستجو
          </q-btn>
        </div>
        <q-card v-if="showingSearchPlaces"
                style="max-height: 400px; overflow: auto;">
          <q-card-section>
            <q-list>
              <q-item v-for="places in placesList.list.splice(0, 50)"
                      :key="places.id"
                      clickable
                      @click="showPlaces(places)">
                <q-item-label>
                  {{ places.name }}
                </q-item-label>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { PlaceList } from 'src/models/Place.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'MainSideBarTemplate',
  data () {
    return {
      locationsExpanded: false,

      branches2Expanded: false,
      branches2CC: null,
      branches2ATM: null,
      branches2EC: null,
      branches2SB: null,
      branches2POS: null,
      branches2CVV2: null,
      branches2CP: null,
      branches2: false,

      branchesExpanded: false,
      showingSearchPlaces: false,
      placesList: new PlaceList(),

      placesFilter: null,

      branchesCC: null,
      branchesATM: null,
      branchesEC: null,
      branchesSB: null,
      branchesPOS: null,
      branchesCVV2: null,
      branchesCP: null,
      branches: false,
      transport: false,
      water: false,
      pofw: false,
      places: false,
      natrual: false,
      landuse: false,
      buildings: false,
      railway: false,
      roads: false,
      waterWay: false,
      branchesRadioOptions: [
        {
          label: 'include',
          value: 1
        },
        {
          label: 'not include',
          value: 0
        },
        {
          label: 'No matter',
          value: null
        }
      ]
    }
  },
  computed: {
    branchesOptions () {
      return {
        CC: this.branchesCC,
        ATM: this.branchesATM,
        EC: this.branchesEC,
        SB: this.branchesSB,
        POS: this.branchesPOS,
        CVV2: this.branchesCVV2,
        CP: this.branchesCP
      }
    },
    branches2Options () {
      return {
        CC: this.branches2CC,
        ATM: this.branches2ATM,
        EC: this.branches2EC,
        SB: this.branches2SB,
        POS: this.branches2POS,
        CVV2: this.branches2CVV2,
        CP: this.branches2CP
      }
    }
  },
  watch: {
    branchesOptions (newValue) {
      this.clearSearch(true)
      this.$bus.emit('map-change-branches-options', newValue)
    },
    branches (newValue) {
      this.$bus.emit('map-change-branches', newValue)
    },
    branches2Options (newValue) {
      this.clearSearch(true)
      this.$bus.emit('map-change-branches2-options', newValue)
    },
    branches2 (newValue) {
      this.$bus.emit('map-change-branches2', newValue)
    },
    transport (newValue) {
      this.clearSearch(true)
      this.$bus.emit('map-change-transport', newValue)
    },
    water (newValue) {
      this.clearSearch(true)
      this.$bus.emit('map-change-water', newValue)
    },
    pofw (newValue) {
      this.clearSearch(true)
      this.$bus.emit('map-change-pofw', newValue)
    },
    places (newValue) {
      this.clearSearch(true)
      this.$bus.emit('map-change-places', newValue)
    },
    natrual (newValue) {
      this.clearSearch(true)
      this.$bus.emit('map-change-natrual', newValue)
    },
    landuse (newValue) {
      this.clearSearch(true)
      this.$bus.emit('map-change-landuse', newValue)
    },
    buildings (newValue) {
      this.clearSearch(true)
      this.$bus.emit('map-change-buildings', newValue)
    },
    railway (newValue) {
      this.clearSearch(true)
      this.$bus.emit('map-change-railway', newValue)
    },
    roads (newValue) {
      this.clearSearch(true)
      this.$bus.emit('map-change-roads', newValue)
    },
    waterWay (newValue) {
      this.clearSearch(true)
      this.$bus.emit('map-change-waterWay', newValue)
    }
  },
  mounted() {
    // window.addEventListener('resize', this.handleResize)
    // this.handleResize()
    this.$bus.on('change-show-branches', (newState) => {
      this.branches = newState
      this.locationsExpanded = false
      this.branchesExpanded = false

      this.branches2 = newState
      this.locationsExpanded = false
      this.branches2Expanded = false
    })
    this.$bus.on('clear-places-filter', (preventEvent) => {
      this.clearSearch(preventEvent)
    })
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    showPlaces(places) {
      this.showingSearchPlaces = false
      this.$bus.emit('map-change-places-filter', places)
    },
    placesFilterAction () {
      this.locationsExpanded = false
      this.branchesExpanded = false

      this.placesList.loading = true
      this.showingSearchPlaces = false
      APIGateway.multiPolygon.places({ place: this.placesFilter })
        .then(({ list }) => {
          this.locationsExpanded = false
          this.branchesExpanded = false
          this.placesList = new PlaceList(list)
          this.showingSearchPlaces = true
          this.placesList.loading = false
        })
        .catch(() => {
          this.locationsExpanded = false
          this.branchesExpanded = false
          this.showingSearchPlaces = false
          this.placesList.loading = false
        })
    },
    clearSearch (preventEvent) {
      this.showingSearchPlaces = false
      this.placesList.loading = false
      this.placesList = new PlaceList()
      this.placesFilter = null
      if (preventEvent) {
        return
      }
      this.$bus.emit('map-change-places-filter', null)
    },
    handleResize() {
      const windowWidth = window.innerWidth
      this.menuItems.forEach(item => {
        if (item.mobileMode) {
          item.show = windowWidth < 1024
        }
      })
    },
    // updateMenuItems () {
    //   if (!this.isUserLogin) {
    //     this.titlesList.splice(0, 1)
    //   }
    // },
    search (list, parentContain = false) {
      if (!list || list.length === 0) {
        return false
      }
      if (parentContain) {
        return true
      }
      let flag = false
      list.forEach(item => {
        const contain = item.title.includes(this.searchText)
        if (this.search(item.children, contain) || contain) {
          flag = true
          item.show = true
          item.open = true
        } else {
          item.open = false
          item.show = false
        }
      })
      return flag
    },
    logOut () {
      return this.$store.dispatch('Auth/logOut')
    }
  }
}
</script>

<style lang="scss" scoped>
.white-sidebar-color {
  height: 100%;
  .sidebar-container {
    height: 100%;
    .sidemenu-container {
      height: 100%;
      display: flex;
      flex-flow: column;
      .sidemenu {
        .sidebar-user-panel {
          .user-panel {
            display: flex;
            flex-flow: row;
            justify-content: center;
            align-items: center;
            .info {
              display: flex;
              flex-flow: column;
              justify-content: center;
              align-items: center;
            }
          }
        }
      }
      .filter-box {
        margin-bottom: 20px;
        height: 150px;
        overflow: auto;
      }
    }
  }
}
</style>
