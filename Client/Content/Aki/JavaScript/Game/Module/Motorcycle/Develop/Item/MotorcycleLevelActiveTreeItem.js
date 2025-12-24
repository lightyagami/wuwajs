"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleLevelActiveTreeItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class MotorcycleLevelActiveTreeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Zuf = () => {
      var e = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCurTreeType();
      UiManager_1.UiManager.OpenView("MotorcycleTechTreeDetailView", e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.Zuf]];
  }
  Refresh() {
    var e = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCurTreeType();
    var e = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechTreeConfig(e);
    this.SetTextureByPath(e.Icon, this.GetTexture(0));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Name);
  }
}
exports.MotorcycleLevelActiveTreeItem = MotorcycleLevelActiveTreeItem;
//# sourceMappingURL=MotorcycleLevelActiveTreeItem.js.map