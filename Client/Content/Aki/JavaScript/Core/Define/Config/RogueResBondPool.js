"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueResBondPool = undefined;
class RogueResBondPool {
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
  static getRootAsRogueResBondPool(t, o) {
    return (o || new RogueResBondPool()).__init(t.readInt32(t.position()) + t.position(), t);
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
exports.RogueResBondPool = RogueResBondPool;
//# sourceMappingURL=RogueResBondPool.js.map