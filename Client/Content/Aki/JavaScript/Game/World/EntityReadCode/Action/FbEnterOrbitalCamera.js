"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEnterOrbitalCamera = undefined;
const UnionEnterOrbitalCameraOptionHelper_1 = require("./UnionEnterOrbitalCameraOptionHelper");
class FbEnterOrbitalCamera {
  constructor(t) {
    this.FbDataInternal = t;
    this.s_h = false;
    this.Hye = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEnterOrbitalCamera(t);
    }
  }
  get Option() {
    var t;
    var r;
    if (!this.s_h && (this.s_h = true, t = this.FbDataInternal.optionType(), r = UnionEnterOrbitalCameraOptionHelper_1.UnionEnterOrbitalCameraOptionHelper.GetUnionEnterOrbitalCameraOptionObject(t))) {
      this.Hye = UnionEnterOrbitalCameraOptionHelper_1.UnionEnterOrbitalCameraOptionHelper.ReadUnionEnterOrbitalCameraOption(t, this.FbDataInternal.option(r));
    }
    return this.Hye;
  }
}
exports.FbEnterOrbitalCamera = FbEnterOrbitalCamera;
//# sourceMappingURL=FbEnterOrbitalCamera.js.map