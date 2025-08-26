"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationPhantomArenaOpponentBattleToggle = undefined;
const UiManager_1 = require("../../../../../Ui/UiManager");
const NavigationButton_1 = require("../NavigationButton");
class NavigationPhantomArenaOpponentBattleToggle extends NavigationButton_1.NavigationButton {
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
    return !this.Proxy || !this.Proxy.GamepadLogic.IsInCardSelectState && (!this.Proxy.SkillTriggerMask.IsInSkillInteract || this.IsInSkillInteract);
  }
  SwitchBattleCardTips() {
    var t;
    if (this.Proxy) {
      t = Number(this.ParamList[0]);
      this.Proxy.GamepadLogic.SwitchOpponentBattleCardTips(t);
    }
  }
  get IsInSkillInteract() {
    var t;
    return !!this.Proxy && (t = Number(this.ParamList[0]), this.Proxy.GamepadLogic.IsInSkillInteractByOpponentIndex(t));
  }
}
exports.NavigationPhantomArenaOpponentBattleToggle = NavigationPhantomArenaOpponentBattleToggle;
//# sourceMappingURL=NavigationPhantomArenaOpponentBattleToggle.js.map