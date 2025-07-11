"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewbieCarnivalTask = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class NewbieCarnivalTask {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get TaskId() {
    return this.taskid();
  }
  get TaskType() {
    return this.tasktype();
  }
  get ActivityId() {
    return this.activityid();
  }
  get TaskName() {
    return this.taskname();
  }
  get JumpConditionGroups() {
    return GameUtils_1.GameUtils.ConvertToArray(this.jumpconditiongroupsLength(), this.jumpconditiongroups, this);
  }
  get JumpConditionGroup() {
    return this.jumpconditiongroup();
  }
  get TaskReward() {
    return this.taskreward();
  }
  get JumpId() {
    return this.jumpid();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsNewbieCarnivalTask(t, i) {
    return (i || new NewbieCarnivalTask()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  taskid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  tasktype() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  taskname(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetJumpconditiongroupsAt(t) {
    return this.jumpconditiongroups(t);
  }
  jumpconditiongroups(t) {
    var i = this.J7.__offset(this.z7, 12);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  jumpconditiongroupsLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  jumpconditiongroupsArray() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  jumpconditiongroup() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  taskreward() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  jumpid() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.NewbieCarnivalTask = NewbieCarnivalTask;
//# sourceMappingURL=NewbieCarnivalTask.js.map