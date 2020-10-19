<template>
  <div id="Home">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">后台管理系统</div>
          <Icon
            @click.native="collapsedSider"
            :class="rotateIcon"
            style="margin:0 20px;color: #fff;"
            type="md-menu"
            size="24"
          ></Icon>
          <Icon class="log_out" type="md-log-out" size="24" @click="logOut" />
          <!-- <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>菜单
            </MenuItem>
          </div> -->
        </Menu>
      </Header>
      <Layout>
        <Sider
          hide-trigger
          ref="siderRef"
          collapsible
          :collapsed-width="78"
          :style="{ background: '#fff' }"
          v-model="isCollapsed"
        >
          <Menu
            :default-active="activeName"
            :active-name="activeName"
            theme="dark"
            width="auto"
            :open-names="['1']"
            v-for="item in menuList"
            :key="item.id"
            @on-select="onSelectMenu"
            :class="menuitemClasses"
          >
            <!-- <MenuItem name="home">
              <Icon type="md-home" />
              首页
            </MenuItem> -->
            <Submenu v-if="item.children.length" :name="item.name">
              <template slot="title">
                <Icon :type="item.icon" />{{ isCollapsed ? '' : item.name }}
              </template>
              <MenuItem
                v-for="child in item.children"
                :key="child.id"
                :name="child.path"
              >
                <Icon :type="child.icon" />
                {{ isCollapsed ? '' : child.name }}
              </MenuItem>
            </Submenu>
            <MenuItem v-else :name="item.path">
              <Icon :type="item.icon" />
              {{ isCollapsed ? '' : item.name }}
            </MenuItem>
          </Menu>
        </Sider>
        <Layout :style="{ padding: '0 12px 24px' }">
          <!-- <Breadcrumb :style="{ margin: '12px 0' }">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb> -->
          <!-- 路由占位符 -->
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      // menuList: [
      //   {
      //     id: 1,
      //     title: "首页",
      //     path: "welcome",
      //     icon: "md-home",
      //   },
      //   {
      //     id: 2,
      //     title: "用户管理",
      //     path: "users",
      //     icon: "md-basket",
      //   },
      //   {
      //     id: 6,
      //     title: "权限管理",
      //     icon: "md-basket",
      //     children: [
      //       { id: 61, path: "roles", title: "角色列表", icon: "md-more" },
      //       { id: 62, path: "permits", title: "权限列表", icon: "md-more" }
      //     ],
      //   },
      //   {
      //     id: 3,
      //     title: "商品管理",
      //     path: "goods",
      //     icon: "md-basket",
      //   },
      //   {
      //     id: 4,
      //     title: "国际化管理",
      //     path: "lang",
      //     icon: "md-basket",
      //   },
      //   {
      //     id: 5,
      //     title: "其他管理",
      //     icon: "md-more",
      //     children: [{ id: 51, path: "other", title: "其他", icon: "md-more" }],
      //   },
      // ],
      menuList: [],
      activeName: "welcome",
      isCollapsed: false,
    };
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
  },
  methods: {
    getMenus() {
      const menus = window.sessionStorage.getItem('menus')
      this.menuList = JSON.parse(menus)
      // {fid: 0
      // id: 1
      // level: 0
      // mark: "权限管理"
      // name: "权限管理"
      // path: "permits"
      // _showChildren: true}
      console.log(this.menuList)
    },
    onSelectMenu(val) {
      if (this.$route.name === val) return;
      this.$router.push({ name: val });
      this.activeName = val;
    },
    collapsedSider() {
      this.$refs.siderRef.toggleCollapse();
    },
    logOut() {
      this.$router.push({ name: 'login' }, () => {
        this.$Message.success('退出成功')
        window.sessionStorage.removeItem('token')
      })
    }
  },
  mounted() {
    this.activeName = this.$route.name;
    this.getMenus()
  },
};
</script>
<style lang="less">
#Home {
  height: 100%;
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  .ivu-layout {
    height: 100%;
    .ivu-layout-header {
      padding: 0;
      .log_out {
        margin: 18px 20px;
        color: #fff;
        float: right;
        cursor: pointer;
      }
    }
    .ivu-layout-content {
      height: 100%;
      padding: 24px;
      background-color: #fff;
    }
    .ivu-layout-sider {
      background: #515a6e !important;
    }
  }
  .layout-logo {
    font-size: 20px;
    text-align: center;
    width: 200px;
    height: 100%;
    color: #fff;
    background: #5b6270;
    border-radius: 3px;
    float: left;
  }
  .layout-nav {
    width: 420px;
    margin: 0 auto;
    /* margin-right: 20px; */
  }
}
</style>
