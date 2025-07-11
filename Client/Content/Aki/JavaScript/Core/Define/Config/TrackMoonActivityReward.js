"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrackMoonActivityReward = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class TrackMoonActivityReward {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get TargetName() {
    return this.targetname();
  }
  get TargetReward() {
    return this.targetreward();
  }
  get TargetFunc() {
    return this.targetfunc();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsTrackMoonActivityReward(t, r) {
    return (r || new TrackMoonActivityReward()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  targetname(t) {
    var r = this.J7.__offset(this.z7, 6);
    var r = r ? this.J7.__string(this.z7 + r, t) : null;
    if (typeof r == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(r);
    }
    return r;
  }
  targetreward() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  targetfunc() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.TrackMoonActivityReward = TrackMoonActivityReward;
//# sourceMappingURL=TrackMoonActivityReward.js.map