"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipTaskActivity = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SkipTask_1 = require("./SkipTask");
class SkipTaskActivity extends SkipTask_1.SkipTask {
  OnRun(e) {
    var e = typeof e == "string" ? Number(e) : e;
    var r = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    if (!r || !r.CheckIfInShowTime()) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("ActivityAdvice");
    }
    ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityById(e);
    this.Finish();
  }
}
exports.SkipTaskActivity = SkipTaskActivity;
//# sourceMappingURL=SkipTaskActivity.js.map