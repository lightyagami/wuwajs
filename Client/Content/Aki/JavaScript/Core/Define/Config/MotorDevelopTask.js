"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorDevelopTask = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class MotorDevelopTask {
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
  get TaskName() {
    return this.taskname();
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
  get TaskRewardShow() {
    return GameUtils_1.GameUtils.ConvertToMap(this.taskrewardshowLength(), this.taskrewardshowKey, this.taskrewardshowValue, this);
  }
  taskrewardshowKey(t) {
    return this.taskrewardshow(t)?.key();
  }
  taskrewardshowValue(t) {
    return this.taskrewardshow(t)?.value();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsMotorDevelopTask(t, s) {
    return (s || new MotorDevelopTask()).__init(t.readInt32(t.position()) + t.position(), t);
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
  taskname(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetTaskrewardAt(t, s) {
    return this.taskreward(t);
  }
  taskreward(t, s) {
    var r = this.J7.__offset(this.z7, 10);
    if (r) {
      return (s || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + r) + t * 4), this.J7);
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
  GetTaskrewardshowAt(t, s) {
    return this.taskrewardshow(t);
  }
  taskrewardshow(t, s) {
    var r = this.J7.__offset(this.z7, 12);
    if (r) {
      return (s || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + r) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  taskrewardshowLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.MotorDevelopTask = MotorDevelopTask;
//# sourceMappingURL=MotorDevelopTask.js.map