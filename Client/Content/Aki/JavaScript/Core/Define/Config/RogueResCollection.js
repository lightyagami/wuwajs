"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueResCollection = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueResCollection {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get IdKey() {
    return this.idkey();
  }
  get Id() {
    return this.id();
  }
  get Index() {
    return this.index();
  }
  get Type() {
    return this.type();
  }
  get SortId() {
    return this.sortid();
  }
  get Desc() {
    return this.desc();
  }
  get RuleId() {
    return this.ruleid();
  }
  get Cond() {
    return this.cond();
  }
  get Award() {
    return this.award();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsRogueResCollection(t, s) {
    return (s || new RogueResCollection()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  idkey() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  id() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  index() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  type() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sortid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  desc(t) {
    var s = this.J7.__offset(this.z7, 14);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  ruleid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  cond() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  award() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RogueResCollection = RogueResCollection;
//# sourceMappingURL=RogueResCollection.js.map