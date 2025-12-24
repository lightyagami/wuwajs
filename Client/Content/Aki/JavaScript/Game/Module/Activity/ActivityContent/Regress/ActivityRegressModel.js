"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressModel = undefined;
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
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
const OLD_VERSION = 0;
class ActivityRegressModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Mda = 0;
    this.NeedShowExtraRewardView = false;
    this.Rfa = false;
    this.AlreadyStartView = false;
    this.iq1 = new Map();
    this.rq1 = new Map();
    this.oq1 = new Map();
    this.EntryEndTimeStamp = undefined;
    this.$k1 = 0;
    this.LastUnGetRewardLevelPlayId = 0;
    this.g4f = [];
    this.C4f = [];
    this.LatestBranch = 0;
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
  get DisposableReward() {
    return this.ActivityData.DisposableReward;
  }
  OnInit() {
    this.$k1 = TimeUtil_1.TimeUtil.Hour * 3 * TimeUtil_1.TimeUtil.OneDayHourCount;
    this.bI1();
    if (Info_1.Info.IsPlayInEditor) {
      this.Rfa = true;
    }
    this.g4f = CommonParamById_1.configCommonParamById.GetIntArrayConfig("BranchOneMainQuest") ?? [];
    this.C4f = CommonParamById_1.configCommonParamById.GetIntArrayConfig("BranchTwoMainQuest") ?? [];
    this.LatestBranch = CommonParamById_1.configCommonParamById.GetIntConfig("LatestBranch") ?? 0;
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
        var r = t[e];
        var i = e + 1;
        if (this.CheckSignRewardState(i, 1)) {
          return this.GetSignRewardPreviewItemInfo(r);
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
    var [t, r] = this.GetSignRewardPreviewReward(e);
    var i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t);
    if (i) {
      return {
        ItemInfo: i,
        ItemCount: r,
        RewardState: this.GetSignRewardState(e.SignDayNum)
      };
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ActivityRecall", 63, "回流活动-ActivityRecallModel.GetSignRewardPreviewItemInfo()->", ["签到奖励的掉落包预览道具配置不存在, itemId:", t], ["itemConfig:", i]);
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
      let [r, i] = [0, 0];
      t.forEach((e, t) => {
        if (r === 0) {
          r = t;
          i = e;
        }
      });
      return [r, i];
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ActivityRecall", 63, "回归活动->掉落包预览道具不存在", ["dropId:", e]);
    }
    return [undefined, 0];
  }
  GetDropPreviewRewardItemListForPreview(e) {
    var t;
    var r;
    var i = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e);
    var a = [];
    if (i && i.DropPreview.size > 0) {
      for ([t, r] of i.DropPreview) {
        var o = [{
          IncId: 0,
          ItemId: t
        }, r];
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
    return t = e === 3 ? (t.sort((e, t) => e.Id - t.Id), t.slice(0, ActivityRegressDefine_1.REGRESS_ROLE_CONFIG_MAX_NUM)) : (t.sort((e, t) => t.Id - e.Id), t.slice(0, ActivityRegressDefine_1.REGRESS_OTHER_CONFIG_MAX_NUM));
  }
  IsRegressEntrance(e) {
    return e === 1 || e === 0 || e === 2 || e === 3;
  }
  CheckIfEntryOpen(e) {
    var t;
    var r;
    var e = e.GachaId;
    if (e > 0) {
      if ((r = ModelManager_1.ModelManager.GachaModel.GetGachaInfo(e)) !== undefined) {
        t = TimeUtil_1.TimeUtil.GetServerTime();
        e = this.GetValidGachaPool(e);
        r = r.GetPoolEndTimeByPoolInfo(e) - t;
        return [!MathUtils_1.MathUtils.IsNearlyZero(r, 0.1), r];
      } else {
        return [false, 0];
      }
    } else {
      return [true, undefined];
    }
  }
  GetValidGachaPool(e) {
    for (const r of ModelManager_1.ModelManager.GachaModel.GachaInfoArray) {
      if (ModelManager_1.ModelManager.GachaModel.CheckGachaValid(r)) {
        var t = r.UsePoolId;
        var t = t > 0 ? r.GetPoolInfo(t) : r.GetFirstValidPool();
        if (t && r.Id === e) {
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
            var r = this.DG1(a.Secondary);
            for (const o of t) {
              r.add(o);
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
          var i = this.oq1.get(n.Secondary) ?? new Set();
          for (const s of n.LevelPlayList) {
            i.add(s);
          }
          if (n.DungeonId !== 0) {
            i.add(n.DungeonId);
          }
          this.oq1.set(n.Secondary, i);
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
  BG1(e, t, r) {
    var e = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetPreOpenDetectionConfListByDetectionId(e, t);
    var i = this.DG1(r);
    var a = this.UG1(r);
    for (const s of e) {
      if (s !== undefined) {
        if (s.DungeonEntranceId !== 0) {
          var o = s.DungeonEntranceId;
          var n = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(o);
          if (n !== undefined) {
            for (const g of n.InstanceDungeonList) {
              i.add(g);
            }
            a.add(o);
          }
        }
        if (s.InstanceID !== 0) {
          n = s.InstanceID;
          i.add(n);
        }
      }
    }
  }
  DungeonHasDoubleDropTimes(e, t) {
    var r;
    return !(this.HasDoubleDropRestTimes() <= 0) && (r = this.iq1.get(t), t = this.rq1.get(t), r = r?.has(e) ?? false, t = t?.has(e) ?? false, r || t);
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
  GetRegressDoubleDropTuple(e) {
    if (this.LevelPlayHasDoubleDropTimes(e, 21)) {
      return ModelManager_1.ModelManager.ActivityRegressModel.GetDetectionDoubleDropTuple(21);
    } else if (this.LevelPlayHasDoubleDropTimes(e, 7)) {
      return ModelManager_1.ModelManager.ActivityRegressModel.GetDetectionDoubleDropTuple(7);
    } else if (this.DungeonHasDoubleDropTimes(e, 21)) {
      return ModelManager_1.ModelManager.ActivityRegressModel.GetDetectionDoubleDropTuple(21);
    } else if (this.DungeonHasDoubleDropTimes(e, 7)) {
      return ModelManager_1.ModelManager.ActivityRegressModel.GetDetectionDoubleDropTuple(7);
    } else {
      return [false, 0, 0, "Reward_doubling_end", "PrefabTextItem_2334179570_Text"];
    }
  }
  GetDetectionDoubleDropTuple(e) {
    let t = 0;
    let r = 0;
    if (e === 7) {
      t = ModelManager_1.ModelManager.ActivityRegressModel.GetDoubleDropRestTimes(2);
      r = ModelManager_1.ModelManager.ActivityRegressModel.GetDoubleDropMaxTimes(2);
    }
    if (e === 21) {
      t = ModelManager_1.ModelManager.ActivityRegressModel.GetDoubleDropRestTimes(1);
      r = ModelManager_1.ModelManager.ActivityRegressModel.GetDoubleDropMaxTimes(1);
    }
    return [t > 0, t, r, t > 0 ? "Reward_doubling_time" : "Reward_doubling_end", "PrefabTextItem_2334179570_Text"];
  }
  CalculateRegressCultivateReachTaskCount(e) {
    let t = 0;
    for (const i of e) {
      var r = i.Config.Id;
      if (ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskRewardState(r) !== 0) {
        ++t;
      }
    }
    return t;
  }
  GetRegressCultivateLoopSvDataList() {
    var e = this.ActivityData.GetRegressTaskListByType(2);
    var t = [];
    if (e) {
      for (const i of e) {
        var r = {
          Config: i
        };
        t.push(r);
      }
    }
    t.sort((e, t) => {
      var r = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskRewardState(e.Config.Id);
      var i = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskRewardState(t.Config.Id);
      if (r === 1 && i !== 1) {
        return -1;
      } else if (i === 1 && r !== 1 || r === 2 && i !== 2) {
        return 1;
      } else if (i === 2 && r !== 2) {
        return -1;
      } else {
        return e.Config.Id - t.Config.Id;
      }
    });
    return t;
  }
  GetRegressCultivateTaskRewardItemDataList(e) {
    var [e, t] = this.GetDropPreviewRewardTupleForPreview(e.TargetReward);
    var r = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e);
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ActivityRecall", 63, "回流活动-ActivityRecallModel.GetRegressCultivateTaskRewardItemDataList()->", ["问卷调查奖励的掉落包预览道具配置不存在, itemId:", e], ["itemConfig:", r]);
      }
    }
    return [{
      IncId: 0,
      ItemId: e ?? 0
    }, t];
  }
  GetQuestionRewardPreviewItemInfo(e) {
    var [t, r] = this.GetDropPreviewRewardTupleForPreview(e.Reward);
    var i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t);
    if (i) {
      return {
        ItemInfo: i,
        ItemCount: r,
        RewardState: this.ActivityData.GetQuestionnaireRewardState(e.Id)
      };
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ActivityRecall", 63, "回流活动-ActivityRecallModel.GetQuestionRewardPreviewItemInfo()->", ["问卷调查奖励的掉落包预览道具配置不存在, itemId:", t], ["itemConfig:", i]);
      }
      return {
        ItemCount: 0,
        RewardState: 0
      };
    }
  }
  GetRegressQuestionnaireRewardDataList(e) {
    var t = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressQuestionnaireConfig(e);
    var r = [];
    var i = new ActivityRegressQuestionnaireItemData_1.ActivityRegressQuestionnaireItemData();
    i.Type = e;
    i.ItemData = this.GetQuestionRewardPreviewItemInfo(t);
    r.push(i);
    return r;
  }
  GetRegressMainTaskScoreRewardGridDataArr() {
    var e;
    var t = [];
    for (const r of ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressBonusRewardConfigList(this.Grade) ?? []) {
      if (r.Version !== OLD_VERSION) {
        (e = new ActivityRegressDefine_1.ActivityRegressTaskScoreRewardGridData()).Config = r;
        e.RewardState = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetRegressTaskScoreRewardState(r);
        e.PayRewardState = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetRegressTaskPayScoreRewardState(r);
        t.push(e);
      }
    }
    return t;
  }
  GetRegressMainTaskGridDataGroupByTypeAndSortedArr() {
    var e = [];
    this.t_1(e, 0);
    this.t_1(e, 1);
    this.t_1(e, 6);
    return e;
  }
  i_1(e) {
    e.sort((e, t) => {
      return this.ActivityData.GetTaskSortPriority(e.Id) - this.ActivityData.GetTaskSortPriority(t.Id);
    });
  }
  t_1(e, t) {
    var r = this.ActivityData.GetRegressTaskListByType(t);
    if (r !== undefined) {
      var i = new ActivityRegressTaskDefine_1.ActivityRegressTaskDynamicData();
      i.ItemType = 0;
      i.TaskType = t;
      e.push(i);
      this.i_1(r);
      for (const o of r) {
        var a = new ActivityRegressTaskDefine_1.ActivityRegressTaskDynamicData();
        a.ItemType = 1;
        a.TaskType = t;
        a.Config = o;
        e.push(a);
      }
    }
  }
  GetRegressTaskRewardItemInfo(e) {
    var [t, r] = this.GetDropPreviewRewardTupleForPreview(e.TargetReward);
    var i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t);
    if (i) {
      return {
        ItemInfo: i,
        ItemCount: r,
        RewardState: this.ActivityData.GetTaskRewardState(e.Id)
      };
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ActivityRecall", 63, "回流活动-ActivityRegressModel.GetRegressTaskRewardItemInfo()->", ["回归任务的奖励掉落包预览道具不存在, itemId:", t], ["itemConfig:", i]);
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
    var r = [];
    if (t.size > 0) {
      for (var [i, a] of t) {
        var o = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(i);
        if (o !== undefined) {
          if (r.length < 2) {
            r.push({
              ItemInfo: o,
              ItemCount: a,
              RewardState: this.ActivityData.GetRegressTaskScoreRewardState(e)
            });
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("ActivityRecall", 63, "回流活动-ActivityRecallModel.GetRegressScoreRewardInfoList()->回归任务的积分奖励的掉落包预览道具不存在", ["itemId:", i], ["itemCount:", a], ["RegressBonusReward", e.Id]);
        }
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("ActivityRecall", 63, "回流活动-ActivityRecallModel.GetRegressScoreRewardInfoList()->回归任务的积分奖励配置异常，请检查积分奖励|RegressBonusReward配置!");
    }
    return r;
  }
  GetFirstUnFinishMainQuestId() {
    return ModelManager_1.ModelManager.QuestNewModel.GetFirstShowQuestByType(1)?.Id;
  }
  GetFirstShowRoleQuest() {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestsByType(3);
    e.sort((e, t) => {
      var r = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(e.MainTypeId);
      var i = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(t.MainTypeId);
      if (r && i) {
        if (r.SortValue !== i.SortValue) {
          return r.SortValue - i.SortValue;
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
    var r = !this.ActivityData.DisposableReward;
    return (e === 0 || e < t) && r;
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
      this.ActivityData.ResetBpPayButtonRedDot();
      this.LG1 = true;
    }
    this.ActivityRecallFirstShow = false;
  }
  get IsActivityRecallReady() {
    return this.ActivityId !== 0 && this.ActivityData !== undefined;
  }
  IsMainLineTaskFinish(e) {
    let t = true;
    for (const i of e.ArgId) {
      var r = ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(i);
      t = t && r;
    }
    return t;
  }
  GetFirstUnFinishTask(e) {
    for (const r of e.ArgId) {
      var t = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(r);
      if (t !== 0 && t !== 3) {
        return r;
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
    let r = 0;
    if (e !== undefined) {
      for (const i of e) {
        if (i.HasDiscount()) {
          r = Math.max(r, i.GetDiscount());
        }
      }
    }
    return r;
  }
  GetTargetLevelRewardList(t, e) {
    e.length = 0;
    var r;
    var i = this.ActivityData.GetCurLevelProgressData().Level;
    var a = new Map();
    var o = [...(ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressBonusRewardConfigList(this.Grade) ?? [])].sort((e, t) => e.NeedScore - t.NeedScore);
    for (let e = i; e < t; e++) {
      var n = o[e];
      if (n) {
        var s = [n.Drop];
        if (this.ActivityData.IsPayRewardUnlock()) {
          s.push(n.PayDrop);
        }
        for (const d of s) {
          var g;
          var l;
          var _ = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(d);
          if (_) {
            for ([g, l] of _.DropPreview) {
              if (a.has(g)) {
                a.get(g)[1] += l;
              } else {
                a.set(g, [{
                  IncId: 0,
                  ItemId: g
                }, l]);
              }
            }
          }
        }
      }
    }
    for ([, r] of a) {
      e.push(r);
    }
    const f = new Map();
    const h = e => {
      var t;
      if (!f.has(e)) {
        t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e);
        f.set(e, t ? t.QualityId : 0);
      }
      return f.get(e);
    };
    e.sort((e, t) => {
      var r = h(e[0].ItemId);
      var i = h(t[0].ItemId);
      if (r === i) {
        return e[1] - t[1];
      } else {
        return i - r;
      }
    });
  }
  GetNewRegressSubView(e, t) {
    if (e) {
      return [6];
    }
    switch (t) {
      case 0:
        return [0, 3, 1, 2];
      case 1:
        if (ModelManager_1.ModelManager.ActivityRegressModel.GetGachaPoolUpPool().length <= 0) {
          return [3, 1, 5];
        } else {
          return [3, 1, 4, 5];
        }
    }
    return [];
  }
  GetCurrentMainLineQuest() {
    var r = ModelManager_1.ModelManager.QuestNewModel.GetQuestsByType(1);
    if (r.length > 0) {
      let e = 0;
      let t = 0;
      for (const o of r) {
        var i = this.g4f.includes(o.Id);
        var a = this.C4f.includes(o.Id);
        if (!i && !a) {
          return o.Id;
        }
        if (a) {
          t = o.Id;
        }
        if (i) {
          e = o.Id;
        }
      }
      if (t) {
        return t;
      } else {
        return e;
      }
    }
    return 0;
  }
  GetCurrentMainLineBranch() {
    var t = ModelManager_1.ModelManager.QuestNewModel.GetQuestsByType(1);
    if (t.length > 0) {
      let e = false;
      for (const n of t) {
        var r = this.g4f.includes(n.Id);
        var i = this.C4f.includes(n.Id);
        if (!r && !i) {
          return this.LatestBranch;
        }
        if (i) {
          e = true;
        }
      }
      if (e) {
        return 2;
      } else {
        return 1;
      }
    }
    let e = false;
    for (const s of ModelManager_1.ModelManager.QuestNewModel.FinishedMainQuests) {
      var a = this.g4f.includes(s);
      var o = this.C4f.includes(s);
      if (!a && !o) {
        return this.LatestBranch;
      }
      if (o) {
        e = true;
      }
    }
    if (e) {
      return 2;
    } else {
      return 1;
    }
  }
  GetLatestRegressBase() {
    var r = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressBaseConfigListByType(1);
    if (r && !(r.length <= 0)) {
      let e = 0;
      let t = undefined;
      for (const i of r) {
        if (i.Id >= e) {
          e = i.Id;
          t = i;
        }
      }
      return t;
    }
  }
  GetRecommendDataList() {
    var e = [];
    var t = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressDisposableReward(ModelManager_1.ModelManager.ActivityRegressModel.ActivityId).ShowRecommendActivityGroup;
    for (const i of [...(ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressRecommendByGroup(t) ?? [])].sort((e, t) => e.Sort - t.Sort)) {
      var r = ModelManager_1.ModelManager.ActivityModel.GetActivityById(i.JumpParam);
      if (r && r.CheckIfInShowTime()) {
        e.push(i.Id);
      }
    }
    t = [...(ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressRecommendByType(4) ?? [])].sort((e, t) => {
      if (e.Sort !== t.Sort) {
        return e.Sort - t.Sort;
      } else {
        e = ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(e.JumpParam);
        t = ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(t.JumpParam);
        return e.GetProgress() - t.GetProgress();
      }
    });
    if (t.length > 0) {
      e.push(t[0].Id);
    }
    e.sort((e, t) => {
      e = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressRecommend(e);
      t = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressRecommend(t);
      e = e?.Type === 4 ? ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(e.JumpParam)?.IsReachMaxProgress : ModelManager_1.ModelManager.ActivityModel.GetActivityById(e.JumpParam)?.FinishShowState;
      if (e !== (t?.Type === 4 ? ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(t.JumpParam)?.IsReachMaxProgress : ModelManager_1.ModelManager.ActivityModel.GetActivityById(t.JumpParam)?.FinishShowState) && e) {
        return 1;
      } else {
        return 0;
      }
    });
    return e;
  }
  GetGachaPoolUpRole() {
    var e = [];
    var t = ModelManager_1.ModelManager.GachaModel.GachaInfoArray;
    if (t && !(t.length <= 0)) {
      for (const i of t) {
        for (const a of i.GetValidPoolList() ?? []) {
          var r = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(a.Id);
          if (r?.Type === 2 || r?.Type === 9) {
            r = ConfigManager_1.ConfigManager.GachaConfig.GetGachaPoolConfig(a.Id);
            if ((r = ModelManager_1.ModelManager.ActivityRegressModel.GetValidGachaPool(r.GachaId)) && !e.includes(r.PreviewIdList[0])) {
              e.push(r.PreviewIdList[0]);
            }
          }
        }
      }
    }
    return e;
  }
  GetGachaPoolUpPool() {
    var e = [];
    var t = ModelManager_1.ModelManager.GachaModel.GachaInfoArray;
    if (t && !(t.length <= 0)) {
      for (const i of t) {
        for (const a of i.GetValidPoolList() ?? []) {
          var r = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(a.Id);
          if (r?.Type === 2 || r?.Type === 9) {
            r = ConfigManager_1.ConfigManager.GachaConfig.GetGachaPoolConfig(a.Id);
            if ((r = ModelManager_1.ModelManager.ActivityRegressModel.GetValidGachaPool(r.GachaId)) && !e.includes(r)) {
              e.push(r);
            }
          }
        }
      }
    }
    return e;
  }
}
exports.ActivityRegressModel = ActivityRegressModel;
//# sourceMappingURL=ActivityRegressModel.js.map