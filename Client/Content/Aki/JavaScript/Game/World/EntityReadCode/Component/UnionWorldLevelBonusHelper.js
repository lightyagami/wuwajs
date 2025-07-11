"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionWorldLevelBonusHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbAreaBouns_1 = require("./FbAreaBouns");
const FbWorldLevelTable_1 = require("./FbWorldLevelTable");
class UnionWorldLevelBonusHelper {
  static GetUnionWorldLevelBonusObject(e) {
    switch (e) {
      case fb_component_1.UnionWorldLevelBonus.AreaBouns:
        return new fb_component_1.AreaBouns();
      case fb_component_1.UnionWorldLevelBonus.WorldLevelTable:
        return new fb_component_1.WorldLevelTable();
      default:
        return;
    }
  }
  static ReadUnionWorldLevelBonus(e, o) {
    if (o !== undefined) {
      switch (e) {
        case fb_component_1.UnionWorldLevelBonus.AreaBouns:
          return FbAreaBouns_1.FbAreaBouns.Create(o);
        case fb_component_1.UnionWorldLevelBonus.WorldLevelTable:
          return FbWorldLevelTable_1.FbWorldLevelTable.Create(o);
        default:
          return;
      }
    }
  }
}
exports.UnionWorldLevelBonusHelper = UnionWorldLevelBonusHelper;
//# sourceMappingURL=UnionWorldLevelBonusHelper.js.map