"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.OccupyScore = void 0;
class OccupyScore {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get NeedScore() {
    return this.needscore()
  }
  get ScoreReward() {
    return this.scorereward()
  }
  __init(t, r) {
    return this.z7 = t, this.J7 = r, this
  }
  static getRootAsOccupyScore(t, r) {
    return (r || new OccupyScore).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  needscore() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  scorereward() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
}
exports.OccupyScore = OccupyScore;
//# sourceMappingURL=OccupyScore.js.map