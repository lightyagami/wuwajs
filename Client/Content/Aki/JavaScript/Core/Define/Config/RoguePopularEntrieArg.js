"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoguePopularEntrieArg = undefined;
class RoguePopularEntrieArg {
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
  get InstId() {
    return this.instid();
  }
  get Slot() {
    return this.slot();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsRoguePopularEntrieArg(t, r) {
    return (r || new RoguePopularEntrieArg()).__init(t.readInt32(t.position()) + t.position(), t);
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
  instid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  slot() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RoguePopularEntrieArg = RoguePopularEntrieArg;
//# sourceMappingURL=RoguePopularEntrieArg.js.map