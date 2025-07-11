"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckSubLevelStateConfig = undefined;
class FbCheckSubLevelStateConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.N8_ = false;
    this.V8_ = undefined;
    this.j8_ = false;
    this.H8_ = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCheckSubLevelStateConfig(t);
    }
  }
  get SubLevelName() {
    if (!this.N8_) {
      this.N8_ = true;
      this.V8_ = this.FbDataInternal.subLevelName();
    }
    return this.V8_;
  }
  get SubLevelState() {
    if (!this.j8_) {
      this.j8_ = true;
      this.H8_ = this.FbDataInternal.subLevelState();
    }
    return this.H8_;
  }
}
exports.FbCheckSubLevelStateConfig = FbCheckSubLevelStateConfig;
//# sourceMappingURL=FbCheckSubLevelStateConfig.js.map