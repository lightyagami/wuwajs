"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterDetectionFilter = undefined;
class MonsterDetectionFilter {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get EntityConfigId() {
    return this.entityconfigid();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsMonsterDetectionFilter(t, e) {
    return (e || new MonsterDetectionFilter()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  entityconfigid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.MonsterDetectionFilter = MonsterDetectionFilter;
//# sourceMappingURL=MonsterDetectionFilter.js.map