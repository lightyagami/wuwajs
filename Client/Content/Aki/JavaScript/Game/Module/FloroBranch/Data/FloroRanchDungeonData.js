"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchDungeonData = undefined;
const TimeUtil_1 = require("../../../Common/TimeUtil");
class FloroRanchDungeonData {
  constructor(t) {
    this.Lo = undefined;
    this.Kou = [];
    this.dAu = false;
    this.mAu = 0;
    this.Lo = t;
  }
  PushSubDungeonData(t) {
    this.Kou.push(t);
  }
  UpdateUnLockState(t) {
    this.dAu = t;
    for (const e of this.Kou) {
      e.IsInstanceUnlock = true;
    }
  }
  IsReachUnlockTime() {
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    return this.mAu === 0 || this.UnlockTime < t;
  }
  get IsUnLock() {
    return this.IsReachUnlockTime() && this.dAu;
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
    return this.Kou;
  }
  set UnlockTime(t) {
    this.mAu = t;
  }
  get UnlockTime() {
    return this.mAu;
  }
  get IsDifficulty() {
    return this.Lo.Difficulty === 1;
  }
  get RomeNumIcon() {
    return this.Lo.RomeIconPath;
  }
  get HasRedDot() {
    if (this.IsUnLock) {
      for (const t of this.Kou) {
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