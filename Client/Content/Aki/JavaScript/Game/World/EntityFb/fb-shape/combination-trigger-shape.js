"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CombinationTriggerShape = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CombinationTriggerShape {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCombinationTriggerShape(t, i) {
    return (i || new CombinationTriggerShape()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCombinationTriggerShape(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CombinationTriggerShape()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  combinationShapesType(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readUint8(this.bb.__vector(this.bb_pos + i) + t);
    } else {
      return 0;
    }
  }
  combinationShapesTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  combinationShapesTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  combinationShapes(t, i) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__union(i, this.bb.__vector(this.bb_pos + e) + t * 4);
    } else {
      return undefined;
    }
  }
  combinationShapesLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCombinationTriggerShape(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addCombinationShapesType(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createCombinationShapesTypeVector(i, e) {
    i.startVector(1, e.length, 1);
    for (let t = e.length - 1; t >= 0; t--) {
      i.addInt8(e[t]);
    }
    return i.endVector();
  }
  static startCombinationShapesTypeVector(t, i) {
    t.startVector(1, i, 1);
  }
  static addCombinationShapes(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createCombinationShapesVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      i.addOffset(e[t]);
    }
    return i.endVector();
  }
  static startCombinationShapesVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endCombinationTriggerShape(t) {
    return t.endObject();
  }
  static createCombinationTriggerShape(t, i, e, r) {
    CombinationTriggerShape.startCombinationTriggerShape(t);
    CombinationTriggerShape.addType(t, i);
    CombinationTriggerShape.addCombinationShapesType(t, e);
    CombinationTriggerShape.addCombinationShapes(t, r);
    return CombinationTriggerShape.endCombinationTriggerShape(t);
  }
}
exports.CombinationTriggerShape = CombinationTriggerShape;
//# sourceMappingURL=combination-trigger-shape.js.map