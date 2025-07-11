"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRenjuChess = undefined;
const UnionAdjustPlayerCameraOptionHelper_1 = require("./UnionAdjustPlayerCameraOptionHelper");
class FbRenjuChess {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.kIh = false;
    this.GIh = 0;
    this.OIh = false;
    this.FIh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbRenjuChess(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Chessboard() {
    if (!this.kIh) {
      this.kIh = true;
      this.GIh = this.FbDataInternal.chessboard();
    }
    return this.GIh;
  }
  get CameraConfig() {
    var t;
    var s;
    if (!this.OIh && (this.OIh = true, t = this.FbDataInternal.cameraConfigType(), s = UnionAdjustPlayerCameraOptionHelper_1.UnionAdjustPlayerCameraOptionHelper.GetUnionAdjustPlayerCameraOptionObject(t))) {
      this.FIh = UnionAdjustPlayerCameraOptionHelper_1.UnionAdjustPlayerCameraOptionHelper.ReadUnionAdjustPlayerCameraOption(t, this.FbDataInternal.cameraConfig(s));
    }
    return this.FIh;
  }
}
exports.FbRenjuChess = FbRenjuChess;
//# sourceMappingURL=FbRenjuChess.js.map