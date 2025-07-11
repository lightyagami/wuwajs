"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonAndSpriteItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class ButtonAndSpriteItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.G6e = undefined;
    this.RefreshAllTransitionSprite = () => {
      var e;
      var t = this.GetUiSpriteTransition(2);
      if (t && (e = this.GetSprite(1))) {
        t.SetAllTransitionSprite(e.GetSprite());
      }
    };
    this.eTt = () => {
      if (this.G6e) {
        this.G6e();
      }
    };
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UISprite], [2, UE.UISpriteTransition]];
    this.BtnBindInfo = [[0, this.eTt]];
  }
  RefreshSprite(e) {
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Temp", 43, "realPath:  ", ["realPath", e]);
    }
    this.SetSpriteByPath(e, this.GetSprite(1), false, undefined, this.RefreshAllTransitionSprite);
  }
  RefreshEnable(e) {
    this.GetButton(0).SetSelfInteractive(e);
  }
  BindCallback(e) {
    this.G6e = e;
  }
}
exports.ButtonAndSpriteItem = ButtonAndSpriteItem;
//# sourceMappingURL=ButtonAndSpriteItem.js.map