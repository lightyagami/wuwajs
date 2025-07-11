"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const DropPackageById_1 = require("../../../Core/Define/ConfigQuery/DropPackageById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const TowerDefenceInstanceById_1 = require("../../../Core/Define/ConfigQuery/TowerDefenceInstanceById");
const TowerDefencePhantomAll_1 = require("../../../Core/Define/ConfigQuery/TowerDefencePhantomAll");
const TowerDefenceRewardAll_1 = require("../../../Core/Define/ConfigQuery/TowerDefenceRewardAll");
const TowerDefenceRewardById_1 = require("../../../Core/Define/ConfigQuery/TowerDefenceRewardById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ActivityData_1 = require("../Activity/ActivityData");
const TowerDefenceController_1 = require("./TowerDefenceController");
const TowerDefenceDefine_1 = require("./TowerDefenceDefine");
const TowerDefenceInstanceByInstanceId_1 = require("../../../Core/Define/ConfigQuery/TowerDefenceInstanceByInstanceId");
const TowerDefencePhantomById_1 = require("../../../Core/Define/ConfigQuery/TowerDefencePhantomById");
const TowerDefencePhantomLevelByGroupId_1 = require("../../../Core/Define/ConfigQuery/TowerDefencePhantomLevelByGroupId");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const EditFormationDefine_1 = require("../EditFormation/EditFormationDefine");
const TowerDefenseRankGlobalData_1 = require("./Rank/TowerDefenseRankGlobalData");
class TowerDefenseModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.fZs = new Map();
    this.IsUiFlowOpen = false;
    this.IsPhantomViewOpened = false;
    this.Uka = undefined;
    this.pZs = [];
    this.PhantomMessageCache = new ParsedTowerDefenseMsg();
    this.CurrentSelfPhantomIdInUiTemp = TowerDefenceDefine_1.DEFAULT_ID;
    this.SelfReviveTargetTimestampForUi = undefined;
    this.PhantomOwnerDataList = [];
    this.RoleCfgId2PhantomIdMapCache = new Map();
    this.DelayedEndNotify = undefined;
    this.TimerCacheInBattle = new Map();
    this.RankData = new TowerDefenseRankGlobalData_1.TowerDefenseRankGlobalData();
    this.vZs = (e, t) => e.Id - t.Id;
    this.Vil = (e, t) => e.RewardState === t.RewardState ? e.Id - t.Id : e.RewardState === 1 ? -1 : t.RewardState === 1 ? 1 : e.RewardState === 0 ? -1 : t.RewardState === 0 ? 1 : 0;
  }
  get IsEnterInActivityClicked() {
    if (this.Uka === undefined) {
      let e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.TowerDefenseEntered);
      if (e === undefined) {
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.TowerDefenseEntered, false);
        e = false;
      }
      this.Uka = e;
    }
    return this.Uka;
  }
  set IsEnterInActivityClicked(e) {
    if (this.Uka !== e) {
      this.Uka = e;
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.TowerDefenseEntered, e);
    }
  }
  get PhantomConfigCache() {
    return this.fZs;
  }
  get SortedPhantomConfigCache() {
    return this.pZs;
  }
  OnInit() {
    this.ICa();
    this.ResetCurrentPhantomIdInUiTempToFirstAvailable();
    this.ResetPhantomOwnerDataList();
    return true;
  }
  OnLeaveLevel() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("TowerDefense", 64, "标记真正的离开场景时机，用于还原数据");
    }
    this.PhantomMessageCache.OwnPhantomInBattleDataCache.clear();
    return true;
  }
  ICa() {
    for (const n of TowerDefencePhantomAll_1.configTowerDefencePhantomAll.GetConfigList()) {
      var e = [];
      var t = TowerDefencePhantomLevelByGroupId_1.configTowerDefencePhantomLevelByGroupId.GetConfigList(n.SkillGroup);
      if (t !== undefined) {
        for (const o of t) {
          var r = {
            Name: o.Title,
            Description: o.Description,
            ExpThreshold: o.ExpLevel
          };
          e.push(r);
        }
        t = {
          Id: n.Id,
          PhantomItemId: n.PhantomItemId,
          ActivityId: n.ActivityId,
          PhantomNameTextId: n.PhantomName,
          PhantomTypeTextId: n.TypeTextId,
          TypeIconPath: ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(n.TypeIcon) ?? "",
          MarkResourceId: n.MarkHex,
          SkillDataList: e,
          MaxLevel: e.length
        };
        this.fZs.set(n.Id, t);
        this.pZs.push(t);
      }
    }
    this.pZs.sort(this.vZs);
  }
  GetCurrentPhantomIdInBattle() {
    var e = TowerDefenceController_1.TowerDefenseController.GetCurrentSceneTeamItem();
    var t = e.GetPlayerId();
    var e = e.GetConfigId;
    var r = this.GetOwnerData(t, e);
    if (r) {
      if (r.PhantomId <= 0 && Log_1.Log.CheckError()) {
        Log_1.Log.Error("TowerDefense", 64, "塔防战斗中获取声骸ID失败：未赋值声骸", ["PlayerID", t], ["RoleCfgID", e], ["Owner Data", r]);
      }
      return r.PhantomId;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("TowerDefense", 64, "塔防战斗中获取声骸ID失败：未获取OwnerData", ["PlayerID", t], ["RoleCfgID", e], ["Owner Data", r]);
      }
      return TowerDefenceDefine_1.DEFAULT_ID;
    }
  }
  SZs(e) {
    var t = this.fZs.get(e);
    if (t) {
      return t.SkillDataList;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("TowerDefense", 64, "未能获得塔防声骸技能配置", ["TowerDefensePhantomId", e]);
      }
      return [];
    }
  }
  GetCurrentPhantomSkillCfgListInBattle() {
    var e = this.GetCurrentPhantomIdInBattle();
    return this.SZs(e);
  }
  GetCurrentPhantomSkillDescriptionArgsInBattle() {
    var e = this.GetCurrentPhantomIdInBattle();
    return TowerDefenceController_1.TowerDefenseController.GetPhantomSkillDescriptionArgsByPhantomId(e);
  }
  GetCurrentPhantomLevelInBattle() {
    var e = this.GetCurrentPhantomIdInBattle();
    var e = this.PhantomMessageCache.OwnPhantomInBattleDataCache.get(e);
    if (e) {
      return e.F6n;
    } else {
      return 1;
    }
  }
  GetCurrentPhantomExpPairInBattle() {
    var e = this.GetCurrentPhantomIdInBattle();
    var t = this.PhantomMessageCache.OwnPhantomInBattleDataCache.get(e);
    var r = {
      Exp: 0,
      Threshold: 0
    };
    if (t) {
      var n = this.fZs.get(t.s5n);
      if (!n) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("TowerDefense", 64, "战斗中声骸ID，协议与配置不匹配，以协议ID找不到配置数据", ["协议声骸ID", t.s5n]);
        }
        return r;
      }
      var o = t.F6n;
      let e = 0;
      if (o >= 1 && n.MaxLevel > 1) {
        e = (n.MaxLevel === t.F6n ? n.SkillDataList[o - 2] : n.SkillDataList[o - 1]).ExpThreshold ?? 0;
      }
      r.Exp = n.MaxLevel === t.F6n ? e : t.U8n;
      r.Threshold = e;
    } else {
      o = this.fZs.get(e);
      if (!o) {
        return r;
      }
      r.Exp = 0;
      r.Threshold = o.SkillDataList[0].ExpThreshold ?? 0;
    }
    return r;
  }
  GetCurrentPhantomNameTextId() {
    var e = this.GetCurrentPhantomIdInBattle();
    var e = TowerDefencePhantomById_1.configTowerDefencePhantomById.GetConfig(e);
    if (e) {
      return e.PhantomName;
    } else {
      return "";
    }
  }
  GetCurrentPhantomSkillCfgTemp() {
    return this.SZs(this.CurrentSelfPhantomIdInUiTemp);
  }
  GetOrCreateParsedTowerDefenseMsg() {
    this.PhantomMessageCache ||= new ParsedTowerDefenseMsg();
    return this.PhantomMessageCache;
  }
  GetProtocolPhantomIdList(e) {
    if (TowerDefenceController_1.TowerDefenseController.CheckInUiFlow() || TowerDefenceController_1.TowerDefenseController.CheckInInstanceDungeon()) {
      var t = [];
      var r = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
      for (const o of e) {
        var n = this.GetOwnerData(r, o);
        t.push(n.PhantomId);
      }
      return t;
    }
  }
  GetPreviewRewardCount() {
    let e = 0;
    let t = 0;
    for (const r of TowerDefenceRewardAll_1.configTowerDefenceRewardAll.GetConfigList()) {
      if (r.ActivityId === this.PhantomMessageCache.Id) {
        if (this.PhantomMessageCache.GetScoreRewardStateById(r.Id) === 2) {
          e++;
        }
        t++;
      }
    }
    for (const n of this.PhantomMessageCache.StageListCache) {
      if (this.PhantomMessageCache.GetPassRewardStateById(n.Id) === 2) {
        e++;
      }
      t++;
    }
    return [e, t];
  }
  GetPreviewRewardData() {
    var e = [];
    for (const T of TowerDefenceRewardAll_1.configTowerDefenceRewardAll.GetConfigList()) {
      if (T.ActivityId === this.PhantomMessageCache.Id) {
        var t;
        var r;
        var n = [];
        for ([t, r] of DropPackageById_1.configDropPackageById.GetConfig(T.RewardId).DropPreview) {
          n.push([{
            ItemId: t,
            IncId: 0
          }, r]);
        }
        var o = this.PhantomMessageCache.GetScoreRewardStateById(T.Id);
        var o = {
          Id: T.Id,
          NameText: "",
          NameTextId: "ConditionGroup_12100402_HintText",
          NameTextArgs: [T.Score.toString()],
          RewardList: n,
          RewardState: o,
          RewardButtonText: this.Vea(o),
          RewardButtonRedDot: o === 1,
          ClickFunction: () => {
            TowerDefenceController_1.TowerDefenseController.RequestScoreReward(T.Id);
          }
        };
        e.push(o);
      }
    }
    e.sort(this.Vil);
    var i = [];
    var a = [];
    for (const I of this.PhantomMessageCache.StageListCache) {
      var s;
      var f;
      var c = [];
      var h = TowerDefenceInstanceById_1.configTowerDefenceInstanceById.GetConfig(I.Id);
      var D = h.InstanceId;
      var l = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(D);
      var l = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(l.MapName);
      var d = h.RewardId;
      for ([s, f] of DropPackageById_1.configDropPackageById.GetConfig(d).DropPreview) {
        c.push([{
          ItemId: s,
          IncId: 0
        }, f]);
      }
      d = this.PhantomMessageCache.GetPassRewardStateById(I.Id);
      D = {
        Id: D,
        NameText: "",
        NameTextId: h.IsDifficult ? "TowerDefenceclear" : "ConditionGroup_12100401_HintText",
        NameTextArgs: h.IsDifficult ? [l] : [l, h.RewardScore.toString()],
        RewardList: c,
        RewardState: d,
        RewardButtonText: this.Vea(d),
        RewardButtonRedDot: d === 1,
        ClickFunction: () => {
          TowerDefenceController_1.TowerDefenseController.RequestInstanceReward(I.Id);
        }
      };
      (h.IsDifficult ? a : i).push(D);
    }
    i.sort(this.Vil);
    a.sort(this.Vil);
    var _ = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("TowerDefenceFullPoint");
    var _ = _ ? StringUtils_1.StringUtils.Format(_, this.PhantomMessageCache.TotalScore.toString()) : "";
    var w = [];
    if (i.length > 0) {
      w.push({
        TabName: MultiTextLang_1.configMultiTextLang.GetLocalTextNew("TowerDefenceLevelRewardText"),
        TabTips: _,
        DataList: i
      });
    }
    if (e.length > 0) {
      w.push({
        TabName: MultiTextLang_1.configMultiTextLang.GetLocalTextNew("TowerDefenceScoreRewardText"),
        TabTips: _,
        DataList: e
      });
    }
    if (a.length > 0) {
      w.push({
        TabName: MultiTextLang_1.configMultiTextLang.GetLocalTextNew("PrefabTextItem_1347286118_Text"),
        TabTips: _,
        DataList: a
      });
    }
    var _ = {
      DataPageList: w,
      Source: "TowerDefence"
    };
    return _;
  }
  Vea(e) {
    switch (e) {
      case 2:
      case 1:
        return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("TowerDefence_Getbt1") ?? "";
      case 0:
        return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("TowerDefence_Getbt3") ?? "";
      default:
        return "";
    }
  }
  ResetCurrentPhantomIdInUiTempToFirstAvailable() {
    for (const t of this.pZs) {
      if (t.ActivityId === this.PhantomMessageCache.Id) {
        let e = false;
        for (const r of this.PhantomOwnerDataList) {
          if (r.PhantomId === t.Id) {
            e = true;
            break;
          }
        }
        if (!e) {
          this.CurrentSelfPhantomIdInUiTemp = t.Id;
          return;
        }
      }
    }
    this.CurrentSelfPhantomIdInUiTemp = TowerDefenceDefine_1.DEFAULT_ID;
  }
  ResetPhantomOwnerDataList() {
    for (let e = this.PhantomOwnerDataList.length = 0; e < EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; e++) {
      this.PhantomOwnerDataList.push({
        PlayerId: ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
        IsSelf: true,
        RoleCfgId: TowerDefenceDefine_1.DEFAULT_ID,
        RoleSkinId: TowerDefenceDefine_1.DEFAULT_ID,
        PhantomId: TowerDefenceDefine_1.DEFAULT_ID
      });
    }
  }
  ResetPhantomOwnerDataByIndex(e) {
    this.PhantomOwnerDataList[e].PlayerId = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    this.PhantomOwnerDataList[e].IsSelf = true;
    this.PhantomOwnerDataList[e].RoleCfgId = TowerDefenceDefine_1.DEFAULT_ID;
    this.PhantomOwnerDataList[e].RoleSkinId = TowerDefenceDefine_1.DEFAULT_ID;
    this.PhantomOwnerDataList[e].PhantomId = TowerDefenceDefine_1.DEFAULT_ID;
  }
  ResetAllCache() {
    this.CurrentSelfPhantomIdInUiTemp = TowerDefenceDefine_1.DEFAULT_ID;
    for (let e = 0; e < this.PhantomOwnerDataList.length; e++) {
      this.ResetPhantomOwnerDataByIndex(e);
    }
    this.RoleCfgId2PhantomIdMapCache.clear();
  }
  ResetPhantomOwnerDataByConfigId(t) {
    for (let e = 0; e < this.PhantomOwnerDataList.length; e++) {
      var r = this.PhantomOwnerDataList[e];
      if (r.IsSelf && r.RoleCfgId === t) {
        this.ResetPhantomOwnerDataByIndex(e);
        break;
      }
    }
    this.RoleCfgId2PhantomIdMapCache.delete(t);
  }
  ResetTimerCacheInBattle() {
    for (var [, e] of this.TimerCacheInBattle) {
      for (var [, t] of e) {
        t.Remove();
      }
      e.clear();
    }
    this.TimerCacheInBattle.clear();
  }
  TryAddTimerInBattle(e, t, r) {
    var n;
    if (e !== undefined) {
      if (!this.TimerCacheInBattle.has(t)) {
        this.TimerCacheInBattle.set(t, new Map());
      }
      if ((n = this.TimerCacheInBattle.get(t)).has(r) && (n.get(r).Remove(), Log_1.Log.CheckError())) {
        Log_1.Log.Error("TowerDefense", 64, "同一玩家的同一角色已经有timer用于复活倒计时，其将被停止，用新timer取代", ["playerId", t], ["roleId", r]);
      }
      n.set(r, e);
    }
  }
  TryRemoveTimerInBattle(e, t) {
    var r = this.TimerCacheInBattle.get(e);
    if (r !== undefined) {
      if (t === undefined) {
        for (const [, n] of r) {
          n.Remove();
        }
        this.TimerCacheInBattle.delete(e);
      } else {
        const n = r.get(t);
        if (n !== undefined && (n.Remove(), r.delete(t), r.size === 0)) {
          this.TimerCacheInBattle.delete(e);
        }
      }
    }
  }
  CheckHasReward() {
    return this.CheckHasPassReward() || this.CheckHasScoreReward();
  }
  CheckHasScoreReward() {
    var e = TowerDefenceRewardAll_1.configTowerDefenceRewardAll.GetConfigList();
    var t = this.PhantomMessageCache;
    for (const r of e) {
      if (r.ActivityId === this.PhantomMessageCache.Id && t.TotalScore >= r.Score && !t.ScoreRewardCache.has(r.Id)) {
        return true;
      }
    }
    return false;
  }
  CheckHasPassReward() {
    for (const t of this.PhantomMessageCache.StageListCache) {
      var e = TowerDefenceInstanceById_1.configTowerDefenceInstanceById.GetConfig(t.Id);
      if (e === undefined) {
        return false;
      }
      if (e.IsDifficult) {
        if (t.Passed && !t.Rewarded) {
          return true;
        }
      } else if (t.RecordOverThreshold && !t.Rewarded) {
        return true;
      }
    }
    return false;
  }
  CheckHasNewStage() {
    var e = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    for (const t of this.PhantomMessageCache.StageListCache) {
      if (t.UnlockTime < e && !t.Passed) {
        return true;
      }
    }
    return false;
  }
  fUc(e) {
    let t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.TowerDefenseNewLevel);
    if (t) {
      return t.get(e) ?? false;
    } else {
      t = new Map();
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.TowerDefenseNewLevel, t);
      return false;
    }
  }
  CheckTowerDefenseInstanceHasRedDot(e) {
    return !!ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(e) && !ModelManager_1.ModelManager.TowerDefenseModel.fUc(e);
  }
  SetLevelHasClickByInstanceId(t) {
    let e = false;
    for (const n of this.PhantomMessageCache.StageListCache) {
      var r = TowerDefenceInstanceById_1.configTowerDefenceInstanceById.GetConfig(n.Id)?.InstanceId ?? 0;
      if (r && r === t) {
        if (!ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(t)) {
          return;
        }
        e = true;
        break;
      }
    }
    if (e) {
      let e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.TowerDefenseNewLevel);
      (e = e || new Map()).set(t, true);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.TowerDefenseNewLevel, e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.PhantomMessageCache.Id);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChallengeInstanceRedDot, t);
    }
  }
  HasNotClickNewLevel() {
    if (this.PhantomMessageCache.GetPreGuideQuestFinishState()) {
      for (const t of this.PhantomMessageCache.StageListCache) {
        var e = TowerDefenceInstanceById_1.configTowerDefenceInstanceById.GetConfig(t.Id)?.InstanceId ?? 0;
        if (e && this.CheckTowerDefenseInstanceHasRedDot(e)) {
          return true;
        }
      }
    }
    return false;
  }
  CheckPhantomAvailableInActivityByActivityId(e) {
    return e === this.PhantomMessageCache.Id;
  }
  CheckCurrentActivityShowDifferent() {
    var e = this.GetCurrentActivityConfig();
    if (e) {
      return e.ShowDifferent;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("TowerDefense", 10, "塔防活动配置数据为空", ["ActivityId", this.PhantomMessageCache.Id]);
      }
      return false;
    }
  }
  CheckPhantomIsOccupied(e) {
    for (const t of this.PhantomOwnerDataList) {
      if (t.PhantomId !== TowerDefenceDefine_1.DEFAULT_ID && t.PhantomId === e) {
        return true;
      }
    }
    return false;
  }
  GetOwnerData(e, t) {
    for (const r of this.PhantomOwnerDataList) {
      if (r.PlayerId === e && r.RoleCfgId === t) {
        return r;
      }
    }
  }
  GetOwnerDataListByPlayerId(e) {
    var t = [];
    for (const r of this.PhantomOwnerDataList) {
      if (r.PlayerId === e) {
        t.push(r);
      }
    }
    return t;
  }
  GetCurrentActivityConfig() {
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig?.GetTowerDefenseConfigByActivityId(this.PhantomMessageCache.Id);
    if (e) {
      return e;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("TowerDefense", 10, "塔防活动配置数据为空", ["ActivityId", this.PhantomMessageCache.Id]);
    }
  }
  GetSortedByTitleEntranceInstanceIdList() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceInstanceIdList;
    if (e) {
      var t = new Map();
      for (const n of e) {
        var r = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseInstanceByInstance(n);
        t.set(n, r.GroupId);
      }
      return t;
    }
  }
  GetInstanceUnlockState(e, t) {
    t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseConfigById(t);
    if (!this.PhantomMessageCache.IsStageUnLocked(t.InstanceId)) {
      return false;
    }
    if (e !== 0) {
      t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseConfigById(e);
      if (!ModelManager_1.ModelManager.TowerDefenseModel.PhantomMessageCache.IsPassedInstance(t.InstanceId)) {
        return false;
      }
    }
    return true;
  }
}
exports.TowerDefenseModel = TowerDefenseModel;
class ParsedTowerDefenseMsg extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.ScoreRewardCache = new Map();
    this.StageListCache = [];
    this.StageMapCache = new Map();
    this.OwnPhantomInBattleDataCache = new Map();
    this.OwnPhantomInBattleNewLevelUpFlagCache = new Map();
    this.TotalScore = 0;
  }
  OnInit(e) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TowerDefenseDataInit);
  }
  PhraseEx(e) {
    var t = e.pzs;
    if (t) {
      this.ParseTowerDefenseActivityData(t);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("TowerDefense", 64, "塔防数据为空，请确认活动协议类型是否正确", ["ActivityId", e.s5n], ["ActivityType", e.h5n]);
    }
  }
  GetExDataRedPointShowState() {
    return TowerDefenceController_1.TowerDefenseController.CheckHasNewStage() || TowerDefenceController_1.TowerDefenseController.CheckHasReward();
  }
  ParseTowerDefenseActivityData(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("TowerDefense", 64, "解析塔防活动数据", ["data", e]);
    }
    this.ScoreRewardCache.clear();
    this.TotalScore = 0;
    for (const r of e.Szs) {
      var t = TowerDefenceRewardById_1.configTowerDefenceRewardById.GetConfig(r);
      this.ScoreRewardCache.set(r, t);
    }
    this.ParseTowerDefenseInstanceDataList(e.Mzs);
    this.TotalScore = e.Yma;
  }
  ParseTowerDefenseInstanceDataList(e, t = true) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("TowerDefense", 64, "解析塔防关卡数据", ["dataList", e], ["是否全量更新", t]);
    }
    if (t) {
      this.TotalScore = 0;
      this.StageListCache.length = 0;
      this.StageMapCache.clear();
      for (const i of e) {
        var r = TowerDefenceInstanceById_1.configTowerDefenceInstanceById.GetConfig(i.s5n);
        if (r) {
          r = {
            Meta: i,
            Id: i.s5n,
            UnlockTime: MathUtils_1.MathUtils.LongToNumber(i.yzs),
            Passed: i.Ezs,
            PassTime: i.Qxs,
            Rewarded: i.mLs,
            Record: i.tBs,
            RecordOverThreshold: i.tBs >= r.RewardScore
          };
          this.StageListCache.push(r);
          this.StageMapCache.set(i.s5n, r);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("TowerDefense", 64, "塔防副本协议数据与配置不匹配，协议ID：" + i.s5n);
        }
      }
    } else {
      for (const a of e) {
        if (!this.StageMapCache.has(a.s5n)) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("TowerDefense", 64, "塔防关卡协议存量更新时，出现未缓存的数据，本条协议不更新", ["协议数据", e]);
          }
          return;
        }
      }
      for (const s of e) {
        var n = TowerDefenceInstanceById_1.configTowerDefenceInstanceById.GetConfig(s.s5n);
        var o = this.StageMapCache.get(s.s5n);
        o.Meta = s;
        o.Id = s.s5n;
        o.UnlockTime = MathUtils_1.MathUtils.LongToNumber(s.yzs);
        o.Passed = s.Ezs;
        o.PassTime = s.Qxs;
        o.Rewarded = s.mLs;
        o.Record = s.tBs;
        o.RecordOverThreshold = s.tBs >= n.RewardScore;
      }
    }
  }
  ParseTowerDefenseOwnPhantomDataList(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("TowerDefense", 64, "解析塔防声骸数据", ["infoList", e]);
    }
    for (const r of e) {
      var t = this.OwnPhantomInBattleDataCache.get(r.s5n);
      if (t && r.F6n > t.F6n) {
        this.OwnPhantomInBattleNewLevelUpFlagCache.set(r.s5n, true);
      }
      this.OwnPhantomInBattleDataCache.set(r.s5n, r);
    }
  }
  GetScoreRewardStateById(e) {
    var t = TowerDefenceRewardById_1.configTowerDefenceRewardById.GetConfig(e);
    if (this.TotalScore < t.Score) {
      return 0;
    } else if (this.ScoreRewardCache.has(e)) {
      return 2;
    } else {
      return 1;
    }
  }
  GetPassRewardStateById(e) {
    var t = TowerDefenceInstanceById_1.configTowerDefenceInstanceById.GetConfig(e);
    if (t === undefined) {
      return 0;
    } else {
      e = this.StageMapCache.get(e);
      if (t.IsDifficult) {
        if (e.Passed) {
          if (e.Rewarded) {
            return 2;
          } else {
            return 1;
          }
        } else {
          return 0;
        }
      } else if (e.RecordOverThreshold) {
        if (e.Rewarded) {
          return 2;
        } else {
          return 1;
        }
      } else {
        return 0;
      }
    }
  }
  UpdateByScoreRewardRequest(e) {
    this.ScoreRewardCache.set(e, TowerDefenceRewardById_1.configTowerDefenceRewardById.GetConfig(e));
  }
  UpdateByInstanceRewardRequest(e) {
    e = this.StageMapCache.get(e);
    e.Rewarded = true;
    e.Meta.mLs = true;
  }
  IsStageUnLocked(e) {
    e = TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(e);
    return !!e && this.IsStageUnlockedByTowerDefenseInstanceId(e.Id);
  }
  IsStageUnlockedByTowerDefenseInstanceId(e) {
    var t = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    var r = this.StageMapCache.get(e);
    if (r) {
      return r.UnlockTime < t;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("TowerDefense", 64, "塔防关卡协议数据丢失", ["TowerDefenseInstanceId", e], ["关卡协议缓存", this.StageMapCache]);
      }
      return false;
    }
  }
  IsPassedInstance(e) {
    var e = TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(e);
    var t = this.StageMapCache.get(e.Id);
    if (t) {
      return t.Passed;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("TowerDefense", 64, "是否通关数据查询,塔防关卡协议数据丢失", ["TowerDefenseInstanceId", e.Id], ["关卡协议缓存", this.StageMapCache]);
      }
      return false;
    }
  }
  GetPassTimeByInstanceId(e) {
    var e = TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(e);
    var t = this.StageMapCache.get(e.Id);
    if (t) {
      return t.PassTime;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("TowerDefense", 64, "获取通关时间数据,塔防关卡协议数据丢失", ["TowerDefenseInstanceId", e.Id], ["关卡协议缓存", this.StageMapCache]);
      }
      return 0;
    }
  }
  GetSuitableInstanceId() {
    let e = 0;
    for (const r of this.StageListCache) {
      if (this.IsStageUnlockedByTowerDefenseInstanceId(r.Id)) {
        var t = TowerDefenceInstanceById_1.configTowerDefenceInstanceById.GetConfig(r.Id);
        e = t?.InstanceId ?? 0;
        if (r.Record === 0) {
          if (!t?.IsDifficult) {
            break;
          }
          if (!r.Passed) {
            break;
          }
        }
      }
    }
    return e;
  }
}
//# sourceMappingURL=TowerDefenceModel.js.map