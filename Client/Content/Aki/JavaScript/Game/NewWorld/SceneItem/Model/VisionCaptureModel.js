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
    this.uwm = undefined;
  }
  OnInit() {
    this.jsr = new Map();
    this.Vku = new Map();
    this.uwm = new Map();
    return true;
  }
  AddVisionCapture(i, e) {
    if (i) {
      if (this.jsr.has(i) && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SceneGameplay", 7, "[VisionCaptureModel]重复添加收服声骸", ["Capture Owner ID:", i]);
      }
      this.jsr.set(i, e);
    }
    this.uwm.set(e, true);
  }
  AddVisionCaptureFinish(i, e) {
    if (i) {
      this.Vku.set(i, e);
    }
  }
  RemoveVisionCapture(i, e = 0) {
    if (i) {
      this.jsr.delete(i);
      this.Vku.delete(i);
    }
    this.uwm.delete(e);
  }
  GetVisionCapture(i) {
    return this.jsr.get(i);
  }
  GetVisionFinish() {
    return this.Vku;
  }
  get AllVisionEntityIds() {
    return this.uwm;
  }
  OnClear() {
    this.jsr = undefined;
    this.Vku?.clear();
    this.Vku = undefined;
    this.uwm?.clear();
    return !(this.uwm = undefined);
  }
}
exports.VisionCaptureModel = VisionCaptureModel;
//# sourceMappingURL=VisionCaptureModel.js.map