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
    this.lIf = 0;
    this._If = 0;
    this.uIf = 0;
  }
  get GetCacheActivityId() {
    return this.lIf;
  }
  get GetUnlockIndex() {
    return this._If;
  }
  get GetRewardedIndex() {
    return this.uIf;
  }
  PhraseEx(t) {
    if (t &&= t.zEm) {
      this.SetCacheActivityId(t.w6n);
      this.SetUnlockIndex(t.TMf);
      this.SetRewardedIndex(t.bMf);
    }
  }
  SetCacheActivityId(t) {
    this.lIf = t;
  }
  SetUnlockIndex(t) {
    this._If = t;
  }
  SetRewardedIndex(t) {
    this.uIf = t;
  }
  GetArtemisStatus(t) {
    t += 1;
    if (t <= this._If) {
      if (t <= this.uIf) {
        return 2;
      }
      if (t === this.uIf + 1) {
        return 1;
      }
    }
    return 0;
  }
  GetArtemisRewardedIndex() {
    return Math.max(this.uIf - 1, 0);
  }
  GetArtemisUnlockIndex() {
    return Math.max(this._If - 1, 0);
  }
  GetArtemisDefaultOpenIndex() {
    let t = 0;
    t = this._If > this.uIf ? this.uIf + 1 : this._If;
    return Math.max(t - 1, 0);
  }
  GetCanReceive() {
    return this._If > this.uIf;
  }
  GetExDataRedPointShowState() {
    return this.GetCanReceive();
  }
  GetExDataFinishShowState() {
    var t;
    return this._If === this.uIf && (t = ConfigManager_1.ConfigManager.ArtemisActivityConfig?.GetArtemisGroupByActivityId(this.lIf), this._If === t?.length);
  }
}
exports.ArtemisActivityData = ArtemisActivityData;
//# sourceMappingURL=ArtemisActivityData.js.map