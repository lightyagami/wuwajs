"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleCardTipsComponent = void 0;
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  PhantomArenaBattleComponentBase_1 = require("./PhantomArenaBattleComponentBase");
class PhantomArenaBattleCardTipsComponent extends PhantomArenaBattleComponentBase_1.PhantomArenaBattleComponentBase {
  OnPress() {
    var e = ControllerHolder_1.ControllerHolder.UiNavigationNewController.GetCurrentNavigationFocusListener()?.GetNavigationComponent();
    e && ("PhantomArenaOwnHandToggle" === e.GetType() ? this.SwitchHandCardTips(e) : "PhantomArenaOwnBattleToggle" === e.GetType() ? this.SwitchOwnBattleCardTips(e) : "PhantomArenaOpponentBattleToggle" === e.GetType() && this.SwitchOpponentBattleCardTips(e))
  }
  OnRefreshSelfHotKeyStateImplement() {
    !this.Proxy || this.Proxy.GamepadLogic.IsInCardSelectState ? this.SetVisibleMode(2, !1) : this.SetVisibleMode(2, !0)
  }
  OnRefreshSelfHotKeyStateIsMainInVisible() {
    this.SetVisibleMode(2, !0)
  }
  SwitchHandCardTips(e) {
    e.SwitchHandCardTips()
  }
  SwitchOwnBattleCardTips(e) {
    e.SwitchBattleCardTips()
  }
  SwitchOpponentBattleCardTips(e) {
    e.SwitchBattleCardTips()
  }
}
exports.PhantomArenaBattleCardTipsComponent = PhantomArenaBattleCardTipsComponent;
//# sourceMappingURL=PhantomArenaBattleCardTipsComponent.js.map