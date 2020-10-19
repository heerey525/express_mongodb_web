<template>
  <Content class="goodsBox">
    <Button type="primary" style="margin-bottom: 24px" @click="show()"
      >添加</Button
    >
    <Form id="searchForm" :model="formItem" :label-width="80" inline>
      <FormItem label="角色名称">
        <Input v-model="formItem.key" placeholder="模糊搜索" clearable />
      </FormItem>
      <FormItem :label-width="20">
        <Button type="primary" @click="search">查询</Button>
        <Button style="margin-left: 8px" @click="clear">重置</Button>
      </FormItem>
    </Form>
    <Table
      :columns="columns"
      :data="tableData"
      :height="tablesHeight"
      border
    ></Table>
    <Page
      class="table_page_css"
      v-show="total"
      :total="total"
      :current="searchInfo.pageNo"
      :page-size="searchInfo.pageSize"
      :page-size-opts="pageSizeOpts"
      @on-change="pageNoChange"
      @on-page-size-change="pageSizeChange"
      show-sizer
      show-elevator
      show-total
    />
    <AddUpdate @reload="getList" ref="AddUpdate"></AddUpdate>
    <RolesPermits @reload="getList" ref="RolesPermits"></RolesPermits>
  </Content>
</template>
<script>
import { rolesPage, rolesDel } from '@/api/role'
import AddUpdate from './RolesAddUpdate'
import RolesPermits from './RolesPermits'
export default {
  name: 'Roles',
  components: {
    AddUpdate, RolesPermits
  },
  data() {
    return {
      columns: [
        {
          type: 'index',
          width: 60,
          align: 'center',
        },
        {
          title: '角色名称',
          key: 'roleName',
        },
        {
          title: '角色描述',
          key: 'roleDesc',
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.show(params.row)
                    },
                  },
                },
                '编辑'
              ),
              h(
                'Poptip',
                {
                  props: {
                    confirm: true,
                    transfer: true,
                    title: '您确认删除这条内容吗？',
                  },
                  on: {
                    'on-ok': () => {
                      this.remove(params.row._id)
                    },
                  },
                },
                [
                  h(
                    'Button',
                    {
                      props: {
                        type: 'error',
                        size: 'small',
                      },
                      style: {
                        marginRight: '5px',
                      }
                    },
                    '删除'
                  ),
                ]
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'warning',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.getPermit(params.row)
                    },
                  },
                },
                '分配权限'
              ),
            ])
          },
        },
      ],
      tableData: [],
      total: 0,
      searchInfo: {
        pageNo: 1,
        pageSize: 5,
      },
      pageSizeOpts: [1, 2, 5, 10],
      formItem: {
        key: '',
      },
      tablesHeight: 0,
    }
  },
  methods: {
    setTablesHeight() {
      let aH = 0
      let oA = document.getElementById('app')
      let oH = oA.clientHeight || oA.offsetHeight
      let sA = document.getElementById('searchForm')
      let sH = sA.clientHeight || sA.offsetHeight
      aH = oH - sH - 220
      this.tablesHeight = aH
    },
    getList() {
      rolesPage(this.searchInfo)
        .then((res) => {
          if (res.data.code === 200) {
            const data = res.data
            this.tableData = data.data
            this.total = data.total
          } else {
            this.$Message.error(res.data.msg)
          }
        })
        .catch((err) => {
          this.$Message.error(err)
        })
    },
    search() {
      this.searchInfo = {
        key: this.formItem.key,
        pageNo: 1,
        pageSize: this.searchInfo.pageSize,
      }
      this.getList()
    },
    clear() {
      this.formItem = {
        key: '',
      }
      this.searchInfo = {
        pageNo: 1,
        pageSize: 5,
      }
      this.getList()
    },
    show(params) {
      if (params) {
        this.$refs.AddUpdate.init(params)
      } else {
        this.$refs.AddUpdate.init()
      }
    },
    getPermit (roleId) {
      this.$refs.RolesPermits.init(roleId)
    },
    remove(_id) {
      rolesDel({ _id: _id })
        .then((res) => {
          if (res.data.code === 200) {
            this.$Message.success('删除成功')
            this.getList()
          } else {
            this.$Message.error(res.data.msg)
          }
        })
        .catch((err) => {
          this.$Message.error(err)
        })
    },
    pageNoChange(current) {
      this.searchInfo.pageNo = current
      this.getList()
    },
    pageSizeChange(val) {
      this.searchInfo.pageNo = 1
      this.searchInfo.pageSize = val
      this.getList()
    },
  },
  mounted() {
    this.getList()
    setTimeout(() => {
      this.setTablesHeight()
    }, 50)
    window.onresize = () => {
      this.setTablesHeight()
    }
  },
}
</script>
<style lang="less" scoped>
.goodsBox {
  .ivu-form-inline .ivu-form-item {
    width: 267px;
  }
}
</style>
