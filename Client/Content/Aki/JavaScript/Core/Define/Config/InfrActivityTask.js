"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrActivityTask = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class InfrActivityTask {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get TaskId() {
    return this.taskid();
  }
  get ActivityId() {
    return this.activityid();
  }
  get TaskReward() {
    return this.taskreward();
  }
  get TaskDes() {
    return this.taskdes();
  }
  get JumpId() {
    return this.jumpid();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsInfrActivityTask(t, s) {
    return (s || new InfrActivityTask()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  taskid() {
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
  taskreward() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  taskdes(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  jumpid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.InfrActivityTask = InfrActivityTask;
//# sourceMappingURL=InfrActivityTask.js.map