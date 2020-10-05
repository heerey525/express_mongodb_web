<template>
  <div id="login_container">
    <Form ref="dataForm" :model="dataForm" :rules="dataFormRules" inline class="login_form">
      <FormItem prop="us">
        <Input type="text" v-model="dataForm.us" placeholder="邮箱">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
        <Button
          v-if="isReg"
          type="primary"
          class="sendBtn"
          :disabled="sendText !== '发送'"
          @click="sendCode('dataForm')"
        >{{ sendText }}</Button>
      </FormItem>
      <FormItem prop="ps">
        <Input
          type="password"
          v-model="dataForm.ps"
          placeholder="密码"
          @on-enter="handleSubmit('dataForm')"
        >
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="code" v-if="isReg">
        <Input
          type="password"
          v-model="dataForm.code"
          placeholder="验证码"
          @on-enter="handleReg('dataForm')"
        >
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem style="display: flex;justify-content:center;">
        <Button type="primary" @click="handleSubmit('dataForm')">登录</Button>
        <Divider type="vertical" />
        <Button @click="handleReg('dataForm')">注册</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { login, getMailCode, reg } from "@/api/user";
export default {
  data () {
    return {
      dataForm: {
        us: "ceshi@ceshi.com",
        ps: "ceshi",
      },
      dataFormRules: {
        us: [
          {
            validator: (rule, value, callback) => {
              if (!value || value === " ") {
                callback(new Error("请输入邮箱"));
              } else {
                const exp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                if (!exp.test(value)) {
                  callback(new Error("请输入正确的邮箱"));
                } else {
                  callback();
                }
              }
            },
            trigger: "blur",
          },
        ],
        ps: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
        ],
      },
      isReg: false, // 注册状态
      sendText: "发送",
    };
  },
  methods: {
    handleSubmit (name) {
      if (this.isReg) {
        return (this.isReg = false);
      }
      this.$refs[name].validate((valid) => {
        if (!valid) return;
        login(this.dataForm)
          .then((res) => {
            if (res.data.code === 200) {
              this.$Message.success("登录成功");
              window.sessionStorage.setItem("token", res.data.token);
              this.$router.push("/welcome");
            } else {
              this.$Message.error(res.data.msg);
            }
          })
          .catch((err) => {
            this.$Message.error(err);
          });
      });
    },
    handleReg (name) {
      if (!this.isReg) {
        return (this.isReg = true);
      }
      this.$refs[name].validate((valid) => {
        if (!valid) return;
        reg(this.dataForm)
          .then((res) => {
            if (res.data.code === 200) {
              this.isReg = false;
              this.$Message.success("注册成功");
            } else {
              this.$Message.error(res.data.msg);
            }
          })
          .catch((err) => {
            this.$Message.error(err);
          });
      });
    },
    sendCode (name) {
      this.$refs[name].validateField("us", (valid) => {
        if (valid) return;
        getMailCode({ mail: this.dataForm.us })
          .then((res) => {
            if (res.data.code === 200) {
              this.sendText = 60;
              setInterval(() => {
                if (this.sendText > 0) this.sendText--;
              }, 1000);
              this.$Message.success("验证码发送成功");
            } else {
              this.$Message.error(res.data.msg);
            }
          })
          .catch((err) => {
            this.$Message.error(err);
          });
      });
    },
  },
};
</script>
<style lang="less" scoped>
#login_container {
  width: 300px;
  // min-height: 250px;
  height: auto;
  margin: auto;
  background: #ccc;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .login_form {
    // position: absolute;
    bottom: 0;
    width: 100%;
    padding: 45px 45px 20px;
    box-sizing: border-box;
    .ivu-form-item {
      margin-right: 0;
    }
    .sendBtn {
      padding: 0px;
      position: absolute;
      right: -35px;
      top: 0;
    }
  }
}
</style>
