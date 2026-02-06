"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksFlavorRange = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class DrinksFlavorRange {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get FlavorGroupId() {
    return this.flavorgroupid();
  }
  get FlavorTypeRef() {
    return this.flavortyperef();
  }
  get FlavorValues() {
    return GameUtils_1.GameUtils.ConvertToArray(this.flavorvaluesLength(), this.flavorvalues, this);
  }
  get FlavorLikeValue() {
    return GameUtils_1.GameUtils.ConvertToArray(this.flavorlikevalueLength(), this.flavorlikevalue, this);
  }
  get Desc() {
    return this.desc();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsDrinksFlavorRange(t, s) {
    return (s || new DrinksFlavorRange()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  flavorgroupid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  flavortyperef() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetFlavorvaluesAt(t) {
    return this.flavorvalues(t);
  }
  flavorvalues(t) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  flavorvaluesLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  flavorvaluesArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetFlavorlikevalueAt(t) {
    return this.flavorlikevalue(t);
  }
  flavorlikevalue(t) {
    var s = this.J7.__offset(this.z7, 12);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  flavorlikevalueLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  flavorlikevalueArray() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  desc(t) {
    var s = this.J7.__offset(this.z7, 14);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.DrinksFlavorRange = DrinksFlavorRange;
//# sourceMappingURL=DrinksFlavorRange.js.map