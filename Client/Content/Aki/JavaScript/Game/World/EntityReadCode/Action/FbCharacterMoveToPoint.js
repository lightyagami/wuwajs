"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCharacterMoveToPoint = undefined;
const UnionTargetEntityHelper_1 = require("./UnionTargetEntityHelper");
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbCharacterMoveToPoint {
  constructor(t) {
    this.FbDataInternal = t;
    this.ldh = false;
    this.NHo = undefined;
    this.uch = false;
    this.dch = undefined;
    this._dh = false;
    this.cdh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCharacterMoveToPoint(t);
    }
  }
  get Target() {
    var t;
    var e;
    if (!this.ldh && (this.ldh = true, t = this.FbDataInternal.targetType(), e = UnionTargetEntityHelper_1.UnionTargetEntityHelper.GetUnionTargetEntityObject(t))) {
      this.NHo = UnionTargetEntityHelper_1.UnionTargetEntityHelper.ReadUnionTargetEntity(t, this.FbDataInternal.target(e));
    }
    return this.NHo;
  }
  get Pos() {
    if (!this.uch) {
      this.uch = true;
      this.dch = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.pos());
    }
    return this.dch;
  }
  get MoveType() {
    if (!this._dh) {
      this._dh = true;
      this.cdh = this.FbDataInternal.moveType();
    }
    return this.cdh;
  }
}
exports.FbCharacterMoveToPoint = FbCharacterMoveToPoint;
//# sourceMappingURL=FbCharacterMoveToPoint.js.map