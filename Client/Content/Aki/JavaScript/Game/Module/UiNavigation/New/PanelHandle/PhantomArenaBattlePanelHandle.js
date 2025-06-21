"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattlePanelHandle = void 0;
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  PhantomArenaGamepadDefine_1 = require("../../UIComponent/PhantomArena/PhantomArenaGamepadDefine"),
  SpecialPanelHandleBase_1 = require("./SpecialPanelHandleBase");
class PhantomArenaBattlePanelHandle extends SpecialPanelHandleBase_1.SpecialPanelHandleBase {
  constructor() {
    super(...arguments), this.ProxyInternal = void 0
  }
  get Proxy() {
    var e;
    return this.ProxyInternal || (e = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView"), this.ProxyInternal = e?.OpenParam), this.ProxyInternal
  }
  OnGetSuitableNavigationListenerList(e) {
    return this.Proxy ? this.Proxy.SkillTriggerMask.IsInSkillInteract ? this.Cuu() : this.Proxy.IsInPanelInteract ? this.Duu() : 0 === ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetHandCardIdList().length ? this.puu() : this.vuu() : []
  }
  Cuu() {
    var e = this.GetNavigationListenerListByTypeList(["PhantomArenaOpponentBattleToggle", "PhantomArenaOwnBattleToggle"], PhantomArenaGamepadDefine_1.GROUP_TARGET);
    if (!e) return [];
    var t = [];
    for (const n of e) {
      var a = n.GetNavigationComponent();
      "PhantomArenaOpponentBattleToggle" === a.GetType() ? a.IsInSkillInteract && t.push(n) : "PhantomArenaOwnBattleToggle" === a.GetType() && a.IsInSkillInteract && t.push(n)
    }
    return t
  }
  Duu() {
    return this.Proxy && this.Proxy.IsMainInVisible ? this.GetNavigationListenerListByType("PhantomArenaOwnBattleToggle") : []
  }
  puu() {
    return this.GetNavigationListenerListByType("PhantomArenaOwnBattleToggle")
  }
  vuu() {
    return this.GetNavigationListenerListByType("PhantomArenaOwnHandToggle")
  }
  GetNavigationListenerListByType(e, t = PhantomArenaGamepadDefine_1.GROUP_NORMAL) {
    t = this.GetNavigationGroup(t);
    if (!t) return [];
    var a = [];
    for (const n of t.ListenerList) n.GetNavigationComponent().GetType() === e && a.push(n);
    return a
  }
  GetNavigationListenerListByTypeList(e, t) {
    t = this.GetNavigationGroup(t);
    if (!t) return [];
    var a = [];
    for (const r of t.ListenerList) {
      var n = r.GetNavigationComponent();
      e.includes(n.GetType()) && a.push(r)
    }
    return a
  }
}
exports.PhantomArenaBattlePanelHandle = PhantomArenaBattlePanelHandle;
//# sourceMappingURL=PhantomArenaBattlePanelHandle.js.map