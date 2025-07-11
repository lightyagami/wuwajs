"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityQuestConfig = undefined;
class ActivityQuestConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get QuestId() {
    return this.questid();
  }
  get ActivityId() {
    return this.activityid();
  }
  get ConditionId() {
    return this.conditionid();
  }
  get OpenDay() {
    return this.openday();
  }
  get IsDisplay() {
    return this.isdisplay();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsActivityQuestConfig(t, i) {
    return (i || new ActivityQuestConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  questid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  conditionid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  openday() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  isdisplay() {
    var t = this.J7.__offset(this.z7, 14);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.ActivityQuestConfig = ActivityQuestConfig;
//# sourceMappingURL=ActivityQuestConfig.js.map