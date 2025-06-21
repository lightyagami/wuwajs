"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbSlideRailStart = void 0;
class FbSlideRailStart {
  constructor(t) {
    this.FbDataInternal = t, this.Xqc = !1, this.Yqc = 0
  }
  static Create(t) {
    if (t) return new FbSlideRailStart(t)
  }
  get RailEntityId() {
    return this.Xqc || (this.Xqc = !0, this.Yqc = this.FbDataInternal.railEntityId()), this.Yqc
  }
}
exports.FbSlideRailStart = FbSlideRailStart;
//# sourceMappingURL=FbSlideRailStart.js.map