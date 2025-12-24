"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrPhoneTask = undefined;
class InfrPhoneTask {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get TaskId() {
    return this.taskid();
  }
  get Target() {
    return this.target();
  }
  get TaskReward() {
    return this.taskreward();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsInfrPhoneTask(t, s) {
    return (s || new InfrPhoneTask()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  taskid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  target() {
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
}
exports.InfrPhoneTask = InfrPhoneTask;
//# sourceMappingURL=InfrPhoneTask.js.map