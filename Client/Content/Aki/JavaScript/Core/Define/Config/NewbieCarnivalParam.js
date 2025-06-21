"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.NewbieCarnivalParam = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class NewbieCarnivalParam {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get ActivityId() {
    return this.activityid()
  }
  get Roles() {
    return GameUtils_1.GameUtils.ConvertToArray(this.rolesLength(), this.roles, this)
  }
  get PayGifts() {
    return GameUtils_1.GameUtils.ConvertToArray(this.paygiftsLength(), this.paygifts, this)
  }
  get GachaIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.gachaidsLength(), this.gachaids, this)
  }
  get RoleTask() {
    return this.roletask()
  }
  get AllCount() {
    return this.allcount()
  }
  get ItemId() {
    return this.itemid()
  }
  __init(t, i) {
    return this.z7 = t, this.J7 = i, this
  }
  static getRootAsNewbieCarnivalParam(t, i) {
    return (i || new NewbieCarnivalParam).__init(t.readInt32(t.position()) + t.position(), t)
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  GetRolesAt(t) {
    return this.roles(t)
  }
  roles(t) {
    var i = this.J7.__offset(this.z7, 6);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0
  }
  rolesLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  rolesArray() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
  GetPaygiftsAt(t) {
    return this.paygifts(t)
  }
  paygifts(t) {
    var i = this.J7.__offset(this.z7, 8);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0
  }
  paygiftsLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  paygiftsArray() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
  GetGachaidsAt(t) {
    return this.gachaids(t)
  }
  gachaids(t) {
    var i = this.J7.__offset(this.z7, 10);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0
  }
  gachaidsLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  gachaidsArray() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
  roletask() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  allcount() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  itemid() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
}
exports.NewbieCarnivalParam = NewbieCarnivalParam;
//# sourceMappingURL=NewbieCarnivalParam.js.map