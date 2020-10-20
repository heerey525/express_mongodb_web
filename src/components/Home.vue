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
          <Dropdown class="log_out" @on-click="downMenuClick">
              <Icon type="md-contact" size="30" />
              <DropdownMenu slot="list" >
                  <DropdownItem name="updatePs" >修改密码</DropdownItem>
                  <DropdownItem name="logOut" >退出登录</DropdownItem>
              </DropdownMenu>
          </Dropdown>
          <!-- <Icon class="log_out" type="md-log-out" size="24" @click="logOut" /> -->
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
    <!-- 修改密码 -->
    <Modal
      v-model="updatePsModal"
      title="修改密码"
      @on-cancel="updatePsCancel('formValidate')">
       <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="旧密码" prop="oldPs">
            <Input v-model="formValidate.oldPs" placeholder="旧密码"></Input>
        </FormItem>
        <FormItem label="新密码" prop="newPs">
            <Input v-model="formValidate.newPs" placeholder="新密码"></Input>
        </FormItem>
        <FormItem label="新密码" prop="newPsAgain">
            <Input v-model="formValidate.newPsAgain" placeholder="确认新密码"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="updatePsCancel('formValidate')">取消</Button>
        <Button type="primary" @click="updatePsOk('formValidate')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { usersUpdatePs } from '@/api/user'
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
      updatePsModal: false,
      formValidate: {
        oldPs: '',
        newPs: '',
        newPsAgain: ''
      },
      ruleValidate: {
        oldPs: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPs: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        newPsAgain: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { validator: (rule, value, callback) => {
              if (value !== this.formValidate.newPs) {
                  callback(new Error('确认密码和新密码不一致'));
              } else {
                  callback();
              }
            }, trigger: 'blur' }
        ]
      },
      loading: true
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
    },
    onSelectMenu(val) {
      if (this.$route.name === val) return;
      this.$router.push({ name: val });
      this.activeName = val;
    },
    collapsedSider() {
      this.$refs.siderRef.toggleCollapse();
    },
    downMenuClick(val) {
      if (val === 'logOut') {
        this.$router.push({ name: 'login' }, () => {
          this.$Message.success('退出成功')
          window.sessionStorage.removeItem('token')
        })
      } else if (val === 'updatePs') {
        this.updatePsModal = true
      }
    },
    updatePsOk(name) {
      this.$refs[name].validate((valid) => {
        if (!valid) return
        usersUpdatePs(this.formValidate)
          .then((res) => {
            if (res.data.code === 200) {
              this.$Message.success('密码修改成功')
              setTimeout(() => {
                this.$router.push({ name: 'login' }, () => {
                  window.sessionStorage.removeItem('token')
                })
              }, 1000)
            } else {
              this.$Message.error(res.data.msg)
            }
          })
          .catch((err) => {
            this.$Message.error(err)
          })
      })
    },
    updatePsCancel(name) {
      this.formValidate = {
        oldPs: '',
        newPs: '',
        newPsAgain: ''
      }
      this.$refs[name].resetFields();
      this.updatePsModal = false
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
        margin: 0px 20px;
        color: #fff;
        float: right;
        cursor: pointer;
        .ivu-icon {
          vertical-align: middle;
        }
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
