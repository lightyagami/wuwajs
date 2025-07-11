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
        this.dku();
      } else if (e = ControllerHolder_1.ControllerHolder.UiNavigationNewController.GetCurrentNavigationFocusListener()?.GetNavigationComponent()) {
        if (e.GetType() === "PhantomArenaOwnHandToggle") {
          this.wSu(e);
        } else if (e.GetType() === "PhantomArenaOwnBattleToggle") {
          this.LSu(e);
        }
      }
    }
  }
  async dku() {
    var e = this.Proxy.GamepadLogic.SelectedCard.Data.Index;
    var a = this.Proxy.GamepadLogic.HandIndex;
    var t = await this.Proxy.GamepadLogic.PutDownCardToFunctional();
    UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey();
    if (!t) {
      if (e !== PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX) {
        t = this.cku(e);
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.SwitchNavigationFocus(t);
      } else if (a !== -1) {
        e = this.Qku(a);
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.SwitchNavigationFocus(e);
      }
    }
  }
  async wSu(e) {
    ModelManager_1.ModelManager.UiNavigationModel?.RepeatMove();
    if (await e.TriggerSelectCard()) {
      e = this.cku(0);
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.SwitchNavigationFocus(e);
    }
  }
  async LSu(e) {
    ModelManager_1.ModelManager.UiNavigationModel?.RepeatMove();
    await e.TriggerSelectCard();
    UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey();
  }
  cku(e) {
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
  Qku(e) {
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