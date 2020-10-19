<template>
  <Modal v-model="open" :title="title">
    <Form ref="formItem" :model="formItem" :label-width="80" :rules="ruleValidate">
      <FormItem label="变量名" prop="key">
        <Input v-model="formItem.key" placeholder="请输入变量名" clearable />
      </FormItem>
      <FormItem label="中文" prop="zh-CN">
        <Input v-model="formItem['zh-CN']" placeholder="请输入中文" clearable />
      </FormItem>
      <FormItem label="解释中文" prop="notice">
        <Input v-model="formItem.notice" placeholder="请输入解释中文" clearable />
      </FormItem>
      <FormItem label="英文" prop="en-US">
        <Input v-model="formItem['en-US']" placeholder="请输入英文" clearable />
      </FormItem>
      <FormItem label="越南语" prop="vi-VN">
        <Input v-model="formItem['vi-VN']" placeholder="请输入越南语" clearable />
      </FormItem>
      <FormItem label="泰语" prop="th-TH">
        <Input v-model="formItem['th-TH']" placeholder="请输入泰语" clearable />
      </FormItem>
      <FormItem label="印度语" prop="en-IN">
        <Input v-model="formItem['en-IN']" placeholder="请输入印度语" clearable />
      </FormItem>
    </Form>
    <div slot="footer" style="text-align: center;">
      <Button @click="cancel('formItem')">关闭</Button>
      <Button type="primary" :loading="loading" @click="ok('formItem')">提交</Button>
    </div>
  </Modal>
</template>
<script>
import { langsUpdate, langsAdd } from "@/api/langs";
export default {
  name: "Goods",
  data () {
    return {
      formItem: {
        key: '',
        'zh-CN': '',
        notice: '',
        'en-US': '',
        'vi-VN': '',
        'th-TH': '',
        'en-IN': '',
      },
      ruleValidate: {
        key: [{ required: true, message: "请输入变量名", trigger: "blur" }],
        'zh-CN': [{ required: true, message: "请输入中文", trigger: "blur" }],
        notice: [{ required: true, message: "请输入解释中文", trigger: "blur" }],
        'en-US': [{ required: true, message: "请输入英文", trigger: "blur" }],
        'vi-VN': [{ required: true, message: "请输入越南语", trigger: "blur" }],
        'th-TH': [{ required: true, message: "请输入泰语", trigger: "blur" }],
        'en-IN': [{ required: true, message: "请输入印度语", trigger: "blur" }],
      },
      open: false,
      title: "多语言修改",
      loading: false,
    };
  },
  methods: {
    init (params) {
      if (params) {
        this.title = "多语言修改";
        this.formItem = JSON.parse(JSON.stringify(params));
      } else {
        this.title = "多语言添加";
      }
      this.open = true;
    },
    ok (name) {
      this.$refs[name].validate((valid) => {
        if (!valid) return;
        if (this.formItem._id) {
          langsUpdate(this.formItem)
            .then((res) => {
              if (res.data.code === 200) {
                this.$Message.success("多语言修改成功");
                this.cancel("formItem");
                this.$emit("reload");
              } else {
                this.$Message.error(res.data.msg);
              }
            })
            .catch((err) => {
              this.$Message.error(err);
            });
        } else {
          langsAdd(this.formItem)
            .then((res) => {
              if (res.data.code === 200) {
                this.$Message.success("多语言添加成功");
                this.cancel("formItem");
                this.$emit("reload");
              } else {
                this.$Message.error(res.data.msg);
              }
            })
            .catch((err) => {
              this.$Message.error(err);
            });
        }
      });
    },
    cancel (name) {
      this.formItem = {
        name: "",
        price: "",
        desc: "",
        typeid: "",
      };
      this.$refs[name].resetFields();
      this.open = false;
    },
  },
  mounted () { },
};
</script>
<style lang="less" scoped>
</style>
