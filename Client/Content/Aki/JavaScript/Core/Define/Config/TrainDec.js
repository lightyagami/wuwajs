"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrainDec = undefined;
class TrainDec {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get RoleLevel() {
    return this.rolelevel();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsTrainDec(t, e) {
    return (e || new TrainDec()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  rolelevel() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.TrainDec = TrainDec;
//# sourceMappingURL=TrainDec.js.map