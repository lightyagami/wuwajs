"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoMonopoly = undefined;
class DangoMonopoly {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ActivityId() {
    return this.activityid();
  }
  get BoardGroupId() {
    return this.boardgroupid();
  }
  get TaskGroupId() {
    return this.taskgroupid();
  }
  get InstId() {
    return this.instid();
  }
  get MaleDangoId() {
    return this.maledangoid();
  }
  get FeMaleDangoId() {
    return this.femaledangoid();
  }
  get DiceId() {
    return this.diceid();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsDangoMonopoly(t, i) {
    return (i || new DangoMonopoly()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  boardgroupid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  taskgroupid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  instid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maledangoid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  femaledangoid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  diceid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.DangoMonopoly = DangoMonopoly;
//# sourceMappingURL=DangoMonopoly.js.map