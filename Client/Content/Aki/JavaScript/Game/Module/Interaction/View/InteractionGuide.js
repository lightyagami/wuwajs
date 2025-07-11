"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractionGuide = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const InteractionDefine_1 = require("../InteractionDefine");
class InteractionGuide extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos.push([0, UE.UIItem], [1, UE.UIText]);
  }
  OnStart() {
    this.SetActive(false);
  }
  OnBeforeDestroy() {}
  Refresh(e) {
    var i = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalText(i, e);
    LguiUtil_1.LguiUtil.ReplaceWildCard(i);
    this.SetActive(true);
  }
  RefreshTextWidth() {
    var e = this.GetText(1);
    if (e?.IsValid() && e.GetWidth() > InteractionDefine_1.INTERACT_GUIDE_MAX_TEXT_WIDTH) {
      e.SetWidth(InteractionDefine_1.INTERACT_GUIDE_MAX_TEXT_WIDTH);
      e.SetOverflowType(1);
    }
  }
}
exports.InteractionGuide = InteractionGuide;
//# sourceMappingURL=InteractionGuide.js.map