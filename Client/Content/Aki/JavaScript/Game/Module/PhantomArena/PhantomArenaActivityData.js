"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaActivityData = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const ActivityData_1 = require("../Activity/ActivityData");
const ActivityDefine_1 = require("../Activity/ActivityDefine");
const PhantomArenaDefine_1 = require("./PhantomArenaDefine");
const DeckInfo_1 = require("./Prepare/DeckBuilder/DeckInfo");
const OPENTIPKEY = 1;
class PhantomArenaActivityData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.C81 = new Map();
    this.mV1 = [];
    this.fV1 = [];
    this.p81 = new Map();
    this.MA1 = [];
    this.Jeu = new Map();
    this.Zeu = new Map();
    this.Kj1 = undefined;
    this.EA1 = new Map();
    this.Gdo = new Map();
    this.etu = new Map();
    this.IA1 = 0;
    this.$Tu = 0;
    this.GQm = 0;
    this.FQm = 0;
    this.CV1 = 0;
    this.pV1 = 0;
    this.vV1 = 0;
    this.Sbu = new Map();
    this.QY = new Map();
    this.Aou = new Map();
    this.fqt = 0;
    this.mMo = 0;
    this.CSu = 0;
    this.Qrf = new Map();
    this.yTf = new Set();
    this.NQm = 0;
  }
  PhraseEx(t) {
    this.mV1.length = 0;
    this.fV1.length = 0;
    this.p81.clear();
    this.MA1.length = 0;
    this.C81.clear();
    this.EA1.clear();
    this.Jeu.clear();
    this.etu.clear();
    this.Zeu.clear();
    this.Gdo.clear();
    this.Qrf.clear();
    var e;
    var i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleActivityConfig(this.Id);
    this.$Tu = i.FourCostCardCount;
    this.GQm = i.AreaCardCount;
    this.FQm = i.ItemCardMaxCount;
    this.CV1 = i.NormalCardCount;
    this.IA1 = this.$Tu + this.CV1 + this.GQm;
    this.pV1 = i.DeckLimit;
    this.vV1 = i.ElementMax;
    this.Sbu = i.CardMaxLimit;
    this.fqt = i.ShopItemId;
    this.mMo = i.ShopId;
    var i = t.h5n === Protocol_1.Aki.Protocol.uks.Proto_PhantomBattle ? t.cg1 : t.uFm;
    if (i) {
      if (t.h5n === Protocol_1.Aki.Protocol.uks.Proto_PhantomBattleRecord) {
        this.SetIfFirstOpen(false);
      }
      this.CSu = MathUtils_1.MathUtils.LongToNumber(i.rSu ?? 0) * TimeUtil_1.TimeUtil.Millisecond;
      if (t = i.ug1) {
        this.UpdateChallengeInfoList(t);
      }
      if (t = i.gg1) {
        this.UpdateCardList(t);
      }
      e = i.Cg1;
      if (t) {
        this.UpdateCardReward(e);
      }
      if (e = i.mg1) {
        this.UpdateBadgeList(e);
      }
      e = i.fg1;
      if (t) {
        this.UpdateBadgeReward(e);
      }
      if (t = i.vg1) {
        this.UpdateProtocolDeckInfoList(t);
      }
      if (e = i.dg1) {
        this.UpdateMasterInfo(e);
      }
      if (t = i.pg1) {
        this.UpdateRoleInfo(t);
      }
      if (e = i.E$s) {
        this.UpdateTaskInfo(e);
      }
      this.ZVu();
    }
  }
  ZVu() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaShopOpen);
  }
  UpdateChallengeInfoById(t, e, i, s) {
    var n = this.C81.get(t);
    if (n) {
      if (n.K6n !== e && e) {
        this.yTf.add(t);
      }
      n.K6n = e;
      n.Sg1 = i;
      n.qgf = s;
      ModelManager_1.ModelManager.PhantomArenaModel.SaveChallengeUnlockRedDotById(t, e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaChallengeUpdate);
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 75, "挑战进度更新失败，此挑战未初始化", ["ChallengeId", t]);
    }
  }
  UpdateChallengeInfoList(t) {
    this.C81.clear();
    this.Qrf.clear();
    for (const s of t) {
      var e = s.yg1;
      this.C81.set(e, s);
      var i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(e);
      if (i.IsShowEntrance) {
        if (!this.Qrf.has(i.Difficult)) {
          this.Qrf.set(i.Difficult, []);
        }
        this.Qrf.get(i.Difficult)?.push(e);
      }
      ModelManager_1.ModelManager.PhantomArenaModel.SaveChallengeUnlockRedDotById(e, s.K6n);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaChallengeUpdate);
  }
  UpdateProtocolDeckInfoList(t) {
    this.mV1 = t;
    this.fV1.length = 0;
    this.p81.clear();
    for (const i of t) {
      var e = this.CovertProtocolDeckInfoToClientDeckInfo(i);
      this.fV1.push(e);
      this.p81.set(i.c5n, e);
    }
  }
  AddProtocolDeckInfo(t) {
    this.mV1.push(t);
    var e = this.CovertProtocolDeckInfoToClientDeckInfo(t);
    this.fV1.push(e);
    this.p81.set(t.c5n, e);
  }
  DeleteProtocolDeckInfo(e) {
    var t = this.mV1.findIndex(t => t.c5n === e);
    if (t !== -1) {
      this.mV1.splice(t, 1);
    }
    if ((t = this.fV1.findIndex(t => t.GetDeckServerId() === e)) !== -1) {
      this.fV1.splice(t, 1);
    }
    this.p81.delete(e);
  }
  UpdateProtocolDeckInfo(t) {
    var e = t.c5n;
    this.mV1[e] = t;
    var t = this.CovertProtocolDeckInfoToClientDeckInfo(t);
    this.fV1[e] = t;
    this.p81.set(e, t);
  }
  RemoveProtocolDeckInfo(e) {
    var t = this.mV1.findIndex(t => t.c5n === e);
    if (t !== -1) {
      this.mV1.splice(t, 1);
    }
    var t = this.fV1.findIndex(t => t.GetDeckServerId() === e);
    if (t !== -1) {
      this.fV1.splice(t, 1);
    }
    this.p81.delete(e);
  }
  GetFieldCardSkillUnlockInfo(t) {
    for (const e of this.fV1) {
      if (e.GetFieldCardSkillUnlockInfo()?.J7n === t) {
        return e.GetFieldCardSkillUnlockInfo();
      }
    }
  }
  CovertProtocolDeckInfoToClientDeckInfo(t) {
    var e = this.CreateClientDeckInfo();
    for (const n of t.Ug1) {
      var i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(n);
      var i = {
        CardId: n,
        Cost: i.Cost,
        Element: i.Element,
        MaxCount: i.CardGroupNum,
        AddCount: 1,
        CardType: i.Type
      };
      if (e.AddCard(i) !== 0 && Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 43, "服务器同步的卡组数据不合规");
      }
    }
    e.SetDeckServerId(t.c5n);
    e.SetDeckName(t.H8n);
    e.SetCanUse(t.Dg1);
    for (const r of t.Gqm) {
      var s = r.J7n;
      if (ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(s).Type === 3) {
        e.SetFieldCardSkillUnlockInfo(r);
        break;
      }
    }
    return e;
  }
  CreateClientDeckInfo() {
    var t = new DeckInfo_1.DeckInfo();
    t.SetNormalCardCountLimit(this.CV1);
    t.SetCoreCardCountLimit(this.$Tu);
    t.SetFieldCardCountLimit(this.GQm);
    t.SetItemCardCountLimit(this.FQm);
    t.SetElementCountLimit(this.vV1);
    var e = this.Type === Protocol_1.Aki.Protocol.uks.Proto_PhantomBattleRecord ? 10142 : 10085;
    t.SetIsCoreCardSlotLocked(!ModelManager_1.ModelManager.FunctionModel.IsOpen(e));
    t.SetCoreCost(ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomArenaCardCoreCost());
    t.SetCostToMaxCardLimitMap(this.Sbu);
    return t;
  }
  ClearClientDeckInfoList() {
    this.fV1.length = 0;
  }
  AddDebugClientDeckInfo(t) {
    var e = this.CreateClientDeckInfo();
    for (const s of t) {
      var i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(s);
      var i = {
        CardId: s,
        Cost: i.Cost,
        Element: i.Element,
        MaxCount: i.CardGroupNum,
        AddCount: 1,
        CardType: i.Type
      };
      e.AddCard(i);
    }
    this.fV1.push(e);
  }
  UpdateCardList(t) {
    this.MA1 = t;
    this.EA1.clear();
    for (const e of t) {
      this.EA1.set(e.wg1, e);
    }
  }
  UpdateBadgeList(t) {
    this.etu.clear();
    for (const e of t) {
      this.etu.set(e.Ig1, e);
    }
  }
  AddCardListByNotify(t) {
    this.MA1.push(...t);
    for (const e of t) {
      this.EA1.set(e.wg1, e);
    }
    if (t.length !== 0) {
      t = t[0].wg1;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaCardRewardUpdate, this.Id);
    }
  }
  AddBadgeListByNotify(t) {
    for (const e of t) {
      this.etu.set(e.Ig1, e);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaBadgeRewardUpdate);
  }
  GetCardList() {
    return this.MA1;
  }
  GetCardInfo(t) {
    return this.EA1.get(t);
  }
  GetBadgeInfo(t) {
    return this.etu.get(t);
  }
  IsCardUnlock(t) {
    t = this.GetCardInfo(t);
    return !!t && t.K6n;
  }
  IsCardOutlookUnlock(t) {
    t = this.GetCardInfo(t);
    return !!t && t.Ag1;
  }
  IsBadgeUnlock(t) {
    t = this.GetBadgeInfo(t);
    return !!t && t.K6n;
  }
  OnCardOutlookUnlock(t) {
    var e = this.GetCardInfo(t);
    if (e) {
      e.Ag1 = true;
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaCardOutlookUnlock, t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaCardRewardUpdate, this.Id);
  }
  IsCardOutLookUnlock(t) {
    t = this.GetCardInfo(t);
    return !!t && t.Ag1;
  }
  GetMaxCardCountInDeck() {
    return this.IA1;
  }
  GetMaxCoreCardCountInDeck() {
    return this.$Tu;
  }
  GetMaxNormalCardCountInDeck() {
    return this.CV1;
  }
  GetClientDeckInfoList() {
    return this.fV1;
  }
  GetClientDeckInfo(t) {
    return this.p81.get(t);
  }
  CreateDeckInfoListFromProtocol() {
    var t = [];
    for (const e of this.mV1) {
      t.push(this.CovertProtocolDeckInfoToClientDeckInfo(e));
    }
    return t;
  }
  GetMaxDeckCount() {
    return this.pV1;
  }
  GetChallengeInfoById(t) {
    return this.C81.get(t);
  }
  GetDifficultChallengeIdsMap() {
    return this.Qrf;
  }
  GetFinishedChallengeCount() {
    let t = 0;
    for (const e of this.C81.values()) {
      if (e.Sg1) {
        t++;
      }
    }
    return t;
  }
  GetIsInLimitTime(t) {
    var e = this.CSu;
    if (e < TimeUtil_1.TimeUtil.GetServerTime()) {
      return [false, ""];
    } else {
      return [true, ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(e, t ?? "{0}") ?? ""];
    }
  }
  GetCurrentUnlockChallengeIds() {
    return this.yTf;
  }
  UpdateRoleInfo(t) {
    for (const e of t) {
      this.Gdo.set(e.xg1, e);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaRoleRewardUpdate, this.Id);
  }
  AddRoleInfo(t) {
    this.Gdo.set(t.xg1, t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaRoleRewardUpdate, this.Id);
  }
  OnRoleReward(t) {
    t = this.Gdo.get(t);
    if (t) {
      t.Rg1 = true;
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaRoleRewardUpdate, this.Id);
  }
  IsRoleUnlock(t) {
    t = this.Gdo.get(t);
    return t !== undefined && t.K6n;
  }
  IsRoleReward(t) {
    t = this.Gdo.get(t);
    return t !== undefined && t.Rg1;
  }
  GetExDataRedPointShowState() {
    return (!this.Type || !ActivityDefine_1.hideActivityTypeList.includes(this.Type)) && ModelManager_1.ModelManager.PhantomArenaModel.GetPhantomArenaActivityRedDot(this.Id);
  }
  GetExDataFinishShowState() {
    var t = this.GetFinishedChallengeCount();
    return this.C81.size === t;
  }
  UpdateCardReward(t) {
    this.Jeu.clear();
    for (const e of t) {
      this.Jeu.set(e.Pg1, e);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaCardRewardUpdate, this.Id);
  }
  UpdateBadgeReward(t) {
    this.Zeu.clear();
    for (const e of t) {
      this.Zeu.set(e.Tg1, e);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaBadgeRewardUpdate);
  }
  UpdateBadgeRewardByIds(t) {
    for (const i of t) {
      var e = this.Zeu.get(i);
      if (!e) {
        return;
      }
      e.Rg1 = true;
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaBadgeRewardUpdate);
  }
  GetCardRewardInfoById(t) {
    if (!this.Jeu.get(t)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 75, "获取卡牌奖励失败，奖励信息未初始化", ["奖励ID", t]);
      }
    }
    return this.Jeu.get(t);
  }
  UpdateCardRewardByIds(t) {
    for (const i of t) {
      var e = this.Jeu.get(i);
      if (!e) {
        return;
      }
      e.Rg1 = true;
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaCardRewardUpdate, this.Id);
  }
  GetBadgeRewardInfoById(t) {
    if (!this.Zeu.get(t)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 75, "获取徽章奖励失败，奖励信息未初始化", ["奖励ID", t]);
      }
    }
    return this.Zeu.get(t);
  }
  UpdateMasterInfo(t) {
    this.Kj1 = t;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaMasterInfoUpdate);
  }
  GetMasterLevel() {
    if (this.Kj1) {
      return this.Kj1.Mg1;
    } else {
      return 1;
    }
  }
  GetMasterTitleId() {
    var t;
    if (this.Kj1) {
      t = this.Kj1.Mg1;
      return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleMasterLevelByLevelAndActivityId(t, this.Id).TitleId;
    } else {
      return 1;
    }
  }
  GetMasterExp() {
    if (this.Kj1) {
      return this.Kj1?.U8n ?? 0;
    } else {
      return 0;
    }
  }
  GetMasterExpWeek() {
    return this.Kj1?.E51 ?? 0;
  }
  GetMasterLevelRewardTakenIds() {
    if (this.Kj1) {
      return this.Kj1.Eg1;
    } else {
      return [];
    }
  }
  GetMasterLevelRewardIfTaken(t) {
    return this.GetMasterLevelRewardTakenIds().includes(t);
  }
  UpdateMasterLevelByConfigId(t) {
    var e;
    if (!!this.Kj1 && !(e = this.Kj1.Eg1).includes(t)) {
      e.push(t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaMasterInfoUpdate);
    }
  }
  SetLastUsedDeckServerId(t) {
    if (this.Kj1) {
      this.Kj1.dK1 = t;
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 43, "设置召唤师上次使用的卡组失败，召唤师信息未初始化");
    }
  }
  GetLastUsedDeckServerId() {
    if (this.Kj1) {
      return this.Kj1.dK1;
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 43, "获取召唤师上次使用的卡组失败，召唤师信息未初始化");
      }
      return -1;
    }
  }
  GetLastUsedCardRoleId() {
    if (this.Kj1) {
      return this.Kj1.mK1;
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 43, "获取召唤师上次使用的角色失败，召唤师信息未初始化");
      }
      return -1;
    }
  }
  UpdateTaskInfo(t) {
    for (const i of t) {
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetTaskConfigById(i.s5n);
      if (e) {
        this.QY.set(i.s5n, i);
        if (!this.Aou.has(e.TaskType)) {
          if (e.TaskType === PhantomArenaDefine_1.SPECIAL_TASK_TABTYPE) {
            this.NQm = i.s5n;
          } else {
            this.Aou.set(e.TaskType, []);
          }
        }
        if (e.TaskType !== PhantomArenaDefine_1.SPECIAL_TASK_TABTYPE && !this.Aou.get(e.TaskType).includes(i.s5n)) {
          this.Aou.get(e.TaskType).push(i.s5n);
        }
      }
    }
    for (const s of this.Aou) {
      this.aoc(s[0]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaTaskAwardUpdate, this.Id);
  }
  aoc(t) {
    var e;
    if (this.Aou.get(t)) {
      (e = this.Aou.get(t)).sort((t, e) => {
        var i = this.QY.get(t);
        var s = this.QY.get(e);
        if (i.H6n === s.H6n) {
          return t - e;
        } else {
          return (i?.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish ? 0 : i?.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning ? 1 : 2) - (s?.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish ? 0 : s?.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning ? 1 : 2);
        }
      });
      this.Aou.set(t, e);
    }
  }
  UpdateTaskByIdList(t) {
    for (const i of t) {
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetTaskConfigById(i);
      this.QY.get(i).H6n = Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken;
      this.aoc(e.TaskType);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaTaskAwardUpdate, this.Id);
  }
  GetTaskTabMap() {
    return this.Aou;
  }
  GetTaskMap() {
    return this.QY;
  }
  GetSpecialTask() {
    var t = this.QY.get(this.NQm);
    if (t) {
      return t;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 71, "特殊任务不存在", ["SpecialTaskId", this.NQm]);
    }
  }
  GetAllCanReceiveTaskIdsByTabId(t) {
    var t = this.Aou.get(t);
    var e = [];
    if (t) {
      for (const s of t) {
        var i = this.QY.get(s);
        if (i && i.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish) {
          e.push(s);
        }
      }
    }
    return e;
  }
  GetCurrencyId() {
    return this.fqt;
  }
  GetShopId() {
    return this.mMo;
  }
  get RecommendQuestId() {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleActivityConfig(this.Id).RecommendQuestId;
  }
  get RecommendQuestTips() {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleActivityConfig(this.Id).RecommendQuestTips;
  }
  GetActivityTipNeedShowState() {
    return !!this.CheckIfInOpenTime() && !!this.CheckIfInShowTime() && ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, OPENTIPKEY, 0, 0) === 0;
  }
  CacheActivityTipShowState() {
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, OPENTIPKEY, 0, 0, 1);
  }
  GetExternalButtonRedPointState() {
    if (this.Type === Protocol_1.Aki.Protocol.uks.Proto_PhantomBattleRecord) {
      return ModelManager_1.ModelManager.PhantomArenaModel.GetPermanentPhantomArenaActivityRedDot(this.Id);
    } else {
      return ModelManager_1.ModelManager.PhantomArenaModel.GetPhantomArenaActivityRedDot(this.Id);
    }
  }
  GetExternalButtonRedPointId() {
    return this.Id;
  }
}
exports.PhantomArenaActivityData = PhantomArenaActivityData;
//# sourceMappingURL=PhantomArenaActivityData.js.map