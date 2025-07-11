"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCommonSplinePoint = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbCommonSplinePoint {
  constructor(t) {
    this.FbDataInternal = t;
    this.dph = false;
    this.Cqn = undefined;
    this.VHh = false;
    this.jHh = undefined;
    this.HHh = false;
    this.WHh = undefined;
    this.QHh = false;
    this.KHh = undefined;
    this.$Hh = false;
    this.XHh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCommonSplinePoint(t);
    }
  }
  get Position() {
    if (!this.dph) {
      this.dph = true;
      this.Cqn = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.position());
    }
    return this.Cqn;
  }
  get ArriveTangent() {
    if (!this.VHh) {
      this.VHh = true;
      this.jHh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.arriveTangent());
    }
    return this.jHh;
  }
  get LeaveTangent() {
    if (!this.HHh) {
      this.HHh = true;
      this.WHh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.leaveTangent());
    }
    return this.WHh;
  }
  get LineType() {
    if (!this.QHh) {
      this.QHh = true;
      this.KHh = this.FbDataInternal.lineType();
    }
    return this.KHh;
  }
  get Rotation() {
    if (!this.$Hh) {
      this.$Hh = true;
      this.XHh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.rotation());
    }
    return this.XHh;
  }
}
exports.FbCommonSplinePoint = FbCommonSplinePoint;
//# sourceMappingURL=FbCommonSplinePoint.js.map