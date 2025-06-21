"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaOwnData = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  PhantomArenaCardTaskData_1 = require("./PhantomArenaCardTaskData"),
  PhantomArenaSelectCardSaveData_1 = require("./PhantomArenaSelectCardSaveData"),
  PhantomCardData_1 = require("./PhantomCardData");
class PhantomArenaOwnData {
  constructor() {
    this.RoleId = 0, this.FightId = 0, this.CardLibraryNum = 0, this.Otu = new Map, this.qtu = new Map, this.rD1 = new Map, this.Usu = [], this.jx1 = new Map, this.Hx1 = new Map, this.TaskData = void 0, this.SelectCardSaveData = void 0, this.CanEvolveNum = 0, this.CanShowFourCostView = !1, this.CoreCardId = 0, this.DiscardCardNum = 0, this.RequestCardId = 0, this.PrevShowLifeInternal = 0
  }
  get BattleCardNum() {
    return this.jx1.size
  }
  oD1(t) {
    this.jx1.set(t.CardId, t), this.Hx1.set(t.Index, t), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshBattleCardNum)
  }
  nD1(t) {
    var a = this.jx1.delete(t.CardId),
      t = this.Hx1.delete(t.Index);
    return EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshBattleCardNum), a && t
  }
  sD1(t) {
    var a = new PhantomCardData_1.PhantomCardData;
    a.InitData(t), this.rD1.set(a.CardId, a), this.Usu.push(a.CardId)
  }
  InitHandData(t) {
    this.ClearHandData();
    for (const a of t) this.sD1(a);
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "初始化手牌数据", ["Id", this.Usu])
  }
  RefreshHandData(t) {
    for (const e of t) {
      var a = this.rD1.get(e.Mg1);
      a ? a.InitData(e) : this.sD1(e)
    }
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "刷新手牌数据", ["Id", this.Usu])
  }
  AddHandDataList(t) {
    var a = [];
    for (const e of t) this.rD1.get(e.Mg1) || this.sD1(e), a.push(e.Mg1);
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "新增手牌数据", ["数据", a]), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OwnHandCardAdd, a)
  }
  RemoveHandDataList(t) {
    for (const a of t) this.RemoveHandCardByCardId(a);
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "移除手牌数据", ["数据", t]), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OwnHandCardRemove, t)
  }
  RemoveHandCardByCardId(t) {
    this.rD1.delete(t);
    var a = this.Usu.indexOf(t);
    0 <= a && this.Usu.splice(a, 1), Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "移除手牌数据", ["CardId", t])
  }
  AddFourCostCard(t) {
    this.sD1(t), Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "新增4Cost手牌", ["CardId", t.Mg1]), this.CanShowFourCostView = !0, this.CoreCardId = t.Mg1, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OwnHandCardAddFourCost, t.Mg1)
  }
  InitPlayerData(t) {
    this.Otu.clear(), this.qtu.clear(), this.RoleId = t.pg1, this.RefreshCardLibraryNum(t.yg1), this.RefreshCanEvolveNum(t.Pg1), this.h1u(t.vg1), this.l1u(t.WX1)
  }
  l1u(t) {
    var a = [];
    for (const r of Object.keys(t)) {
      var e = Number(r);
      this.qtu.set(e, t[r]), a.push(e)
    }
  }
  h1u(t) {
    var a = [];
    for (const r of Object.keys(t)) {
      var e = Number(r);
      this.Otu.set(e, t[r]), a.push(e)
    }
  }
  RefreshBattleStatus(t) {
    var a = [];
    for (const r of Object.keys(t)) {
      var e = Number(r);
      this.Otu.set(e, t[r]), a.push(e)
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OwnBattleStatusChange, a)
  }
  RefreshBattleAttr(t) {
    var a = [];
    for (const r of Object.keys(t)) {
      var e = Number(r);
      this.qtu.set(e, t[r]), a.push(e)
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OwnBattleAttrChange, a)
  }
  RefreshCanEvolveNum(t) {
    this.CanEvolveNum = t
  }
  RefreshCardAttr(t, a) {
    for (const e of this.jx1.values()) e.FightId === t && e.RefreshFightAttr(a)
  }
  GetBattleStatusValue(t) {
    return this.Otu.get(t) ?? 0
  }
  HandCardToFightCard(t, a) {
    this.RemoveHandCardByCardId(t.CardId), t.RefreshFightData(a), this.oD1(t)
  }
  FightCardToHandCard(t) {
    var a = this.jx1.get(t.Mg1);
    this.nD1(a), a.InitData(t), this.rD1.set(a.CardId, a), this.Usu.push(a.CardId)
  }
  FightCardToRecycle(t) {
    var a = this.jx1.get(t.Mg1);
    this.nD1(a), this.RefreshCardLibraryNum(t.OM1)
  }
  FightCardToFunctional(t) {
    t = this.jx1.get(t);
    this.nD1(t)
  }
  GetHandCardIdList() {
    return this.Usu
  }
  GetHandCardDataByCardId(t) {
    return this.rD1.get(t)
  }
  GetBattleCardByCardId(t) {
    return this.jx1.get(t)
  }
  GetBattleCardDataList() {
    return Array.from(this.jx1.values())
  }
  GetHandCardDataList() {
    var t = [];
    for (const e of this.Usu) {
      var a = this.rD1.get(e);
      a && t.push(a)
    }
    return t
  }
  NotifyExchangeBattleCard(t) {
    var a, e = this.GetCardDataByFightId(t[0].gK1);
    e && (e && t[1] && e.Index !== t[1].CK1 ? Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "卡牌A位置不正确,不满足交换条件", ["AfterPos", t[0].CK1], ["Index", e.Index]) : (a = this.Hx1.get(t[0].CK1)) && t[1] && a.FightId !== t[1].gK1 ? Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "卡牌B位置不正确,不满足交换条件", ["AfterPos", t[1].CK1], ["Index", a.Index]) : (this.ExchangeBattleCardData(t[0].CK1, e.Index), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NotifyBattleCardChange, !1, e.Index, t[1].CK1)))
  }
  ExchangeBattleCardData(t, a) {
    var e = this.Hx1.get(a),
      r = this.Hx1.get(t);
    this.Hx1.delete(a), this.Hx1.delete(t), e && (e.Index = t, this.Hx1.set(e.Index, e)), r && (r.Index = a, this.Hx1.set(r.Index, r))
  }
  EvolveBattleCardData(t, a) {
    this.RefreshCanEvolveNum(a.Pg1), this.RefreshCardLibraryNum(a.yg1);
    var a = a.Vg1,
      e = a.gg1.Ig1,
      e = this.Hx1.get(e);
    this.nD1(e), this.HandCardToFightCard(t, a)
  }
  HandCardToRecycle(t) {
    this.RemoveHandCardByCardId(t)
  }
  RefreshCardLibraryNum(t) {
    this.CardLibraryNum = t, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OwnCardLibraryChange)
  }
  GetFightIdList(t) {
    var a = [];
    for (const r of t) {
      var e = this.jx1.get(r);
      e && a.push(e.FightId)
    }
    return a
  }
  GetCardDataByFightId(t) {
    for (const a of this.jx1.values())
      if (a.FightId === t) return a
  }
  get BattleCardLength() {
    return this.jx1.size
  }
  ClearHandData() {
    this.rD1.clear(), this.Usu.length = 0
  }
  InitTaskData(t) {
    this.TaskData = new PhantomArenaCardTaskData_1.PhantomArenaCardTaskData(!0), this.TaskData.SetTaskData(t)
  }
  RefreshTaskData(t) {
    this.TaskData ? this.TaskData.SetTaskData(t) : Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "任务数据为空")
  }
  InitSelectCardSaveData(t) {
    this.SelectCardSaveData = new PhantomArenaSelectCardSaveData_1.PhantomArenaSelectCardSaveData, this.SelectCardSaveData.InitData(t.Oru, t.wg1)
  }
  GetHandIndexByCardId(t) {
    return this.Usu.indexOf(t)
  }
  HasFourCostInHand() {
    for (const t of this.rD1.values())
      if (t.IsFourCost) return !0;
    return !1
  }
  SetPrevShowLife(t) {
    this.PrevShowLifeInternal = t
  }
  get PrevShowLife() {
    return this.PrevShowLifeInternal
  }
}
exports.PhantomArenaOwnData = PhantomArenaOwnData;
//# sourceMappingURL=PhantomArenaOwnData.js.map