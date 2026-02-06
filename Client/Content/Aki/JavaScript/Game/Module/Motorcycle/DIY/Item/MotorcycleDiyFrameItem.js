"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyFrameItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class MotorcycleDiyFrameItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.iEg = 0;
    this.OnClickToggleBack = undefined;
    this.jbe = () => {
      if (this.iEg) {
        this.OnClickToggleBack?.(this.iEg, this.GetExtendToggle(0), this.GetItem(6));
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem]];
    this.BtnBindInfo = [[0, this.jbe]];
  }
  Refresh(e, t, s) {
    this.iEg = e.ItemId;
    var r = this.GetTexture(1);
    var i = this.GetTexture(2);
    var a = this.GetTexture(3);
    var o = this.GetItem(4);
    var h = this.GetItem(5);
    var n = this.GetItem(6);
    var c = this.GetItem(7);
    o.SetUIActive(false);
    h.SetUIActive(false);
    n.SetUIActive(false);
    c.SetUIActive(false);
    var M = ModelManager_1.ModelManager.MotorcycleDiyModel.GetFrameState(e.ItemId);
    switch (M) {
      case 2:
      case 0:
        break;
      case 3:
        h.SetUIActive(true);
        break;
      case 4:
        c.SetUIActive(true);
        break;
      case 1:
        o.SetUIActive(true);
    }
    n.SetUIActive(ModelManager_1.ModelManager.MotorcycleDiyModel.RedDotHasNewItem(e.ItemId));
    M = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorFrameConfig(e.ItemId);
    n = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorQualityConfig(M.QualityId);
    this.SetTextureByPath(M.ModelIconPath, r);
    this.SetTextureByPath(n.FramePath, i);
    this.SetTextureByPath(n.FrameShinePath, a);
    M = ModelManager_1.ModelManager.MotorcycleDiyModel.GetSelectedFrameId();
    r = M === e.ItemId ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(r, false);
  }
  OnSelected() {
    this.jbe();
  }
}
exports.MotorcycleDiyFrameItem = MotorcycleDiyFrameItem;
//# sourceMappingURL=MotorcycleDiyFrameItem.js.map