"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Soar = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class Soar {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsSoar(t, r) {
    return (r || new Soar()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSoar(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new Soar()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  static startSoar(t) {
    t.startObject(1);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static endSoar(t) {
    return t.endObject();
  }
  static createSoar(t, r) {
    Soar.startSoar(t);
    Soar.addType(t, r);
    return Soar.endSoar(t);
  }
}
exports.Soar = Soar;
//# sourceMappingURL=soar.js.map