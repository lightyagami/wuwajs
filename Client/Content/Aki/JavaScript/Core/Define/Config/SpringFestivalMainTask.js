"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringFestivalMainTask = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class SpringFestivalMainTask {
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
  get OpenDay() {
    return this.openday();
  }
  get LockDesc() {
    return this.lockdesc();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsSpringFestivalMainTask(t, s) {
    return (s || new SpringFestivalMainTask()).__init(t.readInt32(t.position()) + t.position(), t);
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
  openday() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  lockdesc(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.SpringFestivalMainTask = SpringFestivalMainTask;
//# sourceMappingURL=SpringFestivalMainTask.js.map