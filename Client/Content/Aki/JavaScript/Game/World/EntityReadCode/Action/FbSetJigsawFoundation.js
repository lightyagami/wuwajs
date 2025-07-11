"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetJigsawFoundation = undefined;
const UnionSetJigsawFoundationHelper_1 = require("./UnionSetJigsawFoundationHelper");
class FbSetJigsawFoundation {
  constructor(t) {
    this.FbDataInternal = t;
    this.bSh = false;
    this.TAe = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSetJigsawFoundation(t);
    }
  }
  get Config() {
    var t;
    var i;
    if (!this.bSh && (this.bSh = true, t = this.FbDataInternal.configType(), i = UnionSetJigsawFoundationHelper_1.UnionSetJigsawFoundationHelper.GetUnionSetJigsawFoundationObject(t))) {
      this.TAe = UnionSetJigsawFoundationHelper_1.UnionSetJigsawFoundationHelper.ReadUnionSetJigsawFoundation(t, this.FbDataInternal.config(i));
    }
    return this.TAe;
  }
}
exports.FbSetJigsawFoundation = FbSetJigsawFoundation;
//# sourceMappingURL=FbSetJigsawFoundation.js.map