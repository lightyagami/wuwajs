"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrialMotor = undefined;
class TrialMotor {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get MotorLoadProjectId() {
    return this.motorloadprojectid();
  }
  get Level() {
    return this.level();
  }
  get UseMotorTechTree() {
    return this.usemotortechtree();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsTrialMotor(t, r) {
    return (r || new TrialMotor()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  motorloadprojectid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  level() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  usemotortechtree() {
    var t = this.J7.__offset(this.z7, 10);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.TrialMotor = TrialMotor;
//# sourceMappingURL=TrialMotor.js.map