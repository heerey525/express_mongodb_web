<template>
  <Modal v-model="open" :title="title">
    <Form ref="formItem" :model="formItem" :label-width="80" :rules="ruleValidate">
      <FormItem label="商品名称" prop="name">
        <Input v-model="formItem.name" placeholder="请输入商品名称" clearable />
      </FormItem>
      <FormItem label="价格" prop="price">
        <Input v-model="formItem.price" placeholder="请输入价格" clearable />
      </FormItem>
      <FormItem label="描述" prop="desc">
        <Input v-model="formItem.desc" placeholder="请输入描述" clearable />
      </FormItem>
      <FormItem label="分类" prop="typeid">
        <Select v-model="formItem.typeid" clearable>
          <Option v-for="item in typeList" :key="item.id" :value="item.id">
            {{
            item.name
            }}
          </Option>
        </Select>
      </FormItem>
      <FormItem label="上传图片" prop="img">
        <Upload ref="addUpload" :before-upload="handleUpload" action>
          <Button v-show="!imgUrl" icon="md-cloud-upload">上传图片</Button>
          <img v-show="imgUrl" :src="imgUrl" class="uploadImgUrl" />
        </Upload>
      </FormItem>
    </Form>
    <div slot="footer" style="text-align: center;">
      <Button @click="cancel('formItem')">关闭</Button>
      <Button type="primary" :loading="loading" @click="ok('formItem')">提交</Button>
    </div>
  </Modal>
</template>
<script>
import { goodsUpdate, goodsAdd } from "@/api/goods";
import { imgUpload } from "@/api/upload";
export default {
  name: "Goods",
  data () {
    return {
      formItem: {
        name: "",
        price: "",
        desc: "",
        typeid: "",
      },
      ruleValidate: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        desc: [{ required: true, message: "请输入描述", trigger: "blur" }],
        typeid: [
          {
            required: true,
            message: "请输入商品名称",
            trigger: "blur",
            type: "number",
          },
        ],
      },
      typeList: [
        { id: 33, name: "fenlei" },
        { id: 2, name: "热菜" },
      ],
      open: false,
      title: "商品修改",
      loading: false,
      imgUrl: "",
    };
  },
  methods: {
    init (params) {
      if (params) {
        this.title = "商品修改";
        this.formItem = JSON.parse(JSON.stringify(params));
        this.imgUrl = window.Glob.baseUrl.dev + params.img
      } else {
        this.title = "商品添加";
      }
      this.open = true;
    },
    ok (name) {
      this.$refs[name].validate((valid) => {
        if (!valid) return;
        if (this.formItem._id) {
          goodsUpdate(this.formItem)
            .then((res) => {
              if (res.data.code === 200) {
                this.$Message.success("商品修改成功");
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
          goodsAdd(this.formItem)
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
    handleUpload (file) {
      if (file) {
        if (file.size > 500 * 1024) {
          this.$Message.error("图片尺寸太大");
          this.$refs["addUpload"].clearFiles();
        } else {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            const _base64 = reader.result;
            this.imgUrl = _base64; //将_base64赋值给图片的src，实现图片预览
          };
          let formData = new FormData();
          formData.append("avatar", file);
          imgUpload(formData)
            .then((res) => {
              if (res.data.code === 200) {
                this.formItem.img = res.data.imgUrl;
              } else {
                this.$Message.error(err);
              }
            })
            .catch((err) => {
              this.$Message.error(err);
            });
          return false; //阻止图片继续上传，使得form表单提交时统一上传
        }
      }
      return false;
    },
  },
  mounted () { },
};
</script>
<style lang="less" scoped>
.uploadImgUrl {
  width: 50px;
  height: 50px;
}
</style>
