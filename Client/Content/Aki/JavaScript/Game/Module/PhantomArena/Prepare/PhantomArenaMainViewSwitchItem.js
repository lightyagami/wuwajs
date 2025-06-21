"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaMainViewSwitchItem = void 0;
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class PhantomArenaMainViewSwitchItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.e61 = void 0, this.Yai = e => {
      this.e61?.(e)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText]
    ], this.BtnBindInfo = [
      [0, this.Yai]
    ]
  }
  OnStart() {
    this.GetExtendToggle(0).SetToggleGroup(void 0)
  }
  SetToggleState(e) {
    e = e ? 1 : 0;
    this.GetExtendToggle(0).SetToggleStateForce(e, !1)
  }
  SetOnStateChangedCallback(e) {
    this.e61 = e
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e && !(e.length <= 0) && "SwitchItem" === e[0]) {
      var e = this.GetExtendToggle(0).GetRootComponent(),
        t = this.GetRootItem();
      if (e && t) return [e, t]
    }
  }
}
exports.PhantomArenaMainViewSwitchItem = PhantomArenaMainViewSwitchItem;
//# sourceMappingURL=PhantomArenaMainViewSwitchItem.js.map