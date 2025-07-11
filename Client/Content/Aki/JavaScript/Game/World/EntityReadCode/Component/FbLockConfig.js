"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbLockConfig = undefined;
class FbLockConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.eDh = false;
    this.tDh = false;
    this.iDh = false;
    this.rDh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbLockConfig(t);
    }
  }
  get IsInitLock() {
    if (!this.eDh) {
      this.eDh = true;
      this.tDh = this.FbDataInternal.isInitLock();
    }
    return this.tDh;
  }
  get LockType() {
    if (!this.iDh) {
      this.iDh = true;
      this.rDh = this.FbDataInternal.lockType();
    }
    return this.rDh;
  }
}
exports.FbLockConfig = FbLockConfig;
//# sourceMappingURL=FbLockConfig.js.map