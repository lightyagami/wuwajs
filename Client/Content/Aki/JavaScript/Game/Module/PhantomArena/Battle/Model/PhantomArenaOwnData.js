"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaOwnData = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const PhantomArenaCardTaskData_1 = require("./PhantomArenaCardTaskData");
const PhantomArenaSelectCardSaveData_1 = require("./PhantomArenaSelectCardSaveData");
const PhantomCardData_1 = require("./PhantomCardData");
class PhantomArenaOwnData {
  constructor() {
    this.RoleId = 0;
    this.FightId = 0;
    this.CardLibraryNum = 0;
    this.Eou = new Map();
    this.Iou = new Map();
    this.xD1 = new Map();
    this.rcu = [];
    this.pD1 = new Map();
    this.vD1 = new Map();
    this.TaskData = undefined;
    this.SelectCardSaveData = undefined;
    this.CanEvolveNum = 0;
    this.CanShowFourCostView = false;
    this.CoreCardId = 0;
    this.DiscardCardNum = 0;
    this.RequestCardId = 0;
    this.PrevShowLifeInternal = 0;
  }
  get BattleCardNum() {
    return this.pD1.size;
  }
  DD1(t) {
    this.pD1.set(t.CardId, t);
    this.vD1.set(t.Index, t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshBattleCardNum);
  }
  UD1(t) {
    var a = this.pD1.delete(t.CardId);
    var t = this.vD1.delete(t.Index);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshBattleCardNum);
    return a && t;
  }
  BD1(t) {
    var a = new PhantomCardData_1.PhantomCardData();
    a.InitData(t);
    this.xD1.set(a.CardId, a);
    this.rcu.push(a.CardId);
  }
  InitHandData(t) {
    this.ClearHandData();
    for (const a of t) {
      this.BD1(a);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "初始化手牌数据", ["Id", this.rcu]);
    }
  }
  RefreshHandData(t) {
    for (const e of t) {
      var a = this.xD1.get(e.$g1);
      if (a) {
        a.InitData(e);
      } else {
        this.BD1(e);
      }
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "刷新手牌数据", ["Id", this.rcu]);
    }
  }
  AddHandDataList(t) {
    var a = [];
    for (const e of t) {
      if (!this.xD1.get(e.$g1)) {
        this.BD1(e);
      }
      a.push(e.$g1);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "新增手牌数据", ["数据", a]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OwnHandCardAdd, a);
  }
  RemoveHandDataList(t) {
    for (const a of t) {
      this.RemoveHandCardByCardId(a);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "移除手牌数据", ["数据", t]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OwnHandCardRemove, t);
  }
  RemoveHandCardByCardId(t) {
    this.xD1.delete(t);
    var a = this.rcu.indexOf(t);
    if (a >= 0) {
      this.rcu.splice(a, 1);
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
    this.Eou.clear();
    this.Iou.clear();
    this.RoleId = t.Ng1;
    this.RefreshCardLibraryNum(t.jg1);
    this.RefreshCanEvolveNum(t.eC1);
    this.Hpu(t.Vg1);
    this.$pu(t.GY1);
  }
  $pu(t) {
    var a = [];
    for (const r of Object.keys(t)) {
      var e = Number(r);
      this.Iou.set(e, t[r]);
      a.push(e);
    }
  }
  Hpu(t) {
    var a = [];
    for (const r of Object.keys(t)) {
      var e = Number(r);
      this.Eou.set(e, t[r]);
      a.push(e);
    }
  }
  RefreshBattleStatus(t) {
    var a = [];
    for (const r of Object.keys(t)) {
      var e = Number(r);
      this.Eou.set(e, t[r]);
      a.push(e);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OwnBattleStatusChange, a);
  }
  RefreshBattleAttr(t) {
    var a = [];
    for (const r of Object.keys(t)) {
      var e = Number(r);
      this.Iou.set(e, t[r]);
      a.push(e);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OwnBattleAttrChange, a);
  }
  RefreshCanEvolveNum(t) {
    this.CanEvolveNum = t;
  }
  RefreshCardAttr(t, a) {
    for (const e of this.pD1.values()) {
      if (e.FightId === t) {
        e.RefreshFightAttr(a);
      }
    }
  }
  GetBattleStatusValue(t) {
    return this.Eou.get(t) ?? 0;
  }
  HandCardToFightCard(t, a) {
    this.RemoveHandCardByCardId(t.CardId);
    t.RefreshFightData(a);
    this.DD1(t);
  }
  FightCardToHandCard(t) {
    var a = this.pD1.get(t.$g1);
    this.UD1(a);
    a.InitData(t);
    this.xD1.set(a.CardId, a);
    this.rcu.push(a.CardId);
  }
  FightCardToRecycle(t) {
    var a = this.pD1.get(t.$g1);
    this.UD1(a);
    this.RefreshCardLibraryNum(t.aE1);
  }
  FightCardToFunctional(t) {
    t = this.pD1.get(t);
    this.UD1(t);
  }
  GetHandCardIdList() {
    return this.rcu;
  }
  GetHandCardDataByCardId(t) {
    return this.xD1.get(t);
  }
  GetBattleCardByCardId(t) {
    return this.pD1.get(t);
  }
  GetBattleCardDataList() {
    return Array.from(this.pD1.values());
  }
  GetHandCardDataList() {
    var t = [];
    for (const e of this.rcu) {
      var a = this.xD1.get(e);
      if (a) {
        t.push(a);
      }
    }
    return t;
  }
  NotifyExchangeBattleCard(t) {
    var a;
    var e = this.GetCardDataByFightId(t[0].lX1);
    if (e) {
      if (e && t[1] && e.Index !== t[1]._X1) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("PhantomArena", 10, "卡牌A位置不正确,不满足交换条件", ["AfterPos", t[0]._X1], ["Index", e.Index]);
        }
      } else if ((a = this.vD1.get(t[0]._X1)) && t[1] && a.FightId !== t[1].lX1) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("PhantomArena", 10, "卡牌B位置不正确,不满足交换条件", ["AfterPos", t[1]._X1], ["Index", a.Index]);
        }
      } else {
        this.ExchangeBattleCardData(t[0]._X1, e.Index);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NotifyBattleCardChange, false, e.Index, t[1]._X1);
      }
    }
  }
  ExchangeBattleCardData(t, a) {
    var e = this.vD1.get(a);
    var r = this.vD1.get(t);
    this.vD1.delete(a);
    this.vD1.delete(t);
    if (e) {
      e.Index = t;
      this.vD1.set(e.Index, e);
    }
    if (r) {
      r.Index = a;
      this.vD1.set(r.Index, r);
    }
  }
  EvolveBattleCardData(t, a) {
    this.RefreshCanEvolveNum(a.eC1);
    this.RefreshCardLibraryNum(a.jg1);
    var a = a.cC1;
    var e = a.Gg1.Qg1;
    var e = this.vD1.get(e);
    this.UD1(e);
    this.HandCardToFightCard(t, a);
  }
  HandCardToRecycle(t) {
    this.RemoveHandCardByCardId(t);
  }
  RefreshCardLibraryNum(t) {
    this.CardLibraryNum = t;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OwnCardLibraryChange);
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
  get BattleCardLength() {
    return this.pD1.size;
  }
  ClearHandData() {
    this.xD1.clear();
    this.rcu.length = 0;
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
  InitSelectCardSaveData(t) {
    this.SelectCardSaveData = new PhantomArenaSelectCardSaveData_1.PhantomArenaSelectCardSaveData();
    this.SelectCardSaveData.InitData(t.Iau, t.Jg1);
  }
  GetHandIndexByCardId(t) {
    return this.rcu.indexOf(t);
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