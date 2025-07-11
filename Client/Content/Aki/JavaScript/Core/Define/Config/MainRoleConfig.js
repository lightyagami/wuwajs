"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainRoleConfig = undefined;
class MainRoleConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Gender() {
    return this.gender();
  }
  get UnlockCondition() {
    return this.unlockcondition();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsMainRoleConfig(t, i) {
    return (i || new MainRoleConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  gender() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  unlockcondition() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.MainRoleConfig = MainRoleConfig;
//# sourceMappingURL=MainRoleConfig.js.map