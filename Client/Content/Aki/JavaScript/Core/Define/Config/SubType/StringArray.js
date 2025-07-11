"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StringArray = undefined;
const GameUtils_1 = require("../../../../Game/GameUtils");
class StringArray {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ArrayString() {
    return GameUtils_1.GameUtils.ConvertToArray(this.arraystringLength(), this.arraystring, this);
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsStringArray(t, r) {
    return (r || new StringArray()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  GetArraystringAt(t) {
    return this.arraystring(t);
  }
  arraystring(t, r) {
    var s = this.J7.__offset(this.z7, 4);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, r) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  arraystringLength() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.StringArray = StringArray;
//# sourceMappingURL=StringArray.js.map