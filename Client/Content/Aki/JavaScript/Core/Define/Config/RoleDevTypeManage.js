"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevTypeManage = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RoleDevTypeManage {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ItemType() {
    return this.itemtype();
  }
  get TypeDecribe() {
    return this.typedecribe();
  }
  get TypeDescribe() {
    return this.typedescribe();
  }
  __init(e, t) {
    this.z7 = e;
    this.J7 = t;
    return this;
  }
  static getRootAsRoleDevTypeManage(e, t) {
    return (t || new RoleDevTypeManage()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  itemtype() {
    var e = this.J7.__offset(this.z7, 4);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  typedecribe(e) {
    var t = this.J7.__offset(this.z7, 6);
    var t = t ? this.J7.__string(this.z7 + t, e) : null;
    if (typeof t == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(t);
    }
    return t;
  }
  typedescribe(e) {
    var t = this.J7.__offset(this.z7, 8);
    var t = t ? this.J7.__string(this.z7 + t, e) : null;
    if (typeof t == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(t);
    }
    return t;
  }
}
exports.RoleDevTypeManage = RoleDevTypeManage;
//# sourceMappingURL=RoleDevTypeManage.js.map