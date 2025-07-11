"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNpcUiInteractOnGramophone = undefined;
const FbPlayFlow_1 = require("../Action/FbPlayFlow");
class FbNpcUiInteractOnGramophone {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.K4h = false;
    this.$4h = undefined;
    this.X4h = false;
    this.Y4h = undefined;
    this.C6h = false;
    this.g6h = undefined;
    this.a6h = false;
    this.h6h = undefined;
    this.Z4h = false;
    this.e6h = undefined;
    this.f6h = false;
    this.p6h = undefined;
    this.v6h = false;
    this.y6h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbNpcUiInteractOnGramophone(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get EnterMontage() {
    if (!this.K4h) {
      this.K4h = true;
      this.$4h = this.FbDataInternal.enterMontage();
    }
    return this.$4h;
  }
  get StandByMontage() {
    if (!this.X4h) {
      this.X4h = true;
      this.Y4h = this.FbDataInternal.standByMontage();
    }
    return this.Y4h;
  }
  get SwitchMusicMontage() {
    if (!this.C6h) {
      this.C6h = true;
      this.g6h = this.FbDataInternal.switchMusicMontage();
    }
    return this.g6h;
  }
  get ExitMontage() {
    if (!this.a6h) {
      this.a6h = true;
      this.h6h = this.FbDataInternal.exitMontage();
    }
    return this.h6h;
  }
  get EnterFlow() {
    if (!this.Z4h) {
      this.Z4h = true;
      this.e6h = FbPlayFlow_1.FbPlayFlow.Create(this.FbDataInternal.enterFlow());
    }
    return this.e6h;
  }
  get FailedFlow() {
    if (!this.f6h) {
      this.f6h = true;
      this.p6h = FbPlayFlow_1.FbPlayFlow.Create(this.FbDataInternal.failedFlow());
    }
    return this.p6h;
  }
  get SuccessFlow() {
    if (!this.v6h) {
      this.v6h = true;
      this.y6h = FbPlayFlow_1.FbPlayFlow.Create(this.FbDataInternal.successFlow());
    }
    return this.y6h;
  }
}
exports.FbNpcUiInteractOnGramophone = FbNpcUiInteractOnGramophone;
//# sourceMappingURL=FbNpcUiInteractOnGramophone.js.map