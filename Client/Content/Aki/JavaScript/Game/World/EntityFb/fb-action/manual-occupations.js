"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManualOccupations = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ManualOccupations {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsManualOccupations(t, a) {
    return (a || new ManualOccupations()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsManualOccupations(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new ManualOccupations()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  occupationType(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  occupations(t, a) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return this.bb.__string(this.bb.__vector(this.bb_pos + s) + t * 4, a);
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
  static startManualOccupations(t) {
    t.startObject(2);
  }
  static addOccupationType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static addOccupations(t, a) {
    t.addFieldOffset(1, a, 0);
  }
  static createOccupationsVector(a, s) {
    a.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      a.addOffset(s[t]);
    }
    return a.endVector();
  }
  static startOccupationsVector(t, a) {
    t.startVector(4, a, 4);
  }
  static endManualOccupations(t) {
    return t.endObject();
  }
  static createManualOccupations(t, a, s) {
    ManualOccupations.startManualOccupations(t);
    ManualOccupations.addOccupationType(t, a);
    ManualOccupations.addOccupations(t, s);
    return ManualOccupations.endManualOccupations(t);
  }
}
exports.ManualOccupations = ManualOccupations;
//# sourceMappingURL=manual-occupations.js.map