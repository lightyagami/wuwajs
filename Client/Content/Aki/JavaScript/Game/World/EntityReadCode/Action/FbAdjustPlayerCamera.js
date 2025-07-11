"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAdjustPlayerCamera = undefined;
const UnionAdjustPlayerCameraOptionHelper_1 = require("./UnionAdjustPlayerCameraOptionHelper");
class FbAdjustPlayerCamera {
  constructor(e) {
    this.FbDataInternal = e;
    this.s_h = false;
    this.Hye = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbAdjustPlayerCamera(e);
    }
  }
  get Option() {
    var e;
    var t;
    if (!this.s_h && (this.s_h = true, e = this.FbDataInternal.optionType(), t = UnionAdjustPlayerCameraOptionHelper_1.UnionAdjustPlayerCameraOptionHelper.GetUnionAdjustPlayerCameraOptionObject(e))) {
      this.Hye = UnionAdjustPlayerCameraOptionHelper_1.UnionAdjustPlayerCameraOptionHelper.ReadUnionAdjustPlayerCameraOption(e, this.FbDataInternal.option(t));
    }
    return this.Hye;
  }
}
exports.FbAdjustPlayerCamera = FbAdjustPlayerCamera;
//# sourceMappingURL=FbAdjustPlayerCamera.js.map