"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbLevelAISplinePoint = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("../Action/FbActionInfo");
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbLevelAISplinePoint {
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
    this.Nuh = false;
    this.Vuh = undefined;
    this.p9h = false;
    this.v9h = undefined;
    this.YHh = false;
    this.zHh = 0;
    this.L_h = false;
    this.A_h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbLevelAISplinePoint(t);
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
  get MoveState() {
    if (!this.Nuh) {
      this.Nuh = true;
      this.Vuh = this.FbDataInternal.moveState();
    }
    return this.Vuh;
  }
  get CharPositionState() {
    if (!this.p9h) {
      this.p9h = true;
      this.v9h = this.FbDataInternal.charPositionState();
    }
    return this.v9h;
  }
  get MoveSpeed() {
    if (!this.YHh) {
      this.YHh = true;
      this.zHh = this.FbDataInternal.moveSpeed();
    }
    return this.zHh;
  }
  get Actions() {
    if (!this.L_h) {
      this.L_h = true;
      this.A_h = new Array();
      var i = this.FbDataInternal.actionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.actions(t, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
      }
    }
    return this.A_h;
  }
}
exports.FbLevelAISplinePoint = FbLevelAISplinePoint;
//# sourceMappingURL=FbLevelAISplinePoint.js.map