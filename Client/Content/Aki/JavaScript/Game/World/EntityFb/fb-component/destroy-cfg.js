"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DestroyCfg = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DestroyCfg {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsDestroyCfg(t, s) {
    return (s || new DestroyCfg()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDestroyCfg(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new DestroyCfg()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  conditionsType(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.readUint8(this.bb.__vector(this.bb_pos + s) + t);
    } else {
      return 0;
    }
  }
  conditionsTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  conditionsTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  conditions(t, s) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__union(s, this.bb.__vector(this.bb_pos + i) + t * 4);
    } else {
      return undefined;
    }
  }
  conditionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startDestroyCfg(t) {
    t.startObject(2);
  }
  static addConditionsType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static createConditionsTypeVector(s, i) {
    s.startVector(1, i.length, 1);
    for (let t = i.length - 1; t >= 0; t--) {
      s.addInt8(i[t]);
    }
    return s.endVector();
  }
  static startConditionsTypeVector(t, s) {
    t.startVector(1, s, 1);
  }
  static addConditions(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static createConditionsVector(s, i) {
    s.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      s.addOffset(i[t]);
    }
    return s.endVector();
  }
  static startConditionsVector(t, s) {
    t.startVector(4, s, 4);
  }
  static endDestroyCfg(t) {
    return t.endObject();
  }
  static createDestroyCfg(t, s, i) {
    DestroyCfg.startDestroyCfg(t);
    DestroyCfg.addConditionsType(t, s);
    DestroyCfg.addConditions(t, i);
    return DestroyCfg.endDestroyCfg(t);
  }
}
exports.DestroyCfg = DestroyCfg;
//# sourceMappingURL=destroy-cfg.js.map