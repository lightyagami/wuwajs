"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbJigsawItem = undefined;
const UnionFillConfigHelper_1 = require("./UnionFillConfigHelper");
class FbJigsawItem {
  constructor(i) {
    this.FbDataInternal = i;
    this.q_h = false;
    this.k_h = false;
    this.eNh = false;
    this.tNh = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbJigsawItem(i);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get FillCfg() {
    var i;
    var t;
    if (!this.eNh && (this.eNh = true, i = this.FbDataInternal.fillCfgType(), t = UnionFillConfigHelper_1.UnionFillConfigHelper.GetUnionFillConfigObject(i))) {
      this.tNh = UnionFillConfigHelper_1.UnionFillConfigHelper.ReadUnionFillConfig(i, this.FbDataInternal.fillCfg(t));
    }
    return this.tNh;
  }
}
exports.FbJigsawItem = FbJigsawItem;
//# sourceMappingURL=FbJigsawItem.js.map