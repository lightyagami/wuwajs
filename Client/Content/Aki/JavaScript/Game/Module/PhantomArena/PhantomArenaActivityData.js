"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaActivityData = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ActivityData_1 = require("../Activity/ActivityData"),
  DeckInfo_1 = require("./Prepare/DeckBuilder/DeckInfo"),
  OPENTIPKEY = 1;
class PhantomArenaActivityData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments), this.k51 = new Map, this.O41 = [], this.q41 = [], this.O51 = new Map, this.Kw1 = [], this.PZ1 = new Map, this.xZ1 = new Map, this.dj1 = void 0, this.Xw1 = new Map, this.Gdo = new Map, this.UZ1 = new Map, this.Yw1 = 0, this.Hcu = 0, this.F41 = 0, this.N41 = 0, this.V41 = 0, this.sdu = new Map, this.QY = new Map, this.ptu = new Map, this.fqt = 0, this.mMo = 0, this.Y1u = 0
  }
  PhraseEx(t) {
    this.O41.length = 0, this.q41.length = 0, this.O51.clear(), this.Kw1.length = 0, this.k51.clear(), this.Xw1.clear(), this.PZ1.clear(), this.UZ1.clear(), this.xZ1.clear(), this.Gdo.clear();
    var e, i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleActivityConfig(this.Id),
      i = (this.Hcu = i.FourCostCardCount, this.F41 = i.NormalCardCount, this.Yw1 = this.Hcu + this.F41, this.N41 = i.DeckLimit, this.V41 = i.ElementMax, this.sdu = i.CardMaxLimit, this.fqt = i.ShopItemId, this.mMo = i.ShopId, t.Vf1);
    i && (this.Y1u = MathUtils_1.MathUtils.LongToNumber(i.F1u ?? 0) * TimeUtil_1.TimeUtil.Millisecond, (t = i.jf1) && this.UpdateChallengeInfoList(t), (t = i.Qf1) && this.UpdateCardList(t), e = i.Kf1, t && this.UpdateCardReward(e), (e = i.$f1) && this.UpdateBadgeList(e), e = i.Wf1, t && this.UpdateBadgeReward(e), (t = i.Yf1) && this.UpdateProtocolDeckInfoList(t), (e = i.Hf1) && this.UpdateMasterInfo(e), (t = i.Xf1) && this.UpdateRoleInfo(t), (e = i.E$s) && this.UpdateTaskInfo(e), this.Ugu())
  }
  Ugu() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaShopOpen)
  }
  UpdateChallengeInfoById(t, e, i) {
    var s = this.k51.get(t);
    s ? (s.K6n = e, s.Jf1 = i, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaChallengeUpdate)) : Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 75, "挑战进度更新失败，此挑战未初始化", ["ChallengeId", t])
  }
  UpdateChallengeInfoList(t) {
    this.k51.clear();
    for (const e of t) this.k51.set(e.zf1, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaChallengeUpdate)
  }
  UpdateProtocolDeckInfoList(t) {
    this.O41 = t, this.q41.length = 0, this.O51.clear();
    for (const i of t) {
      var e = this.CovertProtocolDeckInfoToClientDeckInfo(i);
      this.q41.push(e), this.O51.set(i.c5n, e)
    }
  }
  AddProtocolDeckInfo(t) {
    this.O41.push(t);
    var e = this.CovertProtocolDeckInfoToClientDeckInfo(t);
    this.q41.push(e), this.O51.set(t.c5n, e)
  }
  DeleteProtocolDeckInfo(e) {
    var t = this.O41.findIndex(t => t.c5n === e); - 1 !== t && this.O41.splice(t, 1), -1 !== (t = this.q41.findIndex(t => t.GetDeckServerId() === e)) && this.q41.splice(t, 1), this.O51.delete(e)
  }
  UpdateProtocolDeckInfo(t) {
    var e = t.c5n,
      t = (this.O41[e] = t, this.CovertProtocolDeckInfoToClientDeckInfo(t));
    this.q41[e] = t, this.O51.set(e, t)
  }
  RemoveProtocolDeckInfo(e) {
    var t = this.O41.findIndex(t => t.c5n === e),
      t = (-1 !== t && this.O41.splice(t, 1), this.q41.findIndex(t => t.GetDeckServerId() === e)); - 1 !== t && this.q41.splice(t, 1), this.O51.delete(e)
  }
  CovertProtocolDeckInfoToClientDeckInfo(t) {
    var e = this.CreateClientDeckInfo();
    for (const s of t._g1) {
      var i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(s),
        i = {
          CardId: s,
          Cost: i.Cost,
          Element: i.Element,
          MaxCount: i.CardGroupNum,
          AddCount: 1
        };
      0 !== e.AddCard(i) && Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 43, "服务器同步的卡组数据不合规")
    }
    return e.SetDeckServerId(t.c5n), e.SetDeckName(t.H8n), e.SetCanUse(t.cg1), e
  }
  CreateClientDeckInfo() {
    var t = new DeckInfo_1.DeckInfo;
    return t.SetNormalCardCountLimit(this.F41), t.SetCoreCardCountLimit(this.Hcu), t.SetElementCountLimit(this.V41), t.SetIsCoreCardSlotLocked(!ModelManager_1.ModelManager.FunctionModel.IsOpen(10085)), t.SetCoreCost(ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomArenaCardCoreCost()), t.SetCostToMaxCardLimitMap(this.sdu), t
  }
  ClearClientDeckInfoList() {
    this.q41.length = 0
  }
  AddDebugClientDeckInfo(t) {
    var e = this.CreateClientDeckInfo();
    for (const s of t) {
      var i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(s),
        i = {
          CardId: s,
          Cost: i.Cost,
          Element: i.Element,
          MaxCount: i.CardGroupNum,
          AddCount: 1
        };
      e.AddCard(i)
    }
    this.q41.push(e)
  }
  UpdateCardList(t) {
    this.Kw1 = t, this.Xw1.clear();
    for (const e of t) this.Xw1.set(e.sg1, e)
  }
  UpdateBadgeList(t) {
    this.UZ1.clear();
    for (const e of t) this.UZ1.set(e.tg1, e)
  }
  AddCardListByNotify(t) {
    this.Kw1.push(...t);
    for (const e of t) this.Xw1.set(e.sg1, e);
    0 !== t.length && (t = t[0].sg1, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, t), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaCardRewardUpdate))
  }
  AddBadgeListByNotify(t) {
    for (const e of t) this.UZ1.set(e.tg1, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaBadgeRewardUpdate)
  }
  GetCardList() {
    return this.Kw1
  }
  GetCardInfo(t) {
    return this.Xw1.get(t)
  }
  GetBadgeInfo(t) {
    return this.UZ1.get(t)
  }
  IsCardUnlock(t) {
    t = this.GetCardInfo(t);
    return !!t && t.K6n
  }
  IsCardOutlookUnlock(t) {
    t = this.GetCardInfo(t);
    return !!t && t.ag1
  }
  IsBadgeUnlock(t) {
    t = this.GetBadgeInfo(t);
    return !!t && t.K6n
  }
  OnCardOutlookUnlock(t) {
    var e = this.GetCardInfo(t);
    e && (e.ag1 = !0), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaCardOutlookUnlock, t), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaCardRewardUpdate)
  }
  IsCardOutLookUnlock(t) {
    t = this.GetCardInfo(t);
    return !!t && t.ag1
  }
  GetMaxCardCountInDeck() {
    return this.Yw1
  }
  GetMaxCoreCardCountInDeck() {
    return this.Hcu
  }
  GetMaxNormalCardCountInDeck() {
    return this.F41
  }
  GetClientDeckInfoList() {
    return this.q41
  }
  GetClientDeckInfo(t) {
    return this.O51.get(t)
  }
  CreateDeckInfoListFromProtocol() {
    var t = [];
    for (const e of this.O41) t.push(this.CovertProtocolDeckInfoToClientDeckInfo(e));
    return t
  }
  GetMaxDeckCount() {
    return this.N41
  }
  GetChallengeInfoById(t) {
    return this.k51.get(t)
  }
  GetIsInLimitTime(t) {
    var e = this.Y1u;
    return e < TimeUtil_1.TimeUtil.GetServerTime() ? [!1, ""] : [!0, ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(e, t ?? "{0}") ?? ""]
  }
  UpdateRoleInfo(t) {
    for (const e of t) this.Gdo.set(e.lg1, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaRoleRewardUpdate)
  }
  AddRoleInfo(t) {
    this.Gdo.set(t.lg1, t), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaRoleRewardUpdate)
  }
  OnRoleReward(t) {
    t = this.Gdo.get(t);
    t && (t.og1 = !0), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaRoleRewardUpdate)
  }
  IsRoleUnlock(t) {
    t = this.Gdo.get(t);
    return void 0 !== t && t.K6n
  }
  IsRoleReward(t) {
    t = this.Gdo.get(t);
    return void 0 !== t && t.og1
  }
  GetExDataRedPointShowState() {
    return ModelManager_1.ModelManager.PhantomArenaModel.GetPhantomArenaActivityRedDot()
  }
  UpdateCardReward(t) {
    this.PZ1.clear();
    for (const e of t) this.PZ1.set(e.hg1, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaCardRewardUpdate)
  }
  UpdateBadgeReward(t) {
    this.xZ1.clear();
    for (const e of t) this.xZ1.set(e.ig1, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaBadgeRewardUpdate)
  }
  UpdateBadgeRewardByIds(t) {
    for (const i of t) {
      var e = this.xZ1.get(i);
      if (!e) return;
      e.og1 = !0
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaBadgeRewardUpdate)
  }
  GetCardRewardInfoById(t) {
    return this.PZ1.get(t) || Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 75, "获取卡牌奖励失败，奖励信息未初始化", ["奖励ID", t]), this.PZ1.get(t)
  }
  UpdateCardRewardByIds(t) {
    for (const i of t) {
      var e = this.PZ1.get(i);
      if (!e) return;
      e.og1 = !0
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaCardRewardUpdate)
  }
  GetBadgeRewardInfoById(t) {
    return this.xZ1.get(t) || Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 75, "获取徽章奖励失败，奖励信息未初始化", ["奖励ID", t]), this.xZ1.get(t)
  }
  UpdateMasterInfo(t) {
    this.dj1 = t, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaMasterInfoUpdate)
  }
  GetMasterInfo() {
    return this.dj1 || Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 75, "获取召唤师信息失败，召唤师信息未初始化"), this.dj1
  }
  GetMasterLevel() {
    var t;
    return this.dj1 ? (t = this.dj1.Zf1, ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleMasterLevelConfigById(t).Level) : (Log_1.Log.CheckWarn() && Log_1.Log.Warn("PhantomArena", 75, "获取召唤师等级失败，召唤师信息未初始化或活动未开启"), 1)
  }
  GetMasterTitleId() {
    var t;
    return this.dj1 ? (t = this.dj1.Zf1, ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleMasterLevelConfigById(t).TitleId) : (Log_1.Log.CheckWarn() && Log_1.Log.Warn("PhantomArena", 75, "获取召唤师称号失败，召唤师信息未初始化或活动未开启"), 1)
  }
  GetMasterExp() {
    return this.dj1 ? this.dj1?.U8n ?? 0 : (Log_1.Log.CheckWarn() && Log_1.Log.Warn("PhantomArena", 75, "获取召唤师经验失败，召唤师信息未初始化或活动未开启"), 0)
  }
  GetMasterExpWeek() {
    return this.dj1 || Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 75, "获取每周经验失败，召唤师信息未初始化"), this.dj1?.V61 ?? 0
  }
  GetMasterLevelRewardTakenIds() {
    return this.dj1 ? this.dj1.eg1 : (Log_1.Log.CheckWarn() && Log_1.Log.Warn("PhantomArena", 75, "获取召唤师等级奖励领取信息失败，未初始化或活动未开启"), [])
  }
  GetMasterLevelRewardIfTaken(t) {
    return this.GetMasterLevelRewardTakenIds().includes(t)
  }
  UpdateMasterLevelByConfigId(t) {
    var e;
    !this.dj1 || (e = this.dj1.eg1).includes(t) || (e.push(t), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaMasterInfoUpdate))
  }
  SetLastUsedDeckServerId(t) {
    this.dj1 ? this.dj1.IQ1 = t : Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 43, "设置召唤师上次使用的卡组失败，召唤师信息未初始化")
  }
  GetLastUsedDeckServerId() {
    return this.dj1 ? this.dj1.IQ1 : (Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 43, "获取召唤师上次使用的卡组失败，召唤师信息未初始化"), -1)
  }
  GetLastUsedCardRoleId() {
    return this.dj1 ? this.dj1.TQ1 : (Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 43, "获取召唤师上次使用的角色失败，召唤师信息未初始化"), -1)
  }
  UpdateTaskInfo(t) {
    for (const i of t) {
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetTaskConfigById(i.s5n);
      e && (this.QY.set(i.s5n, i), this.ptu.has(e.TaskType) || this.ptu.set(e.TaskType, []), this.ptu.get(e.TaskType).includes(i.s5n) || this.ptu.get(e.TaskType).push(i.s5n))
    }
    for (const s of this.ptu) this.aoc(s[0]);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaTaskAwardUpdate)
  }
  aoc(t) {
    var e;
    this.ptu.get(t) && ((e = this.ptu.get(t)).sort((t, e) => {
      var i = this.QY.get(t),
        s = this.QY.get(e);
      return i.H6n === s.H6n ? t - e : (i?.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish ? 0 : i?.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning ? 1 : 2) - (s?.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish ? 0 : s?.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning ? 1 : 2)
    }), this.ptu.set(t, e))
  }
  UpdateTaskById(t) {
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetTaskConfigById(t);
    this.QY.get(t).H6n = Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken, this.aoc(e.TaskType), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaTaskAwardUpdate)
  }
  GetTaskTabMap() {
    return this.ptu
  }
  GetTaskMap() {
    return this.QY
  }
  GetCurrencyId() {
    return this.fqt
  }
  GetShopId() {
    return this.mMo
  }
  get RecommendQuestId() {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleActivityConfig(this.Id).RecommendQuestId
  }
  get RecommendQuestTips() {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleActivityConfig(this.Id).RecommendQuestTips
  }
  GetActivityTipNeedShowState() {
    return !(!this.CheckIfInOpenTime() || !this.CheckIfInShowTime()) && 0 === ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, OPENTIPKEY, 0, 0)
  }
  CacheActivityTipShowState() {
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, OPENTIPKEY, 0, 0, 1)
  }
}
exports.PhantomArenaActivityData = PhantomArenaActivityData;
//# sourceMappingURL=PhantomArenaActivityData.js.map