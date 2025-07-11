"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerExp = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class PlayerExp {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get PlayerLevel() {
    return this.playerlevel();
  }
  get LevelExp() {
    return this.levelexp();
  }
  get Condition() {
    return this.condition();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsPlayerExp(t, e) {
    return (e || new PlayerExp()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  playerlevel() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  levelexp() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  condition(t) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.PlayerExp = PlayerExp;
//# sourceMappingURL=PlayerExp.js.map