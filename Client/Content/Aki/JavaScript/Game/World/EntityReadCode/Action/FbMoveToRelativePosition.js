"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbMoveToRelativePosition = undefined;
const UnionMoveToPointTypeHelper_1 = require("./UnionMoveToPointTypeHelper");
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbMoveToRelativePosition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.zEh = false;
    this.JEh = undefined;
    this.WEh = false;
    this.QEh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbMoveToRelativePosition(t);
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
  get MoveMotion() {
    var t;
    var e;
    if (!this.WEh && (this.WEh = true, t = this.FbDataInternal.moveMotionType(), e = UnionMoveToPointTypeHelper_1.UnionMoveToPointTypeHelper.GetUnionMoveToPointTypeObject(t))) {
      this.QEh = UnionMoveToPointTypeHelper_1.UnionMoveToPointTypeHelper.ReadUnionMoveToPointType(t, this.FbDataInternal.moveMotion(e));
    }
    return this.QEh;
  }
}
exports.FbMoveToRelativePosition = FbMoveToRelativePosition;
//# sourceMappingURL=FbMoveToRelativePosition.js.map