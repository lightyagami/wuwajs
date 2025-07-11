"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleCardCancelComponent = undefined;
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const PhantomArenaDefine_1 = require("../../../PhantomArena/Battle/PhantomArenaDefine");
const UiNavigationViewManager_1 = require("../../New/UiNavigationViewManager");
const PhantomArenaBattleComponentBase_1 = require("./PhantomArenaBattleComponentBase");
class PhantomArenaBattleCardCancelComponent extends PhantomArenaBattleComponentBase_1.PhantomArenaBattleComponentBase {
  OnPress() {
    var e;
    var t;
    if (this.Proxy) {
      t = this.Proxy.GamepadLogic.SelectedCard.Data.Index;
      e = this.Proxy.GamepadLogic.HandIndex;
      this.Proxy.GamepadLogic.CancelSelectedCard();
      UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey();
      if (t !== PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX) {
        t = this.cku(t);
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.SwitchNavigationFocus(t);
      } else if (e !== -1) {
        t = this.Qku(e);
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.SwitchNavigationFocus(t);
      }
    }
  }
  OnRefreshSelfHotKeyStateImplement() {
    if (this.Proxy && this.Proxy.GamepadLogic.IsInCardSelectState) {
      this.SetVisibleMode(2, true);
    } else {
      this.SetVisibleMode(2, false);
    }
  }
  cku(e) {
    var t = ControllerHolder_1.ControllerHolder.UiNavigationNewController.GetCurrentNavigationFocusListener()?.GetNavigationGroup();
    if (t) {
      var n = [];
      for (const r of t.ListenerList) {
        if (r.GetNavigationComponent().GetType() === "PhantomArenaOwnBattleToggle") {
          n.push(r);
        }
      }
      return n[e];
    }
  }
  Qku(e) {
    var t = ControllerHolder_1.ControllerHolder.UiNavigationNewController.GetCurrentNavigationFocusListener()?.GetNavigationGroup();
    if (t) {
      var n = [];
      for (const r of t.ListenerList) {
        if (r.GetNavigationComponent().GetType() === "PhantomArenaOwnHandToggle") {
          n.push(r);
        }
      }
      return n[e];
    }
  }
}
exports.PhantomArenaBattleCardCancelComponent = PhantomArenaBattleCardCancelComponent;
//# sourceMappingURL=PhantomArenaBattleCardCancelComponent.js.map