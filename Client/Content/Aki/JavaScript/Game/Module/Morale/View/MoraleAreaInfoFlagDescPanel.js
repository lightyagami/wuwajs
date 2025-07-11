"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleAreaInfoFlagDescPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class MoraleAreaInfoFlagDescPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Qll = () => {
      this.SetActive(false);
    };
  }
  async Init(e) {
    await this.CreateByActorAsync(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIText]];
    this.BtnBindInfo = [[0, this.Qll]];
  }
  UpdateDesc(e) {
    this.GetText(2)?.ShowTextNew(e);
  }
}
exports.MoraleAreaInfoFlagDescPanel = MoraleAreaInfoFlagDescPanel;
//# sourceMappingURL=MoraleAreaInfoFlagDescPanel.js.map