"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LifePointDrawModel = undefined;
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
class LifePointDrawModel extends ModelBase_1.ModelBase {
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
    return !!e && e.GetGroupIfOverUnlockTime(r);
  }
  GetGroupUnlockTime(e, r) {
    e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    if (e) {
      return e.GetGroupUnlockTime(r);
    } else {
      return 0;
    }
  }
  GetGroupRewardState(e, r) {
    e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    return !!e && e.GetGroupHasGetReward(r);
  }
  GetGroupRewardProgress(e, r) {
    var t;
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    if (e) {
      t = e.GetGroupRewardProgress(r);
      e = e.GetGroupChallengeNumber(r);
      return StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Colorful_Challenge_Progress") ?? "", t.toString(), e.toString());
    } else {
      return "";
    }
  }
  GetGroupRedDotState(e) {
    e = ConfigManager_1.ConfigManager.LifePointDrawConfig.GetLifePointGroupByGroupId(e);
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
  GetChallengeRequireFinishState(e, r) {
    e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    return !!e && e.GetChallengeRequireFinishState(r);
  }
  GetChallengeRedDotState(e) {
    var r;
    var t;
    var o;
    let a = undefined;
    for (const i of ModelManager_1.ModelManager.ActivityModel.GetCurrentShowingActivities()) {
      if (i.Type === Protocol_1.Aki.Protocol.uks.iAu) {
        var n = i;
        if (n.CheckIfHaveChallenge(e)) {
          a = n;
          break;
        }
      }
    }
    return !!a && (r = ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(a.Id, 0, e, 0, 0), t = ConfigManager_1.ConfigManager.LifePointDrawConfig.GetLifePointChallengeById(e).GroupId, o = this.GetChallengeRequireFinishState(a.Id, e), r === 0) && a.GetGroupIfOverUnlockTime(t) && o;
  }
  SaveChallengeRedDotState(e, r) {
    let t = undefined;
    for (const a of ModelManager_1.ModelManager.ActivityModel.GetCurrentShowingActivities()) {
      if (a.Type === Protocol_1.Aki.Protocol.uks.iAu) {
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
}
exports.LifePointDrawModel = LifePointDrawModel;
//# sourceMappingURL=LifePointDrawModel.js.map