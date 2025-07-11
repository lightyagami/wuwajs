"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbHideGroup = undefined;
const UnionHideGroupConfigHelper_1 = require("./UnionHideGroupConfigHelper");
class FbHideGroup {
  constructor(i) {
    this.FbDataInternal = i;
    this.sxh = false;
    this.axh = undefined;
    this.JAh = false;
    this.ZAh = undefined;
    this.ixh = false;
    this.rxh = false;
  }
  static Create(i) {
    if (i) {
      return new FbHideGroup(i);
    }
  }
  get GroupKey() {
    if (!this.sxh) {
      this.sxh = true;
      this.axh = this.FbDataInternal.groupKey();
    }
    return this.axh;
  }
  get HideConfig() {
    var i;
    var t;
    if (!this.JAh && (this.JAh = true, i = this.FbDataInternal.hideConfigType(), t = UnionHideGroupConfigHelper_1.UnionHideGroupConfigHelper.GetUnionHideGroupConfigObject(i))) {
      this.ZAh = UnionHideGroupConfigHelper_1.UnionHideGroupConfigHelper.ReadUnionHideGroupConfig(i, this.FbDataInternal.hideConfig(t));
    }
    return this.ZAh;
  }
  get IsHidePasserByNpc() {
    if (!this.ixh) {
      this.ixh = true;
      this.rxh = this.FbDataInternal.isHidePasserByNpc();
    }
    return this.rxh;
  }
}
exports.FbHideGroup = FbHideGroup;
//# sourceMappingURL=FbHideGroup.js.map