"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyPresetItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class MotorcycleDiyPresetItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.OnClickToggleBack = undefined;
    this.jbe = () => {
      this.OnClickToggleBack?.(this.Pe, this.GetExtendToggle(0));
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText]];
    this.BtnBindInfo = [[0, this.jbe]];
  }
  RefreshSelf(t) {
    this.Pe = t;
  }
  Refresh(t, e, i) {
    this.Pe = t;
    t = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorPresetConfig(t.PresetId);
    if (t) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.Name);
      this.SetTextureByPath(t.Icon, this.GetTexture(1));
    }
  }
  OnSelected() {
    this.jbe();
  }
}
exports.MotorcycleDiyPresetItem = MotorcycleDiyPresetItem;
//# sourceMappingURL=MotorcycleDiyPresetItem.js.map