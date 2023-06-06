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
                  <img src="https://einfosoft.com/templates/templatemonster/ecab/source/assets/img/dp.jpg"
                       class="img-circle user-img-circle"
                       alt="User Image">
                </div>
                <div class="pull-left info">
                  <p> Marria</p>
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
            <q-item v-ripple
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
      branches: true,
      transport: true,
      water: true,
      pofw: true,
      places: true,
      natrual: true,
      landuse: true,
      buildings: true,
      railway: true,
      roads: true,
      waterWay: true
    }
  },
  watch: {
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
    }
  }
}
</style>
