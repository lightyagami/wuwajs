"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationPhantomArenaOwnFunctionalToggle = undefined;
const UiManager_1 = require("../../../../../Ui/UiManager");
const NavigationButton_1 = require("../NavigationButton");
class NavigationPhantomArenaOwnFunctionalToggle extends NavigationButton_1.NavigationButton {
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
    var i = Number(this.ParamList[0]);
    if (this.Proxy && !t) {
      this.Proxy.GamepadLogic.HideCardTips();
      if (this.Proxy.GamepadLogic.IsInHandCardSelectState) {
        this.Proxy.GamepadLogic.MoveHandCardToFunctional(i);
      } else if (this.Proxy.GamepadLogic.IsInBattleCardSelectState) {
        this.Proxy.GamepadLogic.MoveBattleCardToFunctional(i);
      }
    }
  }
}
exports.NavigationPhantomArenaOwnFunctionalToggle = NavigationPhantomArenaOwnFunctionalToggle;
//# sourceMappingURL=NavigationPhantomArenaOwnFunctionalToggle.js.map