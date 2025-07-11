"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeEntityStateLoop = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeEntityStateLoop {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsChangeEntityStateLoop(t, e) {
    return (e || new ChangeEntityStateLoop()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsChangeEntityStateLoop(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ChangeEntityStateLoop()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  circulation(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startChangeEntityStateLoop(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addCirculation(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endChangeEntityStateLoop(t) {
    return t.endObject();
  }
  static createChangeEntityStateLoop(t, e, i, a) {
    ChangeEntityStateLoop.startChangeEntityStateLoop(t);
    ChangeEntityStateLoop.addType(t, e);
    ChangeEntityStateLoop.addEntityId(t, i);
    ChangeEntityStateLoop.addCirculation(t, a);
    return ChangeEntityStateLoop.endChangeEntityStateLoop(t);
  }
}
exports.ChangeEntityStateLoop = ChangeEntityStateLoop;
//# sourceMappingURL=change-entity-state-loop.js.map