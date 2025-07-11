"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopupCaption = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class PopupCaption extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnCloseCall = undefined;
    this.OnClickCloseBtn = () => {
      this.OnCloseCall?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[3, this.OnClickCloseBtn]];
  }
  SetTitleIcon(e) {
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    this.SetSpriteByPath(e, this.GetSprite(0), false);
  }
  SetTitleLocalTxt(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e);
  }
}
exports.PopupCaption = PopupCaption;
//# sourceMappingURL=PopupCaption.js.map