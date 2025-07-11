"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbMoveToPoint = undefined;
const UnionMoveToPointTypeHelper_1 = require("./UnionMoveToPointTypeHelper");
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbMoveToPoint {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.zEh = false;
    this.JEh = undefined;
    this.Fph = false;
    this.Nph = 0;
    this.WEh = false;
    this.QEh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbMoveToPoint(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Point() {
    if (!this.zEh) {
      this.zEh = true;
      this.JEh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.point());
    }
    return this.JEh;
  }
  get Time() {
    if (!this.Fph) {
      this.Fph = true;
      this.Nph = this.FbDataInternal.time();
    }
    return this.Nph;
  }
  get MoveMotion() {
    var t;
    var i;
    if (!this.WEh && (this.WEh = true, t = this.FbDataInternal.moveMotionType(), i = UnionMoveToPointTypeHelper_1.UnionMoveToPointTypeHelper.GetUnionMoveToPointTypeObject(t))) {
      this.QEh = UnionMoveToPointTypeHelper_1.UnionMoveToPointTypeHelper.ReadUnionMoveToPointType(t, this.FbDataInternal.moveMotion(i));
    }
    return this.QEh;
  }
}
exports.FbMoveToPoint = FbMoveToPoint;
//# sourceMappingURL=FbMoveToPoint.js.map