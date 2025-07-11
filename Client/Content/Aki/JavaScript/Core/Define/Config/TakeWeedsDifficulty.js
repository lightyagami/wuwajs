"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TakeWeedsDifficulty = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class TakeWeedsDifficulty {
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
  get Reward() {
    return this.reward();
  }
  get Desc() {
    return this.desc();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsTakeWeedsDifficulty(t, e) {
    return (e || new TakeWeedsDifficulty()).__init(t.readInt32(t.position()) + t.position(), t);
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
  reward() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  desc(t) {
    var e = this.J7.__offset(this.z7, 12);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.TakeWeedsDifficulty = TakeWeedsDifficulty;
//# sourceMappingURL=TakeWeedsDifficulty.js.map