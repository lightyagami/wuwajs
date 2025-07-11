"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbUnLockCookSystemItem = undefined;
const UnionUnlockCookSystemOptionHelper_1 = require("./UnionUnlockCookSystemOptionHelper");
class FbUnLockCookSystemItem {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.eyh = false;
    this.tyh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbUnLockCookSystemItem(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get UnlockOption() {
    var t;
    var o;
    if (!this.eyh && (this.eyh = true, t = this.FbDataInternal.unlockOptionType(), o = UnionUnlockCookSystemOptionHelper_1.UnionUnlockCookSystemOptionHelper.GetUnionUnlockCookSystemOptionObject(t))) {
      this.tyh = UnionUnlockCookSystemOptionHelper_1.UnionUnlockCookSystemOptionHelper.ReadUnionUnlockCookSystemOption(t, this.FbDataInternal.unlockOption(o));
    }
    return this.tyh;
  }
}
exports.FbUnLockCookSystemItem = FbUnLockCookSystemItem;
//# sourceMappingURL=FbUnLockCookSystemItem.js.map