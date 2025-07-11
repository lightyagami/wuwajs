"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchActionType = undefined;
class FloroRanchActionType {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  __init(t, o) {
    this.z7 = t;
    this.J7 = o;
    return this;
  }
  static getRootAsFloroRanchActionType(t, o) {
    return (o || new FloroRanchActionType()).__init(t.readInt32(t.position()) + t.position(), t);
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
exports.FloroRanchActionType = FloroRanchActionType;
//# sourceMappingURL=FloroRanchActionType.js.map