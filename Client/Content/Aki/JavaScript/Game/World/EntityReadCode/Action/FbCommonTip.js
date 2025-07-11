"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCommonTip = undefined;
const UnionCommonTipOptionHelper_1 = require("./UnionCommonTipOptionHelper");
class FbCommonTip {
  constructor(i) {
    this.FbDataInternal = i;
    this.syh = false;
    this.ayh = undefined;
    this.I_h = false;
    this.y6o = 0;
  }
  static Create(i) {
    if (i) {
      return new FbCommonTip(i);
    }
  }
  get TipOption() {
    var i;
    var t;
    if (!this.syh && (this.syh = true, i = this.FbDataInternal.tipOptionType(), t = UnionCommonTipOptionHelper_1.UnionCommonTipOptionHelper.GetUnionCommonTipOptionObject(i))) {
      this.ayh = UnionCommonTipOptionHelper_1.UnionCommonTipOptionHelper.ReadUnionCommonTipOption(i, this.FbDataInternal.tipOption(t));
    }
    return this.ayh;
  }
  get Duration() {
    if (!this.I_h) {
      this.I_h = true;
      this.y6o = this.FbDataInternal.duration();
    }
    return this.y6o;
  }
}
exports.FbCommonTip = FbCommonTip;
//# sourceMappingURL=FbCommonTip.js.map