"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityPermanentRogueModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const RogueResCollectionByIdKey_1 = require("../../../Core/Define/ConfigQuery/RogueResCollectionByIdKey");
const RogueResDungeonConfigById_1 = require("../../../Core/Define/ConfigQuery/RogueResDungeonConfigById");
const RogueResEndAll_1 = require("../../../Core/Define/ConfigQuery/RogueResEndAll");
const RogueResEndAwardById_1 = require("../../../Core/Define/ConfigQuery/RogueResEndAwardById");
const RogueResEndById_1 = require("../../../Core/Define/ConfigQuery/RogueResEndById");
const RogueResTalentTreeById_1 = require("../../../Core/Define/ConfigQuery/RogueResTalentTreeById");
const RogueResTaskThemeById_1 = require("../../../Core/Define/ConfigQuery/RogueResTaskThemeById");
const RogueResThemeAll_1 = require("../../../Core/Define/ConfigQuery/RogueResThemeAll");
const RogueResThemeById_1 = require("../../../Core/Define/ConfigQuery/RogueResThemeById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const ActivityPermanentRogueController_1 = require("./ActivityPermanentRogueController");
const ALL_SEASON_ID = 0;
class ActivityPermanentRogueModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.SelectSkillId = 0;
    this.N6c = new Map();
    this.Nw1 = new Map();
    this.Rs1 = new Map();
    this.X_1 = new Map();
    this.Ls1 = 0;
    this.SortTaskData = (e, t) => e.Status === t.Status ? e.Id - t.Id : this.kB1(e.Status) - this.kB1(t.Status);
  }
  OnInit() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("RogueTaskView", ActivityPermanentRogueModel.cvd, "ActivityPermanentRogueModel.CanOpenTaskView");
    return true;
  }
  OnClear() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("RogueTaskView", ActivityPermanentRogueModel.cvd);
    return true;
  }
  GetActivityData() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityById(ActivityPermanentRogueController_1.ActivityPermanentRogueController.ActivityId);
  }
  GetNewSeasonId() {
    return this.GetActivityData().GetNewSeasonId();
  }
  InitCurrency(e) {
    this.N6c.clear();
    for (const o of Object.keys(e)) {
      var t = Number(o);
      var r = e[o];
      this.N6c.set(t, e[o]);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerCurrencyChange, t);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("RogueBattle", 37, "[MapRogue] 常驻肉鸽货币初始化", ["ItemId", t], ["ItemId", r]);
      }
    }
    this.Nw1.clear();
    for (const n of RogueResThemeAll_1.configRogueResThemeAll.GetConfigList()) {
      this.Nw1.set(n.SkillItem, n.Id);
    }
  }
  UpdateCurrency(e, t) {
    for (const i of Object.keys(e)) {
      var r = Number(i);
      var o = e[i];
      var n = this.N6c.get(r);
      if (this.Nw1.has(r)) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PermanentRogueSkillCurrencyRedDotUpdate, this.Nw1.get(r));
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PermanentRogueSeasonRedDotUpdate, this.Nw1.get(r));
      }
      if (n !== undefined) {
        this.N6c.set(r, n + o);
      } else {
        this.N6c.set(r, o);
      }
      var a = ModelManager_1.ModelManager.MapRogueModel.GameInfo;
      if (a) {
        if (a.InBattle) {
          if (o > 0) {
            ControllerHolder_1.ControllerHolder.ItemHintController.AddRoguelikeItemList(r, o);
          }
        } else if (t && ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig().ShowCurrencyChangeEventType.includes(t)) {
          ModelManager_1.ModelManager.MapRogueModel.GameInfo?.PushGetItemData(r, o);
        }
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerCurrencyChange, r);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("RogueBattle", 37, "[MapRogue] 常驻肉鸽货币变更", ["ItemId", r], ["ItemId", n ?? 0 + o]);
      }
    }
  }
  GetCurrency(e) {
    return this.N6c.get(e) ?? 0;
  }
  GetSeasonHelpId(e) {
    e = RogueResThemeById_1.configRogueResThemeById.GetConfig(e);
    if (e) {
      return e.HelpId;
    }
  }
  GetMapNoteShowState() {
    var e = ActivityPermanentRogueController_1.ActivityPermanentRogueController.GetCurrentActivityData();
    return !!e && !!e.IsUnLock() && !!e.GetPreGuideQuestFinishState() && !(e = this.GetNewSeasonId(), e = this.GetLatestDungeon(e), ModelManager_1.ModelManager.ExchangeRewardModel?.IsFinishInstance(e));
  }
  GetCurrentSelectedInst(e) {
    return (LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResDungeonSelected) ?? undefined)?.get(e) ?? 0;
  }
  SetCurrentSelectedInst(e) {
    var t;
    var r = RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(e);
    if (r) {
      (t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResDungeonSelected) ?? new Map()).set(r.SeasonId, e);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResDungeonSelected, t);
    }
  }
  GetTokenCount(e) {
    var t = this.GetActivityData();
    var r = [0, 0];
    var o = t.GetAllIllustratedState();
    var t = t.GetTokenIndexSet(e);
    r[1] = t.size;
    for (const n of t) {
      r[0] += o.get(n) !== Protocol_1.Aki.Protocol.zps.Z6n ? 1 : 0;
    }
    return r;
  }
  GetEventCount(e, t) {
    var r = this.GetActivityData();
    var o = [0, 0];
    var n = r.GetAllIllustratedState();
    var t = t ? r.GetNormalIndexSet(e) : r.GetMapIndexSet(e);
    o[1] = t.size;
    for (const a of t) {
      o[0] += n.get(a) !== Protocol_1.Aki.Protocol.zps.Z6n ? 1 : 0;
    }
    return o;
  }
  GetTypeIllustratedCountInfo() {
    var e = new Map();
    for (const r of this.GetActivityData().GetAllIllustratedState()) {
      var t = RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(r[0]);
      if (t) {
        t = t.Type;
        if (!e.get(t)) {
          e.set(t, [0, 0]);
        }
        e.get(t)[1]++;
        e.get(t)[0] += r[1] === Protocol_1.Aki.Protocol.zps.Z6n ? 0 : 1;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Activity", 77, "未找到肉鸽图鉴配置", ["collectId", r[0]]);
      }
    }
    return e;
  }
  GetTokenTipsData(e) {
    var t;
    if (this.X_1.get(e)) {
      return this.X_1.get(e);
    } else {
      (t = new Protocol_1.Aki.Protocol.MIc()).lIc = new Protocol_1.Aki.Protocol.lIc();
      t.lIc.dws = false;
      t.lIc.v9n = e;
      this.X_1.set(e, t);
      return t;
    }
  }
  CheckIllustratedRedDot() {
    return this.GetActivityData().IsIllustratedReward();
  }
  GetTokenIndexSet(e) {
    var t = this.GetActivityData();
    if (e) {
      return t.GetTokenIndexSet(e.Id);
    } else {
      return t.GetTokenIndexSet(ALL_SEASON_ID);
    }
  }
  GetNormalIndexSet(e) {
    var t = this.GetActivityData();
    if (e) {
      return t.GetNormalIndexSet(e.Id);
    } else {
      return t.GetNormalIndexSet(ALL_SEASON_ID);
    }
  }
  GetMapIndexSet(e) {
    var t = this.GetActivityData();
    if (e) {
      return t.GetMapIndexSet(e.Id);
    } else {
      return t.GetMapIndexSet(ALL_SEASON_ID);
    }
  }
  GetCollectItemState(e) {
    return this.GetActivityData().GetCollectItemState(e);
  }
  GetHaveTokenAward(e) {
    var t = this.GetActivityData();
    var e = t.GetTokenIndexSet(e);
    var r = t.GetAllIllustratedState();
    for (const o of e) {
      if (r.get(o) === Protocol_1.Aki.Protocol.zps.CMs) {
        return true;
      }
    }
    return false;
  }
  GetHaveNormalAward(e) {
    var t = this.GetActivityData();
    var e = t.GetNormalIndexSet(e);
    var r = t.GetAllIllustratedState();
    for (const o of e) {
      if (r.get(o) === Protocol_1.Aki.Protocol.zps.CMs) {
        return true;
      }
    }
    return false;
  }
  GetHaveMapAward(e) {
    var t = this.GetActivityData();
    var e = t.GetMapIndexSet(e);
    var r = t.GetAllIllustratedState();
    for (const o of e) {
      if (r.get(o) === Protocol_1.Aki.Protocol.zps.CMs) {
        return true;
      }
    }
    return false;
  }
  GetTaskIsEnd() {
    return MathUtils_1.MathUtils.LongToNumber(this.GetTaskEndTime()) < TimeUtil_1.TimeUtil.GetServerTime();
  }
  GetTaskEndTime() {
    return this.GetActivityData().TaskEndTime;
  }
  GetTaskCount() {
    var e = [0, 0];
    var t = this.GetActivityData();
    if (t.GetTaskThemeId()) {
      var r = RogueResTaskThemeById_1.configRogueResTaskThemeById.GetConfig(t.GetTaskThemeId());
      if (r) {
        for (const n of r.TabNames) {
          var o = t.GetTaskListByType(n[0]);
          e[1] += o.length;
          for (const a of o) {
            e[0] += t.GetTaskById(a).Status === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning ? 0 : 1;
          }
        }
      }
    }
    return e;
  }
  GetTaskProgressByType(e) {
    let t = 0;
    e = this.GetTaskListById(e);
    if (e.length === 0) {
      return 0;
    }
    var r = this.GetActivityData();
    for (const n of e) {
      var o = r.GetTaskById(n).Status;
      t += o === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning ? 0 : 1;
    }
    return t / e.length * 100;
  }
  GetTaskListById(e) {
    return this.GetActivityData().GetTaskListByType(e);
  }
  GetTaskById(e) {
    return this.GetActivityData().GetTaskById(e);
  }
  GetTaskDataListById(e) {
    var t = this.GetTaskListById(e);
    var r = [];
    for (const e of t) {
      var o = this.GetTaskById(e);
      r.push(o);
    }
    return r;
  }
  CheckAllTaskRedDot() {
    return !this.GetTaskIsEnd() && (this.GetCacheTaskOpen() <= TimeUtil_1.TimeUtil.GetServerTime() || this.GetActivityData().IsTaskReward());
  }
  CheckTaskRedDot(e) {
    if (this.KJu(e)) {
      return true;
    }
    for (const t of this.GetTaskListById(e)) {
      if (this.GetTaskById(t).Status === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish) {
        return true;
      }
    }
    return false;
  }
  KJu(e) {
    return e === 4 && this.GetActivityData()?.GetFirstCheckRedDotState(1);
  }
  kB1(e) {
    switch (e) {
      case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken:
        return 2;
      case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish:
        return 0;
      default:
        return 1;
    }
  }
  GetTaskRoleList() {
    var e = this.GetActivityData().GetTaskThemeId();
    return RogueResTaskThemeById_1.configRogueResTaskThemeById.GetConfig(e)?.RoleImage ?? [];
  }
  GetCacheTaskOpen() {
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResTaskOpen) ?? undefined;
    return e || -1;
  }
  SetCacheTaskOpen() {
    var e = MathUtils_1.MathUtils.LongToNumber(this.GetTaskEndTime());
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResTaskOpen, e);
  }
  GetCacheDungeonNewest(e) {
    return (LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResDungeonNewest) ?? undefined)?.get(e) ?? undefined;
  }
  SetCacheDungeonNewest(e) {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResDungeonNewest) ?? new Map();
    var r = this.GetLatestDungeon(e);
    t.set(e, r);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResDungeonNewest, t);
  }
  CheckDungeonRedDot(e) {
    var t = this.GetCacheDungeonNewest(e);
    return !t || t !== this.GetLatestDungeon(e);
  }
  GetLatestDungeon(e) {
    let t = 0;
    for (const r of RogueResThemeById_1.configRogueResThemeById.GetConfig(e).Insts) {
      if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(r) && (t = r, !ModelManager_1.ModelManager.ExchangeRewardModel?.IsFinishInstance(r))) {
        return r;
      }
    }
    return t;
  }
  GetInstDungeonState(e) {
    var t = this.GetInstDungeonEndingReachedCount(e);
    var r = this.Rs1.get(e)?.size ?? 0;
    if (r === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RogueBattle", 77, "副本未配置结局数据！", ["instId", e]);
      }
      return 0;
    } else if (t === r) {
      return 2;
    } else if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(e)) {
      return 1;
    } else {
      return 0;
    }
  }
  GetInstDungeonEndingTotalCount(e) {
    return this.Rs1.get(e).size;
  }
  GetInstDungeonEndingReachedCount(e) {
    if (!this.Rs1.get(e)) {
      for (const a of RogueResEndAll_1.configRogueResEndAll.GetConfigList()) {
        var t = a.InstId;
        if (!this.Rs1.get(t)) {
          this.Rs1.set(t, new Set());
        }
        this.Rs1.get(t)?.add(a.Id);
      }
    }
    let r = 0;
    var o = this.GetActivityData();
    var n = RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(e).SeasonId;
    if (!this.Rs1.get(e)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RogueBattle", 77, "未找到副本相关结局", ["InstId", e]);
      }
      return 0;
    }
    for (const i of this.Rs1.get(e)) {
      r += o.GetEndingReachedById(n, i) ? 1 : 0;
    }
    return r;
  }
  GetLatestDungeonIndex(e) {
    var t = RogueResThemeById_1.configRogueResThemeById.GetConfig(e)?.Insts;
    var e = this.GetLatestDungeon(e);
    return t.indexOf(e);
  }
  GetSkillTreeLevel(e) {
    var t = this.GetActivityData().GetSeasonDataById(e).Mqs;
    let r = 0;
    for (const o of Object.keys(t)) {
      r += t[o] > 0 ? t[o] : 0;
    }
    return r;
  }
  GetSkillDict(e) {
    return this.GetActivityData().GetSeasonDataById(e).Mqs;
  }
  GetSkillLevelById(e) {
    var t = this.GetActivityData();
    var r = RogueResTalentTreeById_1.configRogueResTalentTreeById.GetConfig(e);
    return t.GetSeasonDataById(r.SeasonId).Mqs[e];
  }
  GetNextCanUnlockSkillId(e) {
    let t = 0;
    var r = this.GetActivityData().GetSeasonDataById(e).Mqs;
    var e = RogueResThemeById_1.configRogueResThemeById.GetConfig(e);
    var o = this.GetCurrency(e.SkillItem);
    for (const a of Object.keys(r)) {
      var n = r[a];
      if (n === 0) {
        t = Number(a);
        if (RogueResTalentTreeById_1.configRogueResTalentTreeById.GetConfig(Number(a)).Consule[0] <= o) {
          return t;
        }
      }
      if (t === 0) {
        t = Number(a);
      }
    }
    return t;
  }
  GetCacheSkillTreeOpen(e) {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResSkillTreeOpen) ?? undefined;
    return !!t && t.has(e);
  }
  SetCacheSkillTreeOpen(e) {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResSkillTreeOpen) ?? new Set();
    t.add(e);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResSkillTreeOpen, t);
  }
  CheckSkillTreeRedDot(e) {
    if (e) {
      if (!this.GetCacheSkillTreeOpen(e)) {
        return true;
      }
      var t = RogueResThemeById_1.configRogueResThemeById.GetConfig(e);
      if (t) {
        var r = this.GetCurrency(t.SkillItem);
        var o = this.GetActivityData().GetSeasonDataById(e).Mqs;
        for (const a of Object.keys(o)) {
          var n = o[a];
          if (n === 0) {
            if (RogueResTalentTreeById_1.configRogueResTalentTreeById.GetConfig(Number(a)).Consule[n] <= r) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  UpdateSkillTreeUnlockState(e) {
    this.GetActivityData().UpgradeSkill(e, 0);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueResTalentLevelUp, e);
  }
  GetShopCount(e) {
    var t = [this.GetTotalShopItem(e), 0];
    var e = RogueResThemeById_1.configRogueResThemeById.GetConfig(e);
    t[1] = e?.PointItemMax ?? 0;
    return t;
  }
  CheckShopRedDot(e) {
    if (!e) {
      return false;
    }
    var t = RogueResThemeById_1.configRogueResThemeById.GetConfig(e);
    if (!t) {
      return false;
    }
    var r = [];
    var o = [];
    for (const a of ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(t.ShopId)) {
      var n = a.GetGoodsData();
      if (n.GetIfCanBuy()) {
        o.push(n.Id);
      }
      r.push(n.Id);
    }
    r.sort((e, t) => e - t);
    return !this.GetCacheShopNewGoods(e, r.toString()) || (o.sort((e, t) => e - t), !this.GetCacheShopOpen(e, o.toString()));
  }
  RefreshShopRedDot(e) {
    var t = RogueResThemeById_1.configRogueResThemeById.GetConfig(e);
    var r = [];
    var o = [];
    for (const a of ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(t.ShopId)) {
      var n = a.GetGoodsData();
      if (n.GetIfCanBuy()) {
        o.push(n.Id);
      }
      r.push(n.Id);
    }
    r.sort((e, t) => e - t);
    o.sort((e, t) => e - t);
    this.SetCacheShopOpen(e, o.toString());
    this.SetCacheShopNewGoods(e, r.toString());
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PermanentRogueSeasonRedDotUpdate, e);
  }
  UpdateTotalShopItem(e, t) {
    this.GetActivityData().UpdateTotalShopItem(e, t);
  }
  GetTotalShopItem(e) {
    return this.GetActivityData().GetTotalShopItem(e);
  }
  GetCacheShopOpen(e, t) {
    var r = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResShopRefresh) ?? undefined;
    return !!r && (r.get(e) ?? "") === t;
  }
  SetCacheShopOpen(e, t) {
    var r = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResShopRefresh) ?? new Map();
    r.set(e, t);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResShopRefresh, r);
  }
  GetCacheShopNewGoods(e, t) {
    var r = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResShopNewGoods) ?? undefined;
    return !!r && (r.get(e) ?? "") === t;
  }
  SetCacheShopNewGoods(e, t) {
    var r = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResShopNewGoods) ?? new Map();
    r.set(e, t);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResShopNewGoods, r);
  }
  SetEndingAwardData(e) {
    this.GetActivityData().UpdateEndingAward(e);
  }
  GetEndingAwardViewData(e) {
    e = [...this.GetEndingAwardList(e)];
    const n = e => {
      switch (e) {
        case 2:
          return 2;
        case 1:
          return 0;
        default:
          return 1;
      }
    };
    e.sort((e, t) => {
      var r;
      var o;
      if (e.RewardState === t.RewardState) {
        r = RogueResEndAwardById_1.configRogueResEndAwardById.GetConfig(e.Id);
        o = RogueResEndAwardById_1.configRogueResEndAwardById.GetConfig(t.Id);
        return r.Index - o.Index;
      } else {
        return n(e.RewardState) - n(t.RewardState);
      }
    });
    return {
      DataPageList: [{
        DataList: e,
        TabName: MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Rogue_End_S1_Task_Title"),
        TabTips: " "
      }],
      Source: "Collection"
    };
  }
  GetEndingAwardList(e) {
    return this.GetActivityData().GetEndingAwardList(e);
  }
  GetEndingAwardCount(e) {
    var e = this.GetEndingAwardList(e);
    var t = [0, e?.length ?? 0];
    if (e) {
      for (const r of e) {
        t[0] += r.RewardState === 0 ? 0 : 1;
      }
    }
    return t;
  }
  CheckEndingAwardRedDot(e) {
    e = this.GetEndingAwardList(e);
    if (e) {
      for (const t of e) {
        if (t.RewardState === 1) {
          return true;
        }
      }
    }
    return false;
  }
  GetEndingCount(e) {
    var t = this.GetActivityData();
    var r = [0, 0];
    var o = this.GetEndingListBySeasonId(e);
    r[1] = o.length;
    for (const n of o) {
      r[0] += t.GetEndingReachedById(e, n) ? 1 : 0;
    }
    return r;
  }
  SetEndingMainSelectedIndex(e) {
    this.Ls1 = e;
  }
  GetEndingMainSelectedIndex() {
    return this.Ls1;
  }
  GetEndingListBySeasonId(e) {
    var t = [];
    for (const r of RogueResEndAll_1.configRogueResEndAll.GetConfigList()) {
      if (r.SeasonId === e) {
        t.push(r.Id);
      }
    }
    return t;
  }
  GetEndingIsUnlock(e) {
    var t = RogueResEndById_1.configRogueResEndById.GetConfig(e).SeasonId;
    return this.GetActivityData().GetEndingReachedById(t, e);
  }
  GetCacheEndingOpen(e) {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResEndingOpen) ?? undefined;
    return !!t && t.has(e);
  }
  SetCacheEndingOpen(e) {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResEndingOpen) ?? new Set();
    t.add(e);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResEndingOpen, t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueResEndingRedDotUpdate);
  }
  GetTrailRole(e, t) {
    e = this.GetActivityData().GetSeasonDataById(e);
    if (t === 0) {
      return e?.WBc ?? [];
    } else {
      return e?.QBc ?? [];
    }
  }
  GetTrailRemainTime(e) {
    var e = this.GetActivityData().GetSeasonDataById(e);
    var e = MathUtils_1.MathUtils.LongToNumber(e.dps);
    var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ActivityRemainingTime");
    return ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(e, t);
  }
  GetTrailEndTime(e) {
    e = this.GetActivityData().GetSeasonDataById(e);
    return MathUtils_1.MathUtils.LongToNumber(e.dps);
  }
  GetCacheTrailOpen(e) {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResTrialOpen) ?? undefined;
    if (t) {
      return t.get(e);
    } else {
      return -1;
    }
  }
  SetCacheTrailOpen(e) {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResTrialOpen) ?? new Map();
    var r = this.GetActivityData().GetSeasonDataById(e);
    var r = MathUtils_1.MathUtils.LongToNumber(r.dps);
    t.set(e, r);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResTrialOpen, t);
  }
  CheckTrialRedDot(e) {
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    return this.GetCacheTrailOpen(e) <= t;
  }
}
(exports.ActivityPermanentRogueModel = ActivityPermanentRogueModel).cvd = (e, t) => !ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTaskIsEnd();
//# sourceMappingURL=ActivityPermanentRogueModel.js.map