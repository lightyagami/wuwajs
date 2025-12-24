"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleChallenge = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class MotorcycleChallenge {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get LevelPlayId() {
    return this.levelplayid();
  }
  get Name() {
    return this.name();
  }
  get NeedScore() {
    return this.needscore();
  }
  get Reward() {
    return this.reward();
  }
  get ScoreText() {
    return this.scoretext();
  }
  get JumpId() {
    return this.jumpid();
  }
  get UnlockTravelLevel() {
    return this.unlocktravellevel();
  }
  get UnlockQuestId() {
    return this.unlockquestid();
  }
  get LockTips() {
    return this.locktips();
  }
  get ClassificationId() {
    return this.classificationid();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsMotorcycleChallenge(t, e) {
    return (e || new MotorcycleChallenge()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  levelplayid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  needscore() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  reward() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  scoretext(t) {
    var e = this.J7.__offset(this.z7, 14);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  jumpid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  unlocktravellevel() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  unlockquestid() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  locktips(t) {
    var e = this.J7.__offset(this.z7, 22);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  classificationid() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.MotorcycleChallenge = MotorcycleChallenge;
//# sourceMappingURL=MotorcycleChallenge.js.map