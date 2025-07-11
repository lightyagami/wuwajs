"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisibleConditionGroup = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class VisibleConditionGroup {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsVisibleConditionGroup(i, t) {
    return (t || new VisibleConditionGroup()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsVisibleConditionGroup(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new VisibleConditionGroup()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  conditionsType(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb.__vector(this.bb_pos + t) + i);
    } else {
      return 0;
    }
  }
  conditionsTypeLength() {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__vector_len(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  conditionsTypeArray() {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + i), this.bb.__vector_len(this.bb_pos + i));
    } else {
      return undefined;
    }
  }
  conditions(i, t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return this.bb.__union(t, this.bb.__vector(this.bb_pos + s) + i * 4);
    } else {
      return undefined;
    }
  }
  conditionsLength() {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__vector_len(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  static startVisibleConditionGroup(i) {
    i.startObject(2);
  }
  static addConditionsType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static createConditionsTypeVector(t, s) {
    t.startVector(1, s.length, 1);
    for (let i = s.length - 1; i >= 0; i--) {
      t.addInt8(s[i]);
    }
    return t.endVector();
  }
  static startConditionsTypeVector(i, t) {
    i.startVector(1, t, 1);
  }
  static addConditions(i, t) {
    i.addFieldOffset(1, t, 0);
  }
  static createConditionsVector(t, s) {
    t.startVector(4, s.length, 4);
    for (let i = s.length - 1; i >= 0; i--) {
      t.addOffset(s[i]);
    }
    return t.endVector();
  }
  static startConditionsVector(i, t) {
    i.startVector(4, t, 4);
  }
  static endVisibleConditionGroup(i) {
    return i.endObject();
  }
  static createVisibleConditionGroup(i, t, s) {
    VisibleConditionGroup.startVisibleConditionGroup(i);
    VisibleConditionGroup.addConditionsType(i, t);
    VisibleConditionGroup.addConditions(i, s);
    return VisibleConditionGroup.endVisibleConditionGroup(i);
  }
}
exports.VisibleConditionGroup = VisibleConditionGroup;
//# sourceMappingURL=visible-condition-group.js.map