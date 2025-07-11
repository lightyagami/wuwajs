"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegressDoubleDrop = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RegressDoubleDrop {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Grade() {
    return this.grade();
  }
  get BossDoubleTimes() {
    return this.bossdoubletimes();
  }
  get WeekDoubleTimes() {
    return this.weekdoubletimes();
  }
  get BossUnLock() {
    return this.bossunlock();
  }
  get WeekUnLock() {
    return this.weekunlock();
  }
  get Tips() {
    return this.tips();
  }
  get WorldBossAccessPathId() {
    return this.worldbossaccesspathid();
  }
  get WeekAccessPathId() {
    return this.weekaccesspathid();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsRegressDoubleDrop(t, s) {
    return (s || new RegressDoubleDrop()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  grade() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  bossdoubletimes() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  weekdoubletimes() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  bossunlock() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  weekunlock() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  tips(t) {
    var s = this.J7.__offset(this.z7, 16);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  worldbossaccesspathid() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  weekaccesspathid() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RegressDoubleDrop = RegressDoubleDrop;
//# sourceMappingURL=RegressDoubleDrop.js.map