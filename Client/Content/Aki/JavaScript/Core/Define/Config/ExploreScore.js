"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreScore = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class ExploreScore {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Area() {
    return this.area();
  }
  get Score() {
    return GameUtils_1.GameUtils.ConvertToMap(this.scoreLength(), this.scoreKey, this.scoreValue, this);
  }
  scoreKey(t) {
    return this.score(t)?.key();
  }
  scoreValue(t) {
    return this.score(t)?.value();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsExploreScore(t, e) {
    return (e || new ExploreScore()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  area() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetScoreAt(t, e) {
    return this.score(t);
  }
  score(t, e) {
    var r = this.J7.__offset(this.z7, 6);
    if (r) {
      return (e || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + r) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  scoreLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.ExploreScore = ExploreScore;
//# sourceMappingURL=ExploreScore.js.map