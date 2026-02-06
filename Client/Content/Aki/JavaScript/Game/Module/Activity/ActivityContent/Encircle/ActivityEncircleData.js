"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityEncircleData = undefined;
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
const ActivityEncircleController_1 = require("./ActivityEncircleController");
const EncircleDefine_1 = require("./EncircleDefine");
class ActivityEncircleData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.kTg = new Map();
    this.cPg = new Map();
  }
  PhraseEx(e) {
    e = e.eyg?.mps;
    if (e) {
      for (const t of e) {
        this.kTg.set(t.e8n, t);
      }
    }
  }
  CheckChallengeNewUnlock(e) {
    return this.cPg.get(e) === true;
  }
  MarkChallengeNewUnlock(e, t = false) {
    this.cPg.set(e, t);
  }
  CheckChallengeComplete(e) {
    e = this.kTg.get(e);
    return !!e && e.eE_;
  }
  CheckPreChallengeComplete(e) {
    e = ConfigManager_1.ConfigManager.ActivityEncircleConfig.GetEncircleChallengeConfig(e);
    return e.PreId === 0 || this.CheckChallengeComplete(e.PreId);
  }
  GetCompleteChallengeCount() {
    var e = ActivityEncircleController_1.ActivityEncircleController.ActivityId;
    var e = ConfigManager_1.ConfigManager.ActivityEncircleConfig?.GetEncircleGroups(e);
    if (!e) {
      return 0;
    }
    let t = 0;
    for (const r of e) {
      if (this.CheckChallengeComplete(r.Challenges[0])) {
        t++;
      }
      if (this.CheckChallengeComplete(r.Challenges[1])) {
        t++;
      }
    }
    return t;
  }
  GetCurrentChallengeCount() {
    var e = ActivityEncircleController_1.ActivityEncircleController.ActivityId;
    var e = ConfigManager_1.ConfigManager.ActivityEncircleConfig?.GetEncircleGroups(e);
    if (!e) {
      return 0;
    }
    let t = 0;
    for (const r of e) {
      t += r.Challenges.length;
    }
    return t;
  }
  GetCurrentChallenge() {
    var e = ActivityEncircleController_1.ActivityEncircleController.ActivityId;
    var e = ConfigManager_1.ConfigManager.ActivityEncircleConfig?.GetEncircleGroups(e);
    if (e) {
      for (const t of e) {
        for (const r of t.Challenges) {
          if (!this.CheckChallengeComplete(r)) {
            return r;
          }
        }
      }
    }
    return 0;
  }
  GetCurrentGroup() {
    var e = ActivityEncircleController_1.ActivityEncircleController.ActivityId;
    var e = ConfigManager_1.ConfigManager.ActivityEncircleConfig?.GetEncircleGroups(e);
    if (!e) {
      return 0;
    }
    for (const t of e) {
      if (!this.CheckChallengeComplete(t.Challenges[0])) {
        return t.Id;
      }
    }
    return e.length;
  }
  GetChallengeRecord(e) {
    if (this.kTg.get(e)) {
      return this.kTg.get(e).tyg;
    } else {
      return 0;
    }
  }
  UpdateChallengeInfo(e) {
    if (!this.cPg.get(e.e8n) && !this.CheckChallengeComplete(e.e8n) && ConfigManager_1.ConfigManager.ActivityEncircleConfig.GetEncircleChallengeConfig(e.e8n).Difficulty === 0) {
      this.cPg.set(e.e8n, true);
    }
    this.kTg.set(e.e8n, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.EncircleDataUpdate, e);
  }
  CheckChallengeIsOpen(e) {
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    return !!this.kTg.get(e) && Number(MathUtils_1.MathUtils.LongToBigInt(this.kTg.get(e).pDs)) <= t;
  }
  GetUnlockDesc(e) {
    var e = Number(MathUtils_1.MathUtils.LongToBigInt(this.kTg.get(e).pDs));
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    return !(e <= t) && TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(e - t).CountDownText || "";
  }
  CheckGroupRedPointShow(e) {
    e = ConfigManager_1.ConfigManager.ActivityEncircleConfig.GetEncircleGroup(e);
    let t = false;
    if (this.CheckChallengeRedPointShow(e.Challenges[0])) {
      t = true;
    }
    return t = this.CheckChallengeRedPointShow(e.Challenges[1]) ? true : t;
  }
  CheckChallengeRedPointShow(e) {
    var t = ActivityEncircleController_1.ActivityEncircleController.ActivityId;
    var r = ConfigManager_1.ConfigManager.ActivityEncircleConfig.GetEncircleChallengeConfig(e);
    return !this.CheckChallengeComplete(e) && !!this.CheckChallengeIsOpen(e) && (r.PreId === 0 || !!this.CheckChallengeComplete(r.PreId)) && !ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(t, 0, EncircleDefine_1.ENCIRCLE_REDPOINT_KEY, e, 0);
  }
  GetExDataFinishShowState() {
    return this.GetCompleteChallengeCount() === this.GetCurrentChallengeCount();
  }
  GetExDataRedPointShowState() {
    return ActivityEncircleController_1.ActivityEncircleController.GetRedPointShow();
  }
}
exports.ActivityEncircleData = ActivityEncircleData;
//# sourceMappingURL=ActivityEncircleData.js.map