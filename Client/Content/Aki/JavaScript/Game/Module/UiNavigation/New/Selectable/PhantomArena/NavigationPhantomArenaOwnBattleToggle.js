"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.NavigationPhantomArenaOwnBattleToggle = void 0;
const UiManager_1 = require("../../../../../Ui/UiManager"),
  NavigationButton_1 = require("../NavigationButton");
class NavigationPhantomArenaOwnBattleToggle extends NavigationButton_1.NavigationButton {
  constructor() {
    super(...arguments), this.ProxyInternal = void 0
  }
  get Proxy() {
    var t;
    return this.ProxyInternal || (t = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView"), this.ProxyInternal = t?.OpenParam), this.ProxyInternal
  }
  OnButtonClick() {}
  OnCheckFindOpposite(t) {
    return !this.Proxy || !this.Proxy.SkillTriggerMask.IsInSkillInteract || this.IsInSkillInteract
  }
  OnNotifyFocusListener(t) {
    var i = Number(this.ParamList[0]);
    this.Proxy && !t && (this.Proxy.GamepadLogic.HideCardTips(), this.Proxy.GamepadLogic.IsInHandCardSelectState ? this.Proxy.GamepadLogic.MoveHandCardToFunctional(i) : this.Proxy.GamepadLogic.IsInBattleCardSelectState && this.Proxy.GamepadLogic.MoveBattleCardToFunctional(i))
  }
  async TriggerSelectCard() {
    var t = Number(this.ParamList[0]);
    return !!this.Proxy && this.Proxy.GamepadLogic.SelectBattleCard(t)
  }
  SwitchBattleCardTips() {
    var t;
    this.Proxy && (t = Number(this.ParamList[0]), this.Proxy.GamepadLogic.SwitchOwnBattleCardTips(t))
  }
  get IsInSkillInteract() {
    var t;
    return !!this.Proxy && (t = Number(this.ParamList[0]), this.Proxy.GamepadLogic.IsInSkillInteractByOwnIndex(t))
  }
}
exports.NavigationPhantomArenaOwnBattleToggle = NavigationPhantomArenaOwnBattleToggle;
//# sourceMappingURL=NavigationPhantomArenaOwnBattleToggle.js.map