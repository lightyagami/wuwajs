"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchRaceData = undefined;
class FloroRanchRaceData {
  constructor(t) {
    this.Lo = undefined;
    this.P4e = true;
    this._mu = 0;
    this.Lo = t;
  }
  UpdateUnLockState(t) {
    this.P4e = t;
  }
  get IsUnLock() {
    return this.P4e;
  }
  set ConditionId(t) {
    this._mu = t;
  }
  get ConditionId() {
    return this._mu;
  }
  get Id() {
    return this.Lo.Id;
  }
  GetRaceName() {
    return this.Lo.Name;
  }
  get Icon() {
    return this.Lo.Icon;
  }
  get SmallIcon() {
    return this.Lo.SmallIcon;
  }
  GetDesc() {
    return this.Lo.Description;
  }
  get IsCommon() {
    return this.Lo.IsCommon;
  }
}
exports.FloroRanchRaceData = FloroRanchRaceData;
//# sourceMappingURL=FloroRanchRaceData.js.map