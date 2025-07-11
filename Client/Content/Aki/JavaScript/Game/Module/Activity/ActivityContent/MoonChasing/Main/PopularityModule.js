"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopularityModule = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class PopularityModule extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UISprite]];
  }
  OnBeforeShow() {
    this.RefreshPopularity();
  }
  RefreshPopularity() {
    var e = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetCurrentPopularityConfig();
    var i = ModelManager_1.ModelManager.MoonChasingModel.GetPopularityValue();
    this.GetText(1)?.SetText("<color=#ffd52b>" + i + "</color>/" + e.PopularityValue);
    this.GetSprite(2).SetFillAmount(i / e.PopularityValue);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.PopularityRating);
  }
}
exports.PopularityModule = PopularityModule;
//# sourceMappingURL=PopularityModule.js.map