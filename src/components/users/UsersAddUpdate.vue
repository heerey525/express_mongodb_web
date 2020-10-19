<template>
  <Modal v-model="open" :title="title">
    <Form ref="formItem" :model="formItem" :label-width="80" :rules="ruleValidate">
      <FormItem label="账号" prop="name">
        <Input v-model="formItem.us" placeholder="请输入商品名称" clearable />
      </FormItem>
      <FormItem label="密码" prop="price">
        <Input v-model="formItem.ps" placeholder="请输入价格" clearable />
      </FormItem>
      <FormItem label="性别">
        <RadioGroup v-model="formItem.sex">
            <Radio :label="0">男</Radio>
            <Radio :label="1">女</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="状态">
        <i-switch v-model="formItem.state" />
      </FormItem>
    </Form>
    <div slot="footer" style="text-align: center;">
      <Button @click="cancel('formItem')">关闭</Button>
      <Button type="primary" :loading="loading" @click="ok('formItem')">提交</Button>
    </div>
  </Modal>
</template>
<script>
import { usersAdd } from "@/api/user";
export default {
  name: "UsersAddUpdate",
  data () {
    return {
      formItem: {
        us: "",
        ps: "",
        sex: 1,
        state: true,
      },
      ruleValidate: {
        us: [{ required: true, message: "请输入账号", trigger: "blur" }],
        ps: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      typeList: [
        // { id: 33, name: "fenlei" },
        // { id: 2, name: "热菜" },
      ],
      open: false,
      title: "用户添加",
      loading: false
    };
  },
  methods: {
    init () {
      this.title = "用户添加";
      this.open = true;
    },
    ok (name) {
      this.$refs[name].validate((valid) => {
        if (!valid) return;
        const postData = JSON.parse(JSON.stringify(this.formItem))
        postData.state = this.formItem.state ? 1 : 0
        usersAdd(postData)
          .then((res) => {
            if (res.data.code === 200) {
              this.$Message.success("商品添加成功");
              this.cancel("formItem");
              this.$emit("reload");
            } else {
              this.$Message.error(res.data.msg);
            }
          })
          .catch((err) => {
            this.$Message.error(err);
          });
      });
    },
    cancel (name) {
      this.formItem = {
        us: "",
        ps: "",
        sex: 1,
        state: true,
      };
      this.$refs[name].resetFields();
      this.open = false;
    }
  },
  mounted () { },
};
</script>
