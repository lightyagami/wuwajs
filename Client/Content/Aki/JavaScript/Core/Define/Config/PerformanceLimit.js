"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerformanceLimit = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class PerformanceLimit {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ViewName() {
    return this.viewname();
  }
  get FrameLimit() {
    return this.framelimit();
  }
  get CacheWorldFrame() {
    return this.cacheworldframe();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsPerformanceLimit(t, i) {
    return (i || new PerformanceLimit()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  viewname(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  framelimit() {
    var t = this.J7.__offset(this.z7, 8);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  cacheworldframe() {
    var t = this.J7.__offset(this.z7, 10);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.PerformanceLimit = PerformanceLimit;
//# sourceMappingURL=PerformanceLimit.js.map