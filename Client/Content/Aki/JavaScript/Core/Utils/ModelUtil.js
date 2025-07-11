"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModelUtil = undefined;
const Log_1 = require("../Common/Log");
const DataTableUtil_1 = require("./DataTableUtil");
class ModelUtil {
  static GetModelConfig(e) {
    return DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(0, e.toString());
  }
  static GetSoftSkeletalMesh(e) {
    var t = this.GetModelConfig(e);
    if (t) {
      return t.网格体;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ModelUtil", 10, "加载模型配置数据失败", ["ModelId", e]);
    }
  }
}
exports.ModelUtil = ModelUtil;
//# sourceMappingURL=ModelUtil.js.map