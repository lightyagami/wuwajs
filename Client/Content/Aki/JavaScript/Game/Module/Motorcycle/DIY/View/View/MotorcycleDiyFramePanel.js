"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyFramePanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
class MotorcycleDiyFramePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Byf = () => {
      ModelManager_1.ModelManager.MotorcycleDiyModel.ResetSelectedItemInfo();
      UiManager_1.UiManager.OpenView("MotorcycleDiyRootView", {
        OpenTabView: "MotorcycleDiyFrameTabView",
        PartTabIndex: 1,
        IsNeedResetMotor: true
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UITexture], [3, UE.UITexture], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Byf]];
  }
  Refresh(e) {
    e = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorFrameConfig(e);
    this.SetTextureByPath(e.ModelIconPath, this.GetTexture(2));
    this.GetItem(4).SetUIActive(ModelManager_1.ModelManager.MotorcycleDiyModel.RedDotHasNewFrame());
  }
}
exports.MotorcycleDiyFramePanel = MotorcycleDiyFramePanel;
//# sourceMappingURL=MotorcycleDiyFramePanel.js.map