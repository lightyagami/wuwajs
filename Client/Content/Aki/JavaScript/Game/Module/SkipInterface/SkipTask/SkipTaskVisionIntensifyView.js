"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipTaskVisionIntensifyView = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const SkipTask_1 = require("./SkipTask");
class SkipTaskVisionIntensifyView extends SkipTask_1.SkipTask {
  OnRun(i) {
    UiManager_1.UiManager.OpenView("VisionIntensifyView", i);
    this.Finish();
  }
}
exports.SkipTaskVisionIntensifyView = SkipTaskVisionIntensifyView;
//# sourceMappingURL=SkipTaskVisionIntensifyView.js.map