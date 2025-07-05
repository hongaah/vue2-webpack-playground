<template>
  <div id="app">
    <div v-if="hasHeader" class="myHeader">
      <!-- lg nav -->
      <div class="screen-lg">
        <aside
          :class="{ 'screen-lg-menu': isMinScreen, 'aside-menu': true, 'aside-menu-collapse': isCollapse }"
        >
          <div class="aside-menu-header">
            <router-link to="/Home">
              <img src="./assets/img/logo.png" alt="brand" />
              <h1>测试管理平台</h1>
            </router-link>
          </div>
          <div class="aside-menu-content">
            <el-menu :default-active="$route.path.split('/')[1]" :collapse="isCollapse" router="router">
              <el-menu-item index="Home" @click="toPage('Home')">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
              </el-menu-item>
              <el-menu-item index="ElementPage" @click="toPage('ElementPage')">
                <i class="el-icon-folder"></i>
                <span slot="title">ElementPage</span>
              </el-menu-item>
              <el-menu-item index="AntdPage" @click="toPage('AntdPage')">
                <i class="el-icon-folder"></i>
                <span slot="title">AntdPage</span>
              </el-menu-item>
              <el-menu-item index="BasicVue" @click="toPage('BasicVue')">
                <i class="el-icon-folder"></i>
                <span slot="title">BasicVue</span>
              </el-menu-item>
              <el-menu-item index="BasicVueComponent" @click="toPage('BasicVueComponent')">
                <i class="el-icon-folder"></i>
                <span slot="title">BasicVueComponent</span>
              </el-menu-item>
              <el-menu-item index="LifeCircle" @click="toPage('LifeCircle')">
                <i class="el-icon-folder"></i>
                <span slot="title">LifeCircle</span>
              </el-menu-item>
              <el-menu-item index="BasicJs" @click="toPage('BasicJs')">
                <i class="el-icon-folder"></i>
                <span slot="title">BasicJs</span>
              </el-menu-item>
              <el-menu-item index="Axios" @click="toPage('Axios')">
                <i class="el-icon-folder"></i>
                <span slot="title">Axios</span>
              </el-menu-item>
              <el-menu-item index="CompositionAPI" @click="toPage('CompositionAPI')">
                <i class="el-icon-folder"></i>
                <span slot="title">CompositionAPI</span>
              </el-menu-item>
              <el-menu-item index="ClassStyle" @click="toPage('ClassStyle')">
                <i class="el-icon-folder"></i>
                <span slot="title">ClassStyle</span>
              </el-menu-item>
              <el-menu-item index="Vue2point7" @click="toPage('Vue2point7')">
                <i class="el-icon-folder"></i>
                <span slot="title">Vue2point7</span>
              </el-menu-item>
              <el-menu-item index="Protable" @click="toPage('Protable')">
                <i class="el-icon-folder"></i>
                <span slot="title">Protable</span>
              </el-menu-item>
              <el-menu-item index="FilterTool" @click="toPage('FilterTool')">
                <i class="el-icon-folder"></i>
                <span slot="title">FilterTool</span>
              </el-menu-item>
            </el-menu>
          </div>
        </aside>
        <section class="container">
          <header class="navbar">
            <span v-show="!isMinScreen" @click="triggerNav" class="trigger">
              <i
                :class="{ 'el-icon-s-unfold': isCollapse, 'el-icon-s-fold': !isCollapse, 'el-icon': true }"
              ></i>
            </span>
            <span v-show="isMinScreen" @click="triggerDrawer" class="trigger">
              <i class="el-icon-s-unfold el-icon"></i>
            </span>
            <div :class="{ 'nav-heading': true, 'nav-heading-md': isMinScreen }">
              <router-link to="/Home">
                <img src="./assets/img/logo.png" alt="ratection" />
                <h1>测试管理平台</h1>
              </router-link>
            </div>
            <el-dropdown :show-timeout="100" class="nav-user" placement="bottom">
              <div class="user-avatar">
                <el-avatar :src="usericon">{{ username }}</el-avatar>
              </div>
              <el-dropdown-menu slot="dropdown">
                <!-- <router-link class="dropdown-link"> -->
                <el-dropdown-item>
                  个人中心
                </el-dropdown-item>
                <!-- </router-link> -->
                <a @click.prevent="exit" class="dropdown-link">
                  <el-dropdown-item divided>
                    退出
                  </el-dropdown-item>
                </a>
              </el-dropdown-menu>
            </el-dropdown>
          </header>
          <main class="main">
            <router-view />
          </main>
        </section>
      </div>

      <!-- sm nav -->
      <el-drawer
        :visible.sync="drawer"
        :modal-append-to-body="true"
        :append-to-body="true"
        :show-close="false"
        :with-header="false"
        :class="{ 'screen-md-drawer': true, 'screen-md-menu': isMinScreen }"
        direction="ltr"
      >
        <aside class="aside-menu aside-menu-drawer">
          <div class="aside-menu-header">
            <router-link to="/Home">
              <img src="./assets/img/logo.png" alt="ratection" />
              <h1>测试管理平台</h1>
            </router-link>
          </div>
          <div class="aside-menu-content">
            <el-menu :default-active="$route.path.split('/')[1]" :collapse="false" router="router">
              <el-menu-item index="Home" @click="toPage('Home')">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
              </el-menu-item>
              <el-menu-item index="ElementPage" @click="toPage('ElementPage')">
                <i class="el-icon-folder"></i>
                <span slot="title">ElementPage</span>
              </el-menu-item>
              <el-menu-item index="AntdPage" @click="toPage('AntdPage')">
                <i class="el-icon-folder"></i>
                <span slot="title">AntdPage</span>
              </el-menu-item>
              <el-menu-item index="BasicVue" @click="toPage('BasicVue')">
                <i class="el-icon-folder"></i>
                <span slot="title">BasicVue</span>
              </el-menu-item>
              <el-menu-item index="BasicVueComponent" @click="toPage('BasicVueComponent')">
                <i class="el-icon-folder"></i>
                <span slot="title">BasicVueComponent</span>
              </el-menu-item>
              <el-menu-item index="LifeCircle" @click="toPage('LifeCircle')">
                <i class="el-icon-folder"></i>
                <span slot="title">LifeCircle</span>
              </el-menu-item>
              <el-menu-item index="BasicJs" @click="toPage('BasicJs')">
                <i class="el-icon-folder"></i>
                <span slot="title">BasicJs</span>
              </el-menu-item>
              <el-menu-item index="Axios" @click="toPage('Axios')">
                <i class="el-icon-folder"></i>
                <span slot="title">Axios</span>
              </el-menu-item>
              <el-menu-item index="CompositionAPI" @click="toPage('CompositionAPI')">
                <i class="el-icon-folder"></i>
                <span slot="title">CompositionAPI</span>
              </el-menu-item>
              <el-menu-item index="ClassStyle" @click="toPage('ClassStyle')">
                <i class="el-icon-folder"></i>
                <span slot="title">ClassStyle</span>
              </el-menu-item>
              <el-menu-item index="Vue2point7" @click="toPage('Vue2point7')">
                <i class="el-icon-folder"></i>
                <span slot="title">Vue2point7</span>
              </el-menu-item>
              <el-menu-item index="Protable" @click="toPage('Protable')">
                <i class="el-icon-folder"></i>
                <span slot="title">Protable</span>
              </el-menu-item>
              <el-menu-item index="FilterTool" @click="toPage('FilterTool')">
                <i class="el-icon-folder"></i>
                <span slot="title">FilterTool</span>
              </el-menu-item>
            </el-menu>
          </div>
        </aside>
      </el-drawer>
    </div>

    <!-- login -->
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        drawer: false,
        isCollapse: false,
        isMinScreen: false,
        router: true,
        hasHeader: this.$route.name !== 'Login',
        username: decodeURIComponent(sessionStorage.getItem('username')),
        usericon: sessionStorage.getItem('icon'),
      }
    },
    mounted() {
      this.handleMinScreen()
    },
    watch: {
      $route(to) {
        this.drawer = false
        if (to.name === 'Login' || to.name === 'PageNotFound') {
          this.hasHeader = false
        } else {
          this.hasHeader = true
          this.username = decodeURIComponent(sessionStorage.getItem('username'))
          this.usericon = sessionStorage.getItem('icon')
        }
      },
    },
    methods: {
      triggerNav() {
        this.isCollapse = !this.isCollapse
      },
      triggerDrawer() {
        this.drawer = !this.drawer
      },
      handleMinScreen() {
        const screenSize = window.matchMedia('(max-width: 768px)')
        if (screenSize.matches) {
          this.drawer = false
          this.isMinScreen = true
        }
        screenSize.onchange = e => {
          if (e.matches) {
            this.drawer = false
            this.isMinScreen = true
          } else {
            this.drawer = false
            this.isMinScreen = false
          }
        }
      },
      exit() {
        this.axios.get('/api/auth/logout').then(res => {
          if (res.data.code === 0) {
            this.$store.commit('removeUser')
            this.$router.push({ name: 'Login' })
          }
        })
      },
      toPage(page) {
        this.$router.push({ name: page })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .screen-lg {
    display: flex;
    flex-direction: row;
    flex: auto;
    background: #f0f2f5;
    min-height: 100vh;

    .container {
      overflow-x: hidden;
      position: relative;
    }

    .navbar {
      height: 64px;
      width: 100vw;
      padding: 0;
      background: #fff;
      box-shadow: 4px 4px 40px 0 rgba(0, 0, 0, 0.05);

      .trigger {
        display: inline-block;
        padding: 19px 20px;
        font-size: 20px;
        cursor: pointer;

        .el-icon {
          color: #606266;
        }
      }

      .nav-heading {
        display: none;
        position: absolute;
        top: 16px;
        left: 50%;
        width: 200px;
        transform: translateX(-50%);

        img {
          display: inline-block;
          padding-left: 24px; // 14
          height: 32px;
          vertical-align: middle;
        }

        h1 {
          display: inline-block;
          overflow: hidden;
          color: #333;
          font-weight: 600;
          font-size: 14px;
          vertical-align: middle;
          margin: 0 0 -5px 15px;
        }
      }
      .nav-heading-md {
        display: block;
        transition: display linear 0.3s;
      }

      .nav-user {
        position: absolute;
        top: 15px;
        right: 5%;
        cursor: pointer;
      }
      .user-avatar .el-avatar {
        background: #67c23aeb !important;
      }
    }
  }

  .dropdown-link {
    text-decoration: none;
    white-space: nowrap;
  }
  .aside-menu {
    flex: 0 0 210px;
    width: 210px;
    min-height: 100vh;
    position: relative;
    z-index: 10;
    box-shadow: 4px 4px 40px 0 rgba(0, 0, 0, 0.05);
    position: relative;
    background: #fff;
    transition: width 0.3s;

    .aside-menu-header {
      height: 64px;
      line-height: 64px;

      img {
        display: inline-block;
        padding-left: 24px; // 14
        height: 32px;
        vertical-align: middle;
        transition: padding-left 0.3s;
      }

      h1 {
        display: inline-block;
        overflow: hidden;
        color: #333;
        font-weight: 600;
        font-size: 14px;
        vertical-align: middle;
        margin: 0 0 -5px 15px;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
      }
    }
  }

  .screen-lg-menu {
    display: none;
  }

  .aside-menu-collapse {
    flex: 0 0 70px;
    width: 70px;

    .aside-menu-header {
      img {
        padding-left: 18px;
      }
      h1 {
        color: transparent;
      }
    }
  }

  .aside-menu-drawer {
    flex: 0 0 220px;
    width: 220px;

    img {
      padding-left: 24px;
    }
  }

  .screen-md-drawer {
    display: none;
  }

  .screen-md-menu {
    display: block;
  }

  .main {
    overflow-x: hidden;
    padding: 20px;
  }

  .footer {
    position: relative;
    margin-top: 45px;
    bottom: 24px;
    text-align: center;
    font-size: 12px;
    color: #b4b4b4;
  }

  @media screen and (max-width: 768px) {
    .footer-break {
      display: none;
    }

    .footer-record {
      display: block;
      margin: 10px auto;
      width: 200px;
    }
  }

  // #app {
  //   font-family: Avenir, Helvetica, Arial, sans-serif;
  //   -webkit-font-smoothing: antialiased;
  //   -moz-osx-font-smoothing: grayscale;
  // }

  // #nav a.router-link-exact-active {
  //   color: #42b983;
  // }
</style>
