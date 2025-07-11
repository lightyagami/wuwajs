"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaGalStepChosenItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class CiacconaGalStepChosenItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Hea = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture]];
  }
  OnStart() {
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnAfterShow() {
    this.Hea?.PlayLevelSequenceByName("Start");
  }
  Refresh(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Content);
    this.SetTextureByPath(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_PlotReasoningIcon03"), this.GetTexture(1));
  }
}
exports.CiacconaGalStepChosenItem = CiacconaGalStepChosenItem;
//# sourceMappingURL=CiacconaGalStepChosenItem.js.map