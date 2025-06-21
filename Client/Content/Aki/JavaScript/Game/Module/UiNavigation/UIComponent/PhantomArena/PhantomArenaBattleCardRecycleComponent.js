"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleCardRecycleComponent = void 0;
const UiManager_1 = require("../../../../Ui/UiManager"),
  LongTimeToTriggerComponent_1 = require("../LongTimeToTriggerComponent");
class PhantomArenaBattleCardRecycleComponent extends LongTimeToTriggerComponent_1.LongTimeToTriggerComponent {
  constructor() {
    super(...arguments), this.ProxyInternal = void 0
  }
  get Proxy() {
    var e;
    return this.ProxyInternal || (e = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView"), this.ProxyInternal = e?.OpenParam), this.ProxyInternal
  }
  ClickButton(e) {
    this.Proxy && this.Proxy.GamepadLogic.TriggerRecycleCard()
  }
  OnRefreshSelfHotKeyState(e) {
    !this.Proxy || !this.Proxy.GamepadLogic.IsInCardSelectState || this.Proxy.IsInPanelInteract && !this.Proxy.IsMainInVisible ? this.SetVisibleMode(2, !1) : this.SetVisibleMode(2, !0)
  }
}
exports.PhantomArenaBattleCardRecycleComponent = PhantomArenaBattleCardRecycleComponent;
//# sourceMappingURL=PhantomArenaBattleCardRecycleComponent.js.map