<template>
  <Modal v-model="open" :title="title">
    <Form
      ref="formItem"
      :model="formItem"
      :label-width="80"
      :rules="ruleValidate"
    >
      <FormItem label="角色名称" prop="roleName">
        <Input
          v-model="formItem.roleName"
          placeholder="请输入角色名称"
          clearable
        />
      </FormItem>
      <FormItem label="角色描述" prop="roleDesc">
        <Input
          v-model="formItem.roleDesc"
          placeholder="请输入角色描述"
          clearable
        />
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
import { rolesAdd, rolesUpdate } from '@/api/role'
export default {
  name: 'rolesAddUpdate',
  data() {
    return {
      formItem: {
        roleName: '',
        roleDesc: '',
      },
      ruleValidate: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
        ],
      },
      open: false,
      title: '角色添加',
      loading: false,
    }
  },
  methods: {
    init(params) {
      if (params) {
        this.title = "角色修改";
        this.formItem = JSON.parse(JSON.stringify(params));
      } else {
        this.title = "角色添加";
      }
      this.open = true
    },
    ok(name) {
      this.$refs[name].validate((valid) => {
        if (!valid) return
        const postData = JSON.parse(JSON.stringify(this.formItem))
        if (this.formItem.roleId) {
          rolesUpdate(this.formItem)
            .then((res) => {
              if (res.data.code === 200) {
                this.$Message.success('角色修改成功')
                this.cancel('formItem')
                this.$emit('reload')
              } else {
                this.$Message.error(res.data.msg)
              }
            })
            .catch((err) => {
              this.$Message.error(err)
            })
        } else {
          rolesAdd(postData)
            .then((res) => {
              if (res.data.code === 200) {
                this.$Message.success('角色添加成功')
                this.cancel('formItem')
                this.$emit('reload')
              } else {
                this.$Message.error(res.data.msg)
              }
            })
            .catch((err) => {
              this.$Message.error(err)
            })
        }
      })
    },
    cancel(name) {
      this.formItem = {
        roleName: '',
        roleDesc: '',
      }
      this.$refs[name].resetFields()
      this.open = false
    },
  },
  mounted() {},
}
</script>
