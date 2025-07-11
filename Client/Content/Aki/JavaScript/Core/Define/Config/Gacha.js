"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Gacha = undefined;
class Gacha {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get RuleGroupId() {
    return this.rulegroupid();
  }
  get Sort() {
    return this.sort();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsGacha(t, s) {
    return (s || new Gacha()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rulegroupid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sort() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 10;
    }
  }
}
exports.Gacha = Gacha;
//# sourceMappingURL=Gacha.js.map