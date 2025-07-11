"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchTarget = undefined;
class FloroRanchTarget {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsFloroRanchTarget(t, r) {
    return (r || new FloroRanchTarget()).__init(t.readInt32(t.position()) + t.position(), t);
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
exports.FloroRanchTarget = FloroRanchTarget;
//# sourceMappingURL=FloroRanchTarget.js.map