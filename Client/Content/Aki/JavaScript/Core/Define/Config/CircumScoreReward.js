"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CircumScoreReward = undefined;
class CircumScoreReward {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get NeedScore() {
    return this.needscore();
  }
  get DropGroup() {
    return this.dropgroup();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsCircumScoreReward(t, r) {
    return (r || new CircumScoreReward()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  needscore() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  dropgroup() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.CircumScoreReward = CircumScoreReward;
//# sourceMappingURL=CircumScoreReward.js.map