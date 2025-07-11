"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FixFoundationRelation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FixFoundationRelation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsFixFoundationRelation(t, i) {
    return (i || new FixFoundationRelation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFixFoundationRelation(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new FixFoundationRelation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static startFixFoundationRelation(t) {
    t.startObject(0);
  }
  static endFixFoundationRelation(t) {
    return t.endObject();
  }
  static createFixFoundationRelation(t) {
    FixFoundationRelation.startFixFoundationRelation(t);
    return FixFoundationRelation.endFixFoundationRelation(t);
  }
}
exports.FixFoundationRelation = FixFoundationRelation;
//# sourceMappingURL=fix-foundation-relation.js.map