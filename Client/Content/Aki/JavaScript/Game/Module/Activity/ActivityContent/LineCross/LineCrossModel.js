"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineCrossModel = undefined;
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
class LineCrossModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.CurrentChallengeFinishState = false;
  }
  GetProgressByActivityId(e, r) {
    var t;
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    if (e) {
      t = e.GetFinishChallengeNumber();
      e = e.GetChallengeNumber();
      return StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r) ?? "", t.toString(), e.toString());
    } else {
      return "";
    }
  }
  GetGroupUnlockState(e, r) {
    e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    return !!e && e.GetGroupState(r) !== 2;
  }
  GetGroupRewardProgress(e, r) {
    var t;
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    if (e) {
      t = e.GetGroupRewardProgress(r);
      e = e.GetGroupChallengeNumber(r);
      return StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("LineCrossProgress") ?? "", t.toString(), e.toString());
    } else {
      return "";
    }
  }
  GetLockDescription(e, r) {
    e = this.GetGroupUnlockTime(e, r);
    r = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(e - TimeUtil_1.TimeUtil.GetServerTime());
    return StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("LineCrossLock") ?? "", r.CountDownText);
  }
  GetGroupUnlockTime(e, r) {
    e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    if (e) {
      return e.GetGroupUnlockTime(r);
    } else {
      return 0;
    }
  }
  GetShowGroupList(e) {
    e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    if (e) {
      return e.GetShowGroupList();
    } else {
      return [];
    }
  }
  GetGroupRewardState(e, r) {
    e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    return !!e && e.GetGroupHasGetReward(r);
  }
  GetIfHiddenGroup(e, r) {
    e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    return !!e && e.GetIfHiddenGroup(r);
  }
  GetGroupIfShow(e, r) {
    e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    return !!e && e.IfGroupShow(r);
  }
  GetChallengeRequireFinishState(e, r) {
    e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    return !!e && e.GetChallengeRequireFinishState(r);
  }
  GetGroupState(e, r) {
    e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    if (e) {
      return e.GetGroupState(r);
    } else {
      return 0;
    }
  }
  GetGroupRedDotState(e) {
    e = ConfigManager_1.ConfigManager.LineCrossConfig.GetLineCrossGroupByGroupId(e);
    if (e) {
      for (const r of e.ChallengeList) {
        if (this.GetChallengeRedDotState(r)) {
          return true;
        }
      }
    }
    return false;
  }
  GetChallengeFinishState(e, r) {
    e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    return !!e && e.GetChallengeIfGetReward(r);
  }
  SaveChallengeRedDotState(e, r) {
    let t = undefined;
    for (const a of ModelManager_1.ModelManager.ActivityModel.GetCurrentShowingActivities()) {
      if (a.Type === Protocol_1.Aki.Protocol.uks.Proto_LineCross) {
        var o = a;
        if (o.CheckIfHaveChallenge(r)) {
          t = o;
          break;
        }
      }
    }
    if (t) {
      ModelManager_1.ModelManager.ActivityModel.SaveActivityData(e, r, 0, 0, 1);
    }
  }
  GetChallengeRedDotState(e) {
    var r;
    var t;
    var o;
    var a = ModelManager_1.ModelManager.ActivityModel.GetCurrentActivitiesByType(Protocol_1.Aki.Protocol.uks.Proto_LineCross);
    let n = undefined;
    return !!(n = a.length > 0 ? a[0] : n) && (a = ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(n.Id, 0, e, 0, 0), r = ConfigManager_1.ConfigManager.LineCrossConfig.GetLineCrossChallengeById(e).GroupId, e = this.GetChallengeRequireFinishState(n.Id, e), t = this.GetIfHiddenGroup(n.Id, r), o = this.GetGroupIfShow(n.Id, r), !t || !!o) && a === 0 && n.GetGroupIfOverUnlockTime(r) && e;
  }
}
exports.LineCrossModel = LineCrossModel;
//# sourceMappingURL=LineCrossModel.js.map