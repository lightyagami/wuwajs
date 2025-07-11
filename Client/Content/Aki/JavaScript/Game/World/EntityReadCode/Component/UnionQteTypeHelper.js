"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionQteTypeHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbSingleBtnQte_1 = require("./FbSingleBtnQte");
class UnionQteTypeHelper {
  static GetUnionQteTypeObject(e) {
    if (e === fb_component_1.UnionQteType.SingleBtnQte) {
      return new fb_component_1.SingleBtnQte();
    }
  }
  static ReadUnionQteType(e, t) {
    if (t !== undefined && e === fb_component_1.UnionQteType.SingleBtnQte) {
      return FbSingleBtnQte_1.FbSingleBtnQte.Create(t);
    } else {
      return undefined;
    }
  }
}
exports.UnionQteTypeHelper = UnionQteTypeHelper;
//# sourceMappingURL=UnionQteTypeHelper.js.map