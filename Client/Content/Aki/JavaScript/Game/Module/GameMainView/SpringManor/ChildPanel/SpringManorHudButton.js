"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorHudButton = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const InputMultiKeyItem_1 = require("../../../Common/InputKey/InputMultiKeyItem");
class SpringManorHudButton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Qtt = undefined;
    this.ZMe = undefined;
    this.ClickCallBack = undefined;
    this.UFe = () => {
      this.ClickCallBack?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.UFe]];
  }
  async OnBeforeStartAsync() {
    if (!Info_1.Info.IsInTouch()) {
      this.Qtt = new InputMultiKeyItem_1.InputMultiKeyItem(true);
      await this.Qtt.CreateThenShowByResourceIdAsync("UiItem_HotKeyCombine", this.GetItem(2));
      this.Qtt?.RefreshByActionOrAxis({
        ActionOrAxisName: this.ZMe
      });
      this.Qtt.SetUiActive(true);
    }
  }
  SetAction(t) {
    this.ZMe = t;
  }
}
exports.SpringManorHudButton = SpringManorHudButton;
//# sourceMappingURL=SpringManorHudButton.js.map