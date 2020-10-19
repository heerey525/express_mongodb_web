<template>
  <Modal v-model="open" :title="title" @on-cancel="cancel('formItem')">
    <Form
      ref="formItem"
      :model="formItem"
      :label-width="80"
      :rules="ruleValidate"
    >
      <FormItem label="权限名称" prop="name">
        <Input
          v-model="formItem.name"
          placeholder="请输入权限名称"
          clearable
        />
      </FormItem>
      <FormItem label="路径" prop="path">
        <Input
          v-model="formItem.path"
          placeholder="请输入路径"
          clearable
        />
      </FormItem>
      <FormItem label="父级id" prop="fid">
        <Input
          v-model="formItem.fid"
          placeholder="请输入父级id"
          clearable
        />
      </FormItem>
      <FormItem label="层级" prop="level">
        <Select v-model="formItem.level">
            <Option v-for="item in levelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="备注" prop="mark">
        <Input
          v-model="formItem.mark"
          placeholder="请输入备注"
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
import { permitsAdd, permitsUpdate } from '@/api/permit'
export default {
  name: 'permitsAddUpdate',
  data() {
    return {
      formItem: {
        name: '',
        path: '',
        fid: '',
        level: 0,
        mark: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '请输入权限名称', trigger: 'blur' },
        ],
        path: [
          { required: true, message: '请输入路径', trigger: 'blur' },
        ],
        fid: [
          { required: true, message: '请输入父级id', trigger: 'change' },
        ],
      },
      open: false,
      title: '权限添加',
      loading: false,
      levelList: [
        { value: 0, label: '一级菜单' },
        { value: 1, label: '二级菜单' },
        { value: 2, label: '操作权限' }
      ]
    }
  },
  methods: {
    init(params, level) {
      if (params) {
        // 判断是添加子权限
        if (level) {
          this.title = "子权限添加";
          this.formItem.fid = params.id.toString()
          this.formItem.level = params.level + 1
        } else {
          this.title = "权限修改";
          this.formItem = JSON.parse(JSON.stringify(params));
          this.formItem.fid = this.formItem.fid.toString()
        }
      } else {
        this.title = "权限添加";
      }
      this.open = true
    },
    ok(name) {
      this.$refs[name].validate((valid) => {
        if (!valid) return
        const postData = JSON.parse(JSON.stringify(this.formItem))
        postData.fid = Number(postData.fid)
        if (this.formItem.id) {
          permitsUpdate(postData)
            .then((res) => {
              if (res.data.code === 200) {
                this.$Message.success('权限修改成功')
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
          permitsAdd(postData)
            .then((res) => {
              if (res.data.code === 200) {
                this.$Message.success('权限添加成功')
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
        name: '',
        path: '',
        fid: '',
        level: 0,
        mark: ''
      }
      this.$refs[name].resetFields()
      this.open = false
    },
  },
  mounted() {},
}
</script>
