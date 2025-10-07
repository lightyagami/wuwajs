"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionCaptureModel = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class VisionCaptureModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.jsr = undefined;
    this.Vku = undefined;
  }
  OnInit() {
    this.jsr = new Map();
    this.Vku = new Map();
    return true;
  }
  AddVisionCapture(e, i) {
    if (this.jsr.has(e) && Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("SceneGameplay", 7, "[VisionCaptureModel]重复添加收服声骸", ["Capture Owner ID:", e]);
    }
    this.jsr.set(e, i);
  }
  AddVisionCaptureFinish(e, i) {
    this.Vku.set(e, i);
  }
  RemoveVisionCapture(e) {
    this.jsr.delete(e);
    this.Vku.delete(e);
  }
  GetVisionCapture(e) {
    return this.jsr.get(e);
  }
  GetVisionFinish() {
    return this.Vku;
  }
  OnClear() {
    this.jsr = undefined;
    this.Vku?.clear();
    return !(this.Vku = undefined);
  }
}
exports.VisionCaptureModel = VisionCaptureModel;
//# sourceMappingURL=VisionCaptureModel.js.map