<template>
  <Modal v-model="open" :title="title">
    <Form
      ref="formItem"
      :model="formItem"
      :label-width="100"
      :rules="ruleValidate"
    >
      <FormItem label="当前的用户">
        {{ formItem.us }}
      </FormItem>
      <FormItem label="角色" prop="roleId">
        <Select v-model="formItem.roleId" style="width:200px">
          <Option
            v-for="item in roleList"
            :value="item.roleId"
            :key="item.roleId"
            >{{ item.roleName }}</Option
          >
        </Select>
      </FormItem>
    </Form>
    <div slot="footer" style="text-align: center;">
      <Button @click="cancel('formItem')">关闭</Button>
      <Button type="primary" :loading="loading" @click="ok('formItem')"
        >提交</Button
      >
    </div>
  </Modal>
</template>
<script>
import { usersAdd, usersUpdateRole } from '@/api/user'
import { rolesPage } from '@/api/role'
export default {
  name: 'UsersAddUpdate',
  data() {
    return {
      formItem: {
        us: '',
        id: '',
        roleId: '',
      },
      ruleValidate: {
        roleId: [
          { required: true, message: '请选择角色', trigger: 'change', type: 'number' },
        ],
      },
      roleList: [
        // { id: 33, name: "fenlei" },
        // { id: 2, name: "热菜" },
      ],
      open: false,
      title: '分配角色',
      loading: false,
    }
  },
  methods: {
    init(params) {
      console.log('params', params)
      this.formItem = {
        us: params.us,
        id: params.id,
        roleId: params.roleId,
      }
      this.title = '分配角色'
      this.open = true
    },
    ok(name) {
      this.$refs[name].validate((valid) => {
        if (!valid) return
        usersUpdateRole(this.formItem)
          .then((res) => {
            if (res.data.code === 200) {
              this.$Message.success('商品添加成功')
              this.cancel('formItem')
              this.$emit('reload')
            } else {
              this.$Message.error(res.data.msg)
            }
          })
          .catch((err) => {
            this.$Message.error(err)
          })
      })
    },
    cancel(name) {
      this.formItem = {
        us: '',
        id: '',
        roleId: ''
      }
      this.$refs[name].resetFields()
      this.open = false
    },
    getRolesList() {
      rolesPage()
        .then((res) => {
          if (res.data.code === 200) {
            const data = res.data
            this.roleList = data.data
          } else {
            this.$Message.error(res.data.msg)
          }
        })
        .catch((err) => {
          this.$Message.error(err)
        })
    },
  },
  created() {
    this.getRolesList()
  }
}
</script>
