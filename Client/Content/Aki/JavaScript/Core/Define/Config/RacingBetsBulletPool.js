"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsBulletPool = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class RacingBetsBulletPool {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ActivityId() {
    return this.activityid();
  }
  get Threshold() {
    return this.threshold();
  }
  get BulletPool() {
    return GameUtils_1.GameUtils.ConvertToMap(this.bulletpoolLength(), this.bulletpoolKey, this.bulletpoolValue, this);
  }
  bulletpoolKey(t) {
    return this.bulletpool(t)?.key();
  }
  bulletpoolValue(t) {
    return this.bulletpool(t)?.value();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsRacingBetsBulletPool(t, i) {
    return (i || new RacingBetsBulletPool()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  threshold() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetBulletpoolAt(t, i) {
    return this.bulletpool(t);
  }
  bulletpool(t, i) {
    var e = this.J7.__offset(this.z7, 10);
    if (e) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  bulletpoolLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RacingBetsBulletPool = RacingBetsBulletPool;
//# sourceMappingURL=RacingBetsBulletPool.js.map