"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegressTrialRole = undefined;
class RegressTrialRole {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ActivityId() {
    return this.activityid();
  }
  get ConditionGroup() {
    return this.conditiongroup();
  }
  get TrialRoleGroupId() {
    return this.trialrolegroupid();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsRegressTrialRole(t, i) {
    return (i || new RegressTrialRole()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  conditiongroup() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  trialrolegroupid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RegressTrialRole = RegressTrialRole;
//# sourceMappingURL=RegressTrialRole.js.map