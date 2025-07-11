"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomBattleFourCTask = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class PhantomBattleFourCTask {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get CardId() {
    return this.cardid();
  }
  get CoreDesc() {
    return this.coredesc();
  }
  get TaskDesc() {
    return this.taskdesc();
  }
  get ConditionList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.conditionlistLength(), this.conditionlist, this);
  }
  get TaskDescConditionId() {
    return this.taskdescconditionid();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsPhantomBattleFourCTask(t, s) {
    return (s || new PhantomBattleFourCTask()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  cardid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  coredesc(t) {
    var s = this.J7.__offset(this.z7, 6);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  taskdesc(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetConditionlistAt(t) {
    return this.conditionlist(t);
  }
  conditionlist(t) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  conditionlistLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  conditionlistArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  taskdescconditionid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.PhantomBattleFourCTask = PhantomBattleFourCTask;
//# sourceMappingURL=PhantomBattleFourCTask.js.map