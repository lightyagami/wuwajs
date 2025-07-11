"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbHeadStyleVoiceOnly = undefined;
class FbHeadStyleVoiceOnly {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Dmh = false;
    this.Bmh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbHeadStyleVoiceOnly(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get WhoId() {
    if (!this.Dmh) {
      this.Dmh = true;
      this.Bmh = this.FbDataInternal.whoId();
    }
    return this.Bmh;
  }
}
exports.FbHeadStyleVoiceOnly = FbHeadStyleVoiceOnly;
//# sourceMappingURL=FbHeadStyleVoiceOnly.js.map