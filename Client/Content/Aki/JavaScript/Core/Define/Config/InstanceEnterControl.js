"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceEnterControl = undefined;
class InstanceEnterControl {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get EnterCount() {
    return this.entercount();
  }
  get EnterCountConsumeType() {
    return this.entercountconsumetype();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsInstanceEnterControl(t, e) {
    return (e || new InstanceEnterControl()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  entercount() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  entercountconsumetype() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.InstanceEnterControl = InstanceEnterControl;
//# sourceMappingURL=InstanceEnterControl.js.map