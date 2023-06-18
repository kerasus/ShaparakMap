<template>
  <div class="MapWithFilter">
    <div v-if="false"
         class="row q-col-gutter-lg q-mb-lg">
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
          <div class="card-body">
            <q-linear-progress v-if="mapLoading"
                               indeterminate />
            <div id="map"
                 ref="mapRef"
                 class="height-350"
                 style="position: relative; overflow: hidden;" />
          </div>
        </div>
      </div>
    </div>
    <div class="row q-col-gutter-lg">
      <div class="col-lg-6 col-md-6 col-sm-12 col-12">
        <div class="card relative-position">
          <q-btn color="danger"
                 flat
                 round
                 icon="highlight_off"
                 class="absolute-top-right z-top"
                 @click="clearSelectedLayer" />
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
                  <q-item v-if="selectedLayer.id"
                          v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>id</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.id }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-if="selectedLayer.closest_branch"
                          v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>closest_branch</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.closest_branch }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <template v-if="selectedLayer.closest_branch && selectedLayer.closest_branch_info">
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
                  <q-item v-if="selectedLayer.number"
                          v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>number</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.number }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-if="selectedLayer.code"
                          v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>code</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.code }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-if="selectedLayer.name"
                          v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>name</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.name }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-if="selectedLayer.farsighted"
                          v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>farsighted</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.farsighted }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-if="selectedLayer.phone_1"
                          v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>phone_1</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.phone_1 }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-if="selectedLayer.phone_2"
                          v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>phone_2</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.phone_2 }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-if="selectedLayer.currencyـcircle"
                          v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>currencyـcircle</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.currencyـcircle }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-if="selectedLayer.atm"
                          v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>atm</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.atm }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-if="selectedLayer.eveningـcounter"
                          v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>eveningـcounter</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.eveningـcounter }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-if="selectedLayer.Safeـbox"
                          v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>Safeـbox</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.Safeـbox }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-if="selectedLayer.pos"
                          v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>pos</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.pos }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-if="selectedLayer.cvv2"
                          v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>cvv2</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.cvv2 }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-if="selectedLayer.cellularـphone"
                          v-ripple
                          clickable>
                    <q-item-section>
                      <q-item-label>cellularـphone</q-item-label>
                      <q-item-label caption>
                        {{ selectedLayer.cellularـphone }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-if="selectedLayer.geom"
                          v-ripple
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
      <div class="col-lg-6 col-md-6 col-sm-12 col-12">
        <q-linear-progress v-if="staticalLoading"
                           indeterminate />
        <statical-data :data="staticalData" />
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
import { PofwList } from 'src/models/Pofw.js'
import { RoadList } from 'src/models/Road.js'
import { WaterList } from 'src/models/Water.js'
import { PlaceList } from 'src/models/Place.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { NatrualList } from 'src/models/Natrual.js'
import { RailwayList } from 'src/models/Railway.js'
import { LanduseList } from 'src/models/Landuse.js'
import { BrancheList } from 'src/models/Branche.js'
import { BuildingList } from 'src/models/Building.js'
import { WaterwayList } from 'src/models/Waterway.js'
import { ProvinceList } from 'src/models/Province.js'
import { TransportList } from 'src/models/Transport.js'
import { MapBoundary } from 'src/models/MapBoundary.js'
import StaticalData from 'src/components/Widgets/Map/MapWithFilter/Components/StaticalData.vue'
import StatisticInformationChart from 'src/components/Widgets/Map/MapWithFilter/StatisticInformationChart.vue'

let leafletObject = null
if (typeof window !== 'undefined') {
  import('leaflet')
    .then((leaflet) => {
      leafletObject = leaflet.default
    })
}

export default {
  name: 'MapWithFilter',
  components: { StaticalData, StatisticInformationChart },
  data: () => {
    return {
      mounted: false,
      mapInstance: null,
      panel: 'branches',
      selectedLayer: {},
      selectedProvinece: null,
      closestBranchPointMarker: null,
      selectedCity: null,
      staticalData: null,
      staticalLoading: false,
      provinceList: new ProvinceList(),

      // points
      branchesAbortController: null,
      transportAbortController: null,
      branchesList: new BrancheList(),
      transportList: new TransportList(),
      branchesMarkers: [],
      transportMarkers: [],
      showbranches: false,
      showtransport: false,

      // polygons
      waterAbortController: null,
      pofwAbortController: null,
      placesAbortController: null,
      natrualAbortController: null,
      landuseAbortController: null,
      buildingsAbortController: null,
      waterList: new WaterList(),
      pofwList: new PofwList(),
      placesList: new PlaceList(),
      natrualList: new NatrualList(),
      landuseList: new LanduseList(),
      buildingsList: new BuildingList(),
      waterPolygon: [],
      pofwPolygon: [],
      placesPolygon: [],
      natrualPolygon: [],
      landusePolygon: [],
      buildingsPolygon: [],
      showwater: false,
      showpofw: false,
      showplaces: true,
      shownatrual: false,
      showlanduse: false,
      showbuildings: false,

      // polylines
      railwayAbortController: null,
      roadsAbortController: null,
      waterWayAbortController: null,
      railwayList: new RailwayList(),
      roadsList: new RoadList(),
      waterWayList: new WaterwayList(),
      roadsPolyline: [],
      waterWayPolyline: [],
      railwayPolyline: [],
      showrailway: false,
      showroads: false,
      showwaterWay: false,

      pointList: [
        'transport',
        'branches'
      ],
      polygonNameList: [
        'water',
        'pofw',
        // 'places',
        'natrual',
        'landuse',
        'buildings'
      ],
      polylineNameList: [
        'railway',
        'roads',
        'waterWay'
      ],

      statisticInformation: [],

      zoom: 2,
      iconWidth: 25,
      iconHeight: 40
    }
  },
  computed: {
    mapLoading () {
      const allList = this.pointList.concat(this.polygonNameList, this.polylineNameList, ['places'])
      return allList.find(item => this[item + 'List'].laoding)
    },
    citiesOfSelectedProvinece () {
      if (!this.selectedProvinece) {
        return []
      }

      return this.selectedProvinece.cities
    }
  },
  mounted() {
    // this.loadProvineces()
    this.getStatistic()
    setTimeout(() => {
      this.loadMap()
      this.setEventBuses()
      this.mounted = true
    }, 1000)
  },
  methods: {
    clearSelectedLayer () {
      this.selectedLayer = {}
      this.hideAll('branches', 'Markers')
    },
    getStatical () {
      const bounds = new MapBoundary(this.mapInstance.getBounds()).getBBox()
      const options = {
        bbox: bounds
      }
      this.staticalLoading = true
      APIGateway.statistic.statical(options)
        .then((staticalData) => {
          this.staticalLoading = false
          this.staticalData = staticalData
        })
        .catch(() => {
          this.staticalLoading = false
        })
    },
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
        const showState = this['show' + item]
        this[item + 'List'].list = []
        if (showState) {
          const bounds = new MapBoundary(this.mapInstance.getBounds()).getBounds()
          newOptions.payload = bounds
          this.getPoint(item, newOptions)
        } else {
          this.hideAll(item, 'Markers')
        }
      })
      this.$bus.on('map-change-places-filter', (placesFilter) => {
        const item = 'places'
        this.hideAll(item, 'Polygon')
        this[item + 'List'].list = []
        this.getPolygon(item, { place: placesFilter })
      })
      this.pointList.forEach(item => {
        this.$bus.on('map-change-' + item, (newValue) => {
          this['show' + item] = newValue
          this.togglePoints()
        })
      })
      this.polygonNameList.forEach(item => {
        this.$bus.on('map-change-' + item, (newValue) => {
          this['show' + item] = newValue
          this.togglePolygons()
        })
      })
      this.polylineNameList.forEach(item => {
        this.$bus.on('map-change-' + item, (newValue) => {
          this['show' + item] = newValue
          this.togglePolylines()
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
      this.mapInstance.on('moveend', this.moveenddMap)
    },
    moveenddMap () {
      // this.getStatical()
      if (this.closestBranchPointMarker) {
        this.hideLayer(this.closestBranchPointMarker)
      }
      this.togglePoints()
      this.togglePolygons()
      this.togglePolylines()
    },
    hideAll (layerName, layerType) {
      this[layerName + layerType].forEach(layer => {
        this.hideLayer(layer)
      })
    },
    togglePoints () {
      this.pointList.forEach(item => {
        this.togglePoint(item)
      })
    },
    getPoint (item, options) {
      // AbortController
      if (this[item + 'AbortController']) {
        this[item + 'AbortController'].abort()
      }
      this[item + 'AbortController'] = new AbortController()
      options.config = {
        signal: this[item + 'AbortController'].signal
      }

      this[item + 'List'].laoding = true
      APIGateway.point[item](options)
        .then(({ list }) => {
          if (list.list.length === 0) {
            return
          }
          this[item + 'List'] = list
          this.loadMarkersList(item + 'List', item + 'Markers')
          this[item + 'List'].laoding = false
        })
        .catch(() => {
          this[item + 'List'].laoding = false
        })
    },
    togglePoint (item) {
      const showState = this['show' + item]
      this[item + 'List'].list = []
      const bounds = new MapBoundary(this.mapInstance.getBounds()).getBounds()
      const options = {
        payload: bounds
      }
      if (showState) {
        this.getPoint(item, options)
      } else {
        this.hideAll(item, 'Markers')
      }
    },
    togglePolygons () {
      this.polygonNameList.forEach(item => {
        this.togglePolygon(item)
      })
    },
    togglePolygon (item) {
      const showState = this['show' + item]
      this[item + 'List'].list = []
      const bounds = new MapBoundary(this.mapInstance.getBounds()).getBounds()
      const options = {
        payload: bounds
      }
      if (showState) {
        this.getPolygon(item, options)
      } else {
        this.hideAll(item, 'Polygon')
      }
    },
    getPolygon (item, options) {
      // AbortController
      if (this[item + 'AbortController']) {
        this[item + 'AbortController'].abort()
      }
      this[item + 'AbortController'] = new AbortController()
      options.config = {
        signal: this[item + 'AbortController'].signal
      }

      this[item + 'List'].laoding = true
      APIGateway.multiPolygon[item](options)
        .then(({ list }) => {
          this[item + 'List'] = list
          this.loadPolygonList(item + 'List', item + 'Polygon')
          this[item + 'List'].laoding = false
        })
        .catch(() => {
          this[item + 'List'].laoding = false
        })
    },
    togglePolylines () {
      this.polylineNameList.forEach(item => {
        this.togglePolyline(item)
      })
    },
    getPolyline (item, options) {
      // AbortController
      if (this[item + 'AbortController']) {
        this[item + 'AbortController'].abort()
      }
      this[item + 'AbortController'] = new AbortController()
      options.config = {
        signal: this[item + 'AbortController'].signal
      }

      this[item + 'List'].laoding = true
      APIGateway.multiString[item](options)
        .then(({ list }) => {
          this[item + 'List'] = list
          this.loadPolylineList(item + 'List', item + 'Polyline')
          this[item + 'List'].laoding = false
        })
        .catch(() => {
          this[item + 'List'].laoding = false
        })
    },
    togglePolyline (item) {
      const showState = this['show' + item]
      this[item + 'List'].list = []
      const bounds = new MapBoundary(this.mapInstance.getBounds()).getBounds()
      const options = {
        payload: bounds
      }
      if (showState) {
        this.getPolyline(item, options)
      } else {
        this.hideAll(item, 'Polyline')
      }
    },
    loadMarkersList (listName, markerName) {
      const zoom = this.mapInstance._zoom // 13
      // const bounds = this.mapInstance.getBounds()
      this[markerName].forEach(marker => {
        this.hideLayer(marker)
      })
      if (zoom < 10) {
        return
      }

      // this[listName].inBounds(bounds).forEach(marker => {
      this[listName].list.forEach(marker => {
        const layerName = listName.replace('List', '')
        const markerLayer = this.addMarker(marker.point, '<b>(' + layerName + ')</b></br><b>name: ' + marker.name + '</b></br>fclass:' + marker.fclass, marker, layerName)
        this[markerName].push(markerLayer)
      })
    },
    loadPolygonList (listName, polygonName) {
      const zoom = this.mapInstance._zoom // 13
      // const bounds = this.mapInstance.getBounds()
      this[polygonName].forEach(polygon => {
        this.hideLayer(polygon)
      })
      if (zoom < 10) {
        return
      }

      // this[listName].inBounds(bounds).forEach(polygon => {
      this[listName].list.forEach(polygon => {
        const layerName = listName.replace('List', '')
        const polygonLayer = this.addPolygon(polygon.multiPolygon, '<b>(' + layerName + ')</b></br><b>name: ' + polygon.name + '</b></br>fclass:' + polygon.fclass, polygon, layerName)
        this[polygonName].push(polygonLayer)
      })
    },
    loadPolylineList (listName, polylineName) {
      const zoom = this.mapInstance._zoom // 13
      // const bounds = this.mapInstance.getBounds()
      this[polylineName].forEach(polyline => {
        this.hideLayer(polyline)
      })
      if (zoom < 10) {
        return
      }

      // this[listName].inBounds(bounds).forEach(polyline => {
      this[listName].list.forEach(polyline => {
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
            if (name === 'branches') {
              this.panel = name
              this.selectedLayer = data
              // const greenIcon = leafletObject.icon({
              //   iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
              //   shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
              //
              //   iconSize: [38, 95], // size of the icon
              //   shadowSize: [50, 64], // size of the shadow
              //   iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
              //   shadowAnchor: [4, 62], // the same for the shadow
              //   popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
              // })
              // const layerName = 'branches'
              // if (data.closest_branch_point) {
              //   if (this.closestBranchPointMarker) {
              //     this.hideLayer(this.closestBranchPointMarker)
              //   }
              //   this.closestBranchPointMarker = this.addMarker(data.closest_branch_point, '<b>(' + layerName + ')</b></br><b>name: ' + data.name + '</b></br>fclass:' + data.fclass, data, layerName, greenIcon, false)
              // }
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
          if (name !== 'places') {
            return
          }
          this.hideAll('places', 'Polygon')
          const item = 'branches'
          this.hideAll(item, 'Markers')
          this[item + 'List'].list = []
          this.getPoint(item, { bbox: data.bbox })

          // this.panel = name
          // this.selectedLayer = data
        })
        .bindPopup(popup)
      // .openPopup()
    },
    addPolyline(latlngs, popup = '', data, name) {
      return leafletObject.polyline(latlngs)
        .addTo(this.mapInstance)
        .on('click', () => {
          // this.panel = name
          // this.selectedLayer = data
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
