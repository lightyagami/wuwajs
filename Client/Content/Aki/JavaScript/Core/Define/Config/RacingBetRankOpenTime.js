"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetRankOpenTime = undefined;
class RacingBetRankOpenTime {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsRacingBetRankOpenTime(t, e) {
    return (e || new RacingBetRankOpenTime()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RacingBetRankOpenTime = RacingBetRankOpenTime;
//# sourceMappingURL=RacingBetRankOpenTime.js.map