"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiSteadyConsume = undefined;
class HonamiSteadyConsume {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get CostGroup() {
    return this.costgroup();
  }
  get DangerLevel() {
    return this.dangerlevel();
  }
  get SteadyConsume() {
    return this.steadyconsume();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsHonamiSteadyConsume(t, s) {
    return (s || new HonamiSteadyConsume()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  costgroup() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  dangerlevel() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  steadyconsume() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.HonamiSteadyConsume = HonamiSteadyConsume;
//# sourceMappingURL=HonamiSteadyConsume.js.map