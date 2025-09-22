"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LivenessTask = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class LivenessTask {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get TaskId() {
    return this.taskid();
  }
  get TaskName() {
    return this.taskname();
  }
  get UpdateType() {
    return this.updatetype();
  }
  get TaskReward() {
    return GameUtils_1.GameUtils.ConvertToMap(this.taskrewardLength(), this.taskrewardKey, this.taskrewardValue, this);
  }
  taskrewardKey(t) {
    return this.taskreward(t)?.key();
  }
  taskrewardValue(t) {
    return this.taskreward(t)?.value();
  }
  get TaskFunc() {
    return GameUtils_1.GameUtils.ConvertToArray(this.taskfuncLength(), this.taskfunc, this);
  }
  get UnlockCondition() {
    return this.unlockcondition();
  }
  get SortRank() {
    return this.sortrank();
  }
  get AccessId() {
    return this.accessid();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsLivenessTask(t, s) {
    return (s || new LivenessTask()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  taskid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  taskname(t) {
    var s = this.J7.__offset(this.z7, 6);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  updatetype() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTaskrewardAt(t, s) {
    return this.taskreward(t);
  }
  taskreward(t, s) {
    var i = this.J7.__offset(this.z7, 10);
    if (i) {
      return (s || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  taskrewardLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTaskfuncAt(t) {
    return this.taskfunc(t);
  }
  taskfunc(t, s) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  taskfuncLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  unlockcondition() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sortrank() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  accessid() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.LivenessTask = LivenessTask;
//# sourceMappingURL=LivenessTask.js.map