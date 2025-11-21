"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryItemTipsSideButton = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class HonamiStoryItemTipsSideButton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnClickedCb = undefined;
    this.jYe = () => {
      if (this.OnClickedCb) {
        this.OnClickedCb();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UISprite], [2, UE.UIText]];
    this.BtnBindInfo = [[0, this.jYe]];
  }
  SetSpriteByResourceId(e) {
    e = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(e) ?? "";
    this.SetSpriteByPath(e, this.GetSprite(1), false);
  }
  SetLocalTextNew(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e);
  }
}
exports.HonamiStoryItemTipsSideButton = HonamiStoryItemTipsSideButton;
//# sourceMappingURL=HonamiStoryItemTipsSideButton.js.map