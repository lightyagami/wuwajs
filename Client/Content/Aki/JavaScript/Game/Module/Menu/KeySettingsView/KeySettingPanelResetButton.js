"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeySettingPanelResetButton = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class KeySettingPanelResetButton extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem]];
  }
  SetConfirmText(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e);
  }
}
exports.KeySettingPanelResetButton = KeySettingPanelResetButton;
//# sourceMappingURL=KeySettingPanelResetButton.js.map