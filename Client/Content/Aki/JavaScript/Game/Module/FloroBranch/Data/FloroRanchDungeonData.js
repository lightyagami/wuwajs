"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchDungeonData = undefined;
class FloroRanchDungeonData {
  constructor(t) {
    this.Lo = undefined;
    this.ynu = [];
    this.P4e = false;
    this.Qmu = 0;
    this.Lo = t;
  }
  PushSubDungeonData(t) {
    this.ynu.push(t);
  }
  UpdateUnLockState(t) {
    this.P4e = t;
    for (const e of this.ynu) {
      e.IsInstanceUnlock = true;
    }
  }
  get IsUnLock() {
    return this.P4e;
  }
  set ConditionId(t) {
    this.Qmu = t;
  }
  get ConditionId() {
    return this.Qmu;
  }
  get Id() {
    return this.Lo.Id;
  }
  get SortId() {
    return this.Lo.SortId;
  }
  get DelayTime() {
    return this.Lo.DelayTime;
  }
  GetDungeonName() {
    return this.Lo.Name;
  }
  GetSubDungeonData() {
    return this.ynu;
  }
  GetLatestSubDungeonData() {
    let t = this.ynu[0];
    for (const e of this.ynu) {
      if (!e.IsUnLock) {
        return t;
      }
      t = e;
    }
    return t;
  }
  get IsDifficulty() {
    return this.Lo.Difficulty === 1;
  }
  get RomeNumIcon() {
    return this.Lo.RomeIconPath;
  }
  get HasRedDot() {
    if (this.IsUnLock) {
      for (const t of this.ynu) {
        if (t.HasRedDot) {
          return true;
        }
      }
    }
    return false;
  }
}
exports.FloroRanchDungeonData = FloroRanchDungeonData;
//# sourceMappingURL=FloroRanchDungeonData.js.map