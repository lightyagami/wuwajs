"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationPhantomArenaCardToggle = undefined;
const UiManager_1 = require("../../../../../Ui/UiManager");
const NavigationButton_1 = require("../NavigationButton");
class NavigationPhantomArenaCardToggle extends NavigationButton_1.NavigationButton {
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
  OnNotifyFocusListener(t) {
    if (this.Proxy && !t) {
      this.Proxy.GamepadLogic.HideCardTips();
    }
  }
}
exports.NavigationPhantomArenaCardToggle = NavigationPhantomArenaCardToggle;
//# sourceMappingURL=NavigationPhantomArenaCardToggle.js.map