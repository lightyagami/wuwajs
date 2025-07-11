"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPunishReport = undefined;
class FbPunishReport {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.gyh = false;
    this.fyh = undefined;
    this.pyh = false;
    this.vyh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPunishReport(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get MainText() {
    if (!this.gyh) {
      this.gyh = true;
      this.fyh = this.FbDataInternal.mainText();
    }
    return this.fyh;
  }
  get SubText() {
    if (!this.pyh) {
      this.pyh = true;
      this.vyh = this.FbDataInternal.subText();
    }
    return this.vyh;
  }
}
exports.FbPunishReport = FbPunishReport;
//# sourceMappingURL=FbPunishReport.js.map