"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreProgressReward = undefined;
class ExploreProgressReward {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Area() {
    return this.area();
  }
  get StepId() {
    return this.stepid();
  }
  get DropReward() {
    return this.dropreward();
  }
  get NeedExploreProgress() {
    return this.needexploreprogress();
  }
  __init(r, t) {
    this.z7 = r;
    this.J7 = t;
    return this;
  }
  static getRootAsExploreProgressReward(r, t) {
    return (t || new ExploreProgressReward()).__init(r.readInt32(r.position()) + r.position(), r);
  }
  id() {
    var r = this.J7.__offset(this.z7, 4);
    if (r) {
      return this.J7.readInt32(this.z7 + r);
    } else {
      return 0;
    }
  }
  area() {
    var r = this.J7.__offset(this.z7, 6);
    if (r) {
      return this.J7.readInt32(this.z7 + r);
    } else {
      return 0;
    }
  }
  stepid() {
    var r = this.J7.__offset(this.z7, 8);
    if (r) {
      return this.J7.readInt32(this.z7 + r);
    } else {
      return 0;
    }
  }
  dropreward() {
    var r = this.J7.__offset(this.z7, 10);
    if (r) {
      return this.J7.readInt32(this.z7 + r);
    } else {
      return 0;
    }
  }
  needexploreprogress() {
    var r = this.J7.__offset(this.z7, 12);
    if (r) {
      return this.J7.readInt32(this.z7 + r);
    } else {
      return 0;
    }
  }
}
exports.ExploreProgressReward = ExploreProgressReward;
//# sourceMappingURL=ExploreProgressReward.js.map