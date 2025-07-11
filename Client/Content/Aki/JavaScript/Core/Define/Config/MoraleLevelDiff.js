"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleLevelDiff = undefined;
class MoraleLevelDiff {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Level() {
    return this.level();
  }
  get DamageRatio() {
    return this.damageratio();
  }
  get DropRatio() {
    return this.dropratio();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsMoraleLevelDiff(t, e) {
    return (e || new MoraleLevelDiff()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  level() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damageratio() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  dropratio() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 10000;
    }
  }
}
exports.MoraleLevelDiff = MoraleLevelDiff;
//# sourceMappingURL=MoraleLevelDiff.js.map