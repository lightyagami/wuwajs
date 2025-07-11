"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterSizeId = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class MonsterSizeId {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get MonsterSizeTag() {
    return GameUtils_1.GameUtils.ConvertToArray(this.monstersizetagLength(), this.monstersizetag, this);
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsMonsterSizeId(t, s) {
    return (s || new MonsterSizeId()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetMonstersizetagAt(t) {
    return this.monstersizetag(t);
  }
  monstersizetag(t, s) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + t * 4, s) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  monstersizetagLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.MonsterSizeId = MonsterSizeId;
//# sourceMappingURL=MonsterSizeId.js.map