"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityCacheData = exports.ActivityExData = exports.ActivityBaseData = undefined;
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringBuilder_1 = require("../../../Core/Utils/StringBuilder");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../Common/PublicUtil");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const ACTIVITYFORCECLOSETIME = -1;
class ActivityBaseData {
  constructor() {
    this.FFe = 0;
    this.R4e = undefined;
    this.Bel = 0;
    this.Yud = 0;
    this.U4e = -0;
    this.EndShowTimeInternal = -0;
    this.WFe = -0;
    this.EndOpenTimeInternal = -0;
    this.BeginLimitTimeInternal = -0;
    this.EndLimitTimeInternal = -0;
    this.BeginRewardTimeInternal = -0;
    this.EndRewardTimeInternal = -0;
    this.P4e = false;
    this.Dk_ = false;
    this.x4e = false;
    this.B4e = new Array();
    this.b4e = 0;
    this.Bk_ = 0;
    this._8a = [];
    this.q4e = "";
    this.LocalConfig = undefined;
  }
  get Id() {
    return this.FFe;
  }
  GetCacheKey() {
    return this.q4e;
  }
  get Type() {
    return this.R4e;
  }
  get TimeType() {
    return this.Bel;
  }
  get OpenType() {
    return this.Yud;
  }
  get Sort() {
    if (this.LocalConfig === undefined) {
      return -1;
    } else if (this.TimeType !== 1 || this.LocalConfig.PermanentSort === -1) {
      return this.LocalConfig.Sort;
    } else {
      return this.LocalConfig.PermanentSort;
    }
  }
  get BeginShowTime() {
    return this.U4e;
  }
  get EndShowTime() {
    return this.EndShowTimeInternal;
  }
  get BeginOpenTime() {
    return this.WFe;
  }
  get EndOpenTime() {
    return this.EndOpenTimeInternal;
  }
  get BeginLimitTime() {
    return this.BeginLimitTimeInternal;
  }
  get EndLimitTime() {
    return this.EndLimitTimeInternal;
  }
  get BeginRewardTime() {
    return this.BeginRewardTimeInternal;
  }
  get EndRewardTime() {
    return this.EndRewardTimeInternal;
  }
  get FinishShowState() {
    if (!this.LocalConfig) {
      return false;
    }
    if (!this.LocalConfig.ShowTabFinish) {
      return false;
    }
    if (!this.IsUnLock()) {
      return false;
    }
    try {
      if (!this.GetExDataFinishShowState()) {
        return false;
      }
    } catch (t) {
      ModelManager_1.ModelManager.ActivityModel.OpenActivityErrorConfirmBox(this.Id, this.Type);
      if (t instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("Activity", 37, "[Activity] 活动完成状态异常", t, ["id", this.Id], ["error", t.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Activity", 37, "[Activity] 活动完成状态异常", ["id", this.Id]);
      }
    }
    return true;
  }
  get FinishSinkState() {
    return !!this.LocalConfig && this.LocalConfig.SinkTabFinish && this.FinishShowState;
  }
  get RedPointShowState() {
    if (this.CheckIfInShowTime()) {
      if (this.x4e) {
        return true;
      }
      var t = this.Dk_ && this.HasPreOpenCondition();
      if (this.P4e || t) {
        try {
          if (this.GetExDataRedPointShowState()) {
            return true;
          }
        } catch (t) {
          ModelManager_1.ModelManager.ActivityModel.OpenActivityErrorConfirmBox(this.Id, this.Type);
          if (t instanceof Error) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.ErrorWithStack("Activity", 37, "[Activity] 活动红点异常", t, ["id", this.Id], ["error", t.message]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Activity", 37, "[Activity] 活动红点异常", ["id", this.Id]);
          }
        }
      }
    }
    return false;
  }
  GetExternalButtonRedPointName() {}
  GetExternalButtonRedPointId() {
    return 0;
  }
  GetExternalButtonRedPointState() {
    return false;
  }
  get ConditionGroupId() {
    return this.b4e;
  }
  get PreOpenConditionGroupId() {
    return this.Bk_;
  }
  get FinishedConditionIdList() {
    return this._8a;
  }
  get BgTexturePath() {
    return this.LocalConfig.BgResource;
  }
  IsActivityConditionFinished(t) {
    return !!this.IsUnLock() || this._8a.includes(t);
  }
  CheckIfInShowTime() {
    return this.CheckIfInTimeInterval(this.U4e, this.EndShowTimeInternal);
  }
  CheckIfClose() {
    return this.WFe === ACTIVITYFORCECLOSETIME && this.EndOpenTimeInternal === ACTIVITYFORCECLOSETIME || !this.CheckIfInOpenTime() && !this.CheckIfInShowTime();
  }
  CheckIfInOpenTime() {
    return this.CheckIfInTimeInterval(this.WFe, this.EndOpenTimeInternal);
  }
  CheckIfInLimitTime() {
    if (this.OpenType === Protocol_1.Aki.Protocol.OS_.Proto_TimeLimited) {
      return this.CheckIfInOpenTime();
    } else {
      return this.OpenType === Protocol_1.Aki.Protocol.OS_.Proto_LimitToPermanent && this.CheckIfInTimeInterval(this.BeginLimitTimeInternal, this.EndLimitTimeInternal);
    }
  }
  CheckIfInRewardTime() {
    return this.CheckIfInTimeInterval(this.BeginRewardTimeInternal, this.EndRewardTimeInternal);
  }
  CheckIfInTimeInterval(t, i) {
    if (t !== ACTIVITYFORCECLOSETIME || i !== ACTIVITYFORCECLOSETIME) {
      if (t === 0 && i === 0) {
        return true;
      }
      var e = TimeUtil_1.TimeUtil.GetServerTime();
      if (t <= e) {
        if (i === 0) {
          return true;
        }
        if (e <= i) {
          return true;
        }
      }
    }
    return false;
  }
  zud(t) {
    switch (t) {
      case Protocol_1.Aki.Protocol.OS_.Proto_TimeLimited:
        this.Bel = 0;
        break;
      case Protocol_1.Aki.Protocol.OS_.Proto_Permanent:
        this.Bel = 1;
        break;
      case Protocol_1.Aki.Protocol.OS_.Proto_LimitToPermanent:
        this.Bel = this.CheckIfInLimitTime() ? 0 : 1;
        break;
      default:
        this.Bel = 0;
    }
  }
  GetPreviewReward(t) {
    var i = [];
    let e = t ?? 0;
    if ((e = t === undefined ? this.TimeType === 1 ? this.LocalConfig.PermanentPreviewDrop : this.LocalConfig.PreviewDrop : e) !== 0) {
      t = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e)?.DropPreview;
      if (t) {
        for (var [r, s] of t) {
          r = [{
            IncId: 0,
            ItemId: r
          }, s];
          i.push(r);
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Activity", 27, "找不到奖励配置", ["id", e]);
      }
    }
    return i;
  }
  GetTitle() {
    if (this.LocalConfig === undefined) {
      return "";
    } else {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.LocalConfig.Title) ?? "";
    }
  }
  GetTitleTextId() {
    if (this.LocalConfig === undefined) {
      return "";
    } else {
      return this.LocalConfig.Title;
    }
  }
  GetHelpId() {
    return this.LocalConfig.HelpId;
  }
  IsUnLock() {
    return !!this.P4e;
  }
  CanPreOpen() {
    return !!this.IsUnLock() || this.Dk_;
  }
  HasPreOpenCondition() {
    return this.Bk_ > 0;
  }
  GetPreGuideQuestFinishState() {
    var i = this.B4e;
    var e = i.length;
    for (let t = 0; t < e; t++) {
      if (ModelManager_1.ModelManager.QuestNewModel.GetQuestState(i[t]) < Protocol_1.Aki.Protocol.hTs.a3_) {
        return false;
      }
    }
    return !!this.P4e;
  }
  GetUnFinishPreGuideQuestId() {
    var i = this.B4e;
    var e = i.length;
    for (let t = 0; t < e; t++) {
      if (ModelManager_1.ModelManager.QuestNewModel.GetQuestState(i[t]) < Protocol_1.Aki.Protocol.hTs.a3_) {
        return i[t];
      }
    }
    return 0;
  }
  GetPreShowGuideQuestName() {
    var i = new StringBuilder_1.StringBuilder();
    var e = new Array();
    var r = this.B4e;
    let s = r.length;
    for (let t = 0; t < s; t++) {
      if (!ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(r[0])) {
        e.push(r[t]);
      }
    }
    s = e.length;
    for (let t = 0; t < s; t++) {
      var h = PublicUtil_1.PublicUtil.GetConfigTextByKey(ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(e[t]).TidName);
      i.Append(h);
      if (t !== s - 1) {
        i.Append(",");
      }
    }
    return i.ToString();
  }
  GetPreGuideQuestIds() {
    return this.B4e;
  }
  SetIfFirstOpen(t) {
    this.x4e = t;
  }
  GetIfFirstOpen() {
    return this.x4e;
  }
  SetFirstOpenFalse() {
    if (this.x4e) {
      this.OnSetFirstOpenFalse();
      this.x4e = false;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.FFe);
    }
  }
  CheckIfShowTabTime() {
    return this.OpenType !== Protocol_1.Aki.Protocol.OS_.Proto_Permanent && this.OpenType !== Protocol_1.Aki.Protocol.OS_.Proto_LimitToPermanent && !!this.CheckIfInOpenTime() && this.LocalConfig.ShowTabTime;
  }
  OnSetFirstOpenFalse() {}
  GetExDataFinishShowState() {
    return false;
  }
  GetExDataRedPointShowState() {
    return false;
  }
  ForceClose() {
    this.WFe = ACTIVITYFORCECLOSETIME;
    this.EndOpenTimeInternal = ACTIVITYFORCECLOSETIME;
    this.U4e = ACTIVITYFORCECLOSETIME;
    this.EndShowTimeInternal = ACTIVITYFORCECLOSETIME;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.FFe);
  }
  ActivityClose() {
    this.OnActivityClose();
  }
  OnActivityClose() {}
  Init(t) {
    this.FFe = t.s5n;
    this.R4e = t.h5n;
    this.LocalConfig = ConfigManager_1.ConfigManager.ActivityConfig.GetActivityConfig(this.FFe);
    if (this.LocalConfig) {
      this.b4e = this.LocalConfig.PreConditionGroupId;
      this.Bk_ = this.LocalConfig.PreOpenCondition;
      this.B4e = this.LocalConfig.PreShowGuideQuest;
    }
    ModelManager_1.ModelManager.QuestNewModel.SetActivityQuestData(this.FFe, this.B4e ?? []);
    this.U4e = Number(MathUtils_1.MathUtils.LongToBigInt(t.wps));
    this.EndShowTimeInternal = Number(MathUtils_1.MathUtils.LongToBigInt(t.xps));
    this.WFe = Number(MathUtils_1.MathUtils.LongToBigInt(t.Pps));
    this.EndOpenTimeInternal = Number(MathUtils_1.MathUtils.LongToBigInt(t.Ups));
    this.BeginLimitTimeInternal = Number(MathUtils_1.MathUtils.LongToBigInt(t.CPs));
    this.EndLimitTimeInternal = Number(MathUtils_1.MathUtils.LongToBigInt(t.gPs));
    this.BeginRewardTimeInternal = Number(MathUtils_1.MathUtils.LongToBigInt(t.umd));
    this.EndRewardTimeInternal = Number(MathUtils_1.MathUtils.LongToBigInt(t.cmd));
    this.P4e = t.K6n;
    this.Dk_ = t.lk_;
    this.x4e = t.qps;
    this._8a = t.qS_;
    this.Yud = t.OS_;
    this.zud(t.OS_);
    this.OnInit(t);
  }
  Phrase(t) {
    this.U4e = Number(MathUtils_1.MathUtils.LongToBigInt(t.wps));
    this.EndShowTimeInternal = Number(MathUtils_1.MathUtils.LongToBigInt(t.xps));
    this.WFe = Number(MathUtils_1.MathUtils.LongToBigInt(t.Pps));
    this.EndOpenTimeInternal = Number(MathUtils_1.MathUtils.LongToBigInt(t.Ups));
    this.BeginLimitTimeInternal = Number(MathUtils_1.MathUtils.LongToBigInt(t.CPs));
    this.EndLimitTimeInternal = Number(MathUtils_1.MathUtils.LongToBigInt(t.gPs));
    this.BeginRewardTimeInternal = Number(MathUtils_1.MathUtils.LongToBigInt(t.umd));
    this.EndRewardTimeInternal = Number(MathUtils_1.MathUtils.LongToBigInt(t.cmd));
    this.P4e = t.K6n;
    this.Dk_ = t.lk_;
    this.x4e = t.qps;
    this._8a = t.qS_;
    this.Yud = t.OS_;
    this.zud(t.OS_);
    var i = new StringBuilder_1.StringBuilder();
    i.Append(t.s5n);
    i.Append("_");
    i.Append(this.WFe);
    this.q4e = i.ToString();
    this.PhraseEx(t);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Activity", 37, "活动数据刷新", ["Id", this.FFe], ["Type", this.R4e], ["IsUnlock", this.P4e], ["ShowTime", [this.U4e, this.EndShowTimeInternal]], ["OpenTime", [this.WFe, this.EndOpenTimeInternal]], ["HasRedDot", this.RedPointShowState]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.FFe);
  }
  OnInit(t) {}
  PhraseEx(t) {}
  NeedSelfControlFirstRedPoint() {
    return false;
  }
}
exports.ActivityBaseData = ActivityBaseData;
class ActivityExData {
  constructor(t) {
    this.ActivityId = 0;
    this.ActivityId = t;
  }
  GetActivityId() {
    return this.ActivityId;
  }
  RefreshActivityRedPoint() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.ActivityId);
  }
}
exports.ActivityExData = ActivityExData;
class ActivityCacheData {
  constructor() {
    this.Key = 0;
    this.Value = 0;
  }
}
exports.ActivityCacheData = ActivityCacheData;
//# sourceMappingURL=ActivityData.js.map