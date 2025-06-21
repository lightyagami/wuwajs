"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.NavigationPhantomArenaOpponentFunctionalToggle = void 0;
const UiManager_1 = require("../../../../../Ui/UiManager"),
  NavigationButton_1 = require("../NavigationButton");
class NavigationPhantomArenaOpponentFunctionalToggle extends NavigationButton_1.NavigationButton {
  constructor() {
    super(...arguments), this.ProxyInternal = void 0
  }
  get Proxy() {
    var t;
    return this.ProxyInternal || (t = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView"), this.ProxyInternal = t?.OpenParam), this.ProxyInternal
  }
  OnButtonClick() {}
  OnNotifyFocusListener(t) {
    this.Proxy && !t && this.Proxy.GamepadLogic.HideCardTips()
  }
  OnCheckFindOpposite(t) {
    return !this.Proxy || !this.Proxy.GamepadLogic.IsInCardSelectState
  }
}
exports.NavigationPhantomArenaOpponentFunctionalToggle = NavigationPhantomArenaOpponentFunctionalToggle;
//# sourceMappingURL=NavigationPhantomArenaOpponentFunctionalToggle.js.map