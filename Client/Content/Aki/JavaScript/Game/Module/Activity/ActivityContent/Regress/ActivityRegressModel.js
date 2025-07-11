"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressModel = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityRegressDefine_1 = require("./ActivityRegressDefine");
const ActivityRegressQuestionnaireItemData_1 = require("./Questionnaire/ActivityRegressQuestionnaireItemData");
const ActivityRegressTaskDefine_1 = require("./Task/ActivityRegressTaskDefine");
class ActivityRegressModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Mda = 0;
    this.Rfa = false;
    this.AlreadyStartView = false;
    this.iq1 = new Map();
    this.rq1 = new Map();
    this.oq1 = new Map();
    this.EntryEndTimeStamp = undefined;
    this.$k1 = 0;
    this.LastUnGetRewardLevelPlayId = 0;
    this.Zl1 = undefined;
    this.e_1 = undefined;
    this.LG1 = false;
  }
  get ActivityId() {
    return this.Mda;
  }
  set ActivityId(e) {
    this.Mda = e;
  }
  get ActivityRecallForbidStart() {
    return this.Rfa;
  }
  set ActivityRecallForbidStart(e) {
    if (this.Rfa !== e && e && UiManager_1.UiManager.IsViewOpen("ActivityRegressStartupView")) {
      UiManager_1.UiManager.CloseView("ActivityRegressStartupView");
    }
    this.Rfa = e;
  }
  get Grade() {
    return this.ActivityData.Grade;
  }
  OnInit() {
    this.$k1 = TimeUtil_1.TimeUtil.Hour * 3 * TimeUtil_1.TimeUtil.OneDayHourCount;
    this.bI1();
    return true;
  }
  OnClear() {
    this.Mda = 0;
    return !(this.Rfa = false);
  }
  get ActivityData() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.ActivityId);
  }
  get CheckIfInShowTime() {
    return this.ActivityData.CheckIfInShowTime();
  }
  get IsActivityOpen() {
    return !!this.ActivityData && this.ActivityData.IsActivityOpen();
  }
  HasSignRewardCanClaimed() {
    return this.ActivityData.HasSignRewardCanClaimed();
  }
  TodayFirstShowSign() {
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRegressSignLastDailyFirstShowTimeStamp, 0);
    return e === 0 || e <= TimeUtil_1.TimeUtil.GetCurrentCrossDayStamp();
  }
  SetSignFirstShowTime() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRegressSignLastDailyFirstShowTimeStamp, TimeUtil_1.TimeUtil.GetServerTimeStamp());
  }
  SetupSignRewardConfig() {
    this.Zl1 = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressSignRewards(this.ActivityId, this.Grade);
  }
  GetLatestSignRewardItemInfo() {
    var t = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressSignRewards(this.ActivityId, this.Grade);
    if (t !== undefined) {
      for (let e = t.length - 1; e >= 0; e--) {
        var i = t[e];
        var r = e + 1;
        if (this.CheckSignRewardState(r, 1)) {
          return this.GetSignRewardPreviewItemInfo(i);
        }
      }
    }
    return {
      ItemInfo: undefined,
      ItemCount: 0,
      RewardState: 0
    };
  }
  GetSignRewardConfigByIndex(e) {
    if (this.Zl1 === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ActivityRecall", 63, "回归活动->未初始化签到奖励配置!", ["activityId:", this.ActivityId], ["grade:", this.Grade]);
      }
    } else {
      if (!(e < 0) && !(e >= this.Zl1.length)) {
        return this.Zl1[e];
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ActivityRecall", 63, "回归活动->获取签到配置的索引越界", ["activityId:", this.ActivityId], ["grade:", this.Grade], ["index:", e]);
      }
    }
  }
  ClearSignRewardConfig() {
    this.Zl1 = undefined;
  }
  GetSignRewardPreviewItemInfo(e) {
    var [t, i] = this.GetSignRewardPreviewReward(e);
    var r = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t);
    if (r) {
      return {
        ItemInfo: r,
        ItemCount: i,
        RewardState: this.GetSignRewardState(e.SignDayNum)
      };
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ActivityRecall", 63, "回流活动-ActivityRecallModel.GetSignRewardPreviewItemInfo()->", ["签到奖励的掉落包预览道具配置不存在, itemId:", t], ["itemConfig:", r]);
      }
      return {
        ItemCount: 0,
        RewardState: 0
      };
    }
  }
  GetSignRewardLocalTextKeyByState(e) {
    switch (e) {
      case 0:
        return "RecallActivity_Sign_Lock";
      case 1:
        return "RecallActivity_Sign_Get";
      case 2:
        return "RecallActivity_Sign_Finish";
      default:
        return "RecallActivity_Sign_Lock";
    }
  }
  GetSignRewardPreviewReward(e) {
    return this.GetDropPreviewRewardTupleForPreview(e.SignReward);
  }
  GetDropPreviewRewardTupleForPreview(e) {
    var t = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e);
    if (t && t.DropPreview.size > 0) {
      t = t.DropPreview;
      let [i, r] = [0, 0];
      t.forEach((e, t) => {
        if (i === 0) {
          i = t;
          r = e;
        }
      });
      return [i, r];
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ActivityRecall", 63, "回归活动->掉落包预览道具不存在", ["dropId:", e]);
    }
    return [undefined, 0];
  }
  GetDropPreviewRewardItemListForPreview(e) {
    var t;
    var i;
    var r = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e);
    var a = [];
    if (r && r.DropPreview.size > 0) {
      for ([t, i] of r.DropPreview) {
        var o = [{
          IncId: 0,
          ItemId: t
        }, i];
        a.push(o);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ActivityRecall", 63, "回归活动->掉落包预览道具不存在", ["dropId:", e]);
    }
    return a;
  }
  CheckSignRewardState(e, t) {
    return this.ActivityData.GetSignRewardState(e) === t;
  }
  GetSignRewardState(e) {
    return this.ActivityData.GetSignRewardState(e);
  }
  GetLastestRegressBaseConfigList(e) {
    let t = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressBaseConfigListByType(e).filter(e => this.CheckIfEntryOpen(e)[0]);
    t.sort((e, t) => t.Id - e.Id);
    return t = t.slice(0, 3);
  }
  IsRegressEntrance(e) {
    return e === 1 || e === 0 || e === 2 || e === 3;
  }
  CheckIfEntryOpen(e) {
    var t;
    var i;
    var e = e.GachaId;
    if (e > 0) {
      if ((i = ModelManager_1.ModelManager.GachaModel.GetGachaInfo(e)) !== undefined) {
        t = TimeUtil_1.TimeUtil.GetServerTime();
        e = this.GetValidGachaPool(e);
        i = i.GetPoolEndTimeByPoolInfo(e) - t;
        return [!MathUtils_1.MathUtils.IsNearlyZero(i, 0.1), i];
      } else {
        return [false, 0];
      }
    } else {
      return [true, undefined];
    }
  }
  GetValidGachaPool(e) {
    for (const i of ModelManager_1.ModelManager.GachaModel.GachaInfoArray) {
      if (ModelManager_1.ModelManager.GachaModel.CheckGachaValid(i)) {
        var t = i.UsePoolId;
        var t = t > 0 ? i.GetPoolInfo(t) : i.GetFirstValidPool();
        if (t && i.Id === e) {
          return t;
        }
      }
    }
  }
  GetRegressBaseRewardPreviewItemList(e) {
    return this.GetDropPreviewRewardItemListForPreview(e.RewardPreview);
  }
  GetDoubleDropRestTimes(e) {
    if (this.IsActivityOpen) {
      if (e === 1) {
        return this.GetDoubleDropMaxTimes(e) - this.ActivityData.GetBossDoubleDropCount();
      } else if (e === 2) {
        return this.GetDoubleDropMaxTimes(e) - this.ActivityData.GetWeekDoubleDropCount();
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
  HasDoubleDropRestTimes() {
    return this.GetDoubleDropRestTimes(2) + this.GetDoubleDropRestTimes(1);
  }
  IsHasDoubleDrop(e) {
    let t = 0;
    if (e === 7) {
      t = this.GetDoubleDropRestTimes(2);
    }
    return (t = e === 21 ? this.GetDoubleDropRestTimes(1) : t) > 0;
  }
  GetDoubleDropMaxTimes(e) {
    var t;
    if (this.IsActivityOpen) {
      t = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetDoubleDropConfig(this.Grade);
      if (e === 1) {
        return t.BossDoubleTimes;
      } else if (e === 2) {
        return t.WeekDoubleTimes;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
  ShouldShowDoubleDropRedDot() {
    if (this.IsActivityOpen) {
      if (this.ActivityData.CheckDoubleDropFirstRedDot()) {
        return true;
      }
      var e = TimeUtil_1.TimeUtil.GetServerTime();
      var e = this.ActivityData.EndOpenTime - e;
      if (e <= this.$k1) {
        if (this.HasDoubleDropRestTimes() > 0) {
          e = TimeUtil_1.TimeUtil.GetCurrentCrossDayStamp();
          return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRegressDoubleDropReminderLastShowTime, 0) < e;
        }
      }
    }
    return false;
  }
  MarkDoubleDropReminderShown() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRegressDoubleDropReminderLastShowTime, TimeUtil_1.TimeUtil.GetCurrentCrossDayStamp());
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RecallActivityInfoUpdate);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.ActivityId);
  }
  bI1() {
    var e = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetAllDungeonDetection();
    if (e) {
      for (const a of e) {
        if (a.Secondary === 21 || a.Secondary === 7) {
          var t = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(a.DungeonId);
          if (t !== undefined) {
            var t = t.InstanceDungeonList;
            var i = this.DG1(a.Secondary);
            for (const o of t) {
              i.add(o);
            }
            this.UG1(a.Secondary).add(a.DungeonId);
            this.BG1(a.Id, 0, a.Secondary);
          }
        }
      }
    }
    e = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetAllSilentAreaDetection();
    if (e) {
      for (const n of e) {
        if (n.Secondary === 21 || n.Secondary === 7) {
          var r = this.oq1.get(n.Secondary) ?? new Set();
          for (const s of n.LevelPlayList) {
            r.add(s);
          }
          this.oq1.set(n.Secondary, r);
          this.BG1(n.Id, 1, n.Secondary);
        }
      }
    }
  }
  DG1(e) {
    var t = this.iq1.get(e) ?? new Set();
    this.iq1.set(e, t);
    return t;
  }
  UG1(e) {
    var t = this.rq1.get(e) ?? new Set();
    this.rq1.set(e, t);
    return t;
  }
  BG1(e, t, i) {
    var e = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetPreOpenDetectionConfListByDetectionId(e, t);
    var r = this.DG1(i);
    var a = this.UG1(i);
    for (const s of e) {
      if (s !== undefined) {
        if (s.DungeonEntranceId !== 0) {
          var o = s.DungeonEntranceId;
          var n = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(o);
          if (n !== undefined) {
            for (const g of n.InstanceDungeonList) {
              r.add(g);
            }
            a.add(o);
          }
        }
        if (s.InstanceID !== 0) {
          n = s.InstanceID;
          r.add(n);
        }
      }
    }
  }
  DungeonHasDoubleDropTimes(e, t) {
    var i;
    return !(this.HasDoubleDropRestTimes() <= 0) && (i = this.iq1.get(t), t = this.rq1.get(t), i = i?.has(e) ?? false, t = t?.has(e) ?? false, i || t);
  }
  LevelPlayHasDoubleDropTimes(e, t) {
    return !(this.HasDoubleDropRestTimes() <= 0) && !!this.oq1.get(t)?.has(e);
  }
  GetDungeonDoubleDropTuple(e) {
    if (this.DungeonHasDoubleDropTimes(e, 21)) {
      return ModelManager_1.ModelManager.ActivityRegressModel.GetDetectionDoubleDropTuple(21);
    } else if (this.DungeonHasDoubleDropTimes(e, 7)) {
      return ModelManager_1.ModelManager.ActivityRegressModel.GetDetectionDoubleDropTuple(7);
    } else {
      return [false, 0, 0, "Reward_doubling_end", "PrefabTextItem_2334179570_Text"];
    }
  }
  GetLevelPlayDoubleDropTuple(e) {
    if (this.LevelPlayHasDoubleDropTimes(e, 21)) {
      return ModelManager_1.ModelManager.ActivityRegressModel.GetDetectionDoubleDropTuple(21);
    } else if (this.LevelPlayHasDoubleDropTimes(e, 7)) {
      return ModelManager_1.ModelManager.ActivityRegressModel.GetDetectionDoubleDropTuple(7);
    } else {
      return [false, 0, 0, "Reward_doubling_end", "PrefabTextItem_2334179570_Text"];
    }
  }
  GetDetectionDoubleDropTuple(e) {
    let t = 0;
    let i = 0;
    if (e === 7) {
      t = ModelManager_1.ModelManager.ActivityRegressModel.GetDoubleDropRestTimes(2);
      i = ModelManager_1.ModelManager.ActivityRegressModel.GetDoubleDropMaxTimes(2);
    }
    if (e === 21) {
      t = ModelManager_1.ModelManager.ActivityRegressModel.GetDoubleDropRestTimes(1);
      i = ModelManager_1.ModelManager.ActivityRegressModel.GetDoubleDropMaxTimes(1);
    }
    return [t > 0, t, i, t > 0 ? "Reward_doubling_time" : "Reward_doubling_end", "PrefabTextItem_2334179570_Text"];
  }
  CalculateRegressCultivateReachTaskCount(e) {
    let t = 0;
    for (const r of e) {
      var i = r.Config.Id;
      if (ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskRewardState(i) !== 0) {
        ++t;
      }
    }
    return t;
  }
  GetRegressCultivateLoopSvDataList() {
    var e = this.ActivityData.GetRegressTaskListByType(2);
    var t = [];
    if (e) {
      for (const r of e) {
        var i = {
          Config: r
        };
        t.push(i);
      }
    }
    t.sort((e, t) => {
      var i = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskRewardState(e.Config.Id);
      var r = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskRewardState(t.Config.Id);
      if (i === 1 && r !== 1) {
        return -1;
      } else if (r === 1 && i !== 1 || i === 2 && r !== 2) {
        return 1;
      } else if (r === 2 && i !== 2) {
        return -1;
      } else {
        return e.Config.Id - t.Config.Id;
      }
    });
    return t;
  }
  GetRegressCultivateTaskRewardItemDataList(e) {
    var [e, t] = this.GetDropPreviewRewardTupleForPreview(e.TargetReward);
    var i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e);
    if (!i) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ActivityRecall", 63, "回流活动-ActivityRecallModel.GetRegressCultivateTaskRewardItemDataList()->", ["问卷调查奖励的掉落包预览道具配置不存在, itemId:", e], ["itemConfig:", i]);
      }
    }
    return [{
      IncId: 0,
      ItemId: e ?? 0
    }, t];
  }
  GetQuestionRewardPreviewItemInfo(e) {
    var [t, i] = this.GetDropPreviewRewardTupleForPreview(e.Reward);
    var r = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t);
    if (r) {
      return {
        ItemInfo: r,
        ItemCount: i,
        RewardState: this.ActivityData.GetQuestionnaireRewardState(e.Id)
      };
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ActivityRecall", 63, "回流活动-ActivityRecallModel.GetQuestionRewardPreviewItemInfo()->", ["问卷调查奖励的掉落包预览道具配置不存在, itemId:", t], ["itemConfig:", r]);
      }
      return {
        ItemCount: 0,
        RewardState: 0
      };
    }
  }
  GetRegressQuestionnaireRewardDataList(e) {
    var t = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressQuestionnaireConfig(e);
    var i = [];
    var r = new ActivityRegressQuestionnaireItemData_1.ActivityRegressQuestionnaireItemData();
    r.Type = e;
    r.ItemData = this.GetQuestionRewardPreviewItemInfo(t);
    i.push(r);
    return i;
  }
  GetRegressMainTaskScoreRewardGridDataArr() {
    var e = [];
    for (const i of ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressBonusRewardConfigList(this.Grade) ?? []) {
      var t = new ActivityRegressDefine_1.ActivityRegressTaskScoreRewardGridData();
      t.Config = i;
      t.RewardState = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetRegressTaskScoreRewardState(i);
      e.push(t);
    }
    return e;
  }
  GetRegressMainTaskGridDataGroupByTypeAndSortedArr() {
    var e = [];
    this.t_1(e, 0);
    this.t_1(e, 1);
    return e;
  }
  i_1(e) {
    e.sort((e, t) => {
      return this.ActivityData.GetTaskSortPriority(e.Id) - this.ActivityData.GetTaskSortPriority(t.Id);
    });
  }
  t_1(e, t) {
    var i = this.ActivityData.GetRegressTaskListByType(t);
    if (i !== undefined) {
      var r = new ActivityRegressTaskDefine_1.ActivityRegressTaskDynamicData();
      r.ItemType = 0;
      r.TaskType = t;
      e.push(r);
      this.i_1(i);
      for (const o of i) {
        var a = new ActivityRegressTaskDefine_1.ActivityRegressTaskDynamicData();
        a.ItemType = 1;
        a.TaskType = t;
        a.Config = o;
        e.push(a);
      }
    }
  }
  GetRegressTaskRewardItemInfo(e) {
    var [t, i] = this.GetDropPreviewRewardTupleForPreview(e.TargetReward);
    var r = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t);
    if (r) {
      return {
        ItemInfo: r,
        ItemCount: i,
        RewardState: this.ActivityData.GetTaskRewardState(e.Id)
      };
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ActivityRecall", 63, "回流活动-ActivityRegressModel.GetRegressTaskRewardItemInfo()->", ["回归任务的奖励掉落包预览道具不存在, itemId:", t], ["itemConfig:", r]);
      }
      return {
        ItemCount: 0,
        RewardState: 0
      };
    }
  }
  GetRegressScoreRewardInfoList(e) {
    var t = e.Drop;
    var t = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(t).DropPreview;
    var i = [];
    if (t.size > 0) {
      for (var [r, a] of t) {
        var o = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(r);
        if (o !== undefined) {
          if (i.length < 2) {
            i.push({
              ItemInfo: o,
              ItemCount: a,
              RewardState: this.ActivityData.GetRegressTaskScoreRewardState(e)
            });
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("ActivityRecall", 63, "回流活动-ActivityRecallModel.GetRegressScoreRewardInfoList()->回归任务的积分奖励的掉落包预览道具不存在", ["itemId:", r], ["itemCount:", a], ["RegressBonusReward", e.Id]);
        }
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("ActivityRecall", 63, "回流活动-ActivityRecallModel.GetRegressScoreRewardInfoList()->回归任务的积分奖励配置异常，请检查积分奖励|RegressBonusReward配置!");
    }
    return i;
  }
  GetFirstUnFinishMainQuestId() {
    return ModelManager_1.ModelManager.QuestNewModel.GetFirstShowQuestByType(1)?.Id;
  }
  GetFirstShowRoleQuest() {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestsByType(3);
    e.sort((e, t) => {
      var i = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(e.MainTypeId);
      var r = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(t.MainTypeId);
      if (i && r) {
        if (i.SortValue !== r.SortValue) {
          return i.SortValue - r.SortValue;
        } else {
          return e.Id - t.Id;
        }
      } else {
        return 0;
      }
    });
    for (const t of e) {
      if (t.CanShowInUiPanel()) {
        return t;
      }
    }
  }
  IsActivityRecallSplashFirstShow() {
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRecallSplashFirstShowTime, 0);
    var t = this.ActivityData.EndShowTime;
    return e === 0 || e < t;
  }
  RecordActivityRecallSplashFirstShow() {
    var e = this.ActivityData.EndShowTime;
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRecallSplashFirstShowTime, e);
  }
  get ActivityRecallFirstShow() {
    var e;
    var t;
    if (this.e_1 === undefined) {
      e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRecallWatchFirstShowTime);
      t = this.ActivityData.EndShowTime;
      this.e_1 = e === undefined || e < t;
    }
    return this.e_1;
  }
  set ActivityRecallFirstShow(e) {
    var t;
    if (this.e_1 !== e) {
      if (!e) {
        t = this.ActivityData.EndShowTime;
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRecallWatchFirstShowTime, t);
      }
      this.e_1 = e;
    }
  }
  SetFirstShowChecked() {
    if (this.ActivityRecallFirstShow && !this.LG1) {
      this.ActivityData.ResetShopRemindRedDot();
      this.ActivityData.ResetQuestionnaireRedDot();
      this.ActivityData.ResetDoubleDropFirstRedDot();
      this.LG1 = true;
    }
    this.ActivityRecallFirstShow = false;
  }
  get IsActivityRecallReady() {
    return this.ActivityId !== 0 && this.ActivityData !== undefined;
  }
  IsMainLineTaskFinish(e) {
    let t = true;
    for (const r of e.ArgId) {
      var i = ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(r);
      t = t && i;
    }
    return t;
  }
  GetFirstUnFinishTask(e) {
    for (const i of e.ArgId) {
      var t = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(i);
      if (t !== 0 && t !== 3) {
        return i;
      }
    }
  }
  GetGachaRoleId(e) {
    return this.GetValidGachaPool(e).PreviewIdList[0];
  }
  GetGachaTrialRoleId(e) {
    e = this.GetGachaRoleId(e);
    return ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(e).TrialId;
  }
  GetRoleConfigByGachaId(e) {
    e = this.GetGachaRoleId(e);
    return ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(e);
  }
  GetShopGoodsMaxDiscount() {
    var [e, t] = this.ActivityData.GetShopIdAndTabIndex();
    var e = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(e, t);
    let i = 0;
    if (e !== undefined) {
      for (const r of e) {
        if (r.HasDiscount()) {
          i = Math.max(i, r.GetDiscount());
        }
      }
    }
    return i;
  }
}
exports.ActivityRegressModel = ActivityRegressModel;
//# sourceMappingURL=ActivityRegressModel.js.map