"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomBattleCount = undefined;
class PhantomBattleCount {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get CountType() {
    return this.counttype();
  }
  get TargetType() {
    return this.targettype();
  }
  get UnlockCount() {
    return this.unlockcount();
  }
  get ReduceCount() {
    return this.reducecount();
  }
  get CountSkillLimitNum() {
    return this.countskilllimitnum();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsPhantomBattleCount(t, i) {
    return (i || new PhantomBattleCount()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  counttype() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  targettype() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  unlockcount() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  reducecount() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  countskilllimitnum() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return -1;
    }
  }
}
exports.PhantomBattleCount = PhantomBattleCount;
//# sourceMappingURL=PhantomBattleCount.js.map