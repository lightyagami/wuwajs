"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTriggerCameraShake = undefined;
const UnionCameraShakeConfigHelper_1 = require("./UnionCameraShakeConfigHelper");
class FbTriggerCameraShake {
  constructor(e) {
    this.FbDataInternal = e;
    this.YLh = false;
    this.zLh = undefined;
    this.JLh = false;
    this.ZLh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbTriggerCameraShake(e);
    }
  }
  get CameraShakeConfig() {
    var e;
    var i;
    if (!this.YLh && (this.YLh = true, e = this.FbDataInternal.cameraShakeConfigType(), i = UnionCameraShakeConfigHelper_1.UnionCameraShakeConfigHelper.GetUnionCameraShakeConfigObject(e))) {
      this.zLh = UnionCameraShakeConfigHelper_1.UnionCameraShakeConfigHelper.ReadUnionCameraShakeConfig(e, this.FbDataInternal.cameraShakeConfig(i));
    }
    return this.zLh;
  }
  get CameraShakeBp() {
    if (!this.JLh) {
      this.JLh = true;
      this.ZLh = this.FbDataInternal.cameraShakeBp();
    }
    return this.ZLh;
  }
}
exports.FbTriggerCameraShake = FbTriggerCameraShake;
//# sourceMappingURL=FbTriggerCameraShake.js.map