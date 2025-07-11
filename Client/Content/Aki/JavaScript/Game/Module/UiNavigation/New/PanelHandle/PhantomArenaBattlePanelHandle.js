"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattlePanelHandle = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const PhantomArenaGamepadDefine_1 = require("../../UIComponent/PhantomArena/PhantomArenaGamepadDefine");
const SpecialPanelHandleBase_1 = require("./SpecialPanelHandleBase");
class PhantomArenaBattlePanelHandle extends SpecialPanelHandleBase_1.SpecialPanelHandleBase {
  constructor() {
    super(...arguments);
    this.ProxyInternal = undefined;
  }
  get Proxy() {
    var e;
    if (!this.ProxyInternal) {
      e = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView");
      this.ProxyInternal = e?.OpenParam;
    }
    return this.ProxyInternal;
  }
  OnGetSuitableNavigationListenerList(e) {
    if (this.Proxy) {
      if (this.Proxy.SkillTriggerMask.IsInSkillInteract) {
        return this.ISu();
      } else if (this.Proxy.IsInPanelInteract) {
        return this.$Su();
      } else if (ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetHandCardIdList().length === 0) {
        return this.TSu();
      } else {
        return this.bSu();
      }
    } else {
      return [];
    }
  }
  ISu() {
    var e = this.GetNavigationListenerListByTypeList(["PhantomArenaOpponentBattleToggle", "PhantomArenaOwnBattleToggle"], PhantomArenaGamepadDefine_1.GROUP_TARGET);
    if (!e) {
      return [];
    }
    var t = [];
    for (const n of e) {
      var a = n.GetNavigationComponent();
      if (a.GetType() === "PhantomArenaOpponentBattleToggle") {
        if (a.IsInSkillInteract) {
          t.push(n);
        }
      } else if (a.GetType() === "PhantomArenaOwnBattleToggle" && a.IsInSkillInteract) {
        t.push(n);
      }
    }
    return t;
  }
  $Su() {
    if (this.Proxy && this.Proxy.IsMainInVisible) {
      return this.GetNavigationListenerListByType("PhantomArenaOwnBattleToggle");
    } else {
      return [];
    }
  }
  TSu() {
    return this.GetNavigationListenerListByType("PhantomArenaOwnBattleToggle");
  }
  bSu() {
    return this.GetNavigationListenerListByType("PhantomArenaOwnHandToggle");
  }
  GetNavigationListenerListByType(e, t = PhantomArenaGamepadDefine_1.GROUP_NORMAL) {
    t = this.GetNavigationGroup(t);
    if (!t) {
      return [];
    }
    var a = [];
    for (const n of t.ListenerList) {
      if (n.GetNavigationComponent().GetType() === e) {
        a.push(n);
      }
    }
    return a;
  }
  GetNavigationListenerListByTypeList(e, t) {
    t = this.GetNavigationGroup(t);
    if (!t) {
      return [];
    }
    var a = [];
    for (const r of t.ListenerList) {
      var n = r.GetNavigationComponent();
      if (e.includes(n.GetType())) {
        a.push(r);
      }
    }
    return a;
  }
}
exports.PhantomArenaBattlePanelHandle = PhantomArenaBattlePanelHandle;
//# sourceMappingURL=PhantomArenaBattlePanelHandle.js.map