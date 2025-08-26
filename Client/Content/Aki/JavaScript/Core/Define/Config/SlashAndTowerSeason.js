"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlashAndTowerSeason = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class SlashAndTowerSeason {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get BattleScoreId() {
    return this.battlescoreid();
  }
  get BuringTideDesc() {
    return this.buringtidedesc();
  }
  get HotDesc() {
    return this.hotdesc();
  }
  get IsOpenHot() {
    return this.isopenhot();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsSlashAndTowerSeason(t, s) {
    return (s || new SlashAndTowerSeason()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  battlescoreid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  buringtidedesc(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  hotdesc(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  isopenhot() {
    var t = this.J7.__offset(this.z7, 12);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.SlashAndTowerSeason = SlashAndTowerSeason;
//# sourceMappingURL=SlashAndTowerSeason.js.map