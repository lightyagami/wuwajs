"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleCardSelectComponent = void 0;
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  PhantomArenaDefine_1 = require("../../../PhantomArena/Battle/PhantomArenaDefine"),
  UiNavigationViewManager_1 = require("../../New/UiNavigationViewManager"),
  PhantomArenaBattleComponentBase_1 = require("./PhantomArenaBattleComponentBase");
class PhantomArenaBattleCardSelectComponent extends PhantomArenaBattleComponentBase_1.PhantomArenaBattleComponentBase {
  OnPress() {
    var e;
    this.Proxy && (this.Proxy.GamepadLogic.IsInCardSelectState ? this.efu() : (e = ControllerHolder_1.ControllerHolder.UiNavigationNewController.GetCurrentNavigationFocusListener()?.GetNavigationComponent()) && ("PhantomArenaOwnHandToggle" === e.GetType() ? this.Suu(e) : "PhantomArenaOwnBattleToggle" === e.GetType() && this.Muu(e)))
  }
  async efu() {
    var e = this.Proxy.GamepadLogic.SelectedCard.Data.Index,
      a = this.Proxy.GamepadLogic.HandIndex,
      t = await this.Proxy.GamepadLogic.PutDownCardToFunctional();
    UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey(), t || (e !== PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX ? (t = this.Zmu(e), ControllerHolder_1.ControllerHolder.UiNavigationNewController.SwitchNavigationFocus(t)) : -1 !== a && (e = this.Ufu(a), ControllerHolder_1.ControllerHolder.UiNavigationNewController.SwitchNavigationFocus(e)))
  }
  async Suu(e) {
    ModelManager_1.ModelManager.UiNavigationModel?.RepeatMove(), await e.TriggerSelectCard() && (e = this.Zmu(0), ControllerHolder_1.ControllerHolder.UiNavigationNewController.SwitchNavigationFocus(e))
  }
  async Muu(e) {
    ModelManager_1.ModelManager.UiNavigationModel?.RepeatMove(), await e.TriggerSelectCard(), UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey()
  }
  Zmu(e) {
    var a = ControllerHolder_1.ControllerHolder.UiNavigationNewController.GetCurrentNavigationFocusListener()?.GetNavigationGroup();
    if (a) {
      var t = [];
      for (const n of a.ListenerList) "PhantomArenaOwnBattleToggle" === n.GetNavigationComponent().GetType() && t.push(n);
      return t[e]
    }
  }
  Ufu(e) {
    var a = ControllerHolder_1.ControllerHolder.UiNavigationNewController.GetCurrentNavigationFocusListener()?.GetNavigationGroup();
    if (a) {
      var t = [];
      for (const n of a.ListenerList) "PhantomArenaOwnHandToggle" === n.GetNavigationComponent().GetType() && t.push(n);
      return t[e]
    }
  }
}
exports.PhantomArenaBattleCardSelectComponent = PhantomArenaBattleCardSelectComponent;
//# sourceMappingURL=PhantomArenaBattleCardSelectComponent.js.map