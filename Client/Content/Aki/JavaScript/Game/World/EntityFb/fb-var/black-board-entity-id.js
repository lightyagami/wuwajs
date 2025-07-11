"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlackBoardEntityId = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BlackBoardEntityId {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsBlackBoardEntityId(t, i) {
    return (i || new BlackBoardEntityId()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBlackBoardEntityId(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new BlackBoardEntityId()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  key(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startBlackBoardEntityId(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addKey(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addEntityId(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static endBlackBoardEntityId(t) {
    return t.endObject();
  }
  static createBlackBoardEntityId(t, i, a, r) {
    BlackBoardEntityId.startBlackBoardEntityId(t);
    BlackBoardEntityId.addType(t, i);
    BlackBoardEntityId.addKey(t, a);
    BlackBoardEntityId.addEntityId(t, r);
    return BlackBoardEntityId.endBlackBoardEntityId(t);
  }
}
exports.BlackBoardEntityId = BlackBoardEntityId;
//# sourceMappingURL=black-board-entity-id.js.map