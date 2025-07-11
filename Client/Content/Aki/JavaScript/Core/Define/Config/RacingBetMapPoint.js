"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetMapPoint = undefined;
class RacingBetMapPoint {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get SeasonId() {
    return this.seasonid();
  }
  get SortId() {
    return this.sortid();
  }
  get EntityId() {
    return this.entityid();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsRacingBetMapPoint(t, i) {
    return (i || new RacingBetMapPoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  seasonid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sortid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  entityid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RacingBetMapPoint = RacingBetMapPoint;
//# sourceMappingURL=RacingBetMapPoint.js.map