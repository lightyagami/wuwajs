"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SkipTaskActivity = void 0;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  SkipTask_1 = require("./SkipTask");
class SkipTaskActivity extends SkipTask_1.SkipTask {
  OnRun(e) {
    var e = "string" == typeof e ? Number(e) : e,
      r = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    r && r.CheckIfInShowTime() || ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("ActivityAdvice"), ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityById(e), this.Finish()
  }
}
exports.SkipTaskActivity = SkipTaskActivity;
//# sourceMappingURL=SkipTaskActivity.js.map