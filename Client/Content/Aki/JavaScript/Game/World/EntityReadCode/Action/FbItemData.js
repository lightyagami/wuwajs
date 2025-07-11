"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbItemData = undefined;
class FbItemData {
  constructor(t) {
    this.FbDataInternal = t;
    this.auh = false;
    this.huh = 0;
    this.luh = false;
    this.v4i = 0;
  }
  static Create(t) {
    if (t) {
      return new FbItemData(t);
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
exports.FbItemData = FbItemData;
//# sourceMappingURL=FbItemData.js.map