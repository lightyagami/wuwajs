"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchToyWeight = undefined;
class FloroRanchToyWeight {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Group() {
    return this.group();
  }
  get Stage() {
    return this.stage();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsFloroRanchToyWeight(t, s) {
    return (s || new FloroRanchToyWeight()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  group() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  stage() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.FloroRanchToyWeight = FloroRanchToyWeight;
//# sourceMappingURL=FloroRanchToyWeight.js.map