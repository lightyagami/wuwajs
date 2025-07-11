"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaMainViewSwitchItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class PhantomArenaMainViewSwitchItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.P61 = undefined;
    this.Yai = e => {
      this.P61?.(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.Yai]];
  }
  OnStart() {
    this.GetExtendToggle(0).SetToggleGroup(undefined);
  }
  SetToggleState(e) {
    e = e ? 1 : 0;
    this.GetExtendToggle(0).SetToggleStateForce(e, false);
  }
  SetOnStateChangedCallback(e) {
    this.P61 = e;
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e && !(e.length <= 0) && e[0] === "SwitchItem") {
      var e = this.GetExtendToggle(0).GetRootComponent();
      var t = this.GetRootItem();
      if (e && t) {
        return [e, t];
      }
    }
  }
}
exports.PhantomArenaMainViewSwitchItem = PhantomArenaMainViewSwitchItem;
//# sourceMappingURL=PhantomArenaMainViewSwitchItem.js.map