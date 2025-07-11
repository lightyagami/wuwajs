"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEnableLevelPlayConfig = undefined;
class FbEnableLevelPlayConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.Ryh = false;
    this.wyh = 0;
    this.Jch = false;
    this.l7 = false;
  }
  static Create(t) {
    if (t) {
      return new FbEnableLevelPlayConfig(t);
    }
  }
  get LevelPlayId() {
    if (!this.Ryh) {
      this.Ryh = true;
      this.wyh = this.FbDataInternal.levelPlayId();
    }
    return this.wyh;
  }
  get Enable() {
    if (!this.Jch) {
      this.Jch = true;
      this.l7 = this.FbDataInternal.enable();
    }
    return this.l7;
  }
}
exports.FbEnableLevelPlayConfig = FbEnableLevelPlayConfig;
//# sourceMappingURL=FbEnableLevelPlayConfig.js.map