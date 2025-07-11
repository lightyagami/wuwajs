"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSlideRailStart = undefined;
class FbSlideRailStart {
  constructor(t) {
    this.FbDataInternal = t;
    this.Xqc = false;
    this.Yqc = 0;
  }
  static Create(t) {
    if (t) {
      return new FbSlideRailStart(t);
    }
  }
  get RailEntityId() {
    if (!this.Xqc) {
      this.Xqc = true;
      this.Yqc = this.FbDataInternal.railEntityId();
    }
    return this.Yqc;
  }
}
exports.FbSlideRailStart = FbSlideRailStart;
//# sourceMappingURL=FbSlideRailStart.js.map