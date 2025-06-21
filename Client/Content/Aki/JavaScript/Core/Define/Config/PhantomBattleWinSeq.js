"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomBattleWinSeq = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class PhantomBattleWinSeq {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get FlowListName() {
    return this.flowlistname()
  }
  get FlowId() {
    return this.flowid()
  }
  get StateId() {
    return this.stateid()
  }
  __init(t, i) {
    return this.z7 = t, this.J7 = i, this
  }
  static getRootAsPhantomBattleWinSeq(t, i) {
    return (i || new PhantomBattleWinSeq).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  flowlistname(t) {
    var i = this.J7.__offset(this.z7, 6),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  flowid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  stateid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
}
exports.PhantomBattleWinSeq = PhantomBattleWinSeq;
//# sourceMappingURL=PhantomBattleWinSeq.js.map