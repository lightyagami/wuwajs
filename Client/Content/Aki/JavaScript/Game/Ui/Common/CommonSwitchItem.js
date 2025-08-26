"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonSwitchItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../Base/UiPanelBase");
class CommonSwitchItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.P61 = undefined;
    this.Yai = t => {
      this.P61?.(t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.Yai]];
  }
  OnStart() {
    this.GetExtendToggle(0).SetToggleGroup(undefined);
  }
  SetToggleState(t) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleStateForce(t, false);
  }
  SetOnStateChangedCallback(t) {
    this.P61 = t;
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (t && !(t.length <= 0) && t[0] === "SwitchItem") {
      var t = this.GetExtendToggle(0).GetRootComponent();
      var e = this.GetRootItem();
      if (t && e) {
        return [t, e];
      }
    }
  }
}
exports.CommonSwitchItem = CommonSwitchItem;
//# sourceMappingURL=CommonSwitchItem.js.map