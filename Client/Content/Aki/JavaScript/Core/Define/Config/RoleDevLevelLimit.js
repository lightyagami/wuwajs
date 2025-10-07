"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevLevelLimit = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const IntPair_1 = require("./SubType/IntPair");
class RoleDevLevelLimit {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ProjectNum() {
    return this.projectnum();
  }
  get PlayerLevel() {
    return GameUtils_1.GameUtils.ConvertToArray(this.playerlevelLength(), this.playerlevel, this);
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsRoleDevLevelLimit(t, e) {
    return (e || new RoleDevLevelLimit()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  projectnum() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPlayerlevelAt(t, e) {
    return this.playerlevel(t);
  }
  playerlevel(t, e) {
    var i = this.J7.__offset(this.z7, 6);
    if (i) {
      return (e || new IntPair_1.IntPair()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  playerlevelLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RoleDevLevelLimit = RoleDevLevelLimit;
//# sourceMappingURL=RoleDevLevelLimit.js.map