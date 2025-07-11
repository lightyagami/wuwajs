"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleKeepLevel = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class MoraleKeepLevel {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Level() {
    return this.level();
  }
  get Experience() {
    return this.experience();
  }
  get LvAddDesc() {
    return this.lvadddesc();
  }
  __init(e, t) {
    this.z7 = e;
    this.J7 = t;
    return this;
  }
  static getRootAsMoraleKeepLevel(e, t) {
    return (t || new MoraleKeepLevel()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  level() {
    var e = this.J7.__offset(this.z7, 4);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  experience() {
    var e = this.J7.__offset(this.z7, 6);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  lvadddesc(e) {
    var t = this.J7.__offset(this.z7, 8);
    var t = t ? this.J7.__string(this.z7 + t, e) : null;
    if (typeof t == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(t);
    }
    return t;
  }
}
exports.MoraleKeepLevel = MoraleKeepLevel;
//# sourceMappingURL=MoraleKeepLevel.js.map