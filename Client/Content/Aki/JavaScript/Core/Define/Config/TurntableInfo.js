"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TurntableInfo = undefined;
class TurntableInfo {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get CostItemId() {
    return this.costitemid();
  }
  get CostItemCount() {
    return this.costitemcount();
  }
  get TurntableType() {
    return this.turntabletype();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsTurntableInfo(t, s) {
    return (s || new TurntableInfo()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  costitemid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  costitemcount() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  turntabletype() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.TurntableInfo = TurntableInfo;
//# sourceMappingURL=TurntableInfo.js.map