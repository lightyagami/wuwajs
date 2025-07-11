"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleRoleStarItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class RogueBattleRoleStarItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIItem]];
  }
  OnStart() {
    this.GetSprite(0).SetUIActive(true);
  }
  Refresh(t, e, r) {
    this.GetSprite(1).SetUIActive(t === 1);
    this.GetSprite(2).SetUIActive(t === 2);
    this.GetItem(3).SetUIActive(t === 1);
    this.GetItem(4).SetUIActive(t === 2);
  }
}
exports.RogueBattleRoleStarItem = RogueBattleRoleStarItem;
//# sourceMappingURL=RogueBattleRoleStarItem.js.map