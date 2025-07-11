"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForceOccupations = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ForceOccupations {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, c) {
    this.bb_pos = t;
    this.bb = c;
    return this;
  }
  static getRootAsForceOccupations(t, c) {
    return (c || new ForceOccupations()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsForceOccupations(t, c) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (c || new ForceOccupations()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  occupationType(t) {
    var c = this.bb.__offset(this.bb_pos, 4);
    if (c) {
      return this.bb.__string(this.bb_pos + c, t);
    } else {
      return undefined;
    }
  }
  occupations(t, c) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return this.bb.__string(this.bb.__vector(this.bb_pos + s) + t * 4, c);
    } else {
      return undefined;
    }
  }
  occupationsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startForceOccupations(t) {
    t.startObject(2);
  }
  static addOccupationType(t, c) {
    t.addFieldOffset(0, c, 0);
  }
  static addOccupations(t, c) {
    t.addFieldOffset(1, c, 0);
  }
  static createOccupationsVector(c, s) {
    c.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      c.addOffset(s[t]);
    }
    return c.endVector();
  }
  static startOccupationsVector(t, c) {
    t.startVector(4, c, 4);
  }
  static endForceOccupations(t) {
    return t.endObject();
  }
  static createForceOccupations(t, c, s) {
    ForceOccupations.startForceOccupations(t);
    ForceOccupations.addOccupationType(t, c);
    ForceOccupations.addOccupations(t, s);
    return ForceOccupations.endForceOccupations(t);
  }
}
exports.ForceOccupations = ForceOccupations;
//# sourceMappingURL=force-occupations.js.map