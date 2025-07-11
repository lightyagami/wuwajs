"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPatrol = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbPatrolAction_1 = require("./FbPatrolAction");
class FbPatrol {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.kuh = false;
    this.Guh = 0;
    this.QRh = false;
    this.KRh = false;
    this.L_h = false;
    this.A_h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPatrol(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
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
  get Actions() {
    if (!this.L_h) {
      this.L_h = true;
      this.A_h = new Array();
      var i = this.FbDataInternal.actionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.actions(t, new fb_component_1.PatrolAction());
          this.A_h.push(FbPatrolAction_1.FbPatrolAction.Create(s));
        }
      }
    }
    return this.A_h;
  }
}
exports.FbPatrol = FbPatrol;
//# sourceMappingURL=FbPatrol.js.map