"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbActionInfo = undefined;
const ActionReadHelper_1 = require("./ActionReadHelper");
class FbActionInfo {
  constructor(t) {
    this.FbDataInternal = t;
    this.x_h = false;
    this.FGi = undefined;
    this.R_h = false;
    this.w_h = false;
    this.P_h = false;
    this.U_h = undefined;
    this.D_h = false;
    this.B_h = 0;
    this.q_h = false;
    this.k_h = false;
    this.G_h = false;
    this.O_h = undefined;
    this.Tuh = false;
    this.buh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbActionInfo(t);
    }
  }
  get Name() {
    if (!this.x_h) {
      this.x_h = true;
      this.FGi = this.FbDataInternal.name();
    }
    return this.FGi;
  }
  get Async() {
    if (!this.R_h) {
      this.R_h = true;
      this.w_h = this.FbDataInternal.async();
    }
    return this.w_h;
  }
  get Params() {
    if (!this.P_h) {
      this.P_h = true;
      this.U_h = ActionReadHelper_1.ActionReadHelper.ReadActionParams(this.FbDataInternal);
    }
    return this.U_h;
  }
  get ActionId() {
    if (!this.D_h) {
      this.D_h = true;
      this.B_h = this.FbDataInternal.actionId();
    }
    return this.B_h;
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get ActionGuid() {
    if (!this.G_h) {
      this.G_h = true;
      this.O_h = this.FbDataInternal.actionGuid();
    }
    return this.O_h;
  }
  get Timeout() {
    if (!this.Tuh) {
      this.Tuh = true;
      this.buh = this.FbDataInternal.timeout();
    }
    return this.buh;
  }
}
exports.FbActionInfo = FbActionInfo;
//# sourceMappingURL=FbActionInfo.js.map