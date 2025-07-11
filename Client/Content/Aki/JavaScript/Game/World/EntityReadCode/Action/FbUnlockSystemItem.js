"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbUnlockSystemItem = undefined;
const UnionUnlockSystemOptionHelper_1 = require("./UnionUnlockSystemOptionHelper");
class FbUnlockSystemItem {
  constructor(t) {
    this.FbDataInternal = t;
    this.Jvh = false;
    this.Zvh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbUnlockSystemItem(t);
    }
  }
  get SystemOption() {
    var t;
    var e;
    if (!this.Jvh && (this.Jvh = true, t = this.FbDataInternal.systemOptionType(), e = UnionUnlockSystemOptionHelper_1.UnionUnlockSystemOptionHelper.GetUnionUnlockSystemOptionObject(t))) {
      this.Zvh = UnionUnlockSystemOptionHelper_1.UnionUnlockSystemOptionHelper.ReadUnionUnlockSystemOption(t, this.FbDataInternal.systemOption(e));
    }
    return this.Zvh;
  }
}
exports.FbUnlockSystemItem = FbUnlockSystemItem;
//# sourceMappingURL=FbUnlockSystemItem.js.map