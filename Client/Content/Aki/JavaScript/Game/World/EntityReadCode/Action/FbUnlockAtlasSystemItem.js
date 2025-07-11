"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbUnlockAtlasSystemItem = undefined;
const UnionUnlockAtlasSystemOptionHelper_1 = require("./UnionUnlockAtlasSystemOptionHelper");
class FbUnlockAtlasSystemItem {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.eyh = false;
    this.tyh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbUnlockAtlasSystemItem(t);
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
    var s;
    if (!this.eyh && (this.eyh = true, t = this.FbDataInternal.unlockOptionType(), s = UnionUnlockAtlasSystemOptionHelper_1.UnionUnlockAtlasSystemOptionHelper.GetUnionUnlockAtlasSystemOptionObject(t))) {
      this.tyh = UnionUnlockAtlasSystemOptionHelper_1.UnionUnlockAtlasSystemOptionHelper.ReadUnionUnlockAtlasSystemOption(t, this.FbDataInternal.unlockOption(s));
    }
    return this.tyh;
  }
}
exports.FbUnlockAtlasSystemItem = FbUnlockAtlasSystemItem;
//# sourceMappingURL=FbUnlockAtlasSystemItem.js.map