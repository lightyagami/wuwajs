"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbItemLockingConfig = undefined;
class FbItemLockingConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.xEh = false;
    this.REh = undefined;
    this.$Fh = false;
    this.XFh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbItemLockingConfig(t);
    }
  }
  get EffectPath() {
    if (!this.xEh) {
      this.xEh = true;
      this.REh = this.FbDataInternal.effectPath();
    }
    return this.REh;
  }
  get TeleControlPerform() {
    if (!this.$Fh) {
      this.$Fh = true;
      this.XFh = this.FbDataInternal.teleControlPerform();
    }
    return this.XFh;
  }
}
exports.FbItemLockingConfig = FbItemLockingConfig;
//# sourceMappingURL=FbItemLockingConfig.js.map