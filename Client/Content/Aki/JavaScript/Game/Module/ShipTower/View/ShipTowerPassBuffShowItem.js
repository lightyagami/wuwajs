"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerPassBuffShowItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class ShipTowerPassBuffShowItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.fGt = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText]];
  }
  Refresh(e) {
    this.fGt = e;
    var e = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(this.fGt[0].ItemId);
    var r = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(e.QualityId);
    var s = this.GetText(1);
    s?.ShowTextNew(e.Name);
    s?.SetColor(UE.Color.FromHex(r.DropColor));
    this.GetText(2)?.ShowTextNew(e.AttributesDescription);
    this.SetTextureByPath(e.Icon, this.GetTexture(0));
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, "ShipTowerPassBuffShowItem", ["Refresh", this.fGt]);
    }
  }
}
exports.ShipTowerPassBuffShowItem = ShipTowerPassBuffShowItem;
//# sourceMappingURL=ShipTowerPassBuffShowItem.js.map