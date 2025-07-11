"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomJsonCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CustomJsonCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsCustomJsonCondition(t, o) {
    return (o || new CustomJsonCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCustomJsonCondition(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new CustomJsonCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    if (o) {
      return this.bb.__string(this.bb_pos + o, t);
    } else {
      return undefined;
    }
  }
  name(t) {
    var o = this.bb.__offset(this.bb_pos, 6);
    if (o) {
      return this.bb.__string(this.bb_pos + o, t);
    } else {
      return undefined;
    }
  }
  jsonString(t) {
    var o = this.bb.__offset(this.bb_pos, 8);
    if (o) {
      return this.bb.__string(this.bb_pos + o, t);
    } else {
      return undefined;
    }
  }
  static startCustomJsonCondition(t) {
    t.startObject(3);
  }
  static addType(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static addName(t, o) {
    t.addFieldOffset(1, o, 0);
  }
  static addJsonString(t, o) {
    t.addFieldOffset(2, o, 0);
  }
  static endCustomJsonCondition(t) {
    return t.endObject();
  }
  static createCustomJsonCondition(t, o, s, i) {
    CustomJsonCondition.startCustomJsonCondition(t);
    CustomJsonCondition.addType(t, o);
    CustomJsonCondition.addName(t, s);
    CustomJsonCondition.addJsonString(t, i);
    return CustomJsonCondition.endCustomJsonCondition(t);
  }
}
exports.CustomJsonCondition = CustomJsonCondition;
//# sourceMappingURL=custom-json-condition.js.map