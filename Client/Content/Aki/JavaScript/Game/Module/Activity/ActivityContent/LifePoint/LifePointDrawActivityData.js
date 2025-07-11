"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LifePointDrawActivityData = undefined;
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
const LifePointDrawDataDefine_1 = require("./LifePointDrawDataDefine");
class LifePointDrawActivityData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.tPu = new Map();
  }
  PhraseEx(e) {
    e.kwu?.mps.forEach(e => {
      var t = this.GetChallengeData(e.e8n);
      if (t) {
        t.Phrase(e);
      } else {
        (t = new LifePointDrawDataDefine_1.LifePointChallengeData()).Phrase(e);
        this.tPu.set(t.GetId(), t);
      }
    });
  }
  GetChallengeData(e) {
    return this.tPu.get(e);
  }
  OnLifePointChallengeDataUpdate(e) {
    var t = this.GetChallengeData(e.e8n);
    if (t) {
      t.Phrase(e);
    } else {
      (t = new LifePointDrawDataDefine_1.LifePointChallengeData()).Phrase(e);
      this.tPu.set(t.GetId(), t);
    }
  }
  GetChallengeNumber() {
    return this.tPu.size;
  }
  GetFinishChallengeNumber() {
    let t = 0;
    this.tPu.forEach(e => {
      if (e.GetHasGetReward()) {
        t++;
      }
    });
    return t;
  }
  GetGroupChallengeNumber(e) {
    let t = 0;
    for (const r of ConfigManager_1.ConfigManager.LifePointDrawConfig.GetLifePointGroupByGroupId(e).ChallengeList) {
      if (this.GetChallengeData(r)) {
        t++;
      }
    }
    return t;
  }
  GetGroupUnlockTime(e) {
    let t = 0;
    for (const a of ConfigManager_1.ConfigManager.LifePointDrawConfig.GetLifePointGroupByGroupId(e).ChallengeList) {
      var r = this.GetChallengeData(a);
      if (r && r.GetOpenTime() > t) {
        t = r.GetOpenTime();
      }
    }
    return t;
  }
  GetGroupIfOverUnlockTime(e) {
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    return this.GetGroupUnlockTime(e) <= t;
  }
  GetGroupHasGetReward(e) {
    for (const r of ConfigManager_1.ConfigManager.LifePointDrawConfig.GetLifePointGroupByGroupId(e).ChallengeList) {
      var t = this.GetChallengeData(r);
      if (t && !t.GetHasGetReward()) {
        return false;
      }
    }
    return true;
  }
  GetGroupRewardProgress(e) {
    let t = 0;
    for (const a of ConfigManager_1.ConfigManager.LifePointDrawConfig.GetLifePointGroupByGroupId(e).ChallengeList) {
      var r = this.GetChallengeData(a);
      if (r && r.GetHasGetReward()) {
        t++;
      }
    }
    return t;
  }
  GetChallengeIfGetReward(e) {
    e = this.GetChallengeData(e);
    return !!e && e.GetHasGetReward();
  }
  GetChallengeRequireFinishState(e) {
    e = this.GetChallengeData(e);
    return !!e && e.GetPreChallengeState();
  }
  CheckIfHaveChallenge(e) {
    return this.tPu.has(e);
  }
  GetExDataRedPointShowState() {
    if (this.GetPreGuideQuestFinishState()) {
      for (const e of this.tPu.values()) {
        if (ModelManager_1.ModelManager.LifePointDrawModel.GetChallengeRedDotState(e.GetId())) {
          return true;
        }
      }
    }
    return false;
  }
}
exports.LifePointDrawActivityData = LifePointDrawActivityData;
//# sourceMappingURL=LifePointDrawActivityData.js.map