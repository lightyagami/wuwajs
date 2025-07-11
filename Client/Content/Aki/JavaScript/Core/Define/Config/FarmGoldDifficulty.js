"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FarmGoldDifficulty = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class FarmGoldDifficulty {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Magnification() {
    return this.magnification();
  }
  get RecommendedLevel() {
    return this.recommendedlevel();
  }
  get Desc() {
    return this.desc();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsFarmGoldDifficulty(t, i) {
    return (i || new FarmGoldDifficulty()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  magnification() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  recommendedlevel() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  desc(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.FarmGoldDifficulty = FarmGoldDifficulty;
//# sourceMappingURL=FarmGoldDifficulty.js.map