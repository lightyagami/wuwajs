"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerActivity = undefined;
class BabelTowerActivity {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ActivityId() {
    return this.activityid();
  }
  get ItemId() {
    return this.itemid();
  }
  get ShareId() {
    return this.shareid();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsBabelTowerActivity(t, i) {
    return (i || new BabelTowerActivity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  itemid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  shareid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.BabelTowerActivity = BabelTowerActivity;
//# sourceMappingURL=BabelTowerActivity.js.map