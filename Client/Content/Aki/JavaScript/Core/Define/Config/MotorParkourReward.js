"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorParkourReward = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class MotorParkourReward {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Desc() {
    return this.desc();
  }
  get DropId() {
    return this.dropid();
  }
  get JumpId() {
    return this.jumpid();
  }
  get RecordId() {
    return this.recordid();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsMotorParkourReward(t, r) {
    return (r || new MotorParkourReward()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  desc(t) {
    var r = this.J7.__offset(this.z7, 6);
    var r = r ? this.J7.__string(this.z7 + r, t) : null;
    if (typeof r == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(r);
    }
    return r;
  }
  dropid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  jumpid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  recordid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.MotorParkourReward = MotorParkourReward;
//# sourceMappingURL=MotorParkourReward.js.map