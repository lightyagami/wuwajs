"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressData = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
const RegressDefine_1 = require("./Base/RegressDefine");
class ActivityRegressData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.zl1 = undefined;
    this.tda = new Map();
    this.ida = new Map();
    this.yfa = 0;
    this.CurrentUseTrialRole = 0;
    this.DisposableReward = false;
    this.c$f = 0;
    this.d$f = undefined;
    this.lp1 = [RegressDefine_1.ERegressQuestionnaireType.Type1, RegressDefine_1.ERegressQuestionnaireType.Type2];
    this.Jl1 = new Map();
  }
  get PrevBpExp() {
    return this.c$f;
  }
  PhraseEx(e) {
    this.zl1 = e.Zh1;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ActivityRecall", 63, "回流活动-ActivityRegressData.PhraseEx()->", ["收到回流活动数据, data::", this.zl1]);
    }
    if (this.zl1) {
      if (!this.zl1.$ca) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("ActivityRecall", 63, "回流活动-ActivityRegressData.PhraseEx()->", ["协议下发的回流活动数据没有签到数据, data:", this.zl1.$ca]);
        }
      }
      if (!this.zl1.E$s) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("ActivityRecall", 63, "回流活动-ActivityRegressData.PhraseEx()->", ["协议下发的回流活动数据没有任务数据, data:", this.zl1.E$s]);
        }
      }
      if (!this.zl1.Hca) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("ActivityRecall", 63, "回流活动-ActivityRegressData.PhraseEx()->", ["协议下发的回流活动数据没有已经领取的积分奖励, data:", this.zl1.Hca]);
        }
      }
      this.DisposableReward = this.zl1.Gyf;
      this.CurrentUseTrialRole = this.zl1.RIf;
      this._Df(this.zl1.J6n);
      ModelManager_1.ModelManager.TrialRoleModel.SetCurUseTrialRole(this.CurrentUseTrialRole, this.zl1.oXf);
      this.EndOpenTimeInternal = MathUtils_1.MathUtils.LongToNumber(this.zl1.dps);
      this.EndShowTimeInternal = this.EndOpenTimeInternal;
      if (this.EndOpenTimeInternal === 0) {
        this.ForceClose();
      }
      this.yfa = MathUtils_1.MathUtils.LongToNumber(this.zl1.yDs);
      this.tda.clear();
      this.zl1.E$s.forEach(e => {
        this.tda.set(e.s5n, e);
      });
      this.oda();
      this.RefreshRegressTaskMapping();
      this.RefreshPrevBpExp();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ActivityRecall", 63, "回流活动-ActivityRegressData.PhraseEx()->", ["开启状态, IsOpen:", this.IsActivityOpen()], ["leftTime, 剩余开启时间:", this.GetActivityOpenTimeLeft()]);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RecallActivityInfoUpdate);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, ModelManager_1.ModelManager.ActivityRegressModel.ActivityId);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ActivityRecall", 63, "回流活动-ActivityRegressData.PhraseEx()->", ["协议下发的活动数据没有回流活动相关的, data:", this.zl1]);
    }
  }
  _Df(e) {
    var t;
    var r;
    var i = [];
    var o = new Set();
    for (const s of e) {
      i.push({
        TrialRoleId: s.Ogf,
        IsUnlocked: true
      });
      var a = ConfigManager_1.ConfigManager.TrialRoleConfig?.GetTrialRoleGroupId(s.Ogf);
      o.add(a);
    }
    for ([t, r] of ConfigManager_1.ConfigManager.TrialRoleConfig?.GetTrialRoleAllConfigByType(3)) {
      if (!o.has(t)) {
        i.push({
          TrialRoleId: r[0].Id,
          IsUnlocked: false
        });
      }
    }
    ModelManager_1.ModelManager.TrialRoleModel.AddTrialRoles(i);
  }
  GetActivityState() {
    if (this.IsUnLock() && this.zl1 && MathUtils_1.MathUtils.LongToNumber(this.zl1.dps) !== 0 && this.CheckIfInOpenTime()) {
      return 1;
    } else {
      return 0;
    }
  }
  get Grade() {
    return this.zl1.el1;
  }
  set Grade(e) {
    this.zl1.el1 = e;
  }
  CheckIfInOpenTime() {
    return this.CheckIfInTimeInterval(this.BeginOpenTime, this.EndOpenTime);
  }
  GetActivityOpenTimeLeft() {
    var e = this.EndOpenTime;
    return Math.round(Math.max(0, e - TimeUtil_1.TimeUtil.GetServerTime()));
  }
  IsActivityOpen() {
    return this.GetActivityState() === 1;
  }
  GetSignRewardState(e) {
    e = this.sda(e);
    if (e !== undefined) {
      switch (e.H6n) {
        case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning:
          return 0;
        case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish:
          return 1;
        case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken:
          return 2;
      }
    }
    return 0;
  }
  HasSignRewardCanClaimed() {
    for (const e of this.zl1.$ca) {
      if (e.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish) {
        return true;
      }
    }
    return false;
  }
  sda(e) {
    return this.zl1.$ca[e - 1];
  }
  CheckHaveTaskRewardCanGet() {
    var e = this.GetRegressTaskProgressFloat01();
    if (!(e >= 1)) {
      for (const t of this.zl1.E$s) {
        if (t.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish) {
          return true;
        }
      }
    }
    return false;
  }
  GetSignRewardEntityId(e) {
    return this.sda(e).s5n;
  }
  ada(e) {
    if (this.tda.get(e) === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("ActivityRecall", 63, "[回流活动]ActivityRegressData.GetRawTaskData->", ["获取回流任务数据失败, 服务器没下发该任务数据 taskId:", e]);
    }
    return this.tda.get(e);
  }
  IsRegressTaskScoreOverExp() {
    return this.GetRegressTaskProgressFloat01() >= 1;
  }
  GetTaskProgressTuple(e) {
    var e = this.ada(e);
    var [e, t] = [e.lMs, e.j6n];
    return [e, t];
  }
  GetTaskRewardState(e) {
    switch (this.ada(e).H6n) {
      case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning:
        return 0;
      case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish:
        return 1;
      case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken:
        return 2;
      default:
        return 0;
    }
  }
  GetNextRefreshTime() {
    var e;
    var t;
    var r = this.yfa ?? 0;
    if (r === 0) {
      return "";
    } else {
      e = TimeUtil_1.TimeUtil.GetServerTime();
      e = (r = Math.max(r - e, TimeUtil_1.TimeUtil.TimeDeviation)) >= CommonDefine_1.SECOND_PER_HOUR ? 2 : 1;
      t = r >= CommonDefine_1.SECOND_PER_HOUR ? 1 : 0;
      return TimeUtil_1.TimeUtil.GetCountDownDataFormat2(r, e, t).CountDownText ?? "";
    }
  }
  GetExDataRedPointShowState() {
    return !!this.IsActivityOpen() && (this.HasSignRewardCanClaimed() || this.CheckRegressScoreRewardReached() || this.CheckShowQuestionnaireRedDot() || this.CheckShopRedDot() || this.CheckTrialRoleRedDot() || this.CheckDisposableRewardRedDot() || this.HasReachableConstantTask());
  }
  GetBossDoubleDropCount() {
    return this.zl1.tl1;
  }
  GetWeekDoubleDropCount() {
    return this.zl1.il1;
  }
  GetQuestionnaireRewardState(t) {
    switch (this.zl1.yI1.find(e => e.s5n === t)?.H6n) {
      case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning:
        return 0;
      case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish:
        return 1;
      case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken:
        return 2;
      default:
        return 0;
    }
  }
  CheckShowQuestionnaireRedDot() {
    if (!this.IsActivityOpen()) {
      return false;
    }
    for (const t of this.lp1) {
      var e = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressQuestionnaireConfig(t);
      if (e !== undefined && this.IsQuestionnaireUnlock(t) && this.GetQuestionnaireRewardState(e.Id) === 1) {
        return true;
      }
    }
    return this.CheckQuestionnaireFirstRedDot() || this.CheckSecondQuestionnaireFirstRedDot();
  }
  CheckQuestionnaireFirstRedDot() {
    return !!this.IsActivityOpen() && !LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRegressQuestionnaireRedDotCheckedInPeriod, false);
  }
  CheckSecondQuestionnaireFirstRedDot() {
    var e;
    return !!this.IsActivityOpen() && (e = this.IsQuestionnaireUnlock(RegressDefine_1.ERegressQuestionnaireType.Type2), !LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRegressSecondQuestionnaireRedDotCheckedInPeriod, false)) && e;
  }
  CheckDisposableRewardRedDot() {
    return !this.DisposableReward;
  }
  ResetQuestionnaireRedDot() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRegressQuestionnaireRedDotCheckedInPeriod, false);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRegressSecondQuestionnaireRedDotCheckedInPeriod, false);
  }
  SetQuestionnaireRedDotChecked() {
    if (this.CheckQuestionnaireFirstRedDot()) {
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRegressQuestionnaireRedDotCheckedInPeriod, true);
    }
    if (this.CheckSecondQuestionnaireFirstRedDot()) {
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRegressSecondQuestionnaireRedDotCheckedInPeriod, true);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RecallActivityInfoUpdate);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  CheckShopRedDot() {
    return !!this.IsActivityOpen() && !LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRegressShopRedDotCheckedInPeriod, false);
  }
  CheckTrialRoleRedDot() {
    return !!this.IsActivityOpen() && (this.CheckNewUnLockRole() || this.IsTrialRoleUpgradeRedPoint());
  }
  CheckNewUnLockRole() {
    return !LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRegressTrialRoleRedDotCheckedInPeriod, false);
  }
  IsTrialRoleUpgradeRedPoint() {
    for (const e of this.GetTrialRoleList()) {
      if (e.CanUpgrade()) {
        return true;
      }
    }
    return false;
  }
  GetTrialRoleList() {
    return ModelManager_1.ModelManager.TrialRoleModel.GetDataListByType(3);
  }
  CheckDoubleDropRedDot() {
    return !!this.IsActivityOpen() && !LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRegressDoubleDropRedDotCheckedInPeriod, false);
  }
  CheckRecommendRedDot() {
    return !!this.IsActivityOpen() && !LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRegressRecommendRedDotCheckedInPeriod, false);
  }
  CheckAdventureRedDot() {
    return !!this.IsActivityOpen() && !LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRegressAdventureRedDotCheckedInPeriod, false);
  }
  ResetShopRemindRedDot() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRegressShopRedDotCheckedInPeriod, false);
  }
  SetShopRedDotChecked() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRegressShopRedDotCheckedInPeriod, true);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RecallActivityInfoUpdate);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  SetTrialRoleRedDotChecked(e) {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRegressTrialRoleRedDotCheckedInPeriod, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RecallActivityInfoUpdate);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  SetDoubleDropRedDotChecked() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRegressDoubleDropRedDotCheckedInPeriod, true);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RecallActivityInfoUpdate);
  }
  SetRecommendRedDotChecked() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRegressRecommendRedDotCheckedInPeriod, true);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RecallActivityInfoUpdate);
  }
  SetAdventureRedDotChecked() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRegressAdventureRedDotCheckedInPeriod, true);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RecallActivityInfoUpdate);
  }
  GetShopIdAndTabIndex() {
    var e = ConfigManager_1.ConfigManager.SkipInterfaceConfig.GetAccessPathConfig(RegressDefine_1.REGRESS_SKIP_SHOPID);
    var t = e?.Val1;
    var e = e?.Val2;
    return [t ? Number(t) : 0, e ? Number(e) : 0];
  }
  IsQuestionnaireUnlock(e) {
    return !!this.IsActivityOpen() && (e === RegressDefine_1.ERegressQuestionnaireType.Type1 || (e = CommonParamById_1.configCommonParamById.GetIntConfig("RegressSecondAskSignDay")) !== undefined && this.GetSignRewardState(e) === 2);
  }
  SetQuestionnaireReached(t) {
    var e = this.zl1.yI1.find(e => e.s5n === t);
    if (e?.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning) {
      e.H6n = Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish;
    }
  }
  RefreshRegressTaskMapping() {
    this.Jl1.clear();
    for (const r of this.zl1.E$s) {
      var e = r.s5n;
      var e = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressQuestConfig(e);
      var t = this.Jl1.get(e.TaskType) ?? [];
      t.push(e);
      this.Jl1.set(e.TaskType, t);
    }
  }
  GetRegressTaskListByType(e) {
    return this.Jl1.get(e);
  }
  GetAllRegressTaskList() {
    return Array.from(this.Jl1.values()).flat();
  }
  HasReachableTask(e) {
    return this.GetRegressTaskListByType(e)?.some(e => this.GetTaskRewardState(e.Id) === 1) ?? false;
  }
  HasReachableConstantTask() {
    return !(this.GetRegressTaskProgressFloat01() >= 1) && (this.HasReachableTask(0) || this.HasReachableTask(1) || this.HasReachableTask(6));
  }
  HasReachableCultivateTask() {
    return this.HasReachableTask(2);
  }
  GetRegressTaskProgressFloat01() {
    var [e, t] = this.GetRegressTaskProgressTuple();
    if (t === 0) {
      return 0;
    } else {
      e = Math.min(1, e / t);
      return Math.trunc(e * 100) / 100;
    }
  }
  GetRegressTaskScore() {
    var [e] = this.GetRegressTaskProgressTuple();
    return e;
  }
  hda(e) {
    return this.zl1.Hca.includes(e);
  }
  DBf(e) {
    return this.zl1.Oyf.includes(e);
  }
  GetRegressTaskScoreRewardState(e) {
    if (this.hda(e.Id)) {
      return 2;
    } else if (this.GetRegressTaskScore() >= e.NeedScore) {
      return 1;
    } else {
      return 0;
    }
  }
  GetRegressTaskPayScoreRewardState(e) {
    if (this.DBf(e.Id)) {
      return 2;
    } else if (this.zl1.mAf && this.GetRegressTaskScore() >= e.NeedScore) {
      return 1;
    } else {
      return 0;
    }
  }
  CheckRegressScoreRewardReached() {
    for (const r of ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressBonusRewardConfigList(this.Grade) ?? []) {
      var e = this.GetRegressTaskScoreRewardState(r);
      var t = this.GetRegressTaskPayScoreRewardState(r);
      if (e === 1 || t === 1) {
        return true;
      }
    }
    return false;
  }
  SetRegressScoreRewardReached(e) {
    this.zl1.Hca = this.zl1.Hca.concat(e);
    if (this.zl1.mAf) {
      this.zl1.Oyf = this.zl1.Oyf.concat(e);
    }
  }
  GetRegressTaskProgressTuple() {
    var e = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(20);
    let t = 0;
    for (const r of ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressBonusRewardConfigList(this.Grade) ?? []) {
      t = Math.max(r.NeedScore, t);
    }
    return [e, t];
  }
  oda() {
    this.ida.clear();
    for (const e of ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressBonusRewardConfigList(this.Grade) ?? []) {
      this.ida.set(e.Id, e.NeedScore);
    }
  }
  GetTaskSortPriority(e) {
    switch (this.ada(e).H6n) {
      case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning:
        return 1;
      case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish:
        return 0;
      case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken:
        return 2;
      default:
        return 1;
    }
  }
  GetRegressTaskRelativeScore(e) {
    var t = this.GetRegressTaskScore();
    var r = e.Id - 1;
    let i = 0;
    if (this.ida.has(r)) {
      i = this.ida.get(r) ?? 0;
    }
    r = this.ida.get(e.Id);
    e = r - i;
    let o = 0;
    return [o = t > i ? t < r ? t - i : e : o, e];
  }
  IsDoubleDropUnlock(e) {
    if (e === 1) {
      return this.zl1?.am1 ?? false;
    } else {
      return e === 2 && (this.zl1?.hm1 ?? false);
    }
  }
  ResetDoubleDropFirstRedDot() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRegressDoubleDropFirstRedDotCheckedInPeriod, false);
  }
  MarkDoubleDropFirstRedDotShown() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRegressDoubleDropFirstRedDotCheckedInPeriod, true);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RecallActivityInfoUpdate);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  CheckDoubleDropFirstRedDot() {
    return !!this.IsActivityOpen() && !LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRegressDoubleDropFirstRedDotCheckedInPeriod, false);
  }
  GetLevelByScore(e) {
    var t = this.GetSortedRegressBonusRewardConfigList();
    let r = 0;
    for (var i = t.length; r < i && !(e < t[r].NeedScore); r++);
    return r;
  }
  GetLevelProgressDataByScore(e) {
    var t = this.GetSortedRegressBonusRewardConfigList();
    let r = 0;
    var i;
    var o = t.length;
    if (o !== 0) {
      for (; r < o; r++) {
        if (e < t[r].NeedScore) {
          break;
        }
      }
      if (r === o) {
        return {
          Level: r,
          MaxLevel: o,
          CurScore: t[r - 1]?.NeedScore,
          NeedScore: t[r - 1]?.NeedScore
        };
      } else {
        i = t[r - 1]?.NeedScore ?? 0;
        return {
          Level: r,
          MaxLevel: o,
          CurScore: e - i,
          NeedScore: t[r]?.NeedScore - i
        };
      }
    }
  }
  GetCurLevelProgressData() {
    var e = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(20);
    let t = this.GetLevelProgressDataByScore(e);
    return t = t || {
      Level: 0,
      MaxLevel: 0,
      CurScore: 0,
      NeedScore: 0
    };
  }
  IsPayRewardUnlock() {
    return this.zl1?.mAf ?? false;
  }
  GetMaxLevel() {
    return this.GetSortedRegressBonusRewardConfigList().length;
  }
  SetPayRewardUnlock(e) {
    this.zl1.mAf = e;
  }
  ResetBpPayButtonRedDot() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRegressBpPayButtonRedDotCheckedInPeriod, false);
  }
  CheckBpPayButtonRedDot() {
    return !!this.IsActivityOpen() && !LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRegressBpPayButtonRedDotCheckedInPeriod, false);
  }
  SetBpPayButtonRedDotChecked() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ActivityRegressBpPayButtonRedDotCheckedInPeriod, true);
  }
  RefreshPrevBpExp() {
    this.c$f = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(20);
  }
  GetSortedRegressBonusRewardConfigList() {
    var e;
    if (this.d$f === undefined || this.d$f.length === 0) {
      e = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressBonusRewardConfigList(this.Grade) ?? [];
      this.d$f = [...e].sort((e, t) => e.NeedScore - t.NeedScore);
    }
    return this.d$f;
  }
}
exports.ActivityRegressData = ActivityRegressData;
//# sourceMappingURL=ActivityRegressData.js.map