"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.NavigationPhantomArenaCardToggle = void 0;
const UiManager_1 = require("../../../../../Ui/UiManager"),
  NavigationButton_1 = require("../NavigationButton");
class NavigationPhantomArenaCardToggle extends NavigationButton_1.NavigationButton {
  constructor() {
    super(...arguments), this.ProxyInternal = void 0
  }
  get Proxy() {
    var t;
    return this.ProxyInternal || (t = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView"), this.ProxyInternal = t?.OpenParam), this.ProxyInternal
  }
  OnNotifyFocusListener(t) {
    this.Proxy && !t && this.Proxy.GamepadLogic.HideCardTips()
  }
}
exports.NavigationPhantomArenaCardToggle = NavigationPhantomArenaCardToggle;
//# sourceMappingURL=NavigationPhantomArenaCardToggle.js.map