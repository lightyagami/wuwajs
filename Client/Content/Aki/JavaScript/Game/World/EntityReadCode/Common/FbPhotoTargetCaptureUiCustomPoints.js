"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPhotoTargetCaptureUiCustomPoints = undefined;
const fb_var_1 = require("../../../../Game/World/EntityFb/fb-var");
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbPhotoTargetCaptureUiCustomPoints {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.NEh = false;
    this.VEh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPhotoTargetCaptureUiCustomPoints(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Points() {
    if (!this.NEh) {
      this.NEh = true;
      this.VEh = new Array();
      var r = this.FbDataInternal.pointsLength();
      if (r) {
        for (let t = 0; t < r; ++t) {
          var i = this.FbDataInternal.points(t, new fb_var_1.VectorInfo());
          this.VEh.push(FbVectorInfo_1.FbVectorInfo.Create(i));
        }
      }
    }
    return this.VEh;
  }
}
exports.FbPhotoTargetCaptureUiCustomPoints = FbPhotoTargetCaptureUiCustomPoints;
//# sourceMappingURL=FbPhotoTargetCaptureUiCustomPoints.js.map