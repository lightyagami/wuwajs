"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomBattleWinSeq = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class PhantomBattleWinSeq {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get FlowListName() {
    return this.flowlistname();
  }
  get FlowId() {
    return this.flowid();
  }
  get StateId() {
    return this.stateid();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsPhantomBattleWinSeq(t, i) {
    return (i || new PhantomBattleWinSeq()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  flowlistname(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  flowid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  stateid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.PhantomBattleWinSeq = PhantomBattleWinSeq;
//# sourceMappingURL=PhantomBattleWinSeq.js.map