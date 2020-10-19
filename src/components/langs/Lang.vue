<template>
  <Content class="goodsBox">
    <Button type="primary" style="margin-bottom: 15px;" @click="show">添加</Button>
    <Poptip
        confirm
        title="您确认删除全部数据吗？"
        @on-ok="clearAll">
        <Button type="error" style="margin-bottom: 15px;margin-left: 8px">全部删除</Button>
    </Poptip>
    <Upload ref="addUpload" style="display: inline-block;" :before-upload="handleUpload" action>
      <Button style="margin-bottom: 15px;margin-left: 8px">批量添加</Button>
    </Upload>
    如需批量添加覆盖，请先全部删除
    <Form id="searchForm" :model="formItem" :label-width="80" inline>
      <FormItem label="商品名称">
        <Input v-model="formItem.key" placeholder="模糊搜索" clearable />
      </FormItem>
      <FormItem :label-width="20" style="width: 370px">
        <Button type="primary" @click="search">查询</Button>
        <Button style="margin-left: 8px" @click="clear">重置</Button>
        <Button style="margin-left: 8px" @click="exportExcel">导出excel</Button>
        <Button style="margin-left: 8px" @click="exportJs">导出js文件</Button>
      </FormItem>
    </Form>
    <Table :columns="columns" :data="tableData" :height="tablesHeight" border></Table>
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
  </Content>
</template>
<script>
import { langsPage, langsDel, langsDelAll } from "@/api/langs";
import { excelUpload } from "@/api/upload";
import AddUpdate from "./LangsAddUpdate";
export default {
  name: "Goods",
  components: {
    AddUpdate,
  },
  data () {
    return {
      columns: [
        {
          title: "变量名",
          key: "key",
        },
        {
          title: "中文",
          key: "zh-CN",
        },
        {
          title: "注释中文",
          key: "notice",
        },
        {
          title: "英文",
          key: "en-US",
        },
        {
          title: "越南语",
          key: "vi-VN",
        },
        {
          title: "泰语",
          key: "th-TH",
        },
        {
          title: "印度语",
          key: "en-IN",
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.show(params.row);
                    },
                  },
                },
                "编辑"
              ),
              h(
                "Poptip",
                {
                  props: {
                    confirm: true,
                    transfer: true,
                    title: "您确认删除这条内容吗？",
                  },
                  on: {
                    "on-ok": () => {
                      this.remove(params.row._id);
                    },
                  },
                },
                [
                  h(
                    "Button",
                    {
                      props: {
                        type: "error",
                        size: "small",
                      },
                    },
                    "删除"
                  ),
                ]
              ),
            ]);
          },
        },
      ],
      tableData: [],
      total: 0,
      searchInfo: {
        pageNo: 1,
        pageSize: 9999999,
      },
      pageSizeOpts: [10, 100, 9999999],
      formItem: {
        key: "",
      },
      tablesHeight: 0,
    };
  },
  methods: {
    setTablesHeight () {
      let aH = 0;
      let oA = document.getElementById("app");
      let oH = oA.clientHeight || oA.offsetHeight;
      let sA = document.getElementById("searchForm");
      let sH = sA.clientHeight || sA.offsetHeight;
      aH = oH - sH - 220;
      this.tablesHeight = aH;
    },
    getList () {
      langsPage(this.searchInfo)
        .then((res) => {
          if (res.data.code === 200) {
            const data = res.data;
            this.tableData = data.data;
            this.total = data.total;
          } else {
            this.$Message.error(res.data.msg);
          }
        })
        .catch((err) => {
          this.$Message.error(err);
        });
    },
    search () {
      this.searchInfo = {
        key: this.formItem.key,
        pageNo: 1,
        pageSize: this.searchInfo.pageSize,
      };
      this.getList();
    },
    exportExcel () {
      window.open(window.Glob.baseUrl.dev + '/lang/export?pageNo=' + this.searchInfo.pageNo + '&pageSize=' + this.searchInfo.pageSize + '&key=' + this.formItem.key)
    },
    exportJs () {
      window.open(window.Glob.baseUrl.dev + '/lang/export/js?pageNo=' + this.searchInfo.pageNo + '&pageSize=' + this.searchInfo.pageSize + '&key=' + this.formItem.key)
    },
    handleUpload (file) {
      console.log(file)
      if (file) {
        const tempArray = file.name.split('.')
        const len = tempArray.length
        const suffix = tempArray[len - 1]

        if (suffix != 'xlsx' && suffix != 'xls') {
          this.$Message.error("请上传excel文件");
          this.$refs["addUpload"].clearFiles();
        } else {
          let formData = new FormData();
          formData.append("avatar", file);
          excelUpload(formData)
            .then((res) => {
              if (res.data.code === 200) {
                this.search()
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
    clear () {
      this.formItem = {
        key: "",
      };
      this.searchInfo = {
        pageNo: 1,
        pageSize: 9999999,
      };
      this.getList();
    },
    clearAll () {
      langsDelAll()
        .then((res) => {
          if (res.data.code === 200) {
            this.$Message.success("删除成功");
            this.getList();
          } else {
            this.$Message.error(res.data.msg);
          }
        })
        .catch((err) => {
          this.$Message.error(err);
        });
    },
    show (params) {
      if (params) {
        this.$refs.AddUpdate.init(params);
      } else {
        this.$refs.AddUpdate.init();
      }
    },
    remove (_id) {
      langsDel({ _id: _id })
        .then((res) => {
          if (res.data.code === 200) {
            this.$Message.success("删除成功");
            this.getList();
          } else {
            this.$Message.error(res.data.msg);
          }
        })
        .catch((err) => {
          this.$Message.error(err);
        });
    },
    pageNoChange (current) {
      this.searchInfo.pageNo = current;
      this.getList();
    },
    pageSizeChange (val) {
      this.searchInfo.pageNo = 1;
      this.searchInfo.pageSize = val;
      this.getList();
    },
  },
  mounted () {
    this.getList();
    setTimeout(() => {
      this.setTablesHeight();
    }, 50);
    window.onresize = () => {
      this.setTablesHeight();
    };
  },
};
</script>
<style lang="less" scoped>
.goodsBox {
  .ivu-form-inline .ivu-form-item {
    width: 267px;
  }
}
</style>
