"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationPhantomArenaOwnBattleToggle = undefined;
const UiManager_1 = require("../../../../../Ui/UiManager");
const NavigationButton_1 = require("../NavigationButton");
class NavigationPhantomArenaOwnBattleToggle extends NavigationButton_1.NavigationButton {
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
  OnCheckFindOpposite(t) {
    return !this.Proxy || !this.Proxy.SkillTriggerMask.IsInSkillInteract || this.IsInSkillInteract;
  }
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
  async TriggerSelectCard() {
    var t = Number(this.ParamList[0]);
    return !!this.Proxy && this.Proxy.GamepadLogic.SelectBattleCard(t);
  }
  SwitchBattleCardTips() {
    var t;
    if (this.Proxy) {
      t = Number(this.ParamList[0]);
      this.Proxy.GamepadLogic.SwitchOwnBattleCardTips(t);
    }
  }
  get IsInSkillInteract() {
    var t;
    return !!this.Proxy && (t = Number(this.ParamList[0]), this.Proxy.GamepadLogic.IsInSkillInteractByOwnIndex(t));
  }
}
exports.NavigationPhantomArenaOwnBattleToggle = NavigationPhantomArenaOwnBattleToggle;
//# sourceMappingURL=NavigationPhantomArenaOwnBattleToggle.js.map