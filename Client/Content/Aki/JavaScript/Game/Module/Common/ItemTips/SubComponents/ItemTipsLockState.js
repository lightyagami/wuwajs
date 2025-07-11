"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemTipsLockState = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class ItemTipsLockState extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.HelpBtnCallback = undefined;
    this.PanelData = undefined;
    this.mji = () => {
      this.HelpBtnCallback?.();
    };
  }
  async Init(t) {
    await this.CreateThenShowByActorAsync(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.mji]];
  }
  UpdateData(t) {
    this.PanelData = t;
    this.GetSprite(0).SetUIActive(!!t?.IsShowLockIcon);
    var i = t?.TipsTextKey ?? "GenericPrompt_Short_TipsText";
    var e = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, i, t?.TipsTextParams);
    this.GetButton(2).RootUIComp.SetUIActive(!!t?.IsShowHelpButton);
    this.SetActive(true);
  }
}
exports.ItemTipsLockState = ItemTipsLockState;
//# sourceMappingURL=ItemTipsLockState.js.map