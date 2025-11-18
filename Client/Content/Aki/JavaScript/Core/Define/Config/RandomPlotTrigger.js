"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RandomPlotTrigger = undefined;
class RandomPlotTrigger {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get TriggerGroupId() {
    return this.triggergroupid();
  }
  get RandomPlotId() {
    return this.randomplotid();
  }
  get TriggerCondition() {
    return this.triggercondition();
  }
  get ResetCondition() {
    return this.resetcondition();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsRandomPlotTrigger(t, r) {
    return (r || new RandomPlotTrigger()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  triggergroupid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  randomplotid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  triggercondition() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  resetcondition() {
    var t = this.J7.__offset(this.z7, 12);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.RandomPlotTrigger = RandomPlotTrigger;
//# sourceMappingURL=RandomPlotTrigger.js.map