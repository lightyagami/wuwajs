"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomBattleFourCTask = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class PhantomBattleFourCTask {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get CardId() {
    return this.cardid()
  }
  get CoreDesc() {
    return this.coredesc()
  }
  get TaskDesc() {
    return this.taskdesc()
  }
  get ConditionList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.conditionlistLength(), this.conditionlist, this)
  }
  get TaskDescConditionId() {
    return this.taskdescconditionid()
  }
  __init(t, s) {
    return this.z7 = t, this.J7 = s, this
  }
  static getRootAsPhantomBattleFourCTask(t, s) {
    return (s || new PhantomBattleFourCTask).__init(t.readInt32(t.position()) + t.position(), t)
  }
  cardid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  coredesc(t) {
    var s = this.J7.__offset(this.z7, 6),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  taskdesc(t) {
    var s = this.J7.__offset(this.z7, 8),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  GetConditionlistAt(t) {
    return this.conditionlist(t)
  }
  conditionlist(t) {
    var s = this.J7.__offset(this.z7, 10);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0
  }
  conditionlistLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  conditionlistArray() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
  taskdescconditionid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
}
exports.PhantomBattleFourCTask = PhantomBattleFourCTask;
//# sourceMappingURL=PhantomBattleFourCTask.js.map