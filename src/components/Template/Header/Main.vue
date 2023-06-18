<template>
  <div class="page-header navbar">
    <div class="page-header-inner">
      <!-- logo start -->
      <div class="page-logo">
        <img alt=""
             src="/img/Logo.jpg">
      </div>
      <!-- logo end -->
      <ul class="nav navbar-nav navbar-left in">
        <li>
          <q-btn flat
                 round
                 icon="menu"
                 @click="toggleLeftDrawer" />
        </li>
      </ul>
      <form class="search-form-opened">
        <q-linear-progress v-if="searchbranches.loading"
                           indeterminate />
        <div class="input-group">
          <input v-model="searchbranch"
                 type="text"
                 class="form-control"
                 placeholder="Search..."
                 :disabled="searchbranches.loading"
                 name="query"
                 v-on:keydown.enter.prevent="searchbranche">
          <span class="input-group-btn search-btn">
            <q-btn flat
                   size="sm"
                   round
                   class="text-black"
                   icon="search"
                   :loading="searchbranches.loading"
                   @click="searchbranche" />
          </span>
        </div>
        <q-menu v-model="showingSearchbranch"
                max-height="300px">
          <q-list style="max-width: 300px">
            <q-item v-for="searchbranch in searchbranches.list.splice(0, 20)"
                    :key="searchbranch.id"
                    clickable
                    @click="showBranch(searchbranch)">
              <q-item-section>
                <div>{{ searchbranch.name }}</div>
                <div style="max-width: 270px"
                     class="ellipsis">{{ searchbranch.address }}</div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </form>
      <!-- start mobile menu -->
      <a href="javascript:;"
         class="menu-toggler responsive-toggler"
         data-bs-toggle="collapse"
         data-bs-target=".navbar-collapse">
        <span />
      </a>
      <!-- end mobile menu -->
      <!-- start header menu -->
      <div class="top-menu">
        <ul class="nav navbar-nav pull-right">
          <!-- start notification dropdown -->
          <li id="header_notification_bar"
              class="dropdown dropdown-extended dropdown-notification">
            <a href="javascript:;"
               class="dropdown-toggle"
               data-bs-toggle="dropdown"
               data-hover="dropdown"
               data-close-others="true">
              <q-icon name="notifications" />
              <span class="notify" />
              <span class="heartbeat" />
            </a>
            <ul class="dropdown-menu pullDown">
              <li class="external">
                <h3><span class="bold">Notifications</span></h3>
                <span class="notification-label purple-bgcolor">New 6</span>
              </li>
              <li>
                <div class="slimScrollDiv"
                     style="position: relative; overflow: hidden; width: auto;"><ul class="dropdown-menu-list small-slimscroll-style"
                                                                                    data-handle-color="#637283"
                                                                                    style="overflow: hidden; width: auto;">
                       <li>
                         <a href="javascript:;">
                           <span class="time">just now</span>
                           <span class="details">
                             <span class="notification-icon circle deepPink-bgcolor box-shadow-1"><i class="fa fa-check" /></span> Congratulations!. </span>
                         </a>
                       </li>
                       <li>
                         <a href="javascript:;">
                           <span class="time">3 mins</span>
                           <span class="details">
                             <span class="notification-icon circle purple-bgcolor box-shadow-1"><i class="fa fa-user o" /></span>
                             <b>John Micle </b>is now following you. </span>
                         </a>
                       </li>
                       <li>
                         <a href="javascript:;">
                           <span class="time">7 mins</span>
                           <span class="details">
                             <span class="notification-icon circle blue-bgcolor box-shadow-1"><i class="fa fa-comments-o" /></span>
                             <b>Sneha Jogi </b>sent you a message. </span>
                         </a>
                       </li>
                       <li>
                         <a href="javascript:;">
                           <span class="time">12 mins</span>
                           <span class="details">
                             <span class="notification-icon circle pink box-shadow-1"><i class="fa fa-heart" /></span>
                             <b>Ravi Patel </b>like your photo. </span>
                         </a>
                       </li>
                       <li>
                         <a href="javascript:;">
                           <span class="time">15 mins</span>
                           <span class="details">
                             <span class="notification-icon circle yellow box-shadow-1"><i class="fa fa-warning" /></span> Warning! </span>
                         </a>
                       </li>
                       <li>
                         <a href="javascript:;">
                           <span class="time">10 hrs</span>
                           <span class="details">
                             <span class="notification-icon circle red box-shadow-1"><i class="fa fa-times" /></span> Application error. </span>
                         </a>
                       </li>
                     </ul><div class="slimScrollBar"
                               style="background: rgb(158, 165, 171); width: 5px; position: absolute; top: 0px; opacity: 0.4; display: block; border-radius: 7px; z-index: 99; right: 1px;" /><div class="slimScrollRail"
                                                                                                                                                                                                   style="width: 5px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.2; z-index: 90; right: 1px;" /></div>
                <div class="dropdown-menu-footer">
                  <a href="javascript:void(0)"> All notifications </a>
                </div>
              </li>
            </ul>
          </li>
          <!-- end notification dropdown -->
          <!-- start message dropdown -->
          <li id="header_inbox_bar"
              class="dropdown dropdown-extended dropdown-inbox">
            <a href="javascript:;"
               class="dropdown-toggle"
               data-bs-toggle="dropdown"
               data-hover="dropdown"
               data-close-others="true">
              <q-icon name="mail" />
              <span class="notify" />
              <span class="heartbeat" />
            </a>
            <ul class="dropdown-menu animated pullDown">
              <li class="external">
                <h3><span class="bold">Messages</span></h3>
                <span class="notification-label cyan-bgcolor">New 2</span>
              </li>
              <li>
                <div class="slimScrollDiv"
                     style="position: relative; overflow: hidden; width: auto;"><ul class="dropdown-menu-list small-slimscroll-style"
                                                                                    data-handle-color="#637283"
                                                                                    style="overflow: hidden; width: auto;">
                       <li>
                         <a href="#">
                           <span class="photo">
                             <img src="https://einfosoft.com/templates/templatemonster/ecab/source/assets/img/user/user2.jpg"
                                  class="img-circle"
                                  alt=""> </span>
                           <span class="subject">
                             <span class="from"> Sarah Smith </span>
                             <span class="time">Just Now </span>
                           </span>
                           <span class="message"> Jatin I found you on LinkedIn... </span>
                         </a>
                       </li>
                       <li>
                         <a href="#">
                           <span class="photo">
                             <img src="https://einfosoft.com/templates/templatemonster/ecab/source/assets/img/user/user3.jpg"
                                  class="img-circle"
                                  alt=""> </span>
                           <span class="subject">
                             <span class="from"> John Deo </span>
                             <span class="time">16 mins </span>
                           </span>
                           <span class="message"> Fwd: Important Notice Regarding Your Domain
                             Name... </span>
                         </a>
                       </li>
                       <li>
                         <a href="#">
                           <span class="photo">
                             <img src="https://einfosoft.com/templates/templatemonster/ecab/source/assets/img/user/user1.jpg"
                                  class="img-circle"
                                  alt=""> </span>
                           <span class="subject">
                             <span class="from"> Rajesh </span>
                             <span class="time">2 hrs </span>
                           </span>
                           <span class="message"> pls take a print of attachments. </span>
                         </a>
                       </li>
                       <li>
                         <a href="#">
                           <span class="photo">
                             <img src="https://einfosoft.com/templates/templatemonster/ecab/source/assets/img/user/user8.jpg"
                                  class="img-circle"
                                  alt=""> </span>
                           <span class="subject">
                             <span class="from"> Lina Smith </span>
                             <span class="time">40 mins </span>
                           </span>
                           <span class="message"> Apply for Ortho Surgeon </span>
                         </a>
                       </li>
                       <li>
                         <a href="#">
                           <span class="photo">
                             <img src="https://einfosoft.com/templates/templatemonster/ecab/source/assets/img/user/user5.jpg"
                                  class="img-circle"
                                  alt=""> </span>
                           <span class="subject">
                             <span class="from"> Jacob Ryan </span>
                             <span class="time">46 mins </span>
                           </span>
                           <span class="message"> Request for leave application. </span>
                         </a>
                       </li>
                     </ul><div class="slimScrollBar"
                               style="background: rgb(158, 165, 171); width: 5px; position: absolute; top: 0px; opacity: 0.4; display: block; border-radius: 7px; z-index: 99; right: 1px;" /><div class="slimScrollRail"
                                                                                                                                                                                                   style="width: 5px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.2; z-index: 90; right: 1px;" /></div>
                <div class="dropdown-menu-footer">
                  <a href="#"> All Messages </a>
                </div>
              </li>
            </ul>
          </li>
          <!-- end message dropdown -->
          <!-- start manage user dropdown -->
          <li class="dropdown dropdown-user">
            <a href="javascript:;"
               class="dropdown-toggle"
               data-bs-toggle="dropdown"
               data-hover="dropdown"
               data-close-others="true"
               aria-expanded="false">
              <img alt=""
                   class="img-circle "
                   src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Bank_Sepah_logo.svg/1200px-Bank_Sepah_logo.svg.png">
            </a>
            <ul class="dropdown-menu dropdown-menu-default animated jello">
              <li>
                <a href="user_profile.html">
                  <i class="fa fa-user-o" /> Profile </a>
              </li>
              <li>
                <a href="#">
                  <i class="fa fa-cogs" /> Settings
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fa fa-question-circle" /> Help
                </a>
              </li>
              <li class="divider" />
              <li>
                <a href="lock_screen.html">
                  <i class="fa fa-lock" /> Lock
                </a>
              </li>
              <li>
                <a href="login.html">
                  <i class="fa fa-sign-out" /> Log Out </a>
              </li>
            </ul>
          </li>
          <!-- end manage user dropdown -->
          <li class="dropdown dropdown-quick-sidebar-toggler">
            <q-btn flat
                   round
                   icon="more_vert" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { User } from 'src/models/User.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { BrancheList } from 'src/models/Branche.js'
import menuItems from 'src/components/Template/menuData.js'

export default {
  name: 'MainHeaderTemplate',
  data() {
    return {
      searchbranch: null,
      showingSearchbranch: false,
      cart: null,
      conferenceMenu: false,
      showHamburgerConfig: true,
      searchInput: '',
      user: new User(),
      searchbranches: new BrancheList(),
      isAdmin: false,
      isUserLogin: false,
      items: menuItems
    }
  },
  computed: {
    profileTitlesList () {
      const items = [
        {
          title: 'پروفایل',
          icon: 'isax:user',
          routeName: 'Public.Home',
          permission: 'all',
          active: false,
          children: []
        },
        {
          title: 'داشبورد',
          icon: 'isax:gift',
          routeName: 'UserPanel.Dashboard',
          params: null,
          permission: 'all',
          active: false,
          children: []
        }
      ]

      if (this.user.isSuperuser()) {
        items.push({
          title: 'پنل ادمین',
          icon: 'isax:gift',
          routeName: 'AdminPanel.Dashboard',
          params: null,
          permission: 'all',
          active: false,
          children: []
        })
      }

      return items
    },
    cartOrdersCount () {
      return 0
    },
    showHamburger () {
      return this.$store.getters['AppLayout/showHamburgerBtn'] || this.$q.screen.lt.md
    },
    computedUserId () {
      const user = this.$store.getters['Auth/user']
      if (!user) {
        return null
      }

      return user.id
    },
    layoutLeftDrawerVisible() {
      return this.$store.getters['AppLayout/layoutLeftDrawerVisible']
    },
    showMenuItem () {
      return (/* item */) => {
        return true
        // return (item.permission === 'all' || this.user.hasPermission(item.permission))
      }
    }
  },
  watch: {
    computedUserId () {
      this.loadAuthData()
    }
  },
  mounted () {
    this.loadAuthData()
    this.checkMenurItemsForAuthenticatedUser()
  },
  methods: {
    showBranch(searchbranch) {
      this.showingSearchbranch = false
      this.$bus.emit('map-change-show-branch', searchbranch)
    },
    searchbranche () {
      this.searchbranches.loading = true
      this.showingSearchbranch = false
      APIGateway.point.searchbranche({ text: this.searchbranch })
        .then(({ list }) => {
          this.searchbranches = new BrancheList(list)
          this.searchbranches.loading = false
          this.showingSearchbranch = true
        })
        .catch(() => {
          this.showingSearchbranch = false
          this.searchbranches.loading = false
        })
    },
    toggleMenu () {

    },
    checkMenurItemsForAuthenticatedUser () {
      // ToDo: check menu items by user role
      // if (this.isAdmin) {
      //   const hasAdminPanel = this.items.find((item) => item.routeName === 'Admin.UploadCenter.Contents')
      //   if (!hasAdminPanel) {
      //     this.items.push({
      //       selected: 'adminPanel',
      //       title: 'پنل ادمین',
      //       routeName: 'Admin.UploadCenter.Contents',
      //       type: 'itemMenu',
      //       permission: 'all',
      //       show: false
      //     })
      //   }
      // }
    },
    filterByStatement() {
      const param = {
        q: this.searchInput
      }
      this.$router.push({ name: 'Public.Content.Search', query: param })
    },
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
      this.isAdmin = this.$store.getters['Auth/isAdmin']
      this.isUserLogin = this.$store.getters['Auth/isUserLogin']
    },
    ...mapMutations('AppLayout', [
      'updateVisibilityBreadcrumb',
      'updateBreadcrumbs',
      'updateBreadcrumbLoading',
      'updateLayoutLeftDrawerVisible'
    ]),
    logOut() {
      return this.$store.dispatch('Auth/logOut')
    },
    toggleLeftDrawer() {
      this.updateLayoutLeftDrawerVisible(!this.layoutLeftDrawerVisible)
    },
    hasRoute(route) {
      if (!route) {
        return
      }
      return !!(route.name || route.path)
    },
    goToLogin() {
      this.$router.push({ name: 'Login' })
    },
    routeTo(name) {
      this.$router.push({ name })
    }
  }
}
</script>

<style lang="scss" scoped>
$header-height: 60px;

.page-header {
  min-height: $header-height;
  .page-header-inner {
    .page-logo {
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;
      font-size: 25px;
      font-weight: bold;
      padding: 0;
      height: $header-height;
      img {
        width: 150px;
      }
    }
    .nav {
      &.navbar-nav {
        margin: 0;
        list-style: none;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .search-form-opened {
      .input-group {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        align-items: stretch;
        width: 100%;
        &>.form-control,
        &>.form-select {
          position: relative;
          flex: 1 1 auto;
          width: 1%;
          min-width: 0;
        }
        &>:not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: -1px;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
    }
  }
}
}
audio, canvas, iframe, img, svg, video {
vertical-align: middle;
}
}
</style>
