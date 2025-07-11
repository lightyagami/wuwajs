"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbResetSelfPosComponent = undefined;
class FbResetSelfPosComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.pQh = false;
    this.vQh = 0;
    this.yQh = false;
    this.SQh = false;
    this.MQh = false;
    this.EQh = false;
    this.IQh = false;
    this.TQh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbResetSelfPosComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get ResetRadius() {
    if (!this.pQh) {
      this.pQh = true;
      this.vQh = this.FbDataInternal.resetRadius();
    }
    return this.vQh;
  }
  get IsDisableResetPosAfterThrow() {
    if (!this.yQh) {
      this.yQh = true;
      this.SQh = this.FbDataInternal.isDisableResetPosAfterThrow();
    }
    return this.SQh;
  }
  get IsResetPosAfterThrow() {
    if (!this.MQh) {
      this.MQh = true;
      this.EQh = this.FbDataInternal.isResetPosAfterThrow();
    }
    return this.EQh;
  }
  get ResetPosDelayTime() {
    if (!this.IQh) {
      this.IQh = true;
      this.TQh = this.FbDataInternal.resetPosDelayTime();
    }
    return this.TQh;
  }
}
exports.FbResetSelfPosComponent = FbResetSelfPosComponent;
//# sourceMappingURL=FbResetSelfPosComponent.js.map