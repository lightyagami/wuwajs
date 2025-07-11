"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNpcSitDown = undefined;
const FbMontageId_1 = require("./FbMontageId");
class FbNpcSitDown {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Rfh = false;
    this.wfh = undefined;
    this.ISh = false;
    this.TSh = 0;
    this.I_h = false;
    this.y6o = 0;
  }
  static Create(t) {
    if (t) {
      return new FbNpcSitDown(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get MontageId() {
    if (!this.Rfh) {
      this.Rfh = true;
      this.wfh = FbMontageId_1.FbMontageId.Create(this.FbDataInternal.montageId());
    }
    return this.wfh;
  }
  get PosEntityId() {
    if (!this.ISh) {
      this.ISh = true;
      this.TSh = this.FbDataInternal.posEntityId();
    }
    return this.TSh;
  }
  get Duration() {
    if (!this.I_h) {
      this.I_h = true;
      this.y6o = this.FbDataInternal.duration();
    }
    return this.y6o;
  }
}
exports.FbNpcSitDown = FbNpcSitDown;
//# sourceMappingURL=FbNpcSitDown.js.map