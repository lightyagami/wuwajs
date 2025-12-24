"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArtemisActivityData = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ActivityData_1 = require("../../ActivityData");
class ArtemisActivityData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.SSf = 0;
    this.MSf = 0;
    this.ESf = 0;
  }
  get GetCacheActivityId() {
    return this.SSf;
  }
  get GetUnlockIndex() {
    return this.MSf;
  }
  get GetRewardedIndex() {
    return this.ESf;
  }
  PhraseEx(t) {
    if (t &&= t.WEm) {
      this.SetCacheActivityId(t.w6n);
      this.SetUnlockIndex(t.Xgf);
      this.SetRewardedIndex(t.Ygf);
    }
  }
  SetCacheActivityId(t) {
    this.SSf = t;
  }
  SetUnlockIndex(t) {
    this.MSf = t;
  }
  SetRewardedIndex(t) {
    this.ESf = t;
  }
  GetArtemisStatus(t) {
    t += 1;
    if (t <= this.MSf) {
      if (t <= this.ESf) {
        return 2;
      }
      if (t === this.ESf + 1) {
        return 1;
      }
    }
    return 0;
  }
  GetArtemisRewardedIndex() {
    return Math.max(this.ESf - 1, 0);
  }
  GetArtemisUnlockIndex() {
    return Math.max(this.MSf - 1, 0);
  }
  GetArtemisDefaultOpenIndex() {
    let t = 0;
    t = this.MSf > this.ESf ? this.ESf + 1 : this.MSf;
    return Math.max(t - 1, 0);
  }
  GetCanReceive() {
    return this.MSf > this.ESf;
  }
  GetExDataRedPointShowState() {
    return this.GetCanReceive();
  }
  GetExDataFinishShowState() {
    var t;
    return this.MSf === this.ESf && (t = ConfigManager_1.ConfigManager.ArtemisActivityConfig?.GetArtemisGroupByActivityId(this.SSf), this.MSf === t?.length);
  }
}
exports.ArtemisActivityData = ArtemisActivityData;
//# sourceMappingURL=ArtemisActivityData.js.map