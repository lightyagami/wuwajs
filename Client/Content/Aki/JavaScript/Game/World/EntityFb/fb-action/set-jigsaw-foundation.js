"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetJigsawFoundation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_set_jigsaw_foundation_js_1 = require("../fb-action/union-set-jigsaw-foundation.js");
class SetJigsawFoundation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsSetJigsawFoundation(t, i) {
    return (i || new SetJigsawFoundation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSetJigsawFoundation(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new SetJigsawFoundation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  configType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_set_jigsaw_foundation_js_1.UnionSetJigsawFoundation.NONE;
    }
  }
  config(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  static startSetJigsawFoundation(t) {
    t.startObject(2);
  }
  static addConfigType(t, i) {
    t.addFieldInt8(0, i, union_set_jigsaw_foundation_js_1.UnionSetJigsawFoundation.NONE);
  }
  static addConfig(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endSetJigsawFoundation(t) {
    return t.endObject();
  }
  static createSetJigsawFoundation(t, i, s) {
    SetJigsawFoundation.startSetJigsawFoundation(t);
    SetJigsawFoundation.addConfigType(t, i);
    SetJigsawFoundation.addConfig(t, s);
    return SetJigsawFoundation.endSetJigsawFoundation(t);
  }
}
exports.SetJigsawFoundation = SetJigsawFoundation;
//# sourceMappingURL=set-jigsaw-foundation.js.map