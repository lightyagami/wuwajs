"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseWaveTipView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GenericPromptFloatTipsBase_1 = require("../../GenericPrompt/View/GenericPromptFloatTipsBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class TowerDefenseWaveTipView extends GenericPromptFloatTipsBase_1.GenericPromptFloatTipsBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    var e = this.OpenParam;
    var e = ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptMainTextObj(e.PromptId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.TextKey ?? "");
  }
}
exports.TowerDefenseWaveTipView = TowerDefenseWaveTipView;
//# sourceMappingURL=TowerDefenceWaveTipView.js.map