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
      <div class="col-md-12">
        <div class="card card-box">
          <div class="card-head">
            <header>نقشه</header>
            <div class="tools">
              <a class="fa fa-repeat btn-color box-refresh"
                 href="javascript:;" />
              <a class="t-collapse btn-color fa fa-chevron-down"
                 href="javascript:;" />
              <a class="t-close btn-color fa fa-times"
                 href="javascript:;" />
            </div>
          </div>
          <div class="card-body "
               style="">
            <div id="map"
                 class="height-350"
                 style="position: relative; overflow: hidden;" />
          </div>
        </div>
      </div>
    </div>
    <div class="row q-col-gutter-lg">
      <div class="col-lg-6 col-md-6 col-sm-12 col-12">
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
        <div class="row q-col-gutter-lg state-overview">
          <div class="col-lg-6 col-md-6 col-sm-12 col-12">
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
          <div class="col-lg-6 col-md-6 col-sm-12 col-12">
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
          <div class="col-lg-6 col-md-6 col-sm-12 col-12">
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
          <div class="col-lg-6 col-md-6 col-sm-12 col-12">
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
          <div class="col-lg-6 col-md-6 col-sm-12 col-12">
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
          <div class="col-lg-6 col-md-6 col-sm-12 col-12">
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
          <div class="col-lg-6 col-md-6 col-sm-12 col-12">
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
          <div class="col-lg-6 col-md-6 col-sm-12 col-12">
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
          <div class="col-lg-6 col-md-6 col-sm-12 col-12">
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
          <div class="col-lg-6 col-md-6 col-sm-12 col-12">
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

let leafletObject = null
if (typeof window !== 'undefined') {
  import('leaflet')
    .then((leaflet) => {
      leafletObject = leaflet.default
    })
}

export default {
  name: 'MapWithFilter',
  data: () => {
    return {
      mounted: false,
      mapInstance: null,
      panel: 'empty',
      selectedLayer: {},
      selectedProvinece: null,
      selectedCity: null,
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
      waterPolygon: [],
      pofwPolygon: [],
      placesPolygon: [],
      natrualPolygon: [],
      landusePolygon: [],
      buildingsPolygon: [],
      railwayPolyline: [],
      roadsPolyline: [],
      waterWayPolyline: [],
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
    setTimeout(() => {
      this.loadMap()
      this.setEventBuses()
      this.getAllData()
    }, 1000)
  },
  methods: {
    loadProvineces () {
      APIGateway.province.index()
        .then((provinceList) => {
          this.provinceList = provinceList
        })
    },
    setEventBuses () {
      this.setEventBus_transport()
      this.polygonNameList.forEach(item => {
        this.$bus.on('map-change-' + item, (newValue) => {
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
          if (newValue) {
            this.loadPolylineList(item + 'List', item + 'Polyline')
          }
          this[item + 'Polyline'].forEach(polygon => {
            if (newValue) {
              this.showLayer(polygon)
            } else {
              this.hideLayer(polygon)
            }
          })
        })
      })
    },
    setEventBus_transport () {
      this.$bus.on('map-change-transport', (newValue) => {
        if (newValue) {
          this.loadTransports()
        }
        this.transportMarkers.forEach(marker => {
          if (newValue) {
            this.showLayer(marker)
          } else {
            this.hideLayer(marker)
          }
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
    },
    getAllData () {
      this.getPoints()
      this.getPolygons()
      this.getPolylines()
    },
    getPoints () {
      this.getTransports()
    },
    getPolygons () {
      this.polygonNameList.forEach(item => {
        APIGateway.multiPolygon[item]()
          .then((list) => {
            this[item + 'List'] = list
            this.loadPolygonList(item + 'List', item + 'Polygon')
          })
      })
    },
    getPolylines () {
      this.polylineNameList.forEach(item => {
        APIGateway.multiString[item]()
          .then((list) => {
            this[item + 'List'] = list
            this.loadPolylineList(item + 'List', item + 'Polyline')
          })
      })
    },
    loadPolygonList (listName, polygonName) {
      this[listName].list.forEach(polygon => {
        const layerName = listName.replace('List', '')
        const polygonLayer = this.addPolygon(polygon.multiPolygon, '<b>(' + layerName + ')</b></br><b>name: ' + polygon.name + '</b></br>fclass:' + polygon.fclass, polygon, layerName)
        this[polygonName].push(polygonLayer)
      })
    },
    loadPolylineList (listName, polylineName) {
      this[listName].list.forEach(polyline => {
        const layerName = listName.replace('List', '')
        const polylineLayer = this.addPolyline(polyline.multiString, '<b>(' + layerName + ')</b></br><b>name: ' + polyline.name + '</b></br>fclass:' + polyline.fclass, polyline, layerName)
        this[polylineName].push(polylineLayer)
      })
    },
    getTransports () {
      APIGateway.point.transport()
        .then((transportList) => {
          this.transportList = transportList
          this.loadTransports()
        })
    },
    loadTransports () {
      this.transportList.list.forEach(point => {
        const marker = this.addMarker(point.point, '<b>name: ' + point.name + '</b></br>fclass:' + point.fclass, point, 'transport')
        this.transportMarkers.push(marker)
      })
    },
    onClickMap(e) {
      // alert('You clicked the map at ' + e.latlng)
      // this.addMarker(e.latlng)
    },
    addMarker(latlng, popup = '', data, name) {
      return leafletObject.marker(latlng)
        .addTo(this.mapInstance)
        .on('click', () => {
          this.panel = name
          this.selectedLayer = data
        })
        .bindPopup(popup)
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
