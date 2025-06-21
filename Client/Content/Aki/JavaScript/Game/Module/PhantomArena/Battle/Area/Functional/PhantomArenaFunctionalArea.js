"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaFunctionalArea = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  PhantomArenaDefine_1 = require("../../PhantomArenaDefine"),
  PhantomArenaAreaFunctionalItem_1 = require("./PhantomArenaAreaFunctionalItem"),
  PhantomArenaAreaFunctionalProxy_1 = require("./PhantomArenaAreaFunctionalProxy"),
  PhantomArenaAreaMonsterItem_1 = require("./PhantomArenaAreaMonsterItem"),
  PhantomArenaAreaMonsterProxy_1 = require("./PhantomArenaAreaMonsterProxy");
class PhantomArenaFunctionalArea extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.ParentArea = void 0, this.CardProxyMap = new Map, this.Do1 = -1
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    await this.hi1()
  }
  async hi1() {
    var e = [this.GetItem(0), this.GetItem(1), this.GetItem(2), this.GetItem(3), this.GetItem(4), this.GetItem(5), this.GetItem(6)],
      r = e.length,
      a = [];
    for (let t = 0; t < PhantomArenaDefine_1.functionAreaTypeList.length && !(t >= r); t++) {
      var i, n, s = e[t],
        o = PhantomArenaDefine_1.functionAreaTypeList[t];
      1 === o ? (i = new PhantomArenaAreaFunctionalItem_1.PhantomArenaAreaFunctionalItem, a.push(i.CreateThenShowByActorAsync(s.GetOwner())), (n = new PhantomArenaAreaFunctionalProxy_1.PhantomArenaAreaFunctionalProxy(t, this)).SetAreaItem(i), this.CardProxyMap.set(t, n), this.ParentArea.ViewProxy.CanvasManager.AddAreaCanvas(n)) : 0 === o && (i = new PhantomArenaAreaMonsterItem_1.PhantomArenaAreaMonsterItem, a.push(i.CreateThenShowByActorAsync(s.GetOwner())), (n = new PhantomArenaAreaMonsterProxy_1.PhantomArenaAreaMonsterProxy(t, this)).SetAreaItem(i), this.CardProxyMap.set(t, n), this.ParentArea.ViewProxy.CanvasManager.AddAreaCanvas(n))
    }
    await Promise.all(a)
  }
  SetAllCardProxyUseActiveState(t, e) {
    for (const r of this.CardProxyMap.values()) t && r.CheckSettingCardCondition(e) ? r.SetCanUseStateActive(t) : r.SetCanUseStateActive(!1)
  }
  CheckSettingCardPosition(t) {
    for (const e of this.CardProxyMap.values())
      if (e.CheckSettingCardCondition(t)) return !0;
    return !1
  }
  RegisterBattleArea(t) {
    this.ParentArea = t
  }
  RefreshStateByDragCard(t) {
    let e = -1,
      r = PhantomArenaDefine_1.DISTANCE_MAX;
    for (var [a, i] of this.CardProxyMap) i.IsCanSettingCard(t) && i.Distance < r && (r = i.Distance, e = a);
    var n;
    this.Do1 !== e && (-1 === this.Do1 && -1 !== e ? this.SetAllCardProxyUseActiveState(!0, t) : -1 !== this.Do1 && -1 === e && this.SetAllCardProxyUseActiveState(!1, t), -1 !== this.Do1 && (n = this.CardProxyMap.get(this.Do1)) && n.SetHoverStateActive(!1), -1 !== e && (n = this.CardProxyMap.get(e)) && n.SetHoverStateActive(!0), Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "找到放置区的位置", ["LastProxyIndex", this.Do1], ["CurrentProxyIndex", e]), this.Do1 = e)
  }
  RefreshStateByGamepad(t, e) {
    let r = -1;
    const a = this.CardProxyMap.get(e);
    if (a && a.CheckSettingCardCondition(t) && (r = e), this.Do1 !== r) {
      if (-1 === this.Do1 && -1 !== r ? this.SetAllCardProxyUseActiveState(!0, t) : -1 !== this.Do1 && -1 === r && this.SetAllCardProxyUseActiveState(!1, t), -1 !== this.Do1 && (e = this.CardProxyMap.get(this.Do1)) && e.SetHoverStateActive(!1), -1 !== r) {
        const a = this.CardProxyMap.get(r);
        a && a.SetHoverStateActive(!0)
      }
      Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "找到放置区的位置", ["LastProxyIndex", this.Do1], ["CurrentProxyIndex", r]), this.Do1 = r
    }
  }
  ResetLastProxyIndexByGamepad() {
    this.Do1 = -1
  }
  CheckGuideCondition(t) {
    var e;
    return !this.ParentArea.ViewProxy.GuideManager.InGuiding || !(e = this.GetNearlyAreaItemProxyByCard(t)) || e.CheckGuideCondition(t)
  }
  async TrySettingCard(t, e, r) {
    if (this.SetAllCardProxyUseActiveState(!1, t), -1 === this.Do1) return !1;
    var a = this.CardProxyMap.get(this.Do1);
    if (r) {
      if (!await a.HandleCardSetting(t)) return a.SetHoverStateActive(!1), !1
    } else await a.SetCard(t);
    return a.SetHoverStateActive(!1), t.PlaySequenceWithoutStop("PutDownHandtoTable"), e !== this.Do1 && t.PlaySpineAnimAndEffect("start", !1), this.Do1 = -1, !0
  }
  GetNearlyAreaItemProxyByCard(t) {
    let e = PhantomArenaDefine_1.DISTANCE_MAX,
      r = void 0;
    for (const a of this.CardProxyMap.values()) a.IsCardNearlyAreaItem(t) && a.Distance < e && (e = a.Distance, r = a);
    return r
  }
  async TryChangeCard(t, e) {
    if (-1 === this.Do1 || -1 === e) return !1;
    if (this.Do1 === e) return await this.TrySettingCard(t, e, !1), !0;
    var r = this.CardProxyMap.get(this.Do1);
    if (this.ParentArea.ViewProxy.GuideManager.InGuiding) return this.ParentArea.ViewProxy.GuideManager.ShowGuideTips(), r?.SetHoverStateActive(!1), this.SetAllCardProxyUseActiveState(!1, t), !1;
    if (1 === PhantomArenaDefine_1.functionAreaTypeList[this.Do1]) {
      const a = await this.TrySettingCard(t, e, !0);
      if (a) {
        const i = this.CardProxyMap.get(e);
        await i.SetCard(void 0)
      }
      return a
    }
    const a = await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleSlotInstead(e, this.Do1);
    if (!a) return this.SetAllCardProxyUseActiveState(!1, t), r?.SetHoverStateActive(!1), !1;
    const i = this.CardProxyMap.get(e);
    var n, r = r?.Card;
    return r ? ((n = await this.TrySettingCard(t, e, !1)) && await i.ChangeCard(r), n) : (await i.SetCard(void 0), this.TrySettingCard(t, e, !1))
  }
  RemoveCard(t) {
    t = this.CardProxyMap.get(t);
    t && t.SetCard(void 0)
  }
  ResetCardSelectState(t) {
    t = this.CardProxyMap.get(t);
    t && t.ResetCardSelectState()
  }
  FinishBuffEffect(t) {
    t = this.CardProxyMap.get(t);
    t && t.SetCard(void 0)
  }
  ShowAddBuffEffect(t, e) {
    for (const a of this.CardProxyMap.values()) {
      var r;
      a.Card && e.includes(a.Card.Data.FightId) && (r = a, 1 === t ? r.AreaItem.SetBuffUpActive(!0) : 2 === t && r.AreaItem.SetBuffDownActive(!0))
    }
  }
  RefreshBattleCard(t) {
    for (const e of this.CardProxyMap.values())
      if (e.Card && e.Card.Data.CardId === t) {
        e.Card.RefreshSelfAsync();
        break
      }
  }
  RefreshAllBattleCard() {
    for (const t of this.CardProxyMap.values()) t.Card && t.Card.RefreshSelfAsync()
  }
  GetCardProxyByCardId(t) {
    for (const e of this.CardProxyMap.values())
      if (e.Card && e.Card.Data.CardId === t) return e
  }
  DestroyCardByLibrary(t) {
    t = this.CardProxyMap.get(t);
    t && t.DissolveByLibrary()
  }
  async ResetCardPosition(t) {
    t = this.CardProxyMap.get(t);
    t && await t.PlayResetPositionTween()
  }
  async ResetFunctionalToMonster(t, e, r) {
    r = this.CardProxyMap.get(r), r && await r.SetCard(void 0), r = this.CardProxyMap.get(e);
    r && await r.ChangeCard(t)
  }
  async FunctionalCardToFunctionalTop(t, e, r) {
    t = this.CardProxyMap.get(t.Data.Index);
    t && (e = this.CardProxyMap.get(e).AreaItem.GetRootItem(), await t.PlayFunctionalCardToFunctionalTopTween(e, r))
  }
  async FunctionalToRecycle(t, e) {
    e = this.CardProxyMap.get(e.Data.Index);
    e && await e.PlayFunctionalCardToRecycleTween(t)
  }
  GetCardProxyByIndex(t) {
    return this.CardProxyMap.get(t)
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (t && !(t.length < 3)) {
      var e = t[0];
      if ("BattleCard" === e) return r = parseInt(t[2]), this.CardProxyMap.get(r)?.Card?.GetGuideUiItemAndUiItemForShowEx(t);
      if ("BattleCardById" === e) {
        var r = Array.from(this.CardProxyMap.values()),
          a = parseInt(t[2]);
        for (const i of r)
          if (i.Card?.Data?.ConfigId === a) return i.Card.GetGuideUiItemAndUiItemForShowEx(t)
      }
    }
  }
}
exports.PhantomArenaFunctionalArea = PhantomArenaFunctionalArea;
//# sourceMappingURL=PhantomArenaFunctionalArea.js.map