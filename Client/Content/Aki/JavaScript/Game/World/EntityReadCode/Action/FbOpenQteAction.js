"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbOpenQteAction = undefined;
const UnionOpenQteConfigHelper_1 = require("./UnionOpenQteConfigHelper");
class FbOpenQteAction {
  constructor(e) {
    this.FbDataInternal = e;
    this.bSh = false;
    this.TAe = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbOpenQteAction(e);
    }
  }
  get Config() {
    var e;
    var t;
    if (!this.bSh && (this.bSh = true, e = this.FbDataInternal.configType(), t = UnionOpenQteConfigHelper_1.UnionOpenQteConfigHelper.GetUnionOpenQteConfigObject(e))) {
      this.TAe = UnionOpenQteConfigHelper_1.UnionOpenQteConfigHelper.ReadUnionOpenQteConfig(e, this.FbDataInternal.config(t));
    }
    return this.TAe;
  }
}
exports.FbOpenQteAction = FbOpenQteAction;
//# sourceMappingURL=FbOpenQteAction.js.map