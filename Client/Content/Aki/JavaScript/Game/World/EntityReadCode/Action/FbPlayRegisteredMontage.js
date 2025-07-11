"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPlayRegisteredMontage = undefined;
class FbPlayRegisteredMontage {
  constructor(t) {
    this.FbDataInternal = t;
    this.a_h = false;
    this.I9o = 0;
    this.Rfh = false;
    this.wfh = 0;
    this.Pfh = false;
    this.Ufh = false;
    this.Qfh = false;
    this.Kfh = 0;
    this._Ah = false;
    this.cAh = 0;
    this.uAh = false;
    this.dAh = 0;
    this.px_ = false;
    this.vx_ = false;
    this.Wp1 = false;
    this.Qp1 = false;
  }
  static Create(t) {
    if (t) {
      return new FbPlayRegisteredMontage(t);
    }
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get MontageId() {
    if (!this.Rfh) {
      this.Rfh = true;
      this.wfh = this.FbDataInternal.montageId();
    }
    return this.wfh;
  }
  get IsAbpMontage() {
    if (!this.Pfh) {
      this.Pfh = true;
      this.Ufh = this.FbDataInternal.isAbpMontage();
    }
    return this.Ufh;
  }
  get FaceExpressionId() {
    if (!this.Qfh) {
      this.Qfh = true;
      this.Kfh = this.FbDataInternal.faceExpressionId();
    }
    return this.Kfh;
  }
  get LoopDuration() {
    if (!this._Ah) {
      this._Ah = true;
      this.cAh = this.FbDataInternal.loopDuration();
    }
    return this.cAh;
  }
  get RepeatTimes() {
    if (!this.uAh) {
      this.uAh = true;
      this.dAh = this.FbDataInternal.repeatTimes();
    }
    return this.dAh;
  }
  get KeepMontageWhenEnd() {
    if (!this.px_) {
      this.px_ = true;
      this.vx_ = this.FbDataInternal.keepMontageWhenEnd();
    }
    return this.vx_;
  }
  get KeepMontageAfterFlow() {
    if (!this.Wp1) {
      this.Wp1 = true;
      this.Qp1 = this.FbDataInternal.keepMontageAfterFlow();
    }
    return this.Qp1;
  }
}
exports.FbPlayRegisteredMontage = FbPlayRegisteredMontage;
//# sourceMappingURL=FbPlayRegisteredMontage.js.map