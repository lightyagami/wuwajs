"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerBuffShowItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class TowerBuffShowItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super();
    this.sDo = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText]];
  }
  Refresh(e, r, t) {
    this.sDo = e;
    this.Og();
  }
  Og() {
    var e = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerBuffDesc(this.sDo);
    this.GetText(1).SetText(e);
    var e = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerBuffIcon(this.sDo);
    this.SetTextureByPath(e, this.GetTexture(0));
    this.GetTexture(0)?.SetUIActive(true);
  }
}
exports.TowerBuffShowItem = TowerBuffShowItem;
//# sourceMappingURL=TowerBuffShowItem.js.map