"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbLog = undefined;
class FbLog {
  constructor(t) {
    this.FbDataInternal = t;
    this.Muh = false;
    this.jGi = undefined;
    this.Euh = false;
    this.Iuh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbLog(t);
    }
  }
  get Level() {
    if (!this.Muh) {
      this.Muh = true;
      this.jGi = this.FbDataInternal.level();
    }
    return this.jGi;
  }
  get Content() {
    if (!this.Euh) {
      this.Euh = true;
      this.Iuh = this.FbDataInternal.content();
    }
    return this.Iuh;
  }
}
exports.FbLog = FbLog;
//# sourceMappingURL=FbLog.js.map