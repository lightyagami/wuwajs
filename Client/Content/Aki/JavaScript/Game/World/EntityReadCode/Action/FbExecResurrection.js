"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbExecResurrection = undefined;
class FbExecResurrection {
  constructor(e) {
    this.FbDataInternal = e;
    this.m0h = false;
    this.C0h = 0;
  }
  static Create(e) {
    if (e) {
      return new FbExecResurrection(e);
    }
  }
  get ReviveId() {
    if (!this.m0h) {
      this.m0h = true;
      this.C0h = this.FbDataInternal.reviveId();
    }
    return this.C0h;
  }
}
exports.FbExecResurrection = FbExecResurrection;
//# sourceMappingURL=FbExecResurrection.js.map