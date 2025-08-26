"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseGoldenCoin = undefined;
class TrapDefenseGoldenCoin {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get TemplateId() {
    return this.templateid();
  }
  get SimpleCombatSubtypeId() {
    return this.simplecombatsubtypeid();
  }
  get AbsorbGold() {
    return this.absorbgold();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsTrapDefenseGoldenCoin(t, e) {
    return (e || new TrapDefenseGoldenCoin()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  templateid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  simplecombatsubtypeid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  absorbgold() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.TrapDefenseGoldenCoin = TrapDefenseGoldenCoin;
//# sourceMappingURL=TrapDefenseGoldenCoin.js.map