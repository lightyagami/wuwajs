"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomMap = undefined;
class CustomMap {
  constructor() {
    this.mvr = new Map();
    this.K7 = new Array();
    this.dvr = new Map();
  }
  Size() {
    return this.mvr.size;
  }
  Set(t, s) {
    var i = this.mvr.get(t);
    if (i !== undefined) {
      this.K7[i] = s;
    } else {
      i = this.mvr.size;
      this.mvr.set(t, i);
      this.K7.push(s);
      this.dvr.set(i, t);
    }
  }
  Get(t) {
    t = this.mvr.get(t);
    if (t !== undefined) {
      return this.K7[t];
    }
  }
  GetByIndex(t) {
    t = this.dvr.get(t);
    return this.Get(t);
  }
  Contains(t) {
    return this.mvr.get(t) !== undefined;
  }
  Remove(t) {
    var s;
    var i;
    var h;
    var e = this.mvr.get(t);
    return e !== undefined && (t = this.mvr.delete(t), s = this.dvr.delete(e), this.K7.length > 1 ? (i = this.K7.length - 1, (h = this.dvr.get(i)) && (this.dvr.delete(i), this.mvr.set(h, e), this.dvr.set(e, h)), this.K7[e] = this.K7[i], this.K7.splice(i, 1)) : this.K7.length = 0, t) && s;
  }
  RemoveByIndex(t) {
    t = this.dvr.get(t);
    return t !== undefined && this.Remove(t);
  }
  Keys() {
    return this.mvr.keys();
  }
  GetItems() {
    return this.K7;
  }
  Clear() {
    this.mvr.clear();
    this.dvr.clear();
    this.K7.length = 0;
  }
}
exports.CustomMap = CustomMap;
//# sourceMappingURL=CustomMap.js.map