"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkinTrialActivity = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RoleSkinTrialActivity {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get RoleIdList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.roleidlistLength(), this.roleidlist, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsRoleSkinTrialActivity(t, i) {
    return (i || new RoleSkinTrialActivity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRoleidlistAt(t) {
    return this.roleidlist(t);
  }
  roleidlist(t) {
    var i = this.J7.__offset(this.z7, 6);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  roleidlistLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  roleidlistArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.RoleSkinTrialActivity = RoleSkinTrialActivity;
//# sourceMappingURL=RoleSkinTrialActivity.js.map