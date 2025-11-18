"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryScanMachine = undefined;
class HonamiStoryScanMachine {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get InstEntityTeleportId() {
    return this.instentityteleportid();
  }
  get FogId() {
    return this.fogid();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsHonamiStoryScanMachine(t, i) {
    return (i || new HonamiStoryScanMachine()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  instentityteleportid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  fogid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.HonamiStoryScanMachine = HonamiStoryScanMachine;
//# sourceMappingURL=HonamiStoryScanMachine.js.map