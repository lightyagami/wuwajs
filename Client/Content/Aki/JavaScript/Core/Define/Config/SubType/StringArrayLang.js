"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StringArrayLang = undefined;
const GameUtils_1 = require("../../../../Game/GameUtils");
class StringArrayLang {
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
  static getRootAsStringArrayLang(t, r) {
    return (r || new StringArrayLang()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  GetArraystringAt(t) {
    return this.arraystring(t);
  }
  arraystring(t) {
    var r = this.J7.__offset(this.z7, 4);
    if (r) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + r) + t * 4);
    } else {
      return 0;
    }
  }
  arraystringLength() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  arraystringArray() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.StringArrayLang = StringArrayLang;
//# sourceMappingURL=StringArrayLang.js.map