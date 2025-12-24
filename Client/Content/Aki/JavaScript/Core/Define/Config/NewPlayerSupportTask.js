"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewPlayerSupportTask = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class NewPlayerSupportTask {
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
  get Index() {
    return this.index();
  }
  get ConditionGroup() {
    return this.conditiongroup();
  }
  get NormalDropId() {
    return this.normaldropid();
  }
  get TrialRoleGroupId() {
    return this.trialrolegroupid();
  }
  get RewardName() {
    return this.rewardname();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsNewPlayerSupportTask(t, r) {
    return (r || new NewPlayerSupportTask()).__init(t.readInt32(t.position()) + t.position(), t);
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
  index() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  conditiongroup() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  normaldropid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  trialrolegroupid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewardname(t) {
    var r = this.J7.__offset(this.z7, 16);
    var r = r ? this.J7.__string(this.z7 + r, t) : null;
    if (typeof r == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(r);
    }
    return r;
  }
}
exports.NewPlayerSupportTask = NewPlayerSupportTask;
//# sourceMappingURL=NewPlayerSupportTask.js.map