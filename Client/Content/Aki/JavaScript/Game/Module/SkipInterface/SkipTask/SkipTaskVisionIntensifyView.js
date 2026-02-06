"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipTaskVisionIntensifyView = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const VisionIntensifyView_1 = require("../../Phantom/Vision/View/VisionIntensifyView");
const SkipTask_1 = require("./SkipTask");
class SkipTaskVisionIntensifyView extends SkipTask_1.SkipTask {
  OnRun(i) {
    var e = new VisionIntensifyView_1.VisionIntensifyViewPassData();
    e.UniqueId = i;
    UiManager_1.UiManager.OpenView("VisionIntensifyView", e);
    this.Finish();
  }
}
exports.SkipTaskVisionIntensifyView = SkipTaskVisionIntensifyView;
//# sourceMappingURL=SkipTaskVisionIntensifyView.js.map