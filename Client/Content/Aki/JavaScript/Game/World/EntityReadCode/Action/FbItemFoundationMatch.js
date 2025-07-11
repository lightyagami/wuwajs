"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbItemFoundationMatch = undefined;
class FbItemFoundationMatch {
  constructor(t) {
    this.FbDataInternal = t;
    this.yvh = false;
    this.Svh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbItemFoundationMatch(t);
    }
  }
  get MatchEntityId() {
    if (!this.yvh) {
      this.yvh = true;
      this.Svh = this.FbDataInternal.matchEntityId();
    }
    return this.Svh;
  }
}
exports.FbItemFoundationMatch = FbItemFoundationMatch;
//# sourceMappingURL=FbItemFoundationMatch.js.map