"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCycleMoveToPoints = undefined;
const fb_var_1 = require("../../../../Game/World/EntityFb/fb-var");
const UnionMoveToPointTypeHelper_1 = require("./UnionMoveToPointTypeHelper");
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbCycleMoveToPoints {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.NEh = false;
    this.VEh = undefined;
    this.Dfh = false;
    this.Bfh = false;
    this.jEh = false;
    this.HEh = 0;
    this.WEh = false;
    this.QEh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCycleMoveToPoints(t);
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
      var i = this.FbDataInternal.pointsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.points(t, new fb_var_1.VectorInfo());
          this.VEh.push(FbVectorInfo_1.FbVectorInfo.Create(e));
        }
      }
    }
    return this.VEh;
  }
  get IsLoop() {
    if (!this.Dfh) {
      this.Dfh = true;
      this.Bfh = this.FbDataInternal.isLoop();
    }
    return this.Bfh;
  }
  get StopTime() {
    if (!this.jEh) {
      this.jEh = true;
      this.HEh = this.FbDataInternal.stopTime();
    }
    return this.HEh;
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
exports.FbCycleMoveToPoints = FbCycleMoveToPoints;
//# sourceMappingURL=FbCycleMoveToPoints.js.map