"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbContinuesVariableSpeedSplinePoint = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbConditionAction_1 = require("./FbConditionAction");
const FbTimePathConfig_1 = require("./FbTimePathConfig");
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbContinuesVariableSpeedSplinePoint {
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
    this.s9h = false;
    this.a9h = undefined;
    this.FNh = false;
    this.NNh = undefined;
    this.oc_ = false;
    this.nc_ = 0;
  }
  static Create(t) {
    if (t) {
      return new FbContinuesVariableSpeedSplinePoint(t);
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
  get IntervalTimePathConfig() {
    if (!this.s9h) {
      this.s9h = true;
      this.a9h = FbTimePathConfig_1.FbTimePathConfig.Create(this.FbDataInternal.intervalTimePathConfig());
    }
    return this.a9h;
  }
  get ConditionActions() {
    if (!this.FNh) {
      this.FNh = true;
      this.NNh = new Array();
      var i = this.FbDataInternal.conditionActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.conditionActions(t, new fb_component_1.ConditionAction());
          this.NNh.push(FbConditionAction_1.FbConditionAction.Create(e));
        }
      }
    }
    return this.NNh;
  }
  get KeepSpeed() {
    if (!this.oc_) {
      this.oc_ = true;
      this.nc_ = this.FbDataInternal.keepSpeed();
    }
    return this.nc_;
  }
}
exports.FbContinuesVariableSpeedSplinePoint = FbContinuesVariableSpeedSplinePoint;
//# sourceMappingURL=FbContinuesVariableSpeedSplinePoint.js.map