"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationPhantomArenaOpponentFunctionalToggle = undefined;
const UiManager_1 = require("../../../../../Ui/UiManager");
const NavigationButton_1 = require("../NavigationButton");
class NavigationPhantomArenaOpponentFunctionalToggle extends NavigationButton_1.NavigationButton {
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
  OnNotifyFocusListener(t) {
    if (this.Proxy && !t) {
      this.Proxy.GamepadLogic.HideCardTips();
    }
  }
  OnCheckFindOpposite() {
    return !this.Proxy || !this.Proxy.GamepadLogic.IsInCardSelectState;
  }
}
exports.NavigationPhantomArenaOpponentFunctionalToggle = NavigationPhantomArenaOpponentFunctionalToggle;
//# sourceMappingURL=NavigationPhantomArenaOpponentFunctionalToggle.js.map