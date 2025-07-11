"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomBattleBadgeGroup = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class PhantomBattleBadgeGroup {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get GroupId() {
    return this.groupid();
  }
  get Name() {
    return this.name();
  }
  get Num() {
    return this.num();
  }
  get PhantomBattleSkillId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.phantombattleskillidLength(), this.phantombattleskillid, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsPhantomBattleBadgeGroup(t, i) {
    return (i || new PhantomBattleBadgeGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  groupid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  num() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPhantombattleskillidAt(t) {
    return this.phantombattleskillid(t);
  }
  phantombattleskillid(t) {
    var i = this.J7.__offset(this.z7, 10);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  phantombattleskillidLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  phantombattleskillidArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.PhantomBattleBadgeGroup = PhantomBattleBadgeGroup;
//# sourceMappingURL=PhantomBattleBadgeGroup.js.map