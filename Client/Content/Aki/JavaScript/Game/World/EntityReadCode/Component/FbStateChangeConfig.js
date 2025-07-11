"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbStateChangeConfig = undefined;
class FbStateChangeConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.TBh = false;
    this.bBh = undefined;
    this.LBh = false;
    this.ABh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbStateChangeConfig(t);
    }
  }
  get RefreshState() {
    if (!this.TBh) {
      this.TBh = true;
      this.bBh = this.FbDataInternal.refreshState();
    }
    return this.bBh;
  }
  get SubDestroyState() {
    if (!this.LBh) {
      this.LBh = true;
      this.ABh = this.FbDataInternal.subDestroyState();
    }
    return this.ABh;
  }
}
exports.FbStateChangeConfig = FbStateChangeConfig;
//# sourceMappingURL=FbStateChangeConfig.js.map