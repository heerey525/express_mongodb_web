<template>
  <Modal v-model="open" :title="title">
    <Tree ref="Tree" :data="permitsData" show-checkbox check-directly multiple @on-check-change="checkChange"></Tree>
    <div slot="footer" style="text-align: center;">
      <Button @click="cancel">关闭</Button>
      <Button type="primary" :loading="loading" @click="ok('Tree')">提交</Button>
    </div>
  </Modal>
</template>
<script>
import { permitsList } from '@/api/permit'
import { rolesSetPermits } from '@/api/role'
export default {
  name: 'rolesAddUpdate',
  data() {
    return {
      roleId: '',
      open: false,
      title: '分配权限',
      loading: false,
      authIds: '',
      permitsData: [
        {
          title: 'parent 1',
          id: 1,
          expand: true,
          selected: true,
          children: [
            {
              title: 'parent 1-1',
              id: 11,
              expand: true
            }
          ],
        },
      ],
    }
  },
  methods: {
    init(params) {
      // console.log('params', params)
      this.roleId = params.roleId
      this.authIds = params.authIds
      this.title = '分配权限'
      this.open = true
      this.getList()
    },
    getList() {
      permitsList()
        .then((res) => {
          if (res.data.code === 200) {
            const data = res.data
            this.permitsData = data.data
            this.updateChildren()
          } else {
            this.$Message.error(res.data.msg)
          }
        })
        .catch((err) => {
          this.$Message.error(err)
        })
    },
    ok(name) {
      const temp = this.$refs[name].getCheckedNodes()
      const checks = []
      temp.map(item => {
        checks.push(item.id)
      })
      const postData = {
        authIds: checks.join(','),
        roleId: this.roleId
      }
      this.loading = true
      rolesSetPermits(postData)
        .then((res) => {
          this.loading = false
          if (res.data.code === 200) {
            this.$Message.success('分配权限成功')
            this.cancel()
            this.$emit('reload')
          } else {
            this.$Message.error(res.data.msg)
          }
        })
        .catch((err) => {
          this.loading = false
          this.$Message.error(err)
        })
    },
    cancel(name) {
      this.open = false
    },
    checkChange (arr, item) {
      // console.log('arr', arr, item)
    },
    updateChildren() {
      let authIds = ''
      if (this.authIds) {
        authIds = this.authIds.split(',')
      }
      function recursion(temp) {
        temp.map(item => {
          if (authIds.includes(item.id.toString())) {
            item.checked = true
          }
          item.title = item.name
          item.expand = true
          if (item.children.length) {
            recursion(item.children)
          }
        })
      }
      recursion(this.permitsData)
    }
  }
}
</script>
