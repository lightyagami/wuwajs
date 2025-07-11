"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbItemConfig = undefined;
class FbItemConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.auh = false;
    this.huh = 0;
    this.luh = false;
    this.v4i = 0;
  }
  static Create(t) {
    if (t) {
      return new FbItemConfig(t);
    }
  }
  get ItemId() {
    if (!this.auh) {
      this.auh = true;
      this.huh = this.FbDataInternal.itemId();
    }
    return this.huh;
  }
  get Count() {
    if (!this.luh) {
      this.luh = true;
      this.v4i = this.FbDataInternal.count();
    }
    return this.v4i;
  }
}
exports.FbItemConfig = FbItemConfig;
//# sourceMappingURL=FbItemConfig.js.map