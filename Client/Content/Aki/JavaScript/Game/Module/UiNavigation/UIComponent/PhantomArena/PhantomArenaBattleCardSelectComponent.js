"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleCardSelectComponent = undefined;
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const PhantomArenaDefine_1 = require("../../../PhantomArena/Battle/PhantomArenaDefine");
const UiNavigationViewManager_1 = require("../../New/UiNavigationViewManager");
const PhantomArenaBattleComponentBase_1 = require("./PhantomArenaBattleComponentBase");
class PhantomArenaBattleCardSelectComponent extends PhantomArenaBattleComponentBase_1.PhantomArenaBattleComponentBase {
  OnPress() {
    var e;
    if (this.Proxy) {
      if (this.Proxy.GamepadLogic.IsInCardSelectState) {
        this.$ku();
      } else if (e = ControllerHolder_1.ControllerHolder.UiNavigationNewController.GetCurrentNavigationFocusListener()?.GetNavigationComponent()) {
        if (e.GetType() === "PhantomArenaOwnHandToggle") {
          this.L7c(e);
        } else if (e.GetType() === "PhantomArenaOwnBattleToggle") {
          this.A7c(e);
        }
      }
    }
  }
  async $ku() {
    var e = this.Proxy.GamepadLogic.SelectedCard.Data.Index;
    var a = this.Proxy.GamepadLogic.HandIndex;
    var t = await this.Proxy.GamepadLogic.PutDownCardToFunctional();
    UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey();
    if (!t) {
      if (e !== PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX) {
        t = this.Hku(e);
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.SwitchNavigationFocus(t);
      } else if (a !== -1) {
        e = this.x2u(a);
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.SwitchNavigationFocus(e);
      }
    }
  }
  async L7c(e) {
    ModelManager_1.ModelManager.UiNavigationModel?.RepeatMove();
    if (await e.TriggerSelectCard()) {
      e = this.Hku(0);
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.SwitchNavigationFocus(e);
    }
  }
  async A7c(e) {
    ModelManager_1.ModelManager.UiNavigationModel?.RepeatMove();
    await e.TriggerSelectCard();
    UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey();
  }
  Hku(e) {
    var a = ControllerHolder_1.ControllerHolder.UiNavigationNewController.GetCurrentNavigationFocusListener()?.GetNavigationGroup();
    if (a) {
      var t = [];
      for (const n of a.ListenerList) {
        if (n.GetNavigationComponent().GetType() === "PhantomArenaOwnBattleToggle") {
          t.push(n);
        }
      }
      return t[e];
    }
  }
  x2u(e) {
    var a = ControllerHolder_1.ControllerHolder.UiNavigationNewController.GetCurrentNavigationFocusListener()?.GetNavigationGroup();
    if (a) {
      var t = [];
      for (const n of a.ListenerList) {
        if (n.GetNavigationComponent().GetType() === "PhantomArenaOwnHandToggle") {
          t.push(n);
        }
      }
      return t[e];
    }
  }
}
exports.PhantomArenaBattleCardSelectComponent = PhantomArenaBattleCardSelectComponent;
//# sourceMappingURL=PhantomArenaBattleCardSelectComponent.js.map