"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerWordItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class ShipTowerWordItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.fGt = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UISprite]];
  }
  Refresh(r) {
    this.fGt = r;
    this.GetText(1).SetText(r.Title);
    if (r.TitleColor) {
      this.GetText(1).SetColor(UE.Color.FromHex(r.TitleColor));
      this.GetSprite(0).SetColor(UE.Color.FromHex(r.TitleColor));
    }
    this.SetSpriteByPath(r.IconPath, this.GetSprite(2), false);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, "ShipTowerWordItem", ["Refresh", this.fGt]);
    }
  }
}
exports.ShipTowerWordItem = ShipTowerWordItem;
//# sourceMappingURL=ShipTowerWordItem.js.map