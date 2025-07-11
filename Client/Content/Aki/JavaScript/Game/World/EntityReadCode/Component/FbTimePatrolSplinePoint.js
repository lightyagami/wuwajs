"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTimePatrolSplinePoint = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbTimePatrolSplinePoint {
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
    this.ZDh = false;
    this.eBh = 0;
    this.tBh = false;
    this.iBh = 0;
    this.i7h = false;
    this.LTo = 0;
  }
  static Create(t) {
    if (t) {
      return new FbTimePatrolSplinePoint(t);
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
  get Hours() {
    if (!this.ZDh) {
      this.ZDh = true;
      this.eBh = this.FbDataInternal.hours();
    }
    return this.eBh;
  }
  get Minutes() {
    if (!this.tBh) {
      this.tBh = true;
      this.iBh = this.FbDataInternal.minutes();
    }
    return this.iBh;
  }
  get Second() {
    if (!this.i7h) {
      this.i7h = true;
      this.LTo = this.FbDataInternal.second();
    }
    return this.LTo;
  }
}
exports.FbTimePatrolSplinePoint = FbTimePatrolSplinePoint;
//# sourceMappingURL=FbTimePatrolSplinePoint.js.map