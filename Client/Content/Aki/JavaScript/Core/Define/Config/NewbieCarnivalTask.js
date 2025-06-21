"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.NewbieCarnivalTask = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class NewbieCarnivalTask {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get TaskId() {
    return this.taskid()
  }
  get TaskType() {
    return this.tasktype()
  }
  get ActivityId() {
    return this.activityid()
  }
  get TaskName() {
    return this.taskname()
  }
  get JumpConditionGroups() {
    return GameUtils_1.GameUtils.ConvertToArray(this.jumpconditiongroupsLength(), this.jumpconditiongroups, this)
  }
  get JumpConditionGroup() {
    return this.jumpconditiongroup()
  }
  get TaskReward() {
    return this.taskreward()
  }
  get JumpId() {
    return this.jumpid()
  }
  __init(t, i) {
    return this.z7 = t, this.J7 = i, this
  }
  static getRootAsNewbieCarnivalTask(t, i) {
    return (i || new NewbieCarnivalTask).__init(t.readInt32(t.position()) + t.position(), t)
  }
  taskid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  tasktype() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  taskname(t) {
    var i = this.J7.__offset(this.z7, 10),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  GetJumpconditiongroupsAt(t) {
    return this.jumpconditiongroups(t)
  }
  jumpconditiongroups(t) {
    var i = this.J7.__offset(this.z7, 12);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0
  }
  jumpconditiongroupsLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  jumpconditiongroupsArray() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
  jumpconditiongroup() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  taskreward() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  jumpid() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
}
exports.NewbieCarnivalTask = NewbieCarnivalTask;
//# sourceMappingURL=NewbieCarnivalTask.js.map