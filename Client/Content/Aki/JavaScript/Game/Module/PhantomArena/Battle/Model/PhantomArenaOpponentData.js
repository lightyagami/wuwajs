"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaOpponentData = void 0;
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  PhantomArenaAiOperationFactory_1 = require("../Ai/PhantomArenaAiOperationFactory"),
  PhantomArenaCardTaskData_1 = require("./PhantomArenaCardTaskData"),
  PhantomCardData_1 = require("./PhantomCardData");
class PhantomArenaOpponentData {
  constructor() {
    this.RoleId = 0, this.FightId = 0, this.CardLibraryNum = 0, this.LastHandCardNum = 0, this.HandCardNum = 0, this.Otu = new Map, this.qtu = new Map, this.CanEvolveNum = 0, this.TaskData = void 0, this.InitPromise = void 0, this.jx1 = new Map, this.Hx1 = new Map, this.$x1 = [], this.PrevShowLifeInternal = 0
  }
  CreateInitPromise() {
    this.InitPromise = new CustomPromise_1.CustomPromise
  }
  InitPlayerData(t) {
    this.Otu.clear(), this.qtu.clear(), this.RoleId = t.pg1, this.HandCardNum = t.Sg1, this.RefreshLibraryNum(t.yg1), this.RefreshCanEvolveNum(t.Pg1), this.h1u(t.vg1)
  }
  InitNpcAiOperationData(t) {
    this.$x1 = [];
    for (const a of t) this.Wx1(a.Yg1), this.Qx1(a.zg1), this.Kx1(a.AM1), this.Xx1(a.Xg1), this.Yx1(a.PM1), this.zx1(a.xM1), this.Jx1(a.UM1), this.Zx1(a.DM1), this.eD1(a.BM1), this.tD1(a.kM1), this.P21(a.S21), this.x21(a.M21), this.a81(a.s81), this.Dtu(a.Ptu), this.rou(a.Bru), this.hsu(a.znu);
    this.InitPromise?.SetResult(void 0), this.InitPromise = void 0
  }
  GetNpcAiOperationList() {
    return this.$x1
  }
  RefreshHandCardNum(t, a = !0) {
    this.LastHandCardNum = this.HandCardNum, this.HandCardNum = t, a && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpponentHandCardChange)
  }
  RefreshLibraryNum(t) {
    this.CardLibraryNum = t, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpponentCardLibraryChange)
  }
  RefreshCanEvolveNum(t) {
    this.CanEvolveNum = t
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
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpponentBattleStatusChange, a)
  }
  RefreshBattleAttr(t) {
    var a = [];
    for (const r of Object.keys(t)) {
      var e = Number(r);
      this.qtu.set(e, t[r]), a.push(e)
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpponentBattleAttrChange, a)
  }
  GetBattleStatusValue(t) {
    return this.Otu.get(t) ?? 0
  }
  RefreshCardAttr(t, a) {
    for (const e of this.jx1.values()) e.FightId === t && e.RefreshFightAttr(a)
  }
  RemoveBattleCardDataByIndex(t) {
    t = this.Hx1.get(t);
    return !!t && this.nD1(t)
  }
  nD1(t) {
    var a = this.jx1.delete(t.CardId),
      t = this.Hx1.delete(t.Index);
    return a && t
  }
  SetBattleCardData(t) {
    var a = new PhantomCardData_1.PhantomCardData;
    a.RefreshFightData(t), this.RemoveBattleCardDataByIndex(a.Index), this.jx1.set(a.CardId, a), this.Hx1.set(a.Index, a)
  }
  NotifyExchangeBattleCard(t) {
    var a, e = this.GetCardDataByFightId(t[0].gK1);
    e && (e && e.Index !== t[1]?.CK1 ? Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "卡牌A位置不正确,不满足交换条件", ["AfterPos", t[0].CK1], ["Index", e.Index]) : (a = this.Hx1.get(t[0].CK1)) && a.FightId !== t[1]?.gK1 ? Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "卡牌B位置不正确,不满足交换条件", ["AfterPos", t[1].CK1], ["Index", a.Index]) : (this.ExchangeBattleCard(e.Index, t[0].CK1), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NotifyBattleCardChange, !1, e.Index, t[1].CK1)))
  }
  ExchangeBattleCard(t, a) {
    var e = this.Hx1.get(t),
      r = this.Hx1.get(a);
    this.Hx1.delete(t), this.Hx1.delete(a), e && (e.Index = a, this.Hx1.set(e.Index, e)), r && (r.Index = t, this.Hx1.set(r.Index, r))
  }
  BackToLibrary(t) {
    this.RefreshLibraryNum(t.OM1), this.RefreshHandCardNum(t.Sg1)
  }
  BackSlotCardToLibrary(t, a) {
    this.RemoveBattleCardDataByIndex(t), this.RefreshLibraryNum(a)
  }
  ReverseCard(t) {
    this.RefreshLibraryNum(t.OM1), this.RefreshHandCardNum(t.Sg1)
  }
  GetBattleCardIndexByCardId(t) {
    t = this.jx1.get(t);
    return t ? t.Index : -1
  }
  GetBattleCardIndexList(t) {
    var a = [];
    for (const e of this.jx1.values()) t.includes(e.FightId) && a.push(e.Index);
    return a
  }
  GetCardDataByCardId(t) {
    return this.jx1.get(t)
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
  GetCardDataByIndex(t) {
    return this.Hx1.get(t)
  }
  GetCardDataList() {
    return Array.from(this.jx1.values())
  }
  ClearHandData() {
    this.HandCardNum = 0
  }
  InitTaskData(t) {
    this.TaskData = new PhantomArenaCardTaskData_1.PhantomArenaCardTaskData(!1), this.TaskData.SetTaskData(t)
  }
  RefreshTaskData(t) {
    this.TaskData ? this.TaskData.SetTaskData(t) : Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "任务数据为空")
  }
  CreatePhantomCardData(t, a) {
    var e = new PhantomCardData_1.PhantomCardData;
    return e.InitDataByNpc(t, a), e
  }
  HasFourCostInHand() {
    if (!this.TaskData || !this.TaskData.IsAllFinish || !this.TaskData.IsExecuteFourCostLogic) return !1;
    for (const t of this.jx1.values())
      if (t.IsFourCost) return !1;
    return !0
  }
  Wx1(t) {
    t && (t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(1, t), this.$x1.push(t))
  }
  Qx1(t) {
    t && (t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(2, t), this.$x1.push(t))
  }
  Kx1(t) {
    t && (t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(7, t), this.$x1.push(t))
  }
  Xx1(t) {
    t && (t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(5, t), this.$x1.push(t))
  }
  Yx1(t) {
    t && (t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(4, t), this.$x1.push(t))
  }
  zx1(t) {
    t && (t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(3, t), this.$x1.push(t))
  }
  Jx1(t) {
    t && (t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(8, t), this.$x1.push(t))
  }
  Zx1(t) {
    t && (t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(9, t), this.$x1.push(t))
  }
  eD1(t) {
    t && (t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(0, t), this.$x1.push(t))
  }
  tD1(t) {
    t && (t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(6, t), this.$x1.push(t))
  }
  P21(t) {
    t && (t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(10, t), this.$x1.push(t))
  }
  x21(t) {
    t && (t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(11, t), this.$x1.push(t))
  }
  a81(t) {
    t && (t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(12, t), this.$x1.push(t))
  }
  Dtu(t) {
    t && (t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(13, t), this.$x1.push(t))
  }
  rou(t) {
    t && (t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(14, t), this.$x1.push(t))
  }
  hsu(t) {
    t && (t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(15, t), this.$x1.push(t))
  }
  SetPrevShowLife(t) {
    this.PrevShowLifeInternal = t
  }
  get PrevShowLife() {
    return this.PrevShowLifeInternal
  }
}
exports.PhantomArenaOpponentData = PhantomArenaOpponentData;
//# sourceMappingURL=PhantomArenaOpponentData.js.map