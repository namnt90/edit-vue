<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="Date" width="150">
      <template slot-scope="scope">
        <Custom-input
          :value="scope.row.date"
          :isEditing="scope.row.isEditing"
          :callBack="
            (value) => checkEditing(scope.$index, scope.row, `date`, value)
          "
        />
      </template>
    </el-table-column>
    <el-table-column label="Name" width="130">
      <template slot-scope="scope">
        <Custom-input
          :value="scope.row.name"
          :isEditing="scope.row.isEditing"
          :callBack="
            (value) => checkEditing(scope.$index, scope.row, `name`, value)
          "
        />
      </template>
    </el-table-column>
    <el-table-column label="Uneditable" width="100">
      <template slot-scope="scope">
        <span>{{ scope.row.notEditable }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Data type" width="100">
      <template slot-scope="scope">
        <span>{{ scope.row.type }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Operations">
      <template slot-scope="scope">
        <el-button
          size="mini"
          v-if="showButton(`edit`, scope.row.type)"
          :disabled="disableButton(`edit`, scope.row.type)"
          @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button
        >
        <el-button
          size="mini"
          type="danger"
          v-if="showButton(`delete`, scope.row.type)"
          :disabled="disableButton(`delete`, scope.row.type)"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
        >
        <el-button
          size="mini"
          v-if="showButton(`update`, scope.row.type)"
          :disabled="disableButton(`update`, scope.row.type)"
          @click="handleUpdate(scope.$index, scope.row)"
          >Update</el-button
        >
        <el-button
          size="mini"
          type="danger"
          v-if="showButton(`update`, scope.row.type)"
          :disabled="disableButton(`cancel`, scope.row.type)"
          @click="handleCancel(scope.$index, scope.row)"
          >Cancel</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template> 

<script>
import Vue from "vue";
import { tableDisplay } from "../../mixins/tableDisplay.js";
import CustomInput from "../../components/CustomInput.vue";

export default {
  name: "App",
  mixins: [tableDisplay],
  components: { CustomInput },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          notEditable: "xxxxx",
          type: "default",
        },
        {
          date: "2016-05-02",
          name: "Tom 1 ",
          notEditable: "xxxxx",
          // type: "editing",
        },
        {
          date: "2016-05-04",
          name: "Tom 2",
          notEditable: "xxxxx",
          // type: "deleting",
        },
        {
          date: "2016-05-01",
          name: "Tom 3",
          notEditable: "xxxxx",
          // type: "changed",
        },
        {
          date: "2016-05-01",
          name: "Tom 4",
          notEditable: "xxxxx",
          // type: "canceling",
        },
      ],
      oldData: {},
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log("handleEdit", index, row);
      Vue.set(this.tableData, index, {
        ...row,
        type: "editing",
        isEditing: true,
      });
    },
    handleDelete(index, row) {
      console.log("handleDelete", index, row);
      this.tableData.splice(index, 1);
      Vue.set(this.tableData);
    },
    handleUpdate(index, row) {
      console.log("handleUpdate", index, row);
      Vue.set(this.tableData, index, {
        ...row,
        type: "updated",
        isEditing: false,
      });
    },
    handleCancel(index, row) {
      console.log("handleCancel", index, row);
      const olđData = row.type === "changed" ? this.oldData[index] : row;
      Vue.set(this.tableData, index, {
        ...olđData,
        type: "canceling",
        isEditing: false,
      });
    },
    checkEditing(index, row, key, value) {
      console.log("checkEditing", row, key, value);
      // save default value
      if (row.type !== "changed") {
        this.oldData[index] = this.tableData[index];
        console.log("this.oldData", this.oldData);
      }
      Vue.set(this.tableData, index, { ...row, [key]: value, type: "changed" });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  line-height: 60px;
  background: #20a0ff;
  color: #fff;
  .logo {
    width: 230px;
    padding: 0 20px;
  }
  .tool {
    padding: 0 23px;
    width: 14px;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
    text-align: left;
  }
  .userinfo {
    float: right;
    text-align: right;
    padding-right: 35px;
    .username {
      position: relative;
      width: 100%;
      height: 100%;
      color: #fff;
      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin: 10px 0px 10px 10px;
        float: right;
      }
    }
    .userdown {
    }
  }
}
</style>
