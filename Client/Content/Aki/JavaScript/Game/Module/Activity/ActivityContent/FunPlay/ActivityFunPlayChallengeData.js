"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityFunPlayChallengeData = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
const ActivityFunPlayData_1 = require("./ActivityFunPlayData");
const LOCKKEY = 10;
class ActivityFunPlayChallengeData extends ActivityData_1.ActivityExData {
  constructor() {
    super(...arguments);
    this.hyc = 0;
    this.Gol = 0;
    this.hsd = Protocol_1.Aki.Protocol.iWc.Proto_FunPlayCanNoReward;
    this.Lo = undefined;
    this.lsd = [];
    this._be = 0;
    this.Index = -1;
  }
  Phrase(t) {
    this.hyc = t.e8n;
    this.Lo = ConfigManager_1.ConfigManager.ActivityFunPlayConfig.GetFunPlayActivityChallenge(this.hyc);
    this.Gol = Number(MathUtils_1.MathUtils.LongToBigInt(t.yzs)) / 1000;
    this.hsd = t.Y$c;
    this.lsd.length = 0;
    for (const i of t.mnd) {
      var e = ConfigManager_1.ConfigManager.ActivityFunPlayConfig.GetFunPlaySharpComment(i);
      if (e) {
        this.lsd.push(e);
      }
    }
    this.lsd.sort((t, e) => t.VarPriority - e.VarPriority);
    this._be = Number(MathUtils_1.MathUtils.LongToBigInt(t.rvs));
    this._sd();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshActivityFunPlayRedDot, this.hyc);
    this.RefreshActivityRedPoint();
  }
  SetIndex(t) {
    this.Index = t;
  }
  GetTitle() {
    if (this.Lo) {
      return this.Lo.Title;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ActivityFunPlay", 87, "找不到对应的趣味活动挑战配置", ["ChallengeId", this.hyc]);
      }
      return "";
    }
  }
  GetDesc() {
    if (this.Lo) {
      return this.Lo.Desc;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ActivityFunPlay", 87, "找不到对应的趣味活动挑战配置", ["ChallengeId", this.hyc]);
      }
      return "";
    }
  }
  GetTabTitle() {
    if (this.Lo) {
      return this.Lo.TabTitle;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ActivityFunPlay", 87, "找不到对应的趣味活动挑战配置", ["ChallengeId", this.hyc]);
      }
      return "";
    }
  }
  GetBackgroundTexturePath() {
    if (this.Lo) {
      return this.Lo.BackGroundTexture;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ActivityFunPlay", 87, "找不到对应的趣味活动挑战配置", ["ChallengeId", this.hyc]);
      }
      return "";
    }
  }
  GetIsUnlock() {
    return TimeUtil_1.TimeUtil.GetServerTime() >= this.Gol;
  }
  GetLeftTimeText() {
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    var t = Math.max(this.Gol - t, 1);
    return TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(t).CountDownText ?? "";
  }
  CheckRewardStatus(t) {
    return this.hsd === t;
  }
  GetSharpComments() {
    return this.lsd;
  }
  GetChallengeId() {
    return this.hyc;
  }
  GetFinishTime() {
    return TimeUtil_1.TimeUtil.DateFormat6String(this._be);
  }
  GetUnlockTime() {
    return this.Gol;
  }
  GetPreviewReward() {
    if (this.Lo) {
      var t;
      var e;
      var i = [];
      for ([t, e] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(this.Lo.RewardId).DropPreview) {
        var r = [{
          IncId: 0,
          ItemId: t
        }, e];
        i.push(r);
      }
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ActivityFunPlay", 87, "找不到对应的趣味活动挑战配置", ["ChallengeId", this.hyc]);
    }
  }
  GetRedPoint() {
    return !!this.usd() || !!this.CheckRewardStatus(Protocol_1.Aki.Protocol.iWc.Proto_FunPlayCanReward);
  }
  usd() {
    return !!this.GetIsUnlock() && this.csd() === 1;
  }
  _sd() {
    var t = this.GetIsUnlock();
    var e = this.csd();
    if (t) {
      if (e === 1) {
        ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.ActivityId, 0, ActivityFunPlayData_1.CLICKQUESTKEY, 0, 0);
        this.RefreshActivityRedPoint();
      }
    } else if (e === -1) {
      ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.ActivityId, this.hyc, LOCKKEY, 0, 1);
    }
  }
  csd() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.ActivityId, -1, this.hyc, LOCKKEY, 0);
  }
  RefreshUnlockRedDot() {
    if (this.GetIsUnlock()) {
      ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.ActivityId, this.hyc, LOCKKEY, 0, 0);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshActivityFunPlayRedDot, this.hyc);
      this.RefreshActivityRedPoint();
    }
  }
}
exports.ActivityFunPlayChallengeData = ActivityFunPlayChallengeData;
//# sourceMappingURL=ActivityFunPlayChallengeData.js.map