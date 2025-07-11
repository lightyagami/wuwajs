"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRotatorComponent = undefined;
const FbEventRotator_1 = require("./FbEventRotator");
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbRotatorComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.Euh = false;
    this.Iuh = undefined;
    this.d_h = false;
    this.m_h = undefined;
    this.OBh = false;
    this.FBh = undefined;
    this.NBh = false;
    this.VBh = undefined;
    this.jBh = false;
    this.HBh = undefined;
    this.WBh = false;
    this.QBh = undefined;
    this.KBh = false;
    this.$Bh = false;
    this.a_h = false;
    this.I9o = 0;
    this.XBh = false;
    this.YBh = false;
    this.zBh = false;
    this.JBh = undefined;
    this.ZBh = false;
    this.eqh = false;
    this.tqh = false;
    this.iqh = false;
  }
  static Create(t) {
    if (t) {
      return new FbRotatorComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get Content() {
    if (!this.Euh) {
      this.Euh = true;
      this.Iuh = this.FbDataInternal.content();
    }
    return this.Iuh;
  }
  get Icon() {
    if (!this.d_h) {
      this.d_h = true;
      this.m_h = this.FbDataInternal.icon();
    }
    return this.m_h;
  }
  get RotatorSpeed() {
    if (!this.OBh) {
      this.OBh = true;
      this.FBh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.rotatorSpeed());
    }
    return this.FBh;
  }
  get LocationOffset() {
    if (!this.NBh) {
      this.NBh = true;
      this.VBh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.locationOffset());
    }
    return this.VBh;
  }
  get RotationOffset() {
    if (!this.jBh) {
      this.jBh = true;
      this.HBh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.rotationOffset());
    }
    return this.HBh;
  }
  get RotationMapping() {
    if (!this.WBh) {
      this.WBh = true;
      this.QBh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.rotationMapping());
    }
    return this.QBh;
  }
  get IsLocalSpace() {
    if (!this.KBh) {
      this.KBh = true;
      this.$Bh = this.FbDataInternal.isLocalSpace();
    }
    return this.$Bh;
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get IsRotatorSelf() {
    if (!this.XBh) {
      this.XBh = true;
      this.YBh = this.FbDataInternal.isRotatorSelf();
    }
    return this.YBh;
  }
  get InteractAction() {
    if (!this.zBh) {
      this.zBh = true;
      this.JBh = FbEventRotator_1.FbEventRotator.Create(this.FbDataInternal.interactAction());
    }
    return this.JBh;
  }
  get IsLockZ() {
    if (!this.ZBh) {
      this.ZBh = true;
      this.eqh = this.FbDataInternal.isLockZ();
    }
    return this.eqh;
  }
  get IsRecovery() {
    if (!this.tqh) {
      this.tqh = true;
      this.iqh = this.FbDataInternal.isRecovery();
    }
    return this.iqh;
  }
}
exports.FbRotatorComponent = FbRotatorComponent;
//# sourceMappingURL=FbRotatorComponent.js.map