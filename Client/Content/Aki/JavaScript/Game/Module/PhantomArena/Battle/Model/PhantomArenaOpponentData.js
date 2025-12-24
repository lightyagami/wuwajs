"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaOpponentData = undefined;
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const PhantomArenaAiOperationFactory_1 = require("../Ai/PhantomArenaAiOperationFactory");
const PhantomArenaCardTaskData_1 = require("./PhantomArenaCardTaskData");
const PhantomArenaFieldData_1 = require("./PhantomArenaFieldData");
const PhantomArenaRecycleData_1 = require("./PhantomArenaRecycleData");
const PhantomCardData_1 = require("./PhantomCardData");
class PhantomArenaOpponentData {
  constructor() {
    this.RoleId = 0;
    this.FightId = 0;
    this.CardLibraryNum = 0;
    this.LastHandCardNum = 0;
    this.HandCardNum = 0;
    this.Xou = new Map();
    this.You = new Map();
    this.CanEvolveNum = 0;
    this.TaskData = undefined;
    this.FieldData = undefined;
    this.RecycleData = undefined;
    this.InitPromise = undefined;
    this.pD1 = new Map();
    this.vD1 = new Map();
    this.yD1 = [];
    this.IsFieldActive = false;
    this.PrevShowLifeInternal = 0;
  }
  CreateInitPromise() {
    this.InitPromise = new CustomPromise_1.CustomPromise();
  }
  InitPlayerData(t) {
    this.Xou.clear();
    this.You.clear();
    this.RoleId = t.Ng1;
    this.HandCardNum = t.Hg1;
    this.RefreshCardLibraryNum(t.jg1);
    this.RefreshCanEvolveNum(t.eC1);
    this.Vvu(t.Vg1);
  }
  InitNpcAiOperationData(t) {
    this.yD1 = [];
    for (const a of t) {
      this.SD1(a.vC1);
      this.MD1(a.yC1);
      this.ED1(a.eE1);
      this.ID1(a.pC1);
      this.TD1(a.tE1);
      this.bD1(a.iE1);
      this.RD1(a.rE1);
      this.LD1(a.oE1);
      this.wD1(a.nE1);
      this.AD1(a.sE1);
      this.hG1(a.J21);
      this.lG1(a.Z21);
      this.V81(a.N81);
      this.Wou(a.$ou);
      this.phu(a.Xau);
      this.Quu(a.xuu);
      this.CHm(a.rHm);
    }
    this.InitPromise?.SetResult(undefined);
    this.InitPromise = undefined;
  }
  GetNpcAiOperationList() {
    return this.yD1;
  }
  RefreshHandCardNum(t, a = true) {
    this.LastHandCardNum = this.HandCardNum;
    this.HandCardNum = t;
    if (a) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpponentHandCardChange);
    }
  }
  RefreshCardLibraryNum(t) {
    this.CardLibraryNum = t;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpponentCardLibraryChange);
  }
  RefreshCanEvolveNum(t) {
    this.CanEvolveNum = t;
  }
  Vvu(t) {
    var a = [];
    for (const r of Object.keys(t)) {
      var e = Number(r);
      this.Xou.set(e, t[r]);
      a.push(e);
    }
  }
  RefreshBattleStatus(t) {
    var a = [];
    for (const r of Object.keys(t)) {
      var e = Number(r);
      this.Xou.set(e, t[r]);
      a.push(e);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpponentBattleStatusChange, a);
  }
  RefreshBattleHpStatus(t, a) {
    this.Xou.set(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleLife, t);
    if (a) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpponentBattleStatusChange, [Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleLife]);
    }
  }
  RefreshBattleAttr(t) {
    var a = [];
    for (const r of Object.keys(t)) {
      var e = Number(r);
      this.You.set(e, t[r]);
      a.push(e);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpponentBattleAttrChange, a);
  }
  GetBattleStatusValue(t) {
    return this.Xou.get(t) ?? 0;
  }
  GetBattleBattleAttr(t) {
    return this.You.get(t) ?? 0;
  }
  RefreshCardAttr(t, a) {
    for (const e of this.pD1.values()) {
      if (e.FightId === t) {
        e.RefreshFightAttr(a);
      }
    }
    if (t === this.FieldData?.CardData?.FightId) {
      this.FieldData?.CardData.RefreshFightAttr(a);
    }
  }
  RemoveBattleCardDataByIndex(t) {
    t = this.vD1.get(t);
    return !!t && this.UD1(t);
  }
  UD1(t) {
    var a = this.pD1.delete(t.CardId);
    var t = this.vD1.delete(t.Index);
    return a && t;
  }
  SetBattleCardData(t) {
    var a = new PhantomCardData_1.PhantomCardData(true);
    a.RefreshFightData(t);
    this.RemoveBattleCardDataByIndex(a.Index);
    this.pD1.set(a.CardId, a);
    this.vD1.set(a.Index, a);
  }
  SetBattleCardDataList(t) {
    for (const a of t) {
      this.SetBattleCardData(a);
    }
  }
  NotifyExchangeBattleCard(t) {
    var a;
    var e = this.GetCardDataByFightId(t[0].dX1);
    if (e) {
      if (e && e.Index !== t[1]?.mX1) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("PhantomArena", 10, "卡牌A位置不正确,不满足交换条件", ["AfterPos", t[0].mX1], ["Index", e.Index]);
        }
      } else if ((a = this.vD1.get(t[0].mX1)) && a.FightId !== t[1]?.dX1) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("PhantomArena", 10, "卡牌B位置不正确,不满足交换条件", ["AfterPos", t[1].mX1], ["Index", a.Index]);
        }
      } else {
        this.ExchangeBattleCard(e.Index, t[0].mX1);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NotifyBattleCardChange, false, e.Index, t[1].mX1);
      }
    }
  }
  ExchangeBattleCard(t, a) {
    var e = this.vD1.get(t);
    var r = this.vD1.get(a);
    this.vD1.delete(t);
    this.vD1.delete(a);
    if (e) {
      e.Index = a;
      this.vD1.set(e.Index, e);
    }
    if (r) {
      r.Index = t;
      this.vD1.set(r.Index, r);
    }
  }
  BackToLibrary(t) {
    this.RefreshCardLibraryNum(t.aE1);
    this.RefreshHandCardNum(t.Hg1, false);
  }
  BackSlotCardToLibrary(t, a) {
    this.RemoveBattleCardDataByIndex(t);
    this.RefreshCardLibraryNum(a);
  }
  ReverseCard(t) {
    this.RefreshCardLibraryNum(t.aE1);
    this.RefreshHandCardNum(t.Hg1);
  }
  GetBattleCardIndexByCardId(t) {
    t = this.pD1.get(t);
    if (t) {
      return t.Index;
    } else {
      return -1;
    }
  }
  GetBattleCardIndexList(t) {
    var a = [];
    for (const e of this.pD1.values()) {
      if (t.includes(e.FightId)) {
        a.push(e.Index);
      }
    }
    return a;
  }
  GetBattleCardByCardId(t) {
    return this.pD1.get(t);
  }
  GetFightIdList(t) {
    var a = [];
    for (const r of t) {
      var e = this.pD1.get(r);
      if (e) {
        a.push(e.FightId);
      }
    }
    return a;
  }
  GetCardDataByFightId(t) {
    for (const a of this.pD1.values()) {
      if (a.FightId === t) {
        return a;
      }
    }
  }
  GetCardDataByIndex(t) {
    return this.vD1.get(t);
  }
  GetCardDataList() {
    return Array.from(this.pD1.values());
  }
  ClearHandData() {
    this.HandCardNum = 0;
  }
  InitTaskData(t) {
    this.TaskData = new PhantomArenaCardTaskData_1.PhantomArenaCardTaskData(false);
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
  RefreshFieldLockData(t, a = true) {
    if (this.FieldData && (this.FieldData.SetSealRemainRound(t), a)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpponentSealFieldChange, t);
    }
  }
  InitRecycleData() {
    this.RecycleData = new PhantomArenaRecycleData_1.PhantomArenaRecycleData();
  }
  RefreshRecycleLockData(t) {
    if (this.RecycleData) {
      this.RecycleData.SealRemainRound = t;
    }
  }
  CreatePhantomCardData(t, a) {
    var e = new PhantomCardData_1.PhantomCardData(true);
    e.InitDataByNpc(t, a);
    return e;
  }
  HasFourCostInHand() {
    if (!this.TaskData || !this.TaskData.IsAllFinish || !this.TaskData.IsExecuteFourCostLogic) {
      return false;
    }
    for (const t of this.pD1.values()) {
      if (t.IsFourCost) {
        return false;
      }
    }
    return true;
  }
  RemoveFightCardListToRecycle(t) {
    for (const e of t) {
      var a = this.pD1.get(e);
      this.UD1(a);
    }
  }
  SD1(t) {
    if (t) {
      t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(1, t);
      this.yD1.push(t);
    }
  }
  MD1(t) {
    if (t) {
      t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(2, t);
      this.yD1.push(t);
    }
  }
  ED1(t) {
    if (t) {
      t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(7, t);
      this.yD1.push(t);
    }
  }
  ID1(t) {
    if (t) {
      t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(5, t);
      this.yD1.push(t);
    }
  }
  TD1(t) {
    if (t) {
      t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(4, t);
      this.yD1.push(t);
    }
  }
  bD1(t) {
    if (t) {
      t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(3, t);
      this.yD1.push(t);
    }
  }
  RD1(t) {
    if (t) {
      t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(8, t);
      this.yD1.push(t);
    }
  }
  LD1(t) {
    if (t) {
      t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(9, t);
      this.yD1.push(t);
    }
  }
  wD1(t) {
    if (t) {
      t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(0, t);
      this.yD1.push(t);
    }
  }
  AD1(t) {
    if (t) {
      t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(6, t);
      this.yD1.push(t);
    }
  }
  hG1(t) {
    if (t) {
      t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(10, t);
      this.yD1.push(t);
    }
  }
  lG1(t) {
    if (t) {
      t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(11, t);
      this.yD1.push(t);
    }
  }
  V81(t) {
    if (t) {
      t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(12, t);
      this.yD1.push(t);
    }
  }
  Wou(t) {
    if (t) {
      t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(13, t);
      this.yD1.push(t);
    }
  }
  phu(t) {
    if (t) {
      t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(14, t);
      this.yD1.push(t);
    }
  }
  Quu(t) {
    if (t) {
      t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(15, t);
      this.yD1.push(t);
    }
  }
  CHm(t) {
    if (t) {
      t = PhantomArenaAiOperationFactory_1.PhantomArenaAiOperationFactory.GetAiOperation(16, t);
      this.yD1.push(t);
    }
  }
  SetPrevShowLife(t) {
    this.PrevShowLifeInternal = t;
  }
  get PrevShowLife() {
    return this.PrevShowLifeInternal;
  }
}
exports.PhantomArenaOpponentData = PhantomArenaOpponentData;
//# sourceMappingURL=PhantomArenaOpponentData.js.map