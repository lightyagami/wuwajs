"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConditionGroup = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ConditionGroup {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsConditionGroup(t, i) {
    return (i || new ConditionGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsConditionGroup(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new ConditionGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  conditionsExtType(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readUint8(this.bb.__vector(this.bb_pos + i) + t);
    } else {
      return 0;
    }
  }
  conditionsExtTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  conditionsExtTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  conditionsType(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.readUint8(this.bb.__vector(this.bb_pos + i) + t);
    } else {
      return 0;
    }
  }
  conditionsTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  conditionsTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  conditions(t, i) {
    var s = this.bb.__offset(this.bb_pos, 10);
    if (s) {
      return this.bb.__union(i, this.bb.__vector(this.bb_pos + s) + t * 4);
    } else {
      return undefined;
    }
  }
  conditionsLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startConditionGroup(t) {
    t.startObject(4);
  }
  static addType(t, i) {
    t.addFieldInt8(0, i, 0);
  }
  static addConditionsExtType(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createConditionsExtTypeVector(i, s) {
    i.startVector(1, s.length, 1);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addInt8(s[t]);
    }
    return i.endVector();
  }
  static startConditionsExtTypeVector(t, i) {
    t.startVector(1, i, 1);
  }
  static addConditionsType(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createConditionsTypeVector(i, s) {
    i.startVector(1, s.length, 1);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addInt8(s[t]);
    }
    return i.endVector();
  }
  static startConditionsTypeVector(t, i) {
    t.startVector(1, i, 1);
  }
  static addConditions(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static createConditionsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addOffset(s[t]);
    }
    return i.endVector();
  }
  static startConditionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endConditionGroup(t) {
    return t.endObject();
  }
  static createConditionGroup(t, i, s, o, r) {
    ConditionGroup.startConditionGroup(t);
    ConditionGroup.addType(t, i);
    ConditionGroup.addConditionsExtType(t, s);
    ConditionGroup.addConditionsType(t, o);
    ConditionGroup.addConditions(t, r);
    return ConditionGroup.endConditionGroup(t);
  }
}
exports.ConditionGroup = ConditionGroup;
//# sourceMappingURL=condition-group.js.map