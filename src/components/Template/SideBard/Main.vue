<template>
  <div class="white-sidebar-color">
    <div class="sidebar-container">
      <div class="sidemenu-container navbar-collapse collapse fixed-menu">
        <div id="remove-scroll">
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
            <q-expansion-item expand-separator
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
            <q-expansion-item expand-separator
                              icon="account_balance_wallet"
                              label="Branches 2">
              Branches 2
            </q-expansion-item>
            <q-expansion-item expand-separator
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
                <q-item v-ripple
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
                    <q-item-label>pofw</q-item-label>
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
                <q-item v-ripple
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
                <q-item v-ripple
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
                <q-item v-ripple
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
                <q-item v-ripple
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
                <q-item v-ripple
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
          <q-input v-model="placesFilter"
                   label="مکان ها" />
          <q-btn color="primary"
                 class="full-width"
                 @click="placesFilterAction">
            جستجو
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainSideBarTemplate',
  data () {
    return {
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
    }
  },
  watch: {
    branchesOptions (newValue) {
      this.$bus.emit('map-change-branches-options', newValue)
    },
    branches (newValue) {
      this.$bus.emit('map-change-branches', newValue)
    },
    transport (newValue) {
      this.$bus.emit('map-change-transport', newValue)
    },
    water (newValue) {
      this.$bus.emit('map-change-water', newValue)
    },
    pofw (newValue) {
      this.$bus.emit('map-change-pofw', newValue)
    },
    places (newValue) {
      this.$bus.emit('map-change-places', newValue)
    },
    natrual (newValue) {
      this.$bus.emit('map-change-natrual', newValue)
    },
    landuse (newValue) {
      this.$bus.emit('map-change-landuse', newValue)
    },
    buildings (newValue) {
      this.$bus.emit('map-change-buildings', newValue)
    },
    railway (newValue) {
      this.$bus.emit('map-change-railway', newValue)
    },
    roads (newValue) {
      this.$bus.emit('map-change-roads', newValue)
    },
    waterWay (newValue) {
      this.$bus.emit('map-change-waterWay', newValue)
    }
  },
  mounted() {
    // window.addEventListener('resize', this.handleResize)
    // this.handleResize()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    placesFilterAction () {
      this.$bus.emit('map-change-places-filter', this.placesFilter)
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
