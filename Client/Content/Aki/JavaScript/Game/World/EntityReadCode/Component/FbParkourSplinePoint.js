"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbParkourSplinePoint = undefined;
const FbPointGroup_1 = require("./FbPointGroup");
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbParkourSplinePoint {
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
    this.sIh = false;
    this.s9o = 0;
    this.P9h = false;
    this.U9h = 0;
    this.I5h = false;
    this.T5h = 0;
    this.D9h = false;
    this.B9h = undefined;
    this.q9h = false;
    this.k9h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbParkourSplinePoint(t);
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
  get Radius() {
    if (!this.sIh) {
      this.sIh = true;
      this.s9o = this.FbDataInternal.radius();
    }
    return this.s9o;
  }
  get ModifiedTime() {
    if (!this.P9h) {
      this.P9h = true;
      this.U9h = this.FbDataInternal.modifiedTime();
    }
    return this.U9h;
  }
  get BuffId() {
    if (!this.I5h) {
      this.I5h = true;
      this.T5h = Number(this.FbDataInternal.buffId());
    }
    return this.T5h;
  }
  get PointGroup() {
    if (!this.D9h) {
      this.D9h = true;
      this.B9h = FbPointGroup_1.FbPointGroup.Create(this.FbDataInternal.pointGroup());
    }
    return this.B9h;
  }
  get PlayerTag() {
    if (!this.q9h) {
      this.q9h = true;
      this.k9h = this.FbDataInternal.playerTag();
    }
    return this.k9h;
  }
}
exports.FbParkourSplinePoint = FbParkourSplinePoint;
//# sourceMappingURL=FbParkourSplinePoint.js.map