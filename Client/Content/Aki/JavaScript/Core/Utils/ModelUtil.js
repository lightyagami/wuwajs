"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModelUtil = undefined;
const Log_1 = require("../Common/Log");
const DataTableUtil_1 = require("./DataTableUtil");
class ModelUtil {
  static GetModelConfig(t) {
    return DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(0, t.toString());
  }
  static GetSoftSkeletalMesh(t) {
    var e = this.GetModelConfig(t);
    if (e) {
      return e.网格体;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ModelUtil", 10, "加载模型配置数据失败", ["ModelId", t]);
    }
  }
  static GetHuluConfig(t) {
    if (!(t <= 0)) {
      return DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(27, t.toString());
    }
  }
}
exports.ModelUtil = ModelUtil;
//# sourceMappingURL=ModelUtil.js.map