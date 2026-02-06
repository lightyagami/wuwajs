"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaOwnData = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const PhantomArenaCardTaskData_1 = require("./PhantomArenaCardTaskData");
const PhantomArenaFieldData_1 = require("./PhantomArenaFieldData");
const PhantomArenaRecycleData_1 = require("./PhantomArenaRecycleData");
const PhantomCardData_1 = require("./PhantomCardData");
class PhantomArenaOwnData {
  constructor() {
    this.RoleId = 0;
    this.FightId = 0;
    this.CardLibraryNum = 0;
    this.Xou = new Map();
    this.You = new Map();
    this.xD1 = new Map();
    this.Fcu = [];
    this.pD1 = new Map();
    this.vD1 = new Map();
    this.TaskData = undefined;
    this.FieldData = undefined;
    this.RecycleData = undefined;
    this.CanEvolveNum = 0;
    this.CanShowFourCostView = false;
    this.CoreCardId = 0;
    this.DiscardCardNum = 0;
    this.RequestCardId = 0;
    this.IsFieldActive = false;
    this.PrevShowLifeInternal = 0;
  }
  DD1(t) {
    this.pD1.set(t.CardId, t);
    this.vD1.set(t.Index, t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshBattleCardNum);
  }
  UD1(t) {
    var e = this.pD1.delete(t.CardId);
    let a = false;
    var r = this.vD1.get(t.Index);
    if (r) {
      if (r.CardId === t.CardId) {
        this.vD1.delete(t.Index);
      }
      a = true;
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshBattleCardNum);
    return e && a;
  }
  BD1(t) {
    var e = new PhantomCardData_1.PhantomCardData();
    e.InitData(t);
    this.xD1.set(e.CardId, e);
    this.Fcu.push(e.CardId);
  }
  InitHandData(t) {
    this.ClearHandData();
    for (const e of t) {
      this.BD1(e);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "初始化手牌数据", ["Id", this.Fcu]);
    }
  }
  RefreshHandData(t) {
    for (const a of t) {
      var e = this.xD1.get(a.$g1);
      if (e) {
        e.InitData(a);
      } else {
        this.BD1(a);
      }
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "刷新手牌数据", ["Id", this.Fcu]);
    }
  }
  AddHandDataList(t, e = true) {
    var a = [];
    for (const r of t) {
      if (!this.xD1.get(r.$g1)) {
        this.BD1(r);
      }
      a.push(r.$g1);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "新增手牌数据", ["数据", a]);
    }
    if (e) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OwnHandCardAdd, a);
    }
  }
  RemoveHandDataList(t) {
    for (const e of t) {
      this.RemoveHandCardByCardId(e);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "移除手牌数据", ["数据", t]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OwnHandCardRemove, t);
  }
  RemoveHandCardByCardId(t) {
    this.xD1.delete(t);
    var e = this.Fcu.indexOf(t);
    if (e >= 0) {
      this.Fcu.splice(e, 1);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "移除手牌数据", ["CardId", t]);
    }
  }
  AddFourCostCard(t) {
    this.BD1(t);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "新增4Cost手牌", ["CardId", t.$g1]);
    }
    this.CanShowFourCostView = true;
    this.CoreCardId = t.$g1;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OwnHandCardAddFourCost, t.$g1);
  }
  InitPlayerData(t) {
    this.Xou.clear();
    this.You.clear();
    this.RoleId = t.Ng1;
    this.RefreshCardLibraryNum(t.jg1);
    this.RefreshCanEvolveNum(t.eC1);
    this.Vvu(t.Vg1);
    this.jvu(t.uz1);
  }
  jvu(t) {
    var e = [];
    for (const r of Object.keys(t)) {
      var a = Number(r);
      this.You.set(a, t[r]);
      e.push(a);
    }
  }
  Vvu(t) {
    var e = [];
    for (const r of Object.keys(t)) {
      var a = Number(r);
      this.Xou.set(a, t[r]);
      e.push(a);
    }
  }
  RefreshBattleStatus(t) {
    var e = [];
    for (const r of Object.keys(t)) {
      var a = Number(r);
      this.Xou.set(a, t[r]);
      e.push(a);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OwnBattleStatusChange, e);
  }
  RefreshBattleHpStatus(t, e) {
    this.Xou.set(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleLife, t);
    if (e) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OwnBattleStatusChange, [Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleLife]);
    }
  }
  RefreshBattleAttr(t) {
    var e = [];
    for (const r of Object.keys(t)) {
      var a = Number(r);
      this.You.set(a, t[r]);
      e.push(a);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OwnBattleAttrChange, e);
  }
  RefreshCanEvolveNum(t) {
    this.CanEvolveNum = t;
  }
  RefreshCardAttr(t, e) {
    for (const a of this.pD1.values()) {
      if (a.FightId === t) {
        a.RefreshFightAttr(e);
      }
    }
    if (t === this.FieldData?.CardData?.FightId) {
      this.FieldData?.CardData.RefreshFightAttr(e);
    }
  }
  GetBattleStatusValue(t) {
    return this.Xou.get(t) ?? 0;
  }
  GetBattleBattleAttr(t) {
    return this.You.get(t) ?? 0;
  }
  HandCardToFightCard(t, e) {
    this.RemoveHandCardByCardId(t.CardId);
    t.RefreshFightData(e);
    this.DD1(t);
  }
  FightCardToHandCard(t) {
    var e = this.pD1.get(t.$g1);
    this.UD1(e);
    e.InitData(t);
    this.xD1.set(e.CardId, e);
    this.Fcu.push(e.CardId);
  }
  FightCardToRecycle(t) {
    var e = this.pD1.get(t.$g1);
    this.UD1(e);
    this.RefreshCardLibraryNum(t.aE1);
  }
  FightCardToFunctional(t) {
    t = this.pD1.get(t);
    if (t) {
      this.UD1(t);
    }
  }
  DestroyFightCard(t) {
    t = this.pD1.get(t);
    this.UD1(t);
  }
  RemoveCardToLibrary(t, e) {
    t = this.pD1.get(t);
    this.UD1(t);
    this.RefreshCardLibraryNum(e);
  }
  RemoveFightCardListToRecycle(t) {
    for (const a of t) {
      var e = this.pD1.get(a);
      this.UD1(e);
    }
  }
  RemoveHandCardListToRecycle(t) {
    for (const e of t) {
      this.RemoveHandCardByCardId(e);
    }
  }
  GetHandCardIdList() {
    return this.Fcu;
  }
  GetHandCardDataByCardId(t) {
    return this.xD1.get(t);
  }
  GetBattleCardByCardId(t) {
    return this.pD1.get(t);
  }
  HasBattleCardByCardId(t) {
    return this.pD1.has(t);
  }
  GetBattleCardDataList() {
    return Array.from(this.pD1.values());
  }
  GetHandCardDataList() {
    var t = [];
    for (const a of this.Fcu) {
      var e = this.xD1.get(a);
      if (e) {
        t.push(e);
      }
    }
    return t;
  }
  NotifyExchangeBattleCard(t) {
    var e;
    var a = this.GetCardDataByFightId(t[0].dX1);
    if (a) {
      if (a && t[1] && a.Index !== t[1].mX1) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("PhantomArena", 10, "卡牌A位置不正确,不满足交换条件", ["AfterPos", t[0].mX1], ["Index", a.Index]);
        }
      } else if ((e = this.vD1.get(t[0].mX1)) && t[1] && e.FightId !== t[1].dX1) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("PhantomArena", 10, "卡牌B位置不正确,不满足交换条件", ["AfterPos", t[1].mX1], ["Index", e.Index]);
        }
      } else {
        this.ExchangeBattleCardData(t[0].mX1, a.Index);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NotifyBattleCardChange, false, a.Index, t[1].mX1);
      }
    }
  }
  ExchangeBattleCardData(t, e) {
    var a = this.vD1.get(e);
    var r = this.vD1.get(t);
    this.vD1.delete(e);
    this.vD1.delete(t);
    if (a) {
      a.Index = t;
      this.vD1.set(a.Index, a);
    }
    if (r) {
      r.Index = e;
      this.vD1.set(r.Index, r);
    }
  }
  EvolveBattleCardData(t, e) {
    this.RefreshCanEvolveNum(e.eC1);
    this.RefreshCardLibraryNum(e.jg1);
    var e = e.cC1;
    var a = e.Gg1.Qg1;
    var a = this.vD1.get(a);
    this.UD1(a);
    this.HandCardToFightCard(t, e);
  }
  HandCardToRecycle(t) {
    this.RemoveHandCardByCardId(t);
  }
  LBm(t) {
    for (const a of t) {
      var e = this.GetHandCardDataByCardId(a.kg1);
      if (e) {
        this.HandCardToFightCard(e, a);
      }
    }
  }
  AddCardListToFight(t) {
    for (const a of t) {
      var e = new PhantomCardData_1.PhantomCardData();
      e.RefreshFightData(a);
      this.DD1(e);
    }
  }
  CallCardListToFight(t, e) {
    if (e === Protocol_1.Aki.Protocol.yBm.Proto_Heap) {
      this.AddCardListToFight(t);
    } else {
      this.LBm(t);
    }
  }
  HandleFunctionalAreaCard(t) {
    var e = this.xD1.get(t.uC1);
    if (e && (this.RemoveHandCardByCardId(t.uC1), e.IsField)) {
      this.FieldData.SetCardData(e);
    }
    this.RefreshCardLibraryNum(t.ztu);
  }
  RefreshCardLibraryNum(t) {
    this.CardLibraryNum = t;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OwnCardLibraryChange);
  }
  GetFightIdList(t) {
    var e = [];
    for (const r of t) {
      var a = this.pD1.get(r);
      if (a) {
        e.push(a.FightId);
      }
    }
    return e;
  }
  GetCardDataByFightId(t) {
    for (const e of this.pD1.values()) {
      if (e.FightId === t) {
        return e;
      }
    }
  }
  get MonsterCardLength() {
    let t = 0;
    for (const e of this.pD1.values()) {
      if (e.IsNormal) {
        t++;
      }
    }
    return t;
  }
  ClearHandData() {
    this.xD1.clear();
    this.Fcu.length = 0;
  }
  InitTaskData(t) {
    this.TaskData = new PhantomArenaCardTaskData_1.PhantomArenaCardTaskData(true);
    this.TaskData.SetTaskData(t);
  }
  RefreshTaskData(t) {
    if (this.TaskData) {
      this.TaskData.SetTaskData(t);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 10, "任务数据为空");
    }
  }
  InitFieldData() {
    this.FieldData = new PhantomArenaFieldData_1.PhantomArenaFieldData();
  }
  RefreshFieldLockData(t) {
    if (this.FieldData) {
      this.FieldData.SetSealRemainRound(t);
    }
  }
  InitRecycleData() {
    this.RecycleData = new PhantomArenaRecycleData_1.PhantomArenaRecycleData();
  }
  RefreshRecycleLockData(t, e = true) {
    if (this.RecycleData && (this.RecycleData.SealRemainRound = t, e)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OwnSealRecycleChange, t);
    }
  }
  get RecycleIsInSeal() {
    return this.RecycleData?.IsSeal ?? false;
  }
  GetHandIndexByCardId(t) {
    return this.Fcu.indexOf(t);
  }
  HasFourCostInHand() {
    for (const t of this.xD1.values()) {
      if (t.IsFourCost) {
        return true;
      }
    }
    return false;
  }
  SetPrevShowLife(t) {
    this.PrevShowLifeInternal = t;
  }
  get PrevShowLife() {
    return this.PrevShowLifeInternal;
  }
}
exports.PhantomArenaOwnData = PhantomArenaOwnData;
//# sourceMappingURL=PhantomArenaOwnData.js.map