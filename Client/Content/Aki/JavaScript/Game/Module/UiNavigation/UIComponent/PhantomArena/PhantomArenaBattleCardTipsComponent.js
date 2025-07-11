"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleCardTipsComponent = undefined;
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const PhantomArenaBattleComponentBase_1 = require("./PhantomArenaBattleComponentBase");
class PhantomArenaBattleCardTipsComponent extends PhantomArenaBattleComponentBase_1.PhantomArenaBattleComponentBase {
  OnPress() {
    var e = ControllerHolder_1.ControllerHolder.UiNavigationNewController.GetCurrentNavigationFocusListener()?.GetNavigationComponent();
    if (e) {
      if (e.GetType() === "PhantomArenaOwnHandToggle") {
        this.SwitchHandCardTips(e);
      } else if (e.GetType() === "PhantomArenaOwnBattleToggle") {
        this.SwitchOwnBattleCardTips(e);
      } else if (e.GetType() === "PhantomArenaOpponentBattleToggle") {
        this.SwitchOpponentBattleCardTips(e);
      }
    }
  }
  OnRefreshSelfHotKeyStateImplement() {
    if (!this.Proxy || this.Proxy.GamepadLogic.IsInCardSelectState) {
      this.SetVisibleMode(2, false);
    } else {
      this.SetVisibleMode(2, true);
    }
  }
  OnRefreshSelfHotKeyStateIsMainInVisible() {
    this.SetVisibleMode(2, true);
  }
  SwitchHandCardTips(e) {
    e.SwitchHandCardTips();
  }
  SwitchOwnBattleCardTips(e) {
    e.SwitchBattleCardTips();
  }
  SwitchOpponentBattleCardTips(e) {
    e.SwitchBattleCardTips();
  }
}
exports.PhantomArenaBattleCardTipsComponent = PhantomArenaBattleCardTipsComponent;
//# sourceMappingURL=PhantomArenaBattleCardTipsComponent.js.map