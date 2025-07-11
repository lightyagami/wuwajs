"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEnableSplineMoveModel = undefined;
const UnionSplineMoveModelHelper_1 = require("./UnionSplineMoveModelHelper");
class FbEnableSplineMoveModel {
  constructor(e) {
    this.FbDataInternal = e;
    this.bSh = false;
    this.TAe = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbEnableSplineMoveModel(e);
    }
  }
  get Config() {
    var e;
    var o;
    if (!this.bSh && (this.bSh = true, e = this.FbDataInternal.configType(), o = UnionSplineMoveModelHelper_1.UnionSplineMoveModelHelper.GetUnionSplineMoveModelObject(e))) {
      this.TAe = UnionSplineMoveModelHelper_1.UnionSplineMoveModelHelper.ReadUnionSplineMoveModel(e, this.FbDataInternal.config(o));
    }
    return this.TAe;
  }
}
exports.FbEnableSplineMoveModel = FbEnableSplineMoveModel;
//# sourceMappingURL=FbEnableSplineMoveModel.js.map