"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoMonopolyProperty = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class DangoMonopolyProperty {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get PropertyInfo() {
    return GameUtils_1.GameUtils.ConvertToArray(this.propertyinfoLength(), this.propertyinfo, this);
  }
  get Title() {
    return this.title();
  }
  get Desc() {
    return this.desc();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsDangoMonopolyProperty(t, r) {
    return (r || new DangoMonopolyProperty()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPropertyinfoAt(t) {
    return this.propertyinfo(t);
  }
  propertyinfo(t) {
    var r = this.J7.__offset(this.z7, 6);
    if (r) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + r) + t * 4);
    } else {
      return 0;
    }
  }
  propertyinfoLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  propertyinfoArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  title(t) {
    var r = this.J7.__offset(this.z7, 8);
    var r = r ? this.J7.__string(this.z7 + r, t) : null;
    if (typeof r == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(r);
    }
    return r;
  }
  desc(t) {
    var r = this.J7.__offset(this.z7, 10);
    var r = r ? this.J7.__string(this.z7 + r, t) : null;
    if (typeof r == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(r);
    }
    return r;
  }
}
exports.DangoMonopolyProperty = DangoMonopolyProperty;
//# sourceMappingURL=DangoMonopolyProperty.js.map