"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyPresetDecorationItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class MotorcycleDiyPresetDecorationItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [3, UE.UITexture], [2, UE.UIItem], [4, UE.UIItem], [5, UE.UISprite]];
  }
  Refresh(e, r, t) {
    var i = this.GetExtendToggle(0);
    var s = this.GetTexture(1);
    var o = this.GetTexture(3);
    var a = this.GetItem(2);
    var n = this.GetItem(4);
    var c = this.GetSprite(5);
    i.SetToggleState(2);
    s.SetUIActive(false);
    a.SetUIActive(false);
    n.SetUIActive(false);
    c.SetUIActive(false);
    var i = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorDecorationPartConfig(e.Part);
    this.SetTextureByPath(i.Icon, o);
    if (e.ItemId <= 0) {
      n.SetUIActive(true);
    } else {
      i = (a = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorDecorationConfig(e.ItemId)).QualityId;
      o = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorQualityConfig(i);
      s.SetUIActive(true);
      c.SetUIActive(true);
      this.SetSpriteByPath(o.Path, c, false);
      this.SetTextureByPath(a.Icon, s);
    }
  }
}
exports.MotorcycleDiyPresetDecorationItem = MotorcycleDiyPresetDecorationItem;
//# sourceMappingURL=MotorcycleDiyPresetDecorationItem.js.map