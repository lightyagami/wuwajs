"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LongShanTask = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class LongShanTask {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get TaskId() {
    return this.taskid();
  }
  get StageId() {
    return this.stageid();
  }
  get TaskName() {
    return this.taskname();
  }
  get SortId() {
    return this.sortid();
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
  get JumpId() {
    return this.jumpid();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsLongShanTask(t, s) {
    return (s || new LongShanTask()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  taskid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  stageid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  taskname(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  sortid() {
    var t = this.J7.__offset(this.z7, 10);
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
    var i = this.J7.__offset(this.z7, 12);
    if (i) {
      return (s || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  taskrewardLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  jumpid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.LongShanTask = LongShanTask;
//# sourceMappingURL=LongShanTask.js.map