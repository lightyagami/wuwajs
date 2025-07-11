"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseConfig = undefined;
class TowerDefenseConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ShowDifferent() {
    return this.showdifferent();
  }
  get ActivityType() {
    return this.activitytype();
  }
  get EntranceId() {
    return this.entranceid();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsTowerDefenseConfig(t, e) {
    return (e || new TowerDefenseConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  showdifferent() {
    var t = this.J7.__offset(this.z7, 6);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  activitytype() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  entranceid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.TowerDefenseConfig = TowerDefenseConfig;
//# sourceMappingURL=TowerDefenseConfig.js.map