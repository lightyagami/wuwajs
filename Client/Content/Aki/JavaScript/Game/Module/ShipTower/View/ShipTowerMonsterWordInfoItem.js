"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerMonsterWordInfoItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class ShipTowerMonsterWordInfoItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
  }
  Refresh(r) {
    var e = !!r?.IconPath;
    var t = this.GetSprite(1);
    var s = this.GetItem(0);
    if (e) {
      this.SetSpriteByPath(r.IconPath, t, false);
    }
    s.SetUIActive(e);
    this.GetText(2).SetText(r.Desc);
  }
}
exports.ShipTowerMonsterWordInfoItem = ShipTowerMonsterWordInfoItem;
//# sourceMappingURL=ShipTowerMonsterWordInfoItem.js.map