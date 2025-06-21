"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.NavigationPhantomArenaOwnHandToggle = void 0;
const UiManager_1 = require("../../../../../Ui/UiManager"),
  NavigationButton_1 = require("../NavigationButton");
class NavigationPhantomArenaOwnHandToggle extends NavigationButton_1.NavigationButton {
  constructor() {
    super(...arguments), this.ProxyInternal = void 0
  }
  get Proxy() {
    var t;
    return this.ProxyInternal || (t = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView"), this.ProxyInternal = t?.OpenParam), this.ProxyInternal
  }
  OnButtonClick() {}
  OnCheckFindOpposite(t) {
    return !this.Proxy || !this.Proxy.GamepadLogic.IsInCardSelectState
  }
  OnNotifyFocusListener(t) {
    this.Proxy && !t && this.Proxy.GamepadLogic.HideCardTips()
  }
  yuu() {
    return this.PanelHandle.GetNavigationListenerListByType("PhantomArenaOwnHandToggle").indexOf(this.Listener)
  }
  async TriggerSelectCard() {
    var t;
    return !!this.Proxy && (t = this.yuu(), this.Proxy.GamepadLogic.SelectHandCard(t))
  }
  SwitchHandCardTips() {
    var t;
    this.Proxy && (t = this.yuu(), this.Proxy.GamepadLogic.SwitchHandCardTips(t))
  }
}
exports.NavigationPhantomArenaOwnHandToggle = NavigationPhantomArenaOwnHandToggle;
//# sourceMappingURL=NavigationPhantomArenaOwnHandToggle.js.map