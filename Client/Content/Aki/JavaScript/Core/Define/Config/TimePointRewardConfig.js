"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimePointRewardConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class TimePointRewardConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ActivityId() {
    return this.activityid();
  }
  get UiPrefab() {
    return this.uiprefab();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsTimePointRewardConfig(t, i) {
    return (i || new TimePointRewardConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  uiprefab(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.TimePointRewardConfig = TimePointRewardConfig;
//# sourceMappingURL=TimePointRewardConfig.js.map