"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomBattleCountType = undefined;
class PhantomBattleCountType {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsPhantomBattleCountType(t, e) {
    return (e || new PhantomBattleCountType()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.PhantomBattleCountType = PhantomBattleCountType;
//# sourceMappingURL=PhantomBattleCountType.js.map