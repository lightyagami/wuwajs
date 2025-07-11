"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Filter = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class Filter {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get DataType() {
    return this.datatype();
  }
  get RuleList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.rulelistLength(), this.rulelist, this);
  }
  get IsSupportSelectAll() {
    return this.issupportselectall();
  }
  get IsSelectAllUnion() {
    return this.isselectallunion();
  }
  get IsShowIcon() {
    return this.isshowicon();
  }
  get GridType() {
    return this.gridtype();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsFilter(t, s) {
    return (s || new Filter()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  datatype() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRulelistAt(t) {
    return this.rulelist(t);
  }
  rulelist(t) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  rulelistLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  rulelistArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  issupportselectall() {
    var t = this.J7.__offset(this.z7, 10);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  isselectallunion() {
    var t = this.J7.__offset(this.z7, 12);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  isshowicon() {
    var t = this.J7.__offset(this.z7, 14);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  gridtype(t) {
    var s = this.J7.__offset(this.z7, 16);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.Filter = Filter;
//# sourceMappingURL=Filter.js.map