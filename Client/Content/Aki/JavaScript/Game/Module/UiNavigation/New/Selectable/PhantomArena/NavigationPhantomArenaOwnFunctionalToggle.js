"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.NavigationPhantomArenaOwnFunctionalToggle = void 0;
const UiManager_1 = require("../../../../../Ui/UiManager"),
  NavigationButton_1 = require("../NavigationButton");
class NavigationPhantomArenaOwnFunctionalToggle extends NavigationButton_1.NavigationButton {
  constructor() {
    super(...arguments), this.ProxyInternal = void 0
  }
  get Proxy() {
    var t;
    return this.ProxyInternal || (t = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView"), this.ProxyInternal = t?.OpenParam), this.ProxyInternal
  }
  OnButtonClick() {}
  OnNotifyFocusListener(t) {
    var i = Number(this.ParamList[0]);
    this.Proxy && !t && (this.Proxy.GamepadLogic.HideCardTips(), this.Proxy.GamepadLogic.IsInHandCardSelectState ? this.Proxy.GamepadLogic.MoveHandCardToFunctional(i) : this.Proxy.GamepadLogic.IsInBattleCardSelectState && this.Proxy.GamepadLogic.MoveBattleCardToFunctional(i))
  }
}
exports.NavigationPhantomArenaOwnFunctionalToggle = NavigationPhantomArenaOwnFunctionalToggle;
//# sourceMappingURL=NavigationPhantomArenaOwnFunctionalToggle.js.map