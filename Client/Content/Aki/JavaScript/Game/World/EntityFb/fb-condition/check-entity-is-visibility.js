"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckEntityIsVisibility = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckEntityIsVisibility {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsCheckEntityIsVisibility(i, t) {
    return (t || new CheckEntityIsVisibility()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsCheckEntityIsVisibility(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CheckEntityIsVisibility()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  entityId() {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readInt32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  isVisible() {
    var i = this.bb.__offset(this.bb_pos, 8);
    return !!i && !!this.bb.readInt8(this.bb_pos + i);
  }
  static startCheckEntityIsVisibility(i) {
    i.startObject(3);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addEntityId(i, t) {
    i.addFieldInt32(1, t, 0);
  }
  static addIsVisible(i, t) {
    i.addFieldInt8(2, +t, 0);
  }
  static endCheckEntityIsVisibility(i) {
    return i.endObject();
  }
  static createCheckEntityIsVisibility(i, t, s, e) {
    CheckEntityIsVisibility.startCheckEntityIsVisibility(i);
    CheckEntityIsVisibility.addType(i, t);
    CheckEntityIsVisibility.addEntityId(i, s);
    CheckEntityIsVisibility.addIsVisible(i, e);
    return CheckEntityIsVisibility.endCheckEntityIsVisibility(i);
  }
}
exports.CheckEntityIsVisibility = CheckEntityIsVisibility;
//# sourceMappingURL=check-entity-is-visibility.js.map