"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleTechTreeSwitchItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
class MotorcycleTechTreeSwitchItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.OnClickToggleBack = undefined;
    this.Kwg = 0;
    this.Xwg = 0;
    this.jbe = () => {
      if (this.Kwg) {
        this.OnClickToggleBack?.(this.Kwg, this.GetExtendToggle(0));
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIText]];
    this.BtnBindInfo = [[0, this.jbe]];
  }
  OnStart() {
    this.Xwg = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCurTreeType();
    this.GetExtendToggle(0).SetToggleStateForce(0);
  }
  Refresh(t, e, i) {
    var r = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechTreeConfig(t);
    if (r) {
      this.Kwg = t;
      this.SetTextureByPath(r.Icon512, this.GetTexture(1));
      this.GetItem(2).SetUIActive(t === this.Xwg);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), r.Name);
    }
  }
  OnSelected(t) {
    this.jbe();
  }
}
exports.MotorcycleTechTreeSwitchItem = MotorcycleTechTreeSwitchItem;
//# sourceMappingURL=MotorcycleTechTreeSwitchItem.js.map