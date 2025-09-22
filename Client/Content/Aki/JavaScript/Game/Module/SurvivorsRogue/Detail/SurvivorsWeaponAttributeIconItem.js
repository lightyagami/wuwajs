"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsWeaponAttributeIconItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class SurvivorsWeaponAttributeIconItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  Refresh(e, r, t) {
    e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetPropertyConfig(e);
    if (e) {
      this.SetTextureShowUntilLoaded(e.Icon, this.GetTexture(0));
    }
  }
}
exports.SurvivorsWeaponAttributeIconItem = SurvivorsWeaponAttributeIconItem;
//# sourceMappingURL=SurvivorsWeaponAttributeIconItem.js.map