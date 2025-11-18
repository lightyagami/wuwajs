"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapMarkPhantomGroup = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class MapMarkPhantomGroup {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get MarkId() {
    return this.markid();
  }
  get ShowRange() {
    return GameUtils_1.GameUtils.ConvertToArray(this.showrangeLength(), this.showrange, this);
  }
  get ShowPhantom() {
    return GameUtils_1.GameUtils.ConvertToArray(this.showphantomLength(), this.showphantom, this);
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsMapMarkPhantomGroup(t, s) {
    return (s || new MapMarkPhantomGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  markid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetShowrangeAt(t) {
    return this.showrange(t);
  }
  showrange(t) {
    var s = this.J7.__offset(this.z7, 6);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  showrangeLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  showrangeArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetShowphantomAt(t) {
    return this.showphantom(t);
  }
  showphantom(t) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  showphantomLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  showphantomArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.MapMarkPhantomGroup = MapMarkPhantomGroup;
//# sourceMappingURL=MapMarkPhantomGroup.js.map