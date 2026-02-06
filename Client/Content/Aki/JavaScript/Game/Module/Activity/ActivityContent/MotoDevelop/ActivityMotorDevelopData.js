"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityMotorDevelopData = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
const FIRSTOPEN = 1;
const FIRSTUNLOCK = 2;
class ActivityMotorDevelopData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.QY = new Map();
  }
  PhraseEx(t) {
    t = t.Bkg?.vlu;
    if (t) {
      this.InitMotorDevelopTask(t);
    }
  }
  InitMotorDevelopTask(t) {
    this.QY.clear();
    for (const e of t) {
      this.QY.set(e.s5n, e);
    }
  }
  UpdateMotorDevelopTask(t) {
    for (const e of t) {
      this.QY.set(e.s5n, e);
    }
  }
  GetMotorDevelopTaskList() {
    return Array.from(this.QY.values());
  }
  SetActivityFirstUnlockUnReadFlag(t) {
    ModelManager_1.ModelManager.ActivityModel?.SaveActivityData(this.Id, FIRSTUNLOCK, 0, 0, t);
  }
  CheckAndCloseFirstUnlockReadFlag() {
    if (this.IsUnLock()) {
      this.SetActivityFirstUnlockUnReadFlag(0);
    }
  }
  GetExDataRedPointShowState() {
    if (ModelManager_1.ModelManager.ActivityModel?.GetActivityCacheData(this.Id, 0, FIRSTOPEN, 0, 0)) {
      return true;
    }
    if (ModelManager_1.ModelManager.ActivityModel?.GetActivityCacheData(this.Id, 0, FIRSTUNLOCK, 0, 0)) {
      return true;
    }
    for (const t of Array.from(this.QY.values())) {
      if (t.H6n === Protocol_1.Aki.Protocol.Bwu.Proto_ConditionTaskFinish) {
        return true;
      }
    }
    return false;
  }
  GetExDataFinishShowState() {
    for (const t of Array.from(this.QY.values())) {
      if (t.H6n !== Protocol_1.Aki.Protocol.Bwu.Proto_ConditionTaskTaken) {
        return false;
      }
    }
    return true;
  }
}
exports.ActivityMotorDevelopData = ActivityMotorDevelopData;
//# sourceMappingURL=ActivityMotorDevelopData.js.map