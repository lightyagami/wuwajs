"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRemainStarWarning = undefined;
class FbRemainStarWarning {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.hyh = false;
    this.lyh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbRemainStarWarning(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get WarningText() {
    if (!this.hyh) {
      this.hyh = true;
      this.lyh = this.FbDataInternal.warningText();
    }
    return this.lyh;
  }
}
exports.FbRemainStarWarning = FbRemainStarWarning;
//# sourceMappingURL=FbRemainStarWarning.js.map