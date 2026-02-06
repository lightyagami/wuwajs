"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipTaskCommonView = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const UiConfig_1 = require("../../../Ui/Define/UiConfig");
const UiManager_1 = require("../../../Ui/UiManager");
const SkipTask_1 = require("./SkipTask");
class SkipTaskCommonView extends SkipTask_1.SkipTask {
  OnRun(i, e) {
    var o;
    var r;
    if (i) {
      o = i;
      if (UiConfig_1.UiConfig.TryGetViewInfo(o)) {
        if (e !== undefined) {
          r = Number(e);
          UiManager_1.UiManager.OpenView(o, isNaN(r) ? e : r);
        } else {
          UiManager_1.UiManager.OpenView(o);
        }
        this.Finish();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SkipInterface", 90, "[SkipTaskCommonView.OnRun] 未找到界面信息，检查界面名称拼写：" + i);
      }
    }
  }
}
exports.SkipTaskCommonView = SkipTaskCommonView;
//# sourceMappingURL=SkipTaskCommonView.js.map