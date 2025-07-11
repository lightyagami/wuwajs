"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreActivityTask = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class ExploreActivityTask {
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
  get DropId() {
    return this.dropid();
  }
  get Desc() {
    return this.desc();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsExploreActivityTask(t, i) {
    return (i || new ExploreActivityTask()).__init(t.readInt32(t.position()) + t.position(), t);
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
  dropid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  desc(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.ExploreActivityTask = ExploreActivityTask;
//# sourceMappingURL=ExploreActivityTask.js.map