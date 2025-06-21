"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleLvInfoItem = void 0;
const UE = require("ue"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  MoraleDefine_1 = require("../MoraleDefine");
class MoraleLvInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.JGn = () => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(MoraleDefine_1.MORALE_LV_HELP_ID)
    }
  }
  async Init(e) {
    await this.CreateThenShowByActorAsync(e.GetOwner())
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIArtText],
      [1, UE.UIText],
      [2, UE.UISprite],
      [3, UE.UIButtonComponent],
      [4, UE.UIText]
    ], this.BtnBindInfo = [
      [3, this.JGn]
    ]
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync()
  }
  UpdateData() {
    var e = ModelManager_1.ModelManager.MoraleBattleModel,
      r = e.GetMoraleLevel(),
      r = (this.GetArtText(0).SetText(r.toString()), e.GetMoraleCurrentLevelExp()),
      r = r + "/" + e.GetMoraleLevelUpExp(),
      r = (this.GetText(1)?.SetText(r), e.GetMoraleCurrentExpProgress());
    this.GetSprite(2)?.SetFillAmount(r), this.GetText(4)?.ShowTextNew("Morale_title_2")
  }
}
exports.MoraleLvInfoItem = MoraleLvInfoItem;
//# sourceMappingURL=MoraleLvInfoItem.js.map