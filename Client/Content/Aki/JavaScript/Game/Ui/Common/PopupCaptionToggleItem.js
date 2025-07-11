"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopupCaptionToggleItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../Base/UiPanelBase");
const LguiUtil_1 = require("../../Module/Util/LguiUtil");
class PopupCaptionToggleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnClickToggleCallback = e => {};
    this.kqe = e => {
      this.OnClickToggleCallback(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  SetClickToggleCallback(e) {
    this.OnClickToggleCallback = e;
  }
  SetNameText(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e);
  }
  GetToggleState() {
    return this.GetExtendToggle(0).ToggleState;
  }
}
exports.PopupCaptionToggleItem = PopupCaptionToggleItem;
//# sourceMappingURL=PopupCaptionToggleItem.js.map