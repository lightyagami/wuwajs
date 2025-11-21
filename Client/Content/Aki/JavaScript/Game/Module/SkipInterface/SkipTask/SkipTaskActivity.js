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
    var r;
    var e = typeof e == "string" ? Number(e) : e;
    if (e > 0) {
      if (!(r = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e)) || !r.CheckIfInShowTime()) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("ActivityAdvice");
      }
    }
    ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityById(e);
    this.Finish();
  }
}
exports.SkipTaskActivity = SkipTaskActivity;
//# sourceMappingURL=SkipTaskActivity.js.map