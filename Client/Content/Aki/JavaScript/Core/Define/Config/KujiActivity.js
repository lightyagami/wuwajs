"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KujiActivity = undefined;
class KujiActivity {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ActivityId() {
    return this.activityid();
  }
  get CostItemId() {
    return this.costitemid();
  }
  get CostItemCount() {
    return this.costitemcount();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsKujiActivity(t, i) {
    return (i || new KujiActivity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  activityid() {
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
}
exports.KujiActivity = KujiActivity;
//# sourceMappingURL=KujiActivity.js.map