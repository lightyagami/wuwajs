"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevProsList = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const IntPair_1 = require("./SubType/IntPair");
class RoleDevProsList {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get TypeId() {
    return this.typeid();
  }
  get RoleProspectTimeId() {
    return this.roleprospecttimeid();
  }
  get GachaId() {
    return this.gachaid();
  }
  get SpecialGachaId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.specialgachaidLength(), this.specialgachaid, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsRoleDevProsList(t, i) {
    return (i || new RoleDevProsList()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  typeid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  roleprospecttimeid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  gachaid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetSpecialgachaidAt(t, i) {
    return this.specialgachaid(t);
  }
  specialgachaid(t, i) {
    var s = this.J7.__offset(this.z7, 12);
    if (s) {
      return (i || new IntPair_1.IntPair()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  specialgachaidLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RoleDevProsList = RoleDevProsList;
//# sourceMappingURL=RoleDevProsList.js.map