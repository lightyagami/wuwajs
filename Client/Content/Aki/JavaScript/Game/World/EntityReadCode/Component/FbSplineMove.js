"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSplineMove = undefined;
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition");
const FbEntityStateCondition_1 = require("../Condition/FbEntityStateCondition");
class FbSplineMove {
  constructor(t) {
    this.FbDataInternal = t;
    this.bOh = false;
    this.LOh = undefined;
    this.qmh = false;
    this.H8o = 0;
    this.kuh = false;
    this.Guh = 0;
    this.QRh = false;
    this.KRh = false;
    this.zuh = false;
    this.Juh = false;
  }
  static Create(t) {
    if (t) {
      return new FbSplineMove(t);
    }
  }
  get StateConditions() {
    if (!this.bOh) {
      this.bOh = true;
      this.LOh = new Array();
      var i = this.FbDataInternal.stateConditionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.stateConditions(t, new fb_condition_1.EntityStateCondition());
          this.LOh.push(FbEntityStateCondition_1.FbEntityStateCondition.Create(s));
        }
      }
    }
    return this.LOh;
  }
  get Speed() {
    if (!this.qmh) {
      this.qmh = true;
      this.H8o = this.FbDataInternal.speed();
    }
    return this.H8o;
  }
  get SplineEntityId() {
    if (!this.kuh) {
      this.kuh = true;
      this.Guh = this.FbDataInternal.splineEntityId();
    }
    return this.Guh;
  }
  get IsCircle() {
    if (!this.QRh) {
      this.QRh = true;
      this.KRh = this.FbDataInternal.isCircle();
    }
    return this.KRh;
  }
  get IsLookDir() {
    if (!this.zuh) {
      this.zuh = true;
      this.Juh = this.FbDataInternal.isLookDir();
    }
    return this.Juh;
  }
}
exports.FbSplineMove = FbSplineMove;
//# sourceMappingURL=FbSplineMove.js.map