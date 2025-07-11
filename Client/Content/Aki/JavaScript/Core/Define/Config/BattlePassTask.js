"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattlePassTask = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class BattlePassTask {
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
  get JumpId() {
    return this.jumpid();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsBattlePassTask(t, s) {
    return (s || new BattlePassTask()).__init(t.readInt32(t.position()) + t.position(), t);
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
    var e = this.J7.__offset(this.z7, 10);
    if (e) {
      return (s || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
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
  jumpid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.BattlePassTask = BattlePassTask;
//# sourceMappingURL=BattlePassTask.js.map