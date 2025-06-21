"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.NavigationPhantomArenaOpponentBattleToggle = void 0;
const UiManager_1 = require("../../../../../Ui/UiManager"),
  NavigationButton_1 = require("../NavigationButton");
class NavigationPhantomArenaOpponentBattleToggle extends NavigationButton_1.NavigationButton {
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
    return !this.Proxy || !this.Proxy.GamepadLogic.IsInCardSelectState && (!this.Proxy.SkillTriggerMask.IsInSkillInteract || this.IsInSkillInteract)
  }
  SwitchBattleCardTips() {
    var t;
    this.Proxy && (t = Number(this.ParamList[0]), this.Proxy.GamepadLogic.SwitchOpponentBattleCardTips(t))
  }
  get IsInSkillInteract() {
    var t;
    return !!this.Proxy && (t = Number(this.ParamList[0]), this.Proxy.GamepadLogic.IsInSkillInteractByOpponentIndex(t))
  }
}
exports.NavigationPhantomArenaOpponentBattleToggle = NavigationPhantomArenaOpponentBattleToggle;
//# sourceMappingURL=NavigationPhantomArenaOpponentBattleToggle.js.map