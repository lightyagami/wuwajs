"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomBattleConditionGroup = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class PhantomBattleConditionGroup {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get PhantomBattleConditionId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.phantombattleconditionidLength(), this.phantombattleconditionid, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsPhantomBattleConditionGroup(t, i) {
    return (i || new PhantomBattleConditionGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPhantombattleconditionidAt(t) {
    return this.phantombattleconditionid(t);
  }
  phantombattleconditionid(t) {
    var i = this.J7.__offset(this.z7, 6);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  phantombattleconditionidLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  phantombattleconditionidArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.PhantomBattleConditionGroup = PhantomBattleConditionGroup;
//# sourceMappingURL=PhantomBattleConditionGroup.js.map