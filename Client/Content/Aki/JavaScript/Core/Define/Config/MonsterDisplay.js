"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterDisplay = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class MonsterDisplay {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get NameStringKey() {
    return this.namestringkey();
  }
  get Name() {
    return this.name();
  }
  get IntroduceStringKey() {
    return this.introducestringkey();
  }
  get Introduce() {
    return this.introduce();
  }
  get MonsterPileIconAsset() {
    return this.monsterpileiconasset();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsMonsterDisplay(t, s) {
    return (s || new MonsterDisplay()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  namestringkey() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  introducestringkey() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  introduce() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  monsterpileiconasset(t) {
    var s = this.J7.__offset(this.z7, 14);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.MonsterDisplay = MonsterDisplay;
//# sourceMappingURL=MonsterDisplay.js.map