"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionOpenQteConfigHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbOpenLevelQte_1 = require("./FbOpenLevelQte");
const FbOpenPanelQteQte_1 = require("./FbOpenPanelQteQte");
class UnionOpenQteConfigHelper {
  static GetUnionOpenQteConfigObject(e) {
    switch (e) {
      case fb_action_1.UnionOpenQteConfig.OpenLevelQte:
        return new fb_action_1.OpenLevelQte();
      case fb_action_1.UnionOpenQteConfig.OpenPanelQteQte:
        return new fb_action_1.OpenPanelQteQte();
      default:
        return;
    }
  }
  static ReadUnionOpenQteConfig(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_action_1.UnionOpenQteConfig.OpenLevelQte:
          return FbOpenLevelQte_1.FbOpenLevelQte.Create(t);
        case fb_action_1.UnionOpenQteConfig.OpenPanelQteQte:
          return FbOpenPanelQteQte_1.FbOpenPanelQteQte.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionOpenQteConfigHelper = UnionOpenQteConfigHelper;
//# sourceMappingURL=UnionOpenQteConfigHelper.js.map