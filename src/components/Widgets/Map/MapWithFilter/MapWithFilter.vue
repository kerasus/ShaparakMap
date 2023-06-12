<template>
  <div class="MapWithFilter">
    <div class="row q-col-gutter-lg q-mb-lg">
      <div class="col-md-6 col-12">
        <q-select v-model="selectedProvinece"
                  label="استان"
                  :options="provinceList.list"
                  option-label="name"
                  option-value="id" />
      </div>
      <div class="col-md-6 col-12">
        <q-select v-model="selectedCity"
                  label="شهر"
                  :options="citiesOfSelectedProvinece.list"
                  option-label="name"
                  option-value="id" />
      </div>
    </div>
    <div class="row q-col-gutter-lg">
      <div class="col-12">
        <div class="card card-box">
          <div class="card-head">
            <header>نقشه</header>
            <div class="tools">
              <q-btn color="secondary"
                     flat
                     :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
                     @click="toggle" />
            </div>
          </div>
          <div class="card-body "
               style="">
            <div id="map"
                 ref="mapRef"
                 class="height-350"
                 style="position: relative; overflow: hidden;" />
          </div>
        </div>
      </div>
    </div>
    <div class="row q-col-gutter-lg">
      <div class="col-lg-12 col-md-12 col-sm-12 col-12">
        <div class="card">
          <div class="card-block">
            <q-tab-panels v-model="panel"
                          animated>
              <q-tab-panel name="empty">
                روی یک نقطه کلیک کنید
              </q-tab-panel>
              <q-tab-panel name="transport">
                <q-list bordered
                        separator>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>Transport</q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>gid</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.gid }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>osm_id</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.osm_id }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>code</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.code }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>fclass</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.fclass }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>name</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.name }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>geom</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.geom }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>
              <q-tab-panel name="branches">
                <q-list bordered
                        separator>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>Branches</q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>id</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.id }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>closest_branch</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.closest_branch }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <template v-if="selectedLayer.closest_branch_info">
                    <q-item v-ripple
                            clickable>
                      <q-item-section>
                        <q-item-label>closest_branch_info.id</q-item-label>
                        <q-item-label caption>
                          {{ selectedLayer.closest_branch_info.id }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item v-ripple
                            clickable>
                      <q-item-section>
                        <q-item-label>closest_branch_info.geom</q-item-label>
                        <q-item-label caption>
                          {{ selectedLayer.closest_branch_info.geom }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item v-ripple
                            clickable>
                      <q-item-section>
                        <q-item-label>closest_branch_info.distance</q-item-label>
                        <q-item-label caption>
                          {{ selectedLayer.closest_branch_info.distance }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item v-ripple
                            clickable>
                      <q-item-section>
                        <q-item-label>closest_branch_info.geomPoint</q-item-label>
                        <q-item-label caption>
                          {{ selectedLayer.closest_branch_info.geomPoint }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>number</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.number }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>code</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.code }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>name</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.name }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>address</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.address }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>beforeـnumber</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.beforeـnumber }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>farsighted</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.farsighted }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>phone_1</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.phone_1 }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>phone_2</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.phone_2 }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>currencyـcircle</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.currencyـcircle }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>atm</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.atm }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>eveningـcounter</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.eveningـcounter }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>Safeـbox</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.Safeـbox }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>pos</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.pos }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>cvv2</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.cvv2 }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>cellularـphone</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.cellularـphone }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>done</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.done }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>city</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.city }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>geom</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.geom }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>
              <q-tab-panel name="water">
                <q-list bordered
                        separator>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>Water</q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>gid</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.gid }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>osm_id</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.osm_id }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>code</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.code }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>fclass</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.fclass }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>name</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.name }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>geom</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.geom }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>
              <q-tab-panel name="pofw">
                <q-list bordered
                        separator>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>pofw</q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>gid</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.gid }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>osm_id</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.osm_id }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>code</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.code }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>fclass</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.fclass }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>name</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.name }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>type</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.type }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>geom</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.geom }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>
              <q-tab-panel name="places">
                <q-list bordered
                        separator>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>Places</q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>gid</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.gid }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>osm_id</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.osm_id }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>code</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.code }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>population</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.population }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>fclass</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.fclass }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>name</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.name }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>geom</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.geom }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>
              <q-tab-panel name="natrual">
                <q-list bordered
                        separator>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>Natural</q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>gid</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.gid }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>osm_id</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.osm_id }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>code</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.code }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>fclass</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.fclass }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>name</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.name }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>geom</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.geom }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>
              <q-tab-panel name="landuse">
                <q-list bordered
                        separator>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>LandUse</q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>gid</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.gid }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>osm_id</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.osm_id }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>code</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.code }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>fclass</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.fclass }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>name</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.name }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>geom</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.geom }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>
              <q-tab-panel name="buildings">
                <q-list bordered
                        separator>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>Buildings</q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>gid</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.gid }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>osm_id</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.osm_id }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>code</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.code }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>fclass</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.fclass }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>name</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.name }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>type</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.type }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>geom</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.geom }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>
              <q-tab-panel name="railway">
                <q-list bordered
                        separator>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>Railway</q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>gid</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.gid }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>osm_id</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.osm_id }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>code</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.code }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>fclass</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.fclass }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>name</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.name }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>layer</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.layer }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>bridge</q-item-label>
                      <q-item-label caption>
                        <span v-if="selectedLayer.bridge">
                          دارد
                        </span>
                        <span v-else>
                          ندارد
                        </span>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>tunnel</q-item-label>
                      <q-item-label caption>
                        <span v-if="selectedLayer.tunnel">
                          دارد
                        </span>
                        <span v-else>
                          ندارد
                        </span>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>geom</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.geom }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>
              <q-tab-panel name="roads">
                <q-list bordered
                        separator>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>Roads</q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>gid</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.gid }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>osm_id</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.osm_id }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>code</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.code }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>fclass</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.fclass }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>name</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.name }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>ref</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.ref }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>oneway</q-item-label>
                      <q-item-label caption>
                        <span v-if="selectedLayer.oneway">
                          دارد
                        </span>
                        <span v-else>
                          ندارد
                        </span>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>maxspeed</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.maxspeed }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>layer</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.layer }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>bridge</q-item-label>
                      <q-item-label caption>
                        <span v-if="selectedLayer.bridge">
                          دارد
                        </span>
                        <span v-else>
                          ندارد
                        </span>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>tunnel</q-item-label>
                      <q-item-label caption>
                        <span v-if="selectedLayer.tunnel">
                          دارد
                        </span>
                        <span v-else>
                          ندارد
                        </span>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>geom</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.geom }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>
              <q-tab-panel name="waterWay">
                <q-list bordered
                        separator>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>Roads</q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>gid</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.gid }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>osm_id</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.osm_id }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>code</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.code }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>fclass</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.fclass }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>name</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.name }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>geom</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.geom }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12 col-12">
        <div class="row q-col-gutter-lg state-overview">
          <div class="col-lg-3 col-md-3 col-sm-12 col-12">
            <div class="info-box card-1">
              <span class="info-box-icon push-bottom"><i class="material-icons">group</i></span>
              <div class="info-box-content">
                <span class="info-box-text">Transport</span>
                <span class="info-box-number">{{ transportList.list.length }}</span>
                <div class="progress">
                  <div class="progress-bar width-60" />
                </div>
                <span class="progress-description">
                  60% Increase in 28 Days
                </span>
              </div>
              <!-- /.info-box-content -->
            </div>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-12 col-12">
            <div class="info-box card-2">
              <span class="info-box-icon push-bottom"><i class="material-icons">person</i></span>
              <div class="info-box-content">
                <span class="info-box-text">Water</span>
                <span class="info-box-number">{{ waterList.list.length }}</span>
                <div class="progress">
                  <div class="progress-bar width-40" />
                </div>
                <span class="progress-description">
                  40% Increase in 28 Days
                </span>
              </div>
              <!-- /.info-box-content -->
            </div>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-12 col-12">
            <div class="info-box card-3">
              <span class="info-box-icon push-bottom"><i class="material-icons">content_cut</i></span>
              <div class="info-box-content">
                <span class="info-box-text">pofw</span>
                <span class="info-box-number">{{ pofwList.list.length }}</span>
                <div class="progress">
                  <div class="progress-bar width-80" />
                </div>
                <span class="progress-description">
                  80% Increase in 28 Days
                </span>
              </div>
              <!-- /.info-box-content -->
            </div>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-12 col-12">
            <div class="info-box card-4">
              <span class="info-box-icon push-bottom"><i class="material-icons">monetization_on</i></span>
              <div class="info-box-content">
                <span class="info-box-text">Places</span>
                <span class="info-box-number">{{ placesList.list.length }}</span>
                <div class="progress">
                  <div class="progress-bar width-60" />
                </div>
                <span class="progress-description">
                  60% Increase in 28 Days
                </span>
              </div>
              <!-- /.info-box-content -->
            </div>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-12 col-12">
            <div class="info-box card-4">
              <span class="info-box-icon push-bottom"><i class="material-icons">monetization_on</i></span>
              <div class="info-box-content">
                <span class="info-box-text">Natural</span>
                <span class="info-box-number">{{ natrualList.list.length }}</span>
                <div class="progress">
                  <div class="progress-bar width-60" />
                </div>
                <span class="progress-description">
                  60% Increase in 28 Days
                </span>
              </div>
              <!-- /.info-box-content -->
            </div>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-12 col-12">
            <div class="info-box card-4">
              <span class="info-box-icon push-bottom"><i class="material-icons">monetization_on</i></span>
              <div class="info-box-content">
                <span class="info-box-text">LandUse</span>
                <span class="info-box-number">{{ landuseList.list.length }}</span>
                <div class="progress">
                  <div class="progress-bar width-60" />
                </div>
                <span class="progress-description">
                  60% Increase in 28 Days
                </span>
              </div>
              <!-- /.info-box-content -->
            </div>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-12 col-12">
            <div class="info-box card-4">
              <span class="info-box-icon push-bottom"><i class="material-icons">monetization_on</i></span>
              <div class="info-box-content">
                <span class="info-box-text">Buildings</span>
                <span class="info-box-number">{{ buildingsList.list.length }}</span>
                <div class="progress">
                  <div class="progress-bar width-60" />
                </div>
                <span class="progress-description">
                  60% Increase in 28 Days
                </span>
              </div>
              <!-- /.info-box-content -->
            </div>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-12 col-12">
            <div class="info-box card-4">
              <span class="info-box-icon push-bottom"><i class="material-icons">monetization_on</i></span>
              <div class="info-box-content">
                <span class="info-box-text">Railway</span>
                <span class="info-box-number">{{ railwayList.list.length }}</span>
                <div class="progress">
                  <div class="progress-bar width-60" />
                </div>
                <span class="progress-description">
                  60% Increase in 28 Days
                </span>
              </div>
              <!-- /.info-box-content -->
            </div>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-12 col-12">
            <div class="info-box card-4">
              <span class="info-box-icon push-bottom"><i class="material-icons">monetization_on</i></span>
              <div class="info-box-content">
                <span class="info-box-text">Roads</span>
                <span class="info-box-number">{{ roadsList.list.length }}</span>
                <div class="progress">
                  <div class="progress-bar width-60" />
                </div>
                <span class="progress-description">
                  60% Increase in 28 Days
                </span>
              </div>
              <!-- /.info-box-content -->
            </div>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-12 col-12">
            <div class="info-box card-4">
              <span class="info-box-icon push-bottom"><i class="material-icons">monetization_on</i></span>
              <div class="info-box-content">
                <span class="info-box-text">WaterWay</span>
                <span class="info-box-number">{{ waterWayList.list.length }}</span>
                <div class="progress">
                  <div class="progress-bar width-60" />
                </div>
                <span class="progress-description">
                  60% Increase in 28 Days
                </span>
              </div>
              <!-- /.info-box-content -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row q-col-gutter-lg">
      <div class="col-12">
        <statistic-information-chart v-if="mounted"
                                     :series="statisticInformation" />
      </div>
    </div>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import { APIGateway } from 'src/api/APIGateway.js'
import { TransportList } from 'src/models/Transport.js'
import { WaterList } from 'src/models/Water.js'
import { PofwList } from 'src/models/Pofw'
import { PlaceList } from 'src/models/Place'
import { NatrualList } from 'src/models/Natrual'
import { LanduseList } from 'src/models/Landuse'
import { BuildingList } from 'src/models/Building'
import { RailwayList } from 'src/models/Railway'
import { RoadList } from 'src/models/Road'
import { WaterwayList } from 'src/models/Waterway'
import { ProvinceList } from 'src/models/Province'
import { BrancheList } from 'src/models/Branche'
import StatisticInformationChart from 'src/components/Widgets/Map/MapWithFilter/StatisticInformationChart.vue'

let leafletObject = null
if (typeof window !== 'undefined') {
  import('leaflet')
    .then((leaflet) => {
      leafletObject = leaflet.default
    })
}

const loadAllPages = (promise, thenCallBack, catchCallBack, page = 1, totalPages = 0) => {
  promise(page)
    .then((data) => {
      let newTotalPages = totalPages
      const newPage = page + 1
      if (page === 1) {
        newTotalPages = Math.floor(data.count / data.list.list.length) + 1
      }
      thenCallBack(data)
      if (newPage <= newTotalPages) {
        loadAllPages((page1) => promise(page1), thenCallBack, catchCallBack, newPage, newTotalPages)
      }
    })
    .catch(() => {
      catchCallBack(page)
    })
}

export default {
  name: 'MapWithFilter',
  components: { StatisticInformationChart },
  data: () => {
    return {
      mounted: false,
      mapInstance: null,
      panel: 'empty',
      selectedLayer: {},
      selectedProvinece: null,
      closestBranchPointMarker: null,
      selectedCity: null,
      branchesList: new BrancheList(),
      provinceList: new ProvinceList(),
      transportList: new TransportList(),
      waterList: new WaterList(),
      pofwList: new PofwList(),
      placesList: new PlaceList(),
      natrualList: new NatrualList(),
      landuseList: new LanduseList(),
      buildingsList: new BuildingList(),
      railwayList: new RailwayList(),
      roadsList: new RoadList(),
      waterWayList: new WaterwayList(),
      transportMarkers: [],
      branchesMarkers: [],
      waterPolygon: [],
      pofwPolygon: [],
      placesPolygon: [],
      natrualPolygon: [],
      landusePolygon: [],
      buildingsPolygon: [],
      railwayPolyline: [],
      roadsPolyline: [],
      waterWayPolyline: [],
      pointList: [
        'transport',
        'branches'
      ],
      polygonNameList: [
        'water',
        'pofw',
        'places',
        'natrual',
        'landuse',
        'buildings'
      ],
      polylineNameList: [
        'railway',
        'roads',
        'waterWay'
      ],

      showbranches: false,
      showtransport: false,
      showwater: false,
      showpofw: false,
      showplaces: false,
      shownatrual: false,
      showlanduse: false,
      showbuildings: false,
      showrailway: false,
      showroads: false,
      showwaterWay: false,
      statisticInformation: [],

      zoom: 2,
      iconWidth: 25,
      iconHeight: 40
    }
  },
  computed: {
    citiesOfSelectedProvinece () {
      if (!this.selectedProvinece) {
        return []
      }

      return this.selectedProvinece.cities
    }
  },
  mounted() {
    this.loadProvineces()
    this.getStatistic()
    setTimeout(() => {
      this.loadMap()
      this.setEventBuses()
      this.getAllData()
      this.mounted = true
    }, 1000)
  },
  methods: {
    getStatistic () {
      APIGateway.statistic.information()
        .then((series) => {
          this.statisticInformation = series
        })
    },
    toggle () {
      this.$q.fullscreen.toggle(this.$refs.mapRef)
        .then(() => {
          // success!
        })
        .catch((err) => {
          alert(err)
          // uh, oh, error!!
          // console.error(err)
        })
    },
    loadProvineces () {
      APIGateway.province.index()
        .then((provinceList) => {
          this.provinceList = provinceList
        })
    },
    setEventBuses () {
      this.$bus.on('map-change-branches-options', (newOptions) => {
        const item = 'branches'
        this[item + 'List'].list = []
        loadAllPages((page) => APIGateway.point[item](page, newOptions), ({ list }) => {
          this[item + 'List'].list = this[item + 'List'].list.concat(list.list)
          // this.loadMarkersList(item + 'List', item + 'Markers')
        }, () => {
        })
      })

      this.pointList.forEach(item => {
        this.$bus.on('map-change-' + item, (newValue) => {
          this['show' + item] = newValue
          if (newValue) {
            this.loadMarkersList(item + 'List', item + 'Markers')
          }
          this[item + 'Markers'].forEach(marker => {
            if (newValue) {
              this.showLayer(marker)
            } else {
              this.hideLayer(marker)
            }
          })
        })
      })
      this.polygonNameList.forEach(item => {
        this.$bus.on('map-change-' + item, (newValue) => {
          this['show' + item] = newValue
          if (newValue) {
            this.loadPolygonList(item + 'List', item + 'Polygon')
          }
          this[item + 'Polygon'].forEach(polygon => {
            if (newValue) {
              this.showLayer(polygon)
            } else {
              this.hideLayer(polygon)
            }
          })
        })
      })
      this.polylineNameList.forEach(item => {
        this.$bus.on('map-change-' + item, (newValue) => {
          this['show' + item] = newValue
          if (newValue) {
            this.loadPolylineList(item + 'List', item + 'Polyline')
          }
          this[item + 'Polyline'].forEach(polyline => {
            if (newValue) {
              this.showLayer(polyline)
            } else {
              this.hideLayer(polyline)
            }
          })
        })
      })
    },
    hideLayer (marker) {
      if (!this.mapInstance.hasLayer(marker)) {
        return
      }
      this.mapInstance.removeLayer(marker)
    },
    showLayer (marker) {
      if (!this.mapInstance.hasLayer(marker)) {
        return
      }
      this.mapInstance.addLayer(marker)
    },
    loadMap() {
      this.mapInstance = leafletObject.map('map').setView([35.67, 51.4], 10)
      leafletObject.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.mapInstance)
      this.mapInstance.on('click', this.onClickMap)
      this.mapInstance.on('moveend', () => {
        if (this.closestBranchPointMarker) {
          this.hideLayer(this.closestBranchPointMarker)
        }
        this.pointList.forEach(item => {
          if (this['show' + item]) {
            this.loadMarkersList(item + 'List', item + 'Markers')
          }
        })
        this.polygonNameList.forEach(item => {
          if (this['show' + item]) {
            this.loadPolygonList(item + 'List', item + 'Polygon')
          }
        })
      })
    },
    getAllData () {
      this.getPoints()
      this.getPolygons()
      this.getPolylines()
    },
    getPoints () {
      this.pointList.forEach(item => {
        // APIGateway.point[item]()
        //   .then(({ list }) => {
        //     this[item + 'List'] = list
        //     // this.loadPolygonList(item + 'List', item + 'Polygon')
        //   })
        loadAllPages((page) => APIGateway.point[item](page), ({ list }) => {
          this[item + 'List'].list = this[item + 'List'].list.concat(list.list)
          // this.loadMarkersList(item + 'List', item + 'Markers')
        }, () => {
        })
      })
    },
    getPolygons () {
      this.polygonNameList.forEach(item => {
        loadAllPages((page) => APIGateway.multiPolygon[item](page), ({ list }) => {
          this[item + 'List'].list = this[item + 'List'].list.concat(list.list)
          // this.loadMarkersList(item + 'List', item + 'Markers')
        }, () => {
        })

        // APIGateway.multiPolygon[item]()
        //   .then(({ list }) => {
        //     this[item + 'List'] = list
        //     // this.loadPolygonList(item + 'List', item + 'Polygon')
        //   })
      })
    },
    getPolylines () {
      this.polylineNameList.forEach(item => {
        loadAllPages((page) => APIGateway.multiString[item](page), ({ list }) => {
          this[item + 'List'].list = this[item + 'List'].list.concat(list.list)
          // this.loadMarkersList(item + 'List', item + 'Markers')
        }, () => {
        })
        // APIGateway.multiString[item]()
        //   .then(({ list }) => {
        //     this[item + 'List'] = list
        //     // this.loadPolylineList(item + 'List', item + 'Polyline')
        //   })
      })
    },
    loadMarkersList (listName, markerName) {
      const zoom = this.mapInstance._zoom // 13
      const bounds = this.mapInstance.getBounds()
      this[markerName].forEach(marker => {
        this.hideLayer(marker)
      })
      if (zoom < 14) {
        return
      }

      this[listName].inBounds(bounds).forEach(marker => {
        const layerName = listName.replace('List', '')
        const markerLayer = this.addMarker(marker.point, '<b>(' + layerName + ')</b></br><b>name: ' + marker.name + '</b></br>fclass:' + marker.fclass, marker, layerName)
        this[markerName].push(markerLayer)
      })
    },
    loadPolygonList (listName, polygonName) {
      const zoom = this.mapInstance._zoom // 13
      const bounds = this.mapInstance.getBounds()
      this[polygonName].forEach(polygon => {
        this.hideLayer(polygon)
      })
      if (zoom < 14) {
        return
      }

      this[listName].inBounds(bounds).forEach(polygon => {
        const layerName = listName.replace('List', '')
        const polygonLayer = this.addPolygon(polygon.multiPolygon, '<b>(' + layerName + ')</b></br><b>name: ' + polygon.name + '</b></br>fclass:' + polygon.fclass, polygon, layerName)
        this[polygonName].push(polygonLayer)
      })
    },
    loadPolylineList (listName, polylineName) {
      const zoom = this.mapInstance._zoom // 13
      const bounds = this.mapInstance.getBounds()
      this[polylineName].forEach(polyline => {
        this.hideLayer(polyline)
      })
      if (zoom < 14) {
        return
      }

      this[listName].inBounds(bounds).forEach(polyline => {
        const layerName = listName.replace('List', '')
        const polylineLayer = this.addPolyline(polyline.multiString, '<b>(' + layerName + ')</b></br><b>name: ' + polyline.name + '</b></br>fclass:' + polyline.fclass, polyline, layerName)
        this[polylineName].push(polylineLayer)
      })
    },
    onClickMap(e) {
      // alert('You clicked the map at ' + e.latlng)
      // this.addMarker(e.latlng)
    },
    addMarker(latlng, popup = '', data, name, icon, clickEvent) {
      let leafletMarker = null
      if (icon) {
        leafletMarker = leafletObject.marker(latlng, { icon })
      } else {
        leafletMarker = leafletObject.marker(latlng)
      }
      leafletMarker
        .addTo(this.mapInstance)
      if (typeof clickEvent === 'undefined' || clickEvent === true) {
        leafletMarker
          .on('click', (e) => {
            this.panel = name
            this.selectedLayer = data

            if (name === 'branches') {
              const greenIcon = leafletObject.icon({
                iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
                shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',

                iconSize: [38, 95], // size of the icon
                shadowSize: [50, 64], // size of the shadow
                iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                shadowAnchor: [4, 62], // the same for the shadow
                popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
              })
              const layerName = 'branches'
              if (data.closest_branch_point) {
                if (this.closestBranchPointMarker) {
                  this.hideLayer(this.closestBranchPointMarker)
                }
                this.closestBranchPointMarker = this.addMarker(data.closest_branch_point, '<b>(' + layerName + ')</b></br><b>name: ' + data.name + '</b></br>fclass:' + data.fclass, data, layerName, greenIcon, false)
              }
            } else {
              if (this.closestBranchPointMarker) {
                this.hideLayer(this.closestBranchPointMarker)
              }
              this.closestBranchPointMarker = null
            }
          })
      }
      return leafletMarker.bindPopup(popup)
      // .openPopup()
    },
    addPolygon(latlngs, popup = '', data, name) {
      return leafletObject.polygon(latlngs)
        .addTo(this.mapInstance)
        .on('click', () => {
          this.panel = name
          this.selectedLayer = data
        })
        .bindPopup(popup)
      // .openPopup()
    },
    addPolyline(latlngs, popup = '', data, name) {
      return leafletObject.polyline(latlngs)
        .addTo(this.mapInstance)
        .on('click', () => {
          this.panel = name
          this.selectedLayer = data
        })
        .bindPopup(popup)
      // .openPopup()
    }
  }
}
</script>

<style scoped lang="scss">
.MapWithFilter {
  padding: 25px 20px 10px;
  :deep(#map) {
    width: 100%;
    height: 350px;

    .leaflet-pane, .leaflet-tile, .leaflet-marker-icon, .leaflet-marker-shadow, .leaflet-tile-container, .leaflet-pane > svg, .leaflet-pane > canvas, .leaflet-zoom-box, .leaflet-image-layer, .leaflet-layer {
      left: auto;
      right: 0;
    }
  }
}
</style>
