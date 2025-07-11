"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleInfluence = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const IntArray_1 = require("./SubType/IntArray");
class RoleInfluence {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Title() {
    return this.title();
  }
  get BackGround() {
    return this.background();
  }
  get InfluenceId() {
    return this.influenceid();
  }
  get CountryId() {
    return this.countryid();
  }
  get FilterIcon() {
    return this.filtericon();
  }
  get Role() {
    return this.role();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsRoleInfluence(t, e) {
    return (e || new RoleInfluence()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  title(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  background(t) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  influenceid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  countryid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  filtericon(t) {
    var e = this.J7.__offset(this.z7, 14);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  role(t) {
    var e = this.J7.__offset(this.z7, 16);
    if (e) {
      return (t || new IntArray_1.IntArray()).__init(this.J7.__indirect(this.z7 + e), this.J7);
    } else {
      return null;
    }
  }
}
exports.RoleInfluence = RoleInfluence;
//# sourceMappingURL=RoleInfluence.js.map