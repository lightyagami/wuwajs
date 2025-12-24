"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionSettlementTips = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GenericPromptFloatTipsBase_1 = require("./GenericPromptFloatTipsBase");
class VisionSettlementTips extends GenericPromptFloatTipsBase_1.GenericPromptFloatTipsBase {
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos.push([3, UE.UITexture]);
    this.ComponentRegisterInfos.push([2, UE.UITexture]);
  }
  OnStart() {
    super.OnStart();
    var e;
    var t = this.OpenParam;
    if (t) {
      e = t.IsHard ? "T_VisionSettlementIcon2" : "T_VisionSettlementIcon1";
      t = t.IsHard ? "T_VisionSettlementIcon2Bg" : "T_VisionSettlementIcon1Bg";
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e) ?? "";
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t) ?? "";
      this.SetTextureByPath(e, this.GetTexture(3));
      this.SetTextureByPath(t, this.GetTexture(2));
    }
  }
}
exports.VisionSettlementTips = VisionSettlementTips;
//# sourceMappingURL=VisionSettlementTips.js.map