"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleCardRecycleComponent = undefined;
const UiManager_1 = require("../../../../Ui/UiManager");
const LongTimeToTriggerComponent_1 = require("../LongTimeToTriggerComponent");
class PhantomArenaBattleCardRecycleComponent extends LongTimeToTriggerComponent_1.LongTimeToTriggerComponent {
  constructor() {
    super(...arguments);
    this.ProxyInternal = undefined;
  }
  get Proxy() {
    var e;
    if (!this.ProxyInternal) {
      e = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView");
      this.ProxyInternal = e?.OpenParam;
    }
    return this.ProxyInternal;
  }
  ClickButton(e) {
    if (this.Proxy) {
      this.Proxy.GamepadLogic.TriggerRecycleCard();
    }
  }
  OnRefreshSelfHotKeyState(e) {
    if (!this.Proxy || !this.Proxy.GamepadLogic.IsInCardSelectState || this.Proxy.IsInPanelInteract && !this.Proxy.IsMainInVisible) {
      this.SetVisibleMode(2, false);
    } else {
      this.SetVisibleMode(2, true);
    }
  }
}
exports.PhantomArenaBattleCardRecycleComponent = PhantomArenaBattleCardRecycleComponent;
//# sourceMappingURL=PhantomArenaBattleCardRecycleComponent.js.map