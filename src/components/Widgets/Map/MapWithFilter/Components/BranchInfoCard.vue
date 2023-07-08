<template>
  <div class="BranchInfoCard card relative-position">
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
                  separator
                  class="row">
            <q-item v-ripple
                    class="col-12"
                    clickable>
              <q-item-section>Branches</q-item-section>
            </q-item>
            <template v-if="selectedLayer">
              <div class="col-12">
                <q-tabs v-model="branchInfoTab"
                        dense
                        class="text-grey"
                        active-color="primary"
                        indicator-color="primary"
                        align="justify"
                        narrow-indicator>
                  <q-tab name="table"
                         label="جدول" />
                  <q-tab v-if="selectedLayer.id"
                         name="chart"
                         label="نمودار" />
                </q-tabs>
                <q-tab-panels v-model="branchInfoTab"
                              animated>
                  <q-tab-panel name="table">
                    <div class="row">
                      <q-item v-if="selectedLayer.id"
                              v-ripple
                              class="col-md-6 col-12"
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
                              class="col-md-6 col-12"
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
                                class="col-md-6 col-12"
                                clickable>
                          <q-item-section>
                            <q-item-label>closest_branch_info.id</q-item-label>
                            <q-item-label caption>
                              {{ selectedLayer.closest_branch_info.id }}
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item v-ripple
                                class="col-md-6 col-12"
                                clickable>
                          <q-item-section>
                            <q-item-label>closest_branch_info.geom</q-item-label>
                            <q-item-label caption>
                              {{ selectedLayer.closest_branch_info.geom }}
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item v-ripple
                                class="col-md-6 col-12"
                                clickable>
                          <q-item-section>
                            <q-item-label>closest_branch_info.distance</q-item-label>
                            <q-item-label caption>
                              {{ selectedLayer.closest_branch_info.distance }}
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item v-ripple
                                class="col-md-6 col-12"
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
                              class="col-md-6 col-12"
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
                              class="col-md-6 col-12"
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
                              class="col-md-6 col-12"
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
                              class="col-md-6 col-12"
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
                              class="col-md-6 col-12"
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
                              class="col-md-6 col-12"
                              clickable>
                        <q-item-section>
                          <q-item-label>phone_2</q-item-label>
                          <q-item-label caption>
                            {{ selectedLayer.phone_2 }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item v-if="selectedLayer.closest_name"
                              v-ripple
                              class="col-md-6 col-12"
                              clickable>
                        <q-item-section>
                          <q-item-label>closest_name</q-item-label>
                          <q-item-label caption>
                            {{ selectedLayer.closest_name }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item v-if="selectedLayer.closest_distance"
                              v-ripple
                              class="col-md-6 col-12"
                              clickable>
                        <q-item-section>
                          <q-item-label>closest_distance</q-item-label>
                          <q-item-label caption>
                            {{ selectedLayer.closest_distance }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item v-ripple
                              class="col-md-6 col-12"
                              :class="{'bg-green-2': selectedLayer.currencyـcircle, 'bg-red-2': !selectedLayer.currencyـcircle}"
                              clickable>
                        <q-item-section>
                          <q-item-label>currencyـcircle</q-item-label>
                          <q-item-label caption>
                            {{ (selectedLayer.currencyـcircle ? 'دارد' : 'ندارد') }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item v-ripple
                              class="col-md-6 col-12"
                              :class="{'bg-green-2': selectedLayer.atm, 'bg-red-2': !selectedLayer.atm}"
                              clickable>
                        <q-item-section>
                          <q-item-label>atm</q-item-label>
                          <q-item-label caption>
                            {{ (selectedLayer.atm ? 'دارد' : 'ندارد') }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item v-ripple
                              class="col-md-6 col-12"
                              :class="{'bg-green-2': selectedLayer.eveningـcounter, 'bg-red-2': !selectedLayer.eveningـcounter}"
                              clickable>
                        <q-item-section>
                          <q-item-label>eveningـcounter</q-item-label>
                          <q-item-label caption>
                            {{ (selectedLayer.eveningـcounter ? 'دارد' : 'ندارد') }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item v-ripple
                              class="col-md-6 col-12"
                              :class="{'bg-green-2': selectedLayer.Safeـbox, 'bg-red-2': !selectedLayer.Safeـbox}"
                              clickable>
                        <q-item-section>
                          <q-item-label>Safeـbox</q-item-label>
                          <q-item-label caption>
                            {{ (selectedLayer.Safeـbox ? 'دارد' : 'ندارد') }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item v-ripple
                              class="col-md-6 col-12"
                              :class="{'bg-green-2': selectedLayer.pos, 'bg-red-2': !selectedLayer.pos}"
                              clickable>
                        <q-item-section>
                          <q-item-label>pos</q-item-label>
                          <q-item-label caption>
                            {{ (selectedLayer.pos ? 'دارد' : 'ندارد') }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item v-ripple
                              class="col-md-6 col-12"
                              :class="{'bg-green-2': selectedLayer.cvv2, 'bg-red-2': !selectedLayer.cvv2}"
                              clickable>
                        <q-item-section>
                          <q-item-label>cvv2</q-item-label>
                          <q-item-label caption>
                            {{ (selectedLayer.cvv2 ? 'دارد' : 'ندارد') }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item v-ripple
                              class="col-md-6 col-12"
                              :class="{'bg-green-2': selectedLayer.cellularـphone, 'bg-red-2': !selectedLayer.cellularـphone}"
                              clickable>
                        <q-item-section>
                          <q-item-label>cellularـphone</q-item-label>
                          <q-item-label caption>
                            {{ (selectedLayer.cellularـphone ? 'دارد' : 'ندارد') }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item v-if="selectedLayer.geom"
                              v-ripple
                              class="col-md-6 col-12"
                              clickable>
                        <q-item-section>
                          <q-item-label>geom</q-item-label>
                          <q-item-label caption>
                            {{ selectedLayer.geom }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </div>
                  </q-tab-panel>

                  <q-tab-panel v-if="selectedLayer.id"
                               name="chart">
                    <template v-if="statisticInformationLoading">
                      <q-skeleton height="200px"
                                  square />
                    </template>
                    <template v-else>
                      <div class="flex justify-end">
                        <q-select v-model="informationTruncType"
                                  map-options
                                  :options="informationTruncOptions" />
                      </div>
                      <statistic-information-chart :series="statisticInformation" />
                    </template>
                  </q-tab-panel>

                </q-tab-panels>
              </div>
            </template>
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
</template>

<script>
import { APIGateway } from 'src/api/APIGateway.js'
import StatisticInformationChart from 'src/components/Widgets/Map/MapWithFilter/StatisticInformationChart.vue'

export default {
  name: 'BranchInfoCard',
  components: { StatisticInformationChart },
  props: {
    selectedLayer: {
      type: [Object, Boolean],
      default: false
    }
  },
  data: () => {
    return {
      panel: 'branches',
      branchInfoTab: 'table',
      informationTruncType: 'daily',
      informationTruncOptions: [
        {
          label: 'روزانه',
          value: 'daily'
        },
        {
          label: 'هفتگی',
          value: 'weekly'
        },
        {
          label: 'ماهیانه',
          value: 'monthly'
        },
        {
          label: 'سالیانه',
          value: 'yearly'
        }
      ],
      statisticInformationLoading: false,
      statisticInformation: []
    }
  },
  watch: {
    selectedLayer () {
      this.getChartData()
    },
    informationTruncType () {
      this.getChartData()
    }
  },
  methods: {
    getChartData () {
      const selectedBrachId = this.selectedLayer.id
      if (!selectedBrachId) {
        return
      }
      this.statisticInformationLoading = true
      const trunc = this.informationTruncType.value || this.informationTruncType
      APIGateway.statistic.information({
        branche: selectedBrachId,
        trunc
      })
        .then((series) => {
          this.statisticInformation = series
          this.statisticInformationLoading = false
        })
        .catch(() => {
          this.statisticInformationLoading = false
        })
    },
    clearSelectedLayer () {
      this.$emit('clear')
    }
  }
}
</script>

<style scoped lang="scss">
.BranchInfoCard {
  //:deep(.q-list) {
  //  display: flex;
  //  flex-flow: row;
  //  flex-wrap: wrap;
  //  .q-item {
  //    width: 50%;
  //  }
  //}
}
</style>
