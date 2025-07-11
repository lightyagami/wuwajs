"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAdjustAxisLockCamera = undefined;
const FbAxisLockScreenConfig_1 = require("./FbAxisLockScreenConfig");
const FbBaseCurve_1 = require("./FbBaseCurve");
const UnionGravityDirectionHelper_1 = require("../Common/UnionGravityDirectionHelper");
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbAdjustAxisLockCamera {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.NIh = false;
    this.cui = 0;
    this.mch = false;
    this.Cch = 0;
    this.VIh = false;
    this.jIh = undefined;
    this.pch = false;
    this.vch = 0;
    this.HIh = false;
    this.WIh = undefined;
    this.QIh = false;
    this.KIh = 0;
    this.$Ih = false;
    this.XIh = 0;
    this.YIh = false;
    this.zIh = 0;
    this.Kdh = false;
    this.$dh = undefined;
    this.JIh = false;
    this.ZIh = undefined;
    this.Ich = false;
    this.Tch = 0;
    this.eTh = false;
    this.tTh = false;
    this.yUh = false;
    this.SUh = undefined;
    this.iTh = false;
    this.rTh = undefined;
    this.oTh = false;
    this.nTh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbAdjustAxisLockCamera(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Priority() {
    if (!this.NIh) {
      this.NIh = true;
      this.cui = this.FbDataInternal.priority();
    }
    return this.cui;
  }
  get FadeInTime() {
    if (!this.mch) {
      this.mch = true;
      this.Cch = this.FbDataInternal.fadeInTime();
    }
    return this.Cch;
  }
  get FadeInCurve() {
    if (!this.VIh) {
      this.VIh = true;
      this.jIh = FbBaseCurve_1.FbBaseCurve.Create(this.FbDataInternal.fadeInCurve());
    }
    return this.jIh;
  }
  get FadeOutTime() {
    if (!this.pch) {
      this.pch = true;
      this.vch = this.FbDataInternal.fadeOutTime();
    }
    return this.vch;
  }
  get FadeOutCurve() {
    if (!this.HIh) {
      this.HIh = true;
      this.WIh = FbBaseCurve_1.FbBaseCurve.Create(this.FbDataInternal.fadeOutCurve());
    }
    return this.WIh;
  }
  get ArmLength() {
    if (!this.QIh) {
      this.QIh = true;
      this.KIh = this.FbDataInternal.armLength();
    }
    return this.KIh;
  }
  get MinumArmLength() {
    if (!this.$Ih) {
      this.$Ih = true;
      this.XIh = this.FbDataInternal.minumArmLength();
    }
    return this.XIh;
  }
  get MaxiumArmLength() {
    if (!this.YIh) {
      this.YIh = true;
      this.zIh = this.FbDataInternal.maxiumArmLength();
    }
    return this.zIh;
  }
  get Offset() {
    if (!this.Kdh) {
      this.Kdh = true;
      this.$dh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.offset());
    }
    return this.$dh;
  }
  get ArmOffset() {
    if (!this.JIh) {
      this.JIh = true;
      this.ZIh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.armOffset());
    }
    return this.ZIh;
  }
  get Fov() {
    if (!this.Ich) {
      this.Ich = true;
      this.Tch = this.FbDataInternal.fov();
    }
    return this.Tch;
  }
  get IsDisableResetFocus() {
    if (!this.eTh) {
      this.eTh = true;
      this.tTh = this.FbDataInternal.isDisableResetFocus();
    }
    return this.tTh;
  }
  get GravityDirection() {
    var t;
    var i;
    if (!this.yUh && (this.yUh = true, t = this.FbDataInternal.gravityDirectionType(), i = UnionGravityDirectionHelper_1.UnionGravityDirectionHelper.GetUnionGravityDirectionObject(t))) {
      this.SUh = UnionGravityDirectionHelper_1.UnionGravityDirectionHelper.ReadUnionGravityDirection(t, this.FbDataInternal.gravityDirection(i));
    }
    return this.SUh;
  }
  get AxisRotate() {
    if (!this.iTh) {
      this.iTh = true;
      this.rTh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.axisRotate());
    }
    return this.rTh;
  }
  get ScreenConfig() {
    if (!this.oTh) {
      this.oTh = true;
      this.nTh = FbAxisLockScreenConfig_1.FbAxisLockScreenConfig.Create(this.FbDataInternal.screenConfig());
    }
    return this.nTh;
  }
}
exports.FbAdjustAxisLockCamera = FbAdjustAxisLockCamera;
//# sourceMappingURL=FbAdjustAxisLockCamera.js.map