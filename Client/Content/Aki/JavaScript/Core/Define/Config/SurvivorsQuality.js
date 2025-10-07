"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsQuality = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class SurvivorsQuality {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get WeaponColor() {
    return this.weaponcolor();
  }
  get EvolveColor() {
    return this.evolvecolor();
  }
  get CardBasePath() {
    return this.cardbasepath();
  }
  get WeaponBasePath() {
    return this.weaponbasepath();
  }
  get WeaponEvolvePath() {
    return this.weaponevolvepath();
  }
  get WeaponEvolveTitle() {
    return this.weaponevolvetitle();
  }
  get LvUpTagPath() {
    return this.lvuptagpath();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsSurvivorsQuality(t, s) {
    return (s || new SurvivorsQuality()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  weaponcolor(t) {
    var s = this.J7.__offset(this.z7, 6);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  evolvecolor(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  cardbasepath(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  weaponbasepath(t) {
    var s = this.J7.__offset(this.z7, 12);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  weaponevolvepath(t) {
    var s = this.J7.__offset(this.z7, 14);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  weaponevolvetitle(t) {
    var s = this.J7.__offset(this.z7, 16);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  lvuptagpath(t) {
    var s = this.J7.__offset(this.z7, 18);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.SurvivorsQuality = SurvivorsQuality;
//# sourceMappingURL=SurvivorsQuality.js.map