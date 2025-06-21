"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleCardCancelComponent = void 0;
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  PhantomArenaDefine_1 = require("../../../PhantomArena/Battle/PhantomArenaDefine"),
  UiNavigationViewManager_1 = require("../../New/UiNavigationViewManager"),
  PhantomArenaBattleComponentBase_1 = require("./PhantomArenaBattleComponentBase");
class PhantomArenaBattleCardCancelComponent extends PhantomArenaBattleComponentBase_1.PhantomArenaBattleComponentBase {
  OnPress() {
    var e, t;
    this.Proxy && (t = this.Proxy.GamepadLogic.SelectedCard.Data.Index, e = this.Proxy.GamepadLogic.HandIndex, this.Proxy.GamepadLogic.CancelSelectedCard(), UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey(), t !== PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX ? (t = this.Zmu(t), ControllerHolder_1.ControllerHolder.UiNavigationNewController.SwitchNavigationFocus(t)) : -1 !== e && (t = this.Ufu(e), ControllerHolder_1.ControllerHolder.UiNavigationNewController.SwitchNavigationFocus(t)))
  }
  OnRefreshSelfHotKeyStateImplement() {
    this.Proxy && this.Proxy.GamepadLogic.IsInCardSelectState ? this.SetVisibleMode(2, !0) : this.SetVisibleMode(2, !1)
  }
  Zmu(e) {
    var t = ControllerHolder_1.ControllerHolder.UiNavigationNewController.GetCurrentNavigationFocusListener()?.GetNavigationGroup();
    if (t) {
      var n = [];
      for (const r of t.ListenerList) "PhantomArenaOwnBattleToggle" === r.GetNavigationComponent().GetType() && n.push(r);
      return n[e]
    }
  }
  Ufu(e) {
    var t = ControllerHolder_1.ControllerHolder.UiNavigationNewController.GetCurrentNavigationFocusListener()?.GetNavigationGroup();
    if (t) {
      var n = [];
      for (const r of t.ListenerList) "PhantomArenaOwnHandToggle" === r.GetNavigationComponent().GetType() && n.push(r);
      return n[e]
    }
  }
}
exports.PhantomArenaBattleCardCancelComponent = PhantomArenaBattleCardCancelComponent;
//# sourceMappingURL=PhantomArenaBattleCardCancelComponent.js.map