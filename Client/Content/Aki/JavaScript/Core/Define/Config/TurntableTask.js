"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TurntableTask = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class TurntableTask {
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
  get TaskDescription() {
    return this.taskdescription();
  }
  get TaskReward() {
    return this.taskreward();
  }
  get TaskSort() {
    return this.tasksort();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsTurntableTask(t, s) {
    return (s || new TurntableTask()).__init(t.readInt32(t.position()) + t.position(), t);
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
  taskdescription(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  taskreward() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  tasksort() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.TurntableTask = TurntableTask;
//# sourceMappingURL=TurntableTask.js.map