"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetJigsawItem = undefined;
const UnionSetJigsawItemHelper_1 = require("./UnionSetJigsawItemHelper");
class FbSetJigsawItem {
  constructor(e) {
    this.FbDataInternal = e;
    this.bSh = false;
    this.TAe = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbSetJigsawItem(e);
    }
  }
  get Config() {
    var e;
    var t;
    if (!this.bSh && (this.bSh = true, e = this.FbDataInternal.configType(), t = UnionSetJigsawItemHelper_1.UnionSetJigsawItemHelper.GetUnionSetJigsawItemObject(e))) {
      this.TAe = UnionSetJigsawItemHelper_1.UnionSetJigsawItemHelper.ReadUnionSetJigsawItem(e, this.FbDataInternal.config(t));
    }
    return this.TAe;
  }
}
exports.FbSetJigsawItem = FbSetJigsawItem;
//# sourceMappingURL=FbSetJigsawItem.js.map