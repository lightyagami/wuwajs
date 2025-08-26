"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineCrossActivityData = undefined;
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
const LineCrossDataDefine_1 = require("./LineCrossDataDefine");
class LineCrossActivityData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.LPu = new Map();
  }
  PhraseEx(e) {
    e.CJc?.mps.forEach(e => {
      var t = this.GetChallengeData(e.e8n);
      if (t) {
        t.Phrase(e);
      } else {
        (t = new LineCrossDataDefine_1.LineCrossChallengeData()).Phrase(e);
        this.LPu.set(t.GetId(), t);
      }
    });
  }
  GetChallengeData(e) {
    return this.LPu.get(e);
  }
  OnChallengeDataUpdate(e) {
    var t = this.GetChallengeData(e.e8n);
    if (t) {
      t.Phrase(e);
    } else {
      (t = new LineCrossDataDefine_1.LineCrossChallengeData()).Phrase(e);
      this.LPu.set(t.GetId(), t);
    }
  }
  GetChallengeNumber() {
    return this.LPu.size;
  }
  GetFinishChallengeNumber() {
    let t = 0;
    this.LPu.forEach(e => {
      if (e.GetHasGetReward()) {
        t++;
      }
    });
    return t;
  }
  GetGroupChallengeNumber(e) {
    let t = 0;
    for (const r of ConfigManager_1.ConfigManager.LineCrossConfig.GetLineCrossGroupByGroupId(e).ChallengeList) {
      if (this.GetChallengeData(r)) {
        t++;
      }
    }
    return t;
  }
  GetGroupRewardProgress(e) {
    let t = 0;
    for (const i of ConfigManager_1.ConfigManager.LineCrossConfig.GetLineCrossGroupByGroupId(e).ChallengeList) {
      var r = this.GetChallengeData(i);
      if (r && r.GetHasGetReward()) {
        t++;
      }
    }
    return t;
  }
  GetGroupUnlockTime(e) {
    let t = 0;
    for (const i of ConfigManager_1.ConfigManager.LineCrossConfig.GetLineCrossGroupByGroupId(e).ChallengeList) {
      var r = this.GetChallengeData(i);
      if (r && r.GetOpenTime() > t) {
        t = r.GetOpenTime();
      }
    }
    return t;
  }
  GetGroupHasGetReward(e) {
    for (const r of ConfigManager_1.ConfigManager.LineCrossConfig.GetLineCrossGroupByGroupId(e).ChallengeList) {
      var t = this.GetChallengeData(r);
      if (t && !t.GetHasGetReward()) {
        return false;
      }
    }
    return true;
  }
  GetIfHiddenGroup(e) {
    return ConfigManager_1.ConfigManager.LineCrossConfig.GetLineCrossGroupByGroupId(e).NeedFinishGroup.length > 0;
  }
  GetChallengeRequireFinishState(e) {
    e = this.GetChallengeData(e);
    return !!e && e.GetPreChallengeState();
  }
  IfGroupShow(e) {
    if (this.GetIfHiddenGroup(e)) {
      for (const t of ConfigManager_1.ConfigManager.LineCrossConfig.GetLineCrossGroupByGroupId(e).NeedFinishGroup) {
        if (!this.GetGroupHasGetReward(t)) {
          return false;
        }
      }
    }
    return true;
  }
  GetGroupState(e) {
    let t = true;
    for (const i of ConfigManager_1.ConfigManager.LineCrossConfig.GetLineCrossGroupByGroupId(e).ChallengeList) {
      var r = this.GetChallengeData(i);
      if (!r || !r.GetHasGetReward()) {
        t = false;
        break;
      }
    }
    if (t) {
      return 1;
    } else if (this.GetGroupIfOverUnlockTime(e)) {
      return 0;
    } else {
      return 2;
    }
  }
  GetShowGroupList() {
    var e = [];
    for (const t of ConfigManager_1.ConfigManager.LineCrossConfig.GetLineCrossEntranceById(this.Id).GroupList) {
      if (this.IfGroupShow(t)) {
        e.push(t);
      }
    }
    return e;
  }
  GetGroupIfOverUnlockTime(e) {
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    return this.GetGroupUnlockTime(e) <= t;
  }
  GetChallengeIfGetReward(e) {
    e = this.GetChallengeData(e);
    return !!e && e.GetHasGetReward();
  }
  med() {
    for (const e of this.LPu.values()) {
      if (!e.GetHasGetReward()) {
        return false;
      }
    }
    return true;
  }
  GetExDataFinishShowState() {
    return this.med();
  }
  GetExDataRedPointShowState() {
    if (this.GetPreGuideQuestFinishState()) {
      for (const e of this.LPu.values()) {
        if (ModelManager_1.ModelManager.LineCrossModel.GetChallengeRedDotState(e.GetId())) {
          return true;
        }
      }
    }
    return false;
  }
  CheckIfHaveChallenge(e) {
    return this.LPu.has(e);
  }
}
exports.LineCrossActivityData = LineCrossActivityData;
//# sourceMappingURL=LineCrossActivityData.js.map