"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCommonTip2 = undefined;
const UnionCommonTip2OptionHelper_1 = require("./UnionCommonTip2OptionHelper");
class FbCommonTip2 {
  constructor(i) {
    this.FbDataInternal = i;
    this.syh = false;
    this.ayh = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbCommonTip2(i);
    }
  }
  get TipOption() {
    var i;
    var o;
    if (!this.syh && (this.syh = true, i = this.FbDataInternal.tipOptionType(), o = UnionCommonTip2OptionHelper_1.UnionCommonTip2OptionHelper.GetUnionCommonTip2OptionObject(i))) {
      this.ayh = UnionCommonTip2OptionHelper_1.UnionCommonTip2OptionHelper.ReadUnionCommonTip2Option(i, this.FbDataInternal.tipOption(o));
    }
    return this.ayh;
  }
}
exports.FbCommonTip2 = FbCommonTip2;
//# sourceMappingURL=FbCommonTip2.js.map