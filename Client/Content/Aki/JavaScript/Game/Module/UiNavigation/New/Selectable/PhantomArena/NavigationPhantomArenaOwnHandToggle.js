"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationPhantomArenaOwnHandToggle = undefined;
const UiManager_1 = require("../../../../../Ui/UiManager");
const NavigationButton_1 = require("../NavigationButton");
class NavigationPhantomArenaOwnHandToggle extends NavigationButton_1.NavigationButton {
  constructor() {
    super(...arguments);
    this.ProxyInternal = undefined;
  }
  get Proxy() {
    var t;
    if (!this.ProxyInternal) {
      t = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView");
      this.ProxyInternal = t?.OpenParam;
    }
    return this.ProxyInternal;
  }
  OnButtonClick() {}
  OnCheckFindOpposite() {
    return !this.Proxy || !this.Proxy.GamepadLogic.IsInCardSelectState;
  }
  OnNotifyFocusListener(t) {
    if (this.Proxy && !t) {
      this.Proxy.GamepadLogic.HideCardTips();
    }
  }
  w7c() {
    return this.PanelHandle.GetNavigationListenerListByType("PhantomArenaOwnHandToggle").indexOf(this.Listener);
  }
  async TriggerSelectCard() {
    var t;
    return !!this.Proxy && (t = this.w7c(), this.Proxy.GamepadLogic.SelectHandCard(t));
  }
  SwitchHandCardTips() {
    var t;
    if (this.Proxy) {
      t = this.w7c();
      this.Proxy.GamepadLogic.SwitchHandCardTips(t);
    }
  }
}
exports.NavigationPhantomArenaOwnHandToggle = NavigationPhantomArenaOwnHandToggle;
//# sourceMappingURL=NavigationPhantomArenaOwnHandToggle.js.map