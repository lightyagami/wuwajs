"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryPropLibrary = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class HonamiStoryPropLibrary {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get HonamiStoryPropId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.honamistorypropidLength(), this.honamistorypropid, this);
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsHonamiStoryPropLibrary(t, r) {
    return (r || new HonamiStoryPropLibrary()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetHonamistorypropidAt(t) {
    return this.honamistorypropid(t);
  }
  honamistorypropid(t) {
    var r = this.J7.__offset(this.z7, 6);
    if (r) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + r) + t * 4);
    } else {
      return 0;
    }
  }
  honamistorypropidLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  honamistorypropidArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.HonamiStoryPropLibrary = HonamiStoryPropLibrary;
//# sourceMappingURL=HonamiStoryPropLibrary.js.map