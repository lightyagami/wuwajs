"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleLvInfoItem = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const MoraleDefine_1 = require("../MoraleDefine");
class MoraleLvInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.JGn = () => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(MoraleDefine_1.MORALE_LV_HELP_ID);
    };
  }
  async Init(e) {
    await this.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIArtText], [1, UE.UIText], [2, UE.UISprite], [3, UE.UIButtonComponent], [4, UE.UIText]];
    this.BtnBindInfo = [[3, this.JGn]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
  }
  UpdateData() {
    var e = ModelManager_1.ModelManager.MoraleBattleModel;
    var r = e.GetMoraleLevel();
    this.GetArtText(0).SetText(r.toString());
    var r = e.GetMoraleCurrentLevelExp();
    var r = r + "/" + e.GetMoraleLevelUpExp();
    this.GetText(1)?.SetText(r);
    var r = e.GetMoraleCurrentExpProgress();
    this.GetSprite(2)?.SetFillAmount(r);
    this.GetText(4)?.ShowTextNew("Morale_title_2");
  }
}
exports.MoraleLvInfoItem = MoraleLvInfoItem;
//# sourceMappingURL=MoraleLvInfoItem.js.map