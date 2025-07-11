"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConsumptiveTask = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class ConsumptiveTask {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get MaxFinishCount() {
    return this.maxfinishcount();
  }
  get RewardScore() {
    return this.rewardscore();
  }
  get TaskTab() {
    return this.tasktab();
  }
  get DesString() {
    return this.desstring();
  }
  get SkipId() {
    return this.skipid();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsConsumptiveTask(t, s) {
    return (s || new ConsumptiveTask()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxfinishcount() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewardscore() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  tasktab() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  desstring(t) {
    var s = this.J7.__offset(this.z7, 12);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  skipid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.ConsumptiveTask = ConsumptiveTask;
//# sourceMappingURL=ConsumptiveTask.js.map